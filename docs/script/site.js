// Add class to input/testarea element on keyup if the value
// contains any non-whitespace characters.
// Could do this all in CSS with pseudo selector "input:valid"
// if all fields are required https://css-tricks.com/float-labels-css/
const contactFormEvents = () => {
  const form = document.getElementsByTagName('form')[0];
  if (!form) return;
  form.addEventListener('keyup', e => {
    if (e.target.value.match(/[^\s]/)) {
      e.target.classList.add('hascontent')
    } else {
      e.target.classList.remove('hascontent')
    }
  })
}

window.addEventListener('DOMContentLoaded', () => {
  contactFormEvents()
});