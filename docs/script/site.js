// Config
const contactUsAPI = 'https://api.maytreehousestudios.co.uk/contact-us';
const siteKey = {siteKey : 'aseatatthetable'}
const requiredFields = [
  { "name" : "name" },
  { "name" : "email",
    "validation" : "email",
    "required" : "Please enter an Email Address" },
  { "name" : "whereHear" },
  { "name" : "comment",
    "required" : "Please enter your comment above"}
]

// Add 'open' class to popout menu when hamburger clicked
function menuEvents () {
  const opener = document.getElementsByClassName('hamburger')[0];
  const closer = document.getElementsByClassName('menuX')[0];
  const popoutMenu = document.getElementsByClassName('popout')[0];
  opener.addEventListener('click', () => {
    popoutMenu.classList.add('open')
  })
  closer.addEventListener('click', () => {
    popoutMenu.classList.remove('open')
  })
}

// Add class to input/testarea element on keyup if the value
// contains any non-whitespace characters.
// Could do this all in CSS with pseudo selector "input:valid"
// if all fields are required https://css-tricks.com/float-labels-css/
function contactFormEvents () {
  const form = document.getElementsByTagName('form')[0];
  if (!form) return;
  form.addEventListener('keyup', e => {
    if (e.target.value.match(/[^\s]/)) {
      e.target.classList.add('hascontent')
    } else {
      e.target.classList.remove('hascontent')
    }
  })
  const submit = form.getElementsByTagName('button')[0]
  submit.addEventListener('click', async e => {
    clearFeedback(form)
    postForm(form)
  })
}

function clearFeedback (form) {
  const errorTexts = form.getElementsByClassName('error');
  const successTexts = form.getElementsByClassName('success');
  [...errorTexts, ...successTexts].forEach(el => {el.remove()});
}
function getFormData (form) {
  const formFields = form.getElementsByClassName('formField');
  const formData = [...formFields].reduce((fd, item) => {return {[item.name]: item.value, ...fd}}, {})
  const errors = validateData(formData);
  return [formData, errors];
}
function validateData (formData){
  const errors = {};
  requiredFields.forEach(field => {
    if (formData[field.name]){
      switch (field.validation){
        case undefined:
          break;
        case 'email':
          if (!formData[field.name].match(/.*@.*\..*/))
            errors[field.name] = `Please enter a valid Email Address`
          break;
        default:
          console.log(`Validation type '${field.validation}' not defined`)
      }
    } else if (field.required) {
      errors[field.name] = field.required
    }
  })
  return errors;
}
function showErrors (error) {
  if (typeof error === 'string') {
    document.getElementById('form_generalError')
      .appendChild(feedbackElement(`Error : ${error}`, 'error'))
  } else {
    document.getElementById('form_generalError')
      .appendChild(feedbackElement('Please check errors below', 'error'))
    Object.keys(error).forEach(field => {
      document.getElementById(`formField_${field}`)
        .appendChild(feedbackElement(error[field], 'error'))
    })
  }
}
function showSuccess (message) {
  document.getElementById('form_generalError')
    .appendChild(feedbackElement(message, 'success'))
}
function feedbackElement (message, type) {
  const p = document.createElement('p');
  if (type) p.classList.add(type);
  p.textContent = message;
  return p;
}

async function postForm (form) {
  const [formData, errors] = getFormData(form)
  if (Object.keys(errors).length) return showErrors(errors);

  // do request
  const response = await fetch(contactUsAPI, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify({ ...siteKey, ...formData })
  })
  const responseData = await response.json();
  
  if (response.status == '400'){
    showErrors(responseData.error)
  } else if (response.status == '200') {
    showSuccess(`Feedback received - Thank you!`)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  menuEvents();
  contactFormEvents();
});