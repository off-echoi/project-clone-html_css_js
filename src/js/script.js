// 스크롤시 탑 버튼 모양,위치 변화(클래스 추가)
function scrollTopBtnLocation() {
  const scrollTopBtn = document.querySelector('.scroll_top')
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
      scrollTopBtn.classList.add('top')
    } else {
      scrollTopBtn.classList.remove('top')
    }
  })
}

// 스크롤 탑으로 가는 이벤트
function scrollGoTop() {
  const scrollToTopBtn = document.querySelector('.scroll_top')
  scrollToTopBtn.addEventListener('click', () => {
    let top = window.pageYOffset
    const goToTop = setInterval(() => {
      top -= 50
      window.scrollTo(0, top)
      if (top < 0) {
        clearInterval(goToTop)
      }
    }, 0)
  })
}

// 화면 로드 시 나타나는 효과 : FIXME: 스크롤 잘 안맞는 부분 수정
function sectionAnimate() {
  const IS_INVIEW = 'is_inview'
  const inviewSection = [...document.querySelectorAll('.inview_section')]

  let sectionTopArray = []
  function calcContent() {
    inviewSection[0].classList.add(IS_INVIEW)
    let _sectionTopArray = []
    inviewSection.forEach((section) => {
      _sectionTopArray.push(section.getBoundingClientRect().top + window.scrollY)
    })
    return _sectionTopArray
  }
  sectionTopArray = calcContent()
  function showContent() {
    let top = window.scrollY
    // console.log(sectionTopArray)

    sectionTopArray.forEach((topValue, i, array) => {
      if (i + 1 !== array.length) {
        if (Number(top) > Number(topValue) - 200 && Number(top) < Number(array[i + 1]) - 200) {
          // console.log(top, topValue)
          inviewSection[i].classList.add(IS_INVIEW)
        }
      } else {
        console.log('>>')
        // inviewSection[i].classList.add(IS_INVIEW)
      }
    })
  }
  window.addEventListener('scroll', showContent)
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
      return `<div>${current} / ${total}</div>`
    },
    type: 'custom',
  },
})

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
})

function init() {
  scrollTopBtnLocation()
  scrollGoTop()
  sectionAnimate()
}

init()
