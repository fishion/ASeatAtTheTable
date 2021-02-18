const validateFormData  = require('./validate-form-data.js')

// Config
const contactUsAPI = 'https://api.maytreehousestudios.co.uk/contact-us';
const siteKey = {siteKey : 'aseatatthetable'}
const expectedFormData = [
  { "name" : "name",
    "niceName" : "Name" },
  { "name" : "email",
    "niceName" : "Email",
    "validation" : {
      "type" : "email",
      "error" : "Please enter a valid Email Address"
    },
    "required" : "No email address provided" },
  { "name" : "whereHear",
    "niceName" : "Where did you hear about us" },
  { "name" : "comment",
    "niceName" : "Comment",
    "required" : "No comment provided"}
]

module.exports = {
  // Add class to input/testarea element on keyup if the value
  // contains any non-whitespace characters.
  // Could do this all in CSS with pseudo selector "input:valid"
  // if all fields are required https://css-tricks.com/float-labels-css/
  addFieldHasValueClass : (form) => {
    form.addEventListener('keyup', e => {
      if (e.target.value.match(/[^\s]/)) {
        e.target.classList.add('hascontent')
      } else {
        e.target.classList.remove('hascontent')
      }
    })
  },
  // Form validation and submit behaviour
  addValidateAndSubmit : (form) => {
    const submit = form.getElementsByTagName('button')[0]
    submit.addEventListener('click', async e => {
      _clearFeedback(form);

      const [formData, errors] = _getFormData(form);
      if (Object.keys(errors).length) return _showErrors(errors);

      // post the data to the contactus API
      const response = await fetch(contactUsAPI, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify({ ...siteKey, ...formData })
      })
      const responseData = await response.json();
    
      if (response.status == '400'){
        _showErrors(responseData.error)
      } else if (response.status == '200') {
        _showSuccess(`Feedback received - Thank you!`)
      }
    })
  }
}


function _clearFeedback (form) {
  const errorTexts = form.getElementsByClassName('error');
  const successTexts = form.getElementsByClassName('success');
  [...errorTexts, ...successTexts].forEach(el => {el.remove()});
}

function _getFormData (form) {
  const inputFields = form.getElementsByTagName('input');
  const textareaFields = form.getElementsByTagName('textarea');
  const formData = [...inputFields, ...textareaFields].reduce((fd, item) => {
    return {[item.name]: item.value, ...fd}}, {}
  )
  const [_, errors] = validateFormData(formData, expectedFormData);
  return [formData, errors];
}

function _showErrors (error) {
  if (typeof error === 'string') {
    document.getElementById('form_generalError')
      .appendChild(_feedbackElement(`Error : ${error}`, 'error'))
  } else {
    document.getElementById('form_generalError')
      .appendChild(_feedbackElement('Please check errors below', 'error'))
    Object.keys(error).forEach(field => {
      document.getElementById(`formField_${field}`)
        .appendChild(_feedbackElement(error[field], 'error'))
    })
  }
}

function _showSuccess (message) {
  document.getElementById('form_generalError')
    .appendChild(_feedbackElement(message, 'success'))
}

function _feedbackElement (message, type) {
  const p = document.createElement('p');
  if (type) p.classList.add(type);
  p.textContent = message;
  return p;
}

