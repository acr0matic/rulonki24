/* global Swiper, MicroModal */

const swiperFull = new Swiper('.fitting__full', {
  spaceBetween: 10,

  loop: true,

  slidesPerView: 1,
  loopedSlides: 8,
});

const swiperThumbs = new Swiper('.fitting__thumbs', {
  spaceBetween: 15,
  slidesPerView: 2,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  loop: true,
  loopedSlides: 8,
  slideVisibleClass: 'fitting__swiper-slide',
  slideActiveClass: 'fitting__swiper-slide--active',

  // Navigation arrows
  navigation: {
    nextEl: '.fitting__thumbs-next',
    prevEl: '.fitting__thumbs-prev',
  },

  breakpoints: {
    360: {
      slidesPerView: 3,
    },

    475: {
      slidesPerView: 8,
    },
  },
});

swiperFull.controller.control = swiperThumbs;
swiperThumbs.controller.control = swiperFull;

MicroModal.init({
  awaitCloseAnimation: true,
});
