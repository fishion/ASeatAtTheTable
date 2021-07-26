// Add events to contact us form
const formEvents = require('./lib/contact-form-events.js');

const config = require('./lib/config.json');
const form = document.getElementsByTagName('form')[0];

window.reCaptchaInit = () => {
  const recapture_div = document.createElement('div');
  recapture_div.classList.add("g-recaptcha");
  form.appendChild(recapture_div)

  var holderId = grecaptcha.render(recapture_div,{
    'sitekey': config['recaptcha2-site-secret'],
    'size': 'invisible',
    'badge' : 'inline', // possible values: bottomright, bottomleft, inline
    'callback' : function () {
      formEvents.submitForm(form)
    }
  });

  // add form submit
  form.getElementsByTagName('button')[0]
  .addEventListener('click', () => {
    formEvents.validate(form) && grecaptcha.execute(holderId);
  })
};


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
}