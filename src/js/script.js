console.log('test');

// food_materials 요리재료 스와이퍼 테스트
const swiper = new Swiper('.swiper-container', {
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
