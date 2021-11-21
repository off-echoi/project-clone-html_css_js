import { calcContent } from './modules.js'

// 토글 효과
function toggleEvent() {
  const toggleBtns = [...document.querySelectorAll(`[data-role="btn_toggle"]`)]

  function toggle(e) {
    e.stopPropagation()
    if (this.classList.contains('on')) {
      this.classList.remove('on')
      this.setAttribute(`aria-expand`, 'false')
    } else {
      this.classList.add('on')
      this.setAttribute(`aria-expand`, 'true')
    }
  }
  toggleBtns.forEach((btn, i) => {
    btn.addEventListener('click', toggle)
  })
  const _body = document.querySelector('body')

  _body.addEventListener('click', function () {
    toggleBtns.forEach((btn) => {
      btn.classList.remove('on')
    })
  })
}

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
// 미디어, 요리재료 스와이퍼
function swipers() {
  // media_container media 스와이퍼
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

  // food_materials 요리재료 스와이퍼
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
// 팝업 동작
function popup() {
  const _body = document.querySelector('body')
  const dim = document.querySelector('.dim')
  const popupBtns = [...document.querySelectorAll(`[data-role="btn_popup"]`)]
  const popupCloseBtns = [...document.querySelectorAll(`[data-role="btn_popup_close"]`)]

  function popupOpen() {
    const popupContent = document.querySelector(`[data-popup-id="${this.dataset.popup}"]`)
    popupContent.classList.add('on')
    this.blur()
    // 크롬focus안되는 이슈 해결
    setTimeout(function () {
      popupContent.focus()
    }, 1)
    this.setAttribute(`aria-expand`, 'true')
    // 팝업에서 포커스 빠지지 않는 코드 - 포커스 뒤로 이동 방지
    window.addEventListener('keydown', (e) => {
      if (document.activeElement === document.querySelector(`[data-role="popup_focus"]`)) {
        popupContent.focus()
      }
    })
    dim.classList.add('on')
    _body.setAttribute('style', 'overflow: hidden')
  }
  function popupClose() {
    const popupContent = document.querySelector(`[data-popup-id="${this.dataset.popup}"]`)
    const popupBUtton = document.querySelector(`[data-popup ="${this.dataset.popup}"]`)
    popupContent.classList.remove('on')
    popupBUtton.setAttribute(`aria-expand`, 'false')
    popupBUtton.focus()
    dim.classList.remove('on')
    _body.setAttribute('style', 'overflow: auto')
  }

  popupBtns.forEach((btn) => {
    btn.addEventListener('click', popupOpen)
  })
  popupCloseBtns.forEach((btn) => {
    btn.addEventListener('click', popupClose)
  })
}

// 뎁스 메뉴 호버 효과
// function menuHover() {}
function init() {
  toggleEvent()
  scrollTopBtnLocation()
  scrollGoTop()
  sectionAnimate()
  swipers()
  iconOnOff()
  popup()
}

window.addEventListener('load', init)
