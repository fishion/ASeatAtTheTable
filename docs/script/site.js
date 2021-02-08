// Add 'open' class to popout menu when hamburger clicked
const menuEvents = () => {
  const opener = document.getElementsByClassName('hamburger')[0];
  const closer = document.getElementsByClassName('menuX')[0];
  const popoutMenu = document.getElementsByClassName('popout')[0];
  opener.addEventListener('click', () => {
    popoutMenu.classList.add('open')
  })
  closer.addEventListener('click', () => {
    popoutMenu.classList.remove('open')
  })
}

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
  menuEvents();
  contactFormEvents();
});