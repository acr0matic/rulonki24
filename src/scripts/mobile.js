const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuItems = mobileMenu.querySelectorAll('.mobile-menu__item');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('mobile-menu--open');
  });
}

window.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('is-active');
    mobileMenu.classList.remove('mobile-menu--open');
  }
});

mobileMenuItems.forEach((item) => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('is-active');
    mobileMenu.classList.remove('mobile-menu--open');
  });
});
