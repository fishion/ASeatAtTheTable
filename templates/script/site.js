// Add events for slideout menu
const menuEvents = require('./lib/menu-events.js');
menuEvents.openCloseSlideoutMenu();

// Add events to contact us form
const formEvents = require('./lib/contact-form-events.js');
const form = document.getElementsByTagName('form')[0];
if (form){
  // Add class to input/testarea element if the value contains any non-whitespace characters.
  formEvents.addFieldHasValueClass(form);

  // Add form validation and submit behaviour
  formEvents.addValidateAndSubmit(form)
}