// Add class to input/testarea element on keyup if the value
// contains any non-whitespace characters.
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