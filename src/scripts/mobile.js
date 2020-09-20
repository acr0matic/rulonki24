const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');


if (hamburger)
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("mobile-menu--open");
  });