const form = document.getElementsByTagName('form')[0];

const config = require('./lib/config.json');
const formEvents = require('./lib/contact-form-events.js')(form, config);
const recaptchaEvents = require('./lib/recaptcha-events.js')(form, config['recaptcha2-site-secret']);


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
