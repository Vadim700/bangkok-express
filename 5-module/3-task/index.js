function initCarousel() {
  const carouselArrowPrev = document.querySelector('.carousel__arrow_left'),
    carouselArrowNext = document.querySelector('.carousel__arrow_right'),
    carousel = document.querySelector('.carousel'),
    carouselInner = document.querySelector('.carousel__inner'),
    slides = document.querySelectorAll('.carousel__slide').length;

  let widthElement = carouselInner.clientWidth;
  let count = 0;

  carouselArrowPrev.style.display = 'none';

  const nextSlide = () => {
    count += 1;
    carouselInner.style.transform = `translateX(-${widthElement * count}px)`;

    if (count === slides - 1) carouselArrowNext.style.display = 'none';
    if (count !== 0) carouselArrowPrev.style.display = '';
  };


  const prevSlide = () => {
    count -= 1;
    carouselInner.style.transform = `translateX(-${widthElement * count}px)`;

    if (count !== slides - 1) carouselArrowNext.style.display = '';
    if (count === 0) carouselArrowPrev.style.display = 'none';
  };

  carousel.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.carousel__arrow_right')) nextSlide();
    if (target.closest('.carousel__arrow_left')) prevSlide();
  });

}
