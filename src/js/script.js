console.log('test');

// media_container 요리재료 스와이퍼 테스트
const swiper1 = new Swiper('.media_container', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
});

// food_materials 요리재료 스와이퍼 테스트
const swiper2 = new Swiper('.materials_container', {
  // loop: true,
  slidesPerView: 5,
  slidesPerGroup: 5,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
