/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./templates/script/lib/config.json":
/*!******************************************!*\
  !*** ./templates/script/lib/config.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"recaptcha2-site-secret":"6LdOWmkaAAAAAAXH3BvOKcI2wrq53-qq3bjtSR2s","contactUsAPI":"https://api.maytreehousestudios.co.uk/contact-us","siteKey":"aseatatthetable","expectedFormData":[{"name":"name","niceName":"Name"},{"name":"email","niceName":"Email","validation":{"type":"email","error":"Please enter a valid Email Address"},"required":"No email address provided"},{"name":"whereHear","niceName":"Where did you hear about us"},{"name":"comment","niceName":"Comment","required":"No comment provided"}]}');

/***/ }),

/***/ "./templates/script/lib/contact-form-events.js":
/*!*****************************************************!*\
  !*** ./templates/script/lib/contact-form-events.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const validateFormData  = __webpack_require__(/*! ./validate-form-data.js */ "./templates/script/lib/validate-form-data.js")
const config = __webpack_require__(/*! ./config.json */ "./templates/script/lib/config.json");

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



/***/ }),

/***/ "./templates/script/lib/validate-form-data.js":
/*!****************************************************!*\
  !*** ./templates/script/lib/validate-form-data.js ***!
  \****************************************************/
/***/ ((module) => {

module.exports = (data, expectedData) => {
  const errors = {};
  const strings = [];
  
  expectedData.forEach(field => {
    if (data[field.name]){
      switch (field.validation && field.validation.type){
        case 'email':
          if (!data[field.name].match(/.*@.*\..*/))
          errors[field.name] = field.validation.error
          break;
        case undefined:
          break;
        default:
          throw(`Validation type '${field.validation}' not defined`)
      };
      strings.push(`${field.niceName || field.name} : ${data[field.name]}`);
    } else if (field.required){
      errors[field.name] = field.required
    }
  })
  return [strings, errors];
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./templates/script/formevents.js ***!
  \****************************************/
// Add events to contact us form
const formEvents = __webpack_require__(/*! ./lib/contact-form-events.js */ "./templates/script/lib/contact-form-events.js");
const config = __webpack_require__(/*! ./lib/config.json */ "./templates/script/lib/config.json");

  // add recapture element - called by google script
  function addRecaptcha() {
    const recapture_div = document.createElement('div');
    form.appendChild(recapture_div)
    grecaptcha.render(recapture_div, {
      'sitekey' : config['recaptcha2-site-secret'],
      'callback' : formEvents.submitForm
    });
  }

const form = document.getElementsByTagName('form')[0];
if (form){

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



  // add form submit
  form.getElementsByTagName('button')[0]
  .addEventListener('click', () => {formEvents.validateAndCaptcha(form)})
}
})();

/******/ })()
;