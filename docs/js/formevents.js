/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/lib/config.json":
/*!********************************!*\
  !*** ./src/js/lib/config.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"recaptcha2-site-secret":"6LdOWmkaAAAAAAXH3BvOKcI2wrq53-qq3bjtSR2s","contactUsAPI":"https://api.maytreehousestudios.co.uk/contact-us","siteKey":"aseatatthetable","expectedFormData":[{"name":"name","niceName":"Name"},{"name":"email","niceName":"Email","validation":{"type":"email","error":"Please enter a valid Email Address"},"required":"No email address provided"},{"name":"whereHear","niceName":"Where did you hear about us"},{"name":"comment","niceName":"Comment","required":"No comment provided"}]}');

/***/ }),

/***/ "./src/js/lib/contact-form-events.js":
/*!*******************************************!*\
  !*** ./src/js/lib/contact-form-events.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const validateFormData  = __webpack_require__(/*! ./validate-form-data.js */ "./src/js/lib/validate-form-data.js")

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





/***/ }),

/***/ "./src/js/lib/recaptcha-events.js":
/*!****************************************!*\
  !*** ./src/js/lib/recaptcha-events.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = (form, secret) => {

  function addRecaptcha(callback) {
    const recapture_div = document.createElement('div');
    recapture_div.classList.add("g-recaptcha");
    form.appendChild(recapture_div)

    const recaptchaId = grecaptcha.render(recapture_div,{
      'sitekey': secret,
      'size': 'invisible',
      'badge' : 'inline', // possible values: bottomright, bottomleft, inline
      'callback' : callback
    });
    return recaptchaId;
  }


  return {
    addRecaptcha: addRecaptcha
  }

}

/***/ }),

/***/ "./src/js/lib/validate-form-data.js":
/*!******************************************!*\
  !*** ./src/js/lib/validate-form-data.js ***!
  \******************************************/
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/js/formevents.js ***!
  \******************************/
const form = document.getElementsByTagName('form')[0];

const config = __webpack_require__(/*! ./lib/config.json */ "./src/js/lib/config.json");
const formEvents = __webpack_require__(/*! ./lib/contact-form-events.js */ "./src/js/lib/contact-form-events.js")(form, config);
const recaptchaEvents = __webpack_require__(/*! ./lib/recaptcha-events.js */ "./src/js/lib/recaptcha-events.js")(form, config['recaptcha2-site-secret']);


// can't fire this until recaptcha script is fully loaded and ready
window.initForm = () => {
  const recaptchaId = recaptchaEvents.addRecaptcha(
    () => {formEvents.submitForm()}
  )

  formEvents.afterValidate = () => {
    grecaptcha.execute(recaptchaId);
  }
  formEvents.afterSubmit = () => {
    grecaptcha.reset(); // Reset reCaptcha
  }
  formEvents.addSubmit();

}

})();

/******/ })()
;