let menuButtons = document.getElementsByClassName('menu-btn');
for (let i = 0; i < menuButtons.length; i++) {
  menuButtons[i],addEventListener('click', toggleMenu);
}

function toggleMenu() {
  let navMobile = document.querySelector('.nav-mobile');
  
  navMobile.classList.toggle('hidden');
  
  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].classList.toggle('hidden');
  }
}