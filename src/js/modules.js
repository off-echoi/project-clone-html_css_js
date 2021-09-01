function calcContent(contentArray) {
  let _sectionTopArray = []
  contentArray.forEach((section) => {
    _sectionTopArray.push(section.getBoundingClientRect().top + window.scrollY - 400)
  })

  return _sectionTopArray
}
