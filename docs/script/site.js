/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/script/site.js ***!
  \****************************/
// Add events for slideout menu
// load script with defer attribute to ensure DOM is loaded before execution

const opener = document.getElementsByClassName('hamburger')[0];
const closer = document.getElementsByClassName('menuX')[0];
const popoutMenu = document.getElementsByClassName('popout')[0];

opener.addEventListener('click', () => {
  popoutMenu.classList.add('open')
})

closer.addEventListener('click', () => {
  popoutMenu.classList.remove('open')
})
/******/ })()
;