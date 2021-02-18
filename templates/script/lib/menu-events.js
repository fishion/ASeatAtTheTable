module.exports = {
  // Add 'open' class to popout menu when hamburger clicked
  openCloseSlideoutMenu : () => {
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
}