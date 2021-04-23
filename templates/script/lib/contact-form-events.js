const validateFormData  = require('./validate-form-data.js')
const config = require('./config.json');

module.exports = {

  // Form validation and recaptcha call
  validateAndCaptcha : (form) => {
    _clearFeedback(form);
    const [_, errors] = validateFormData(_getFormData(form), config.expectedFormData)
    if (Object.keys(errors).length) return _showErrors(errors);

    grecaptcha.execute();
  },

  // submit the form over API 
  submitForm : async (form) => {
    const formData = _getFormData(form);
    // post the data to the contactus API
    const response = await fetch(config.contactUsAPI, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify({ ...config.siteKey, ...formData })
    })
    const responseData = await response.json();
  
    if (response.status == '400'){
      _showErrors(responseData.error)
    } else if (response.status == '200') {
      _showSuccess(`Feedback received - Thank you!`)
    }

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
  return [...inputFields, ...textareaFields].reduce((fd, item) => {
    return {[item.name]: item.value, ...fd}}, {}
  )
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

