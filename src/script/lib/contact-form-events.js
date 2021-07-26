const validateFormData  = require('./validate-form-data.js')

module.exports = (form, config) => {
  // hooks for additional behaviour
  this.afterValidate = () => {}
  this.afterSubmit = () => {}

  // Add class to input/testarea element on keyup if the value
  // contains any non-whitespace characters.
  // Could do this all in CSS with pseudo selector "input:valid"
  // if all fields are required https://css-tricks.com/float-labels-css/
  form.addEventListener('keyup', e => {
    if (e.target.value.match(/[^\s]/)) {
      e.target.classList.add('hascontent')
    } else {
      e.target.classList.remove('hascontent')
    }
  });

  // add form submit behaviour
  function addSubmit(aftervalidate) {
    form.getElementsByTagName('button')[0]
    .addEventListener('click', () => {
      this.validate() && this.afterValidate()
    })
  }

  // Form validation
  function validate() {
    _clearFeedback(form);
    const [_, errors] = validateFormData(_getFormData(form), config.expectedFormData)
    if (Object.keys(errors).length) {
      _showErrors(errors);
      return false;
    }
    return true;
  }

  // submit the form over API 
  async function submitForm() {
    const formData = _getFormData(form);
    // post the data to the contactus API
    const response = await fetch(config.contactUsAPI, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify({ siteKey : config.siteKey, ...formData })
    })
    const responseData = await response.json();
  
    if (response.status == '400'){
      _showErrors(responseData.error)
    } else if (response.status == '200') {
      _showSuccess(`Feedback received - Thank you!`)
      _clearForm();
    }
    
    this.afterSubmit()
  }

  function _clearFeedback () {
    const errorTexts = form.getElementsByClassName('error');
    const successTexts = form.getElementsByClassName('success');
    [...errorTexts, ...successTexts].forEach(el => {el.remove()});
  }

  function _getFormData () {
    const inputFields = form.getElementsByTagName('input');
    const textareaFields = form.getElementsByTagName('textarea');
    return [...inputFields, ...textareaFields].reduce((fd, item) => {
      return {[item.name]: item.value, ...fd}}, {}
    )
  }

  function _clearForm () {
    const inputFields = form.getElementsByTagName('input');
    const textareaFields = form.getElementsByTagName('textarea');
    [...inputFields, ...textareaFields].forEach(el => {
      el.value = '';
    })
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

  return {
    addSubmit   : addSubmit,
    validate    : validate,
    submitForm  : submitForm
  }
}



