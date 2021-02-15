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
  submit.addEventListener('click', async e => {postForm(form)})
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
  const generalError = document.getElementById('form_generalError').getElementsByClassName('error')[0];
  if (typeof error === 'string') {
    generalError.innerHTML= `Error : ${error}`
  } else {
    generalError.innerHTML= `Please check errors below`;
    Object.keys(error).forEach(field => {
      document.getElementById(`formField_${field}`)
        .getElementsByClassName('error')[0].innerHTML = error[field]
    })
  }
}
function showSuccess (message) {
  document.getElementById('form_generalError').getElementsByClassName('success')[0].innerHTML = message
}

async function postForm (form) {
  // clear previous feedback displayed
  const errorTexts = form.getElementsByClassName('error');
  const successTexts = form.getElementsByClassName('success');
  [...errorTexts, ...successTexts].forEach(el => {el.innerHTML = ''});

  // get form data
  const formFields = form.getElementsByClassName('formField');
  const formData = [...formFields].reduce((fd, item) => {return {[item.name]: item.value, ...fd}}, {})

  // validate the data
  const errors = validateData(formData);
  if (Object.keys(errors).length) return showErrors(errors);

  // do request
  const response = await fetch(contactUsAPI, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify({ ...siteKey, ...formData })
  })
  const status = response.status;
  const data = await response.json();
  
  if (status == '400'){
    showErrors(data.error)
  } else if (status == '200') {
    showSuccess(`Feedback received - Thank you!`)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  menuEvents();
  contactFormEvents();
});