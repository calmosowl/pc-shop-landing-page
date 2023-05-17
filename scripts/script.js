window.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide'),
        slidesInner = document.querySelector('.hero-slider-inner'),
        slidesWrapper = document.querySelector('.hero-slider-wrapper'),
        slideHeight = window.getComputedStyle(slides[0]).height,
        indicatorPprogress = document.querySelector('.indicator-progress'),
        slidesQuantity = document.querySelector('.slides-quantity');


  let slideIndex = 1,
      slidesInnerOffset = 0;

  const getOnlyNumber = string => +string.replace(/\D/g, '');

  function setActiveClass(array, index) {
    array.forEach(item => item.classList.remove('is-active'));
    array[index - 1].classList.add('is-active');
  }

  slidesWrapper.style.height = slideHeight;
  slidesInner.style.height = 100 * slides.length + '%';

  slides.forEach(slide => slide.style.height = slideHeight);

  if (slides.length < 10) {
    slidesQuantity.textContent = `0${slides.length}`;
  } else {
    slidesQuantity.textContent = slides.length;
  }

  const dots = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.classList.add('is-active');
    }
    indicatorPprogress.append(dot);
    dots.push(dot);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      slidesInnerOffset = getOnlyNumber(slideHeight) * (slideTo - 1);

      slidesInner.style.transform = `translateY(-${slidesInnerOffset}px)`;

      setActiveClass(dots, slideIndex);
    })
  })

  let isAnimating = false;

  slidesWrapper.addEventListener("wheel", e => {
    e.stopPropagation();

    if (isAnimating) return;

    if (e.deltaY > 0) {
      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }

      if (slidesInnerOffset == getOnlyNumber(slideHeight) * (slides.length - 1)) {
        slidesInnerOffset = 0;
      } else {
        slidesInnerOffset += getOnlyNumber(slideHeight);
      }

      isAnimating = true;
      slidesInner.style.transform = `translateY(-${slidesInnerOffset}px)`;

      setActiveClass(dots, slideIndex);
      setTimeout(() => isAnimating = false, 1000)
    }

    if (e.deltaY < 0) {
      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
      if (slidesInnerOffset == 0) {
        slidesInnerOffset = getOnlyNumber(slideHeight) * (slides.length - 1);
      } else {
        slidesInnerOffset -= getOnlyNumber(slideHeight);
      }

      isAnimating = true;
      slidesInner.style.transform = `translateY(-${slidesInnerOffset}px)`;

      setActiveClass(dots, slideIndex);
      setTimeout(() => isAnimating = false, 1000);
    }
  });
})