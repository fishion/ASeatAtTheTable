// Add events to contact us form
const formEvents = require('./lib/contact-form-events.js');
const config = require('./lib/config.json');

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

  // add recapture element
  const recapture_div = document.createElement('div');
  recapture_div.classList.add("g-recaptcha");
  recapture_div.setAttribute("data-sitekey", config['recaptcha2-site-secret'])
  recapture_div.setAttribute("data-callback", formEvents.submitForm)
  recapture_div.setAttribute("data-size", "invisible")
  form.appendChild(recapture_div)

  // add form submit
  form.getElementsByTagName('button')[0]
  .addEventListener('click', () => {formEvents.validateAndCaptcha(form)})
}