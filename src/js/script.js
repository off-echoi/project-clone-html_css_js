// 스크롤시 탑 버튼 모양,위치 변화(클래스 추가)
function scrollTopBtnLocation() {
  const scrollTopBtn = document.querySelector('.scroll_top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
      scrollTopBtn.classList.add('top');
    } else {
      scrollTopBtn.classList.remove('top');
    }
  });
}

// 스크롤 탑으로 가는 이벤트
function scrollToTopFn() {
  const scrollToTopBtn = document.querySelector('.scroll_top');
  scrollToTopBtn.addEventListener('click', () => {
    let top = window.pageYOffset;
    const goToTop = setInterval(() => {
      top -= 50;
      window.scrollTo(0, top);
      if (top < 0) {
        clearInterval(goToTop);
      }
    }, 0);
  });
}

// 화면 로드 시 kv 나타나는 효과 : 임시 TEST
function sectionAnimate() {
  const sectionKv = document.querySelector('.brand_kv');
  const sectionIntro = document.querySelector('.brand_intro');
  const sectionSymbol = document.querySelector('.brand_symbol');

  function showContent() {
    let top = window.scrollY;
    sectionKv.classList.add('animate');

    if (top > sectionKv.offsetTop / 3) {
      sectionIntro.classList.add('animate');
    }
    if (top > sectionSymbol.offsetTop - (sectionKv.offsetTop + sectionKv.clientHeight - 50)) {
      sectionSymbol.classList.add('animate');
    }
  }
  window.addEventListener('scroll', showContent);
  window.addEventListener('load', showContent);
}

// media_container media 스와이퍼 테스트
const swiper1 = new Swiper('.media_container', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  pagination: {
    el: '.media_pagination',
    renderCustom: function (swiper, current, total) {
      return `<div>${current} / ${total}</div>`;
    },
    type: 'custom',
  },
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

function init() {
  scrollTopBtnLocation();
  scrollToTopFn();
  sectionAnimate();
}

init();
