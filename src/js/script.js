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

// 화면 로드 시 나타나는 효과
function sectionAnimate() {
  const IS_INVIEW = 'is_inview'
  const inviewSection = [...document.querySelectorAll('.inview_section')]

  let sectionTopArray = []
  inviewSection[0].classList.add(IS_INVIEW)
  sectionTopArray = calcContent(inviewSection)
  function showContent() {
    let _top = window.scrollY

    sectionTopArray.forEach((topValue, i, array) => {
      if (i + 1 !== array.length) {
        if (Number(_top) > Number(topValue) && Number(_top) < Number(array[i + 1])) {
          inviewSection[i].classList.add(IS_INVIEW)
        }
      } else if (Number(_top) > Number(topValue)) {
        inviewSection[i].classList.add(IS_INVIEW)
      }
    })
  }
  window.addEventListener('scroll', showContent)
}

// 히스토리 영역 백설 아이콘 on/off 전환
function iconOnOff() {
  const IS_ON = 'on'
  const historySections = [...document.querySelectorAll('.history_list')]
  let sectionTopArray = []
  sectionTopArray = calcContent(historySections)
  function iconState() {
    let _top = window.scrollY
    sectionTopArray.forEach((topValue, i, array) => {
      if (i + 1 !== array.length) {
        if (Number(_top) > Number(topValue) && Number(_top) < Number(array[i + 1])) {
          historySections[i].classList.add(IS_ON)
        } else {
          historySections[i].classList.remove(IS_ON)
        }
      } else {
        if (Number(_top) > Number(topValue)) {
          historySections[i].classList.add(IS_ON)
        } else {
          historySections[i].classList.remove(IS_ON)
        }
      }
    })
  }
  window.addEventListener('scroll', iconState)
}
function swipers() {
  // media_container media 스와이퍼 테스트
  const media_swiper = new Swiper('.media_container', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    pagination: {
      el: '.media_pagination',
      renderCustom: function (swiper, current, total) {
        return `<div> <span class="current_page"> ${current} </span> / ${total}</div>`
      },
      type: 'custom',
    },
  })

  // food_materials 요리재료 스와이퍼 테스트
  const materials_swiper = new Swiper('.materials_container', {
    loop: false,
    slidesPerView: 5,
    slidesPerGroup: 5,
    pagination: {
      el: '.materials_pagination',
      renderCustom: function (swiper, current, total) {
        return `<div> ${current}/${total}</div>`
      },
      type: 'custom',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  materials_swiper.appendSlide([
    '<li class="swiper-slide materials_list"></li>',
    '<li class="swiper-slide materials_list"></li>',
    '<li class="swiper-slide materials_list"></li>',
  ])
}

function init() {
  scrollTopBtnLocation()
  scrollGoTop()
  sectionAnimate()
  swipers()
  iconOnOff()
}

window.addEventListener('load', init)
