// Initialize Splide Slider for Products
function initSliderProducts() {
  let splides = $('.c-products');
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    let splide = new Splide(splides[i], {
      type: 'loop',
      perPage: 2,
      perMove: 1,
      arrows: false,
      pagination: false,
      speed: 1000,
      drag: true,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      breakpoints: {
        479: {
          perPage: 1,
        },
      },
    });

    splide.mount();
  }
}

// Initialize Splide Slider for Products
function initSliderInsights() {
  let splides = $('.c-coll-insights-wrap');
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    let splide = new Splide(splides[i], {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      arrows: false,
      pagination: false,
      speed: 1000,
      drag: true,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      mediaQuery: 'min',
      breakpoints: {
        480: {
          destroy: true,
        },
      },
    });

    splide.mount();
  }
}

// Initialize marquee animations
function initMarquee() {
  const tlone = gsap.timeline({
    repeat: -1,
  });
  tlone.fromTo(
    '.c-marquee-inner.cc-01',
    {
      xPercent: 0,
    },
    {
      xPercent: -50,
      duration: 15,
      ease: 'none',
    }
  );

  const tltwo = gsap.timeline({
    repeat: -1,
  });
  tltwo.fromTo(
    '.c-marquee-inner.cc-02',
    {
      xPercent: -50,
    },
    {
      xPercent: 0,
      duration: 15,
      ease: 'none',
    }
  );

  const tlthree = gsap.timeline({
    repeat: -1,
  });
  tlthree.fromTo(
    '.c-marquee-inner.cc-03',
    {
      xPercent: 0,
    },
    {
      xPercent: -50,
      duration: 15,
      ease: 'none',
    }
  );

  const itemstop = document.querySelectorAll('.c-location-details.cc-top');
  itemstop.forEach(function (elem) {
    elem.addEventListener('mouseover', () => {
      tlone.pause();
    });
    elem.addEventListener('mouseout', () => {
      tlone.play();
    });
  });

  const itemsmid = document.querySelectorAll('.c-location-details.cc-mid');
  itemsmid.forEach(function (elem) {
    elem.addEventListener('mouseover', () => {
      tltwo.pause();
    });
    elem.addEventListener('mouseout', () => {
      tltwo.play();
    });
  });

  const itemsbottom = document.querySelectorAll('.c-location-details.cc-bottom');
  itemsbottom.forEach(function (elem) {
    elem.addEventListener('mouseover', () => {
      tlthree.pause();
    });
    elem.addEventListener('mouseout', () => {
      tlthree.play();
    });
  });
}

// Run the functions after DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  initSliderProducts();
  initSliderInsights();
  initMarquee();
});

// Run the function when the window is resized
window.addEventListener('resize', function () {
  initSliderInsights();
});
