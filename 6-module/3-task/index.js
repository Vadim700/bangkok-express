import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  arrowPrev = null;
  arrowNext = null;
  inner = null;
  quantity = 0;
  count = 0;

  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  render() {
    const element = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
        ${this.slides.map(item => {
      return (`
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">${'€' + item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`);
    }).join('\n')};
        </div>
      </div > `
    );

    this.arrowPrev = element.querySelector('.carousel__arrow_left');
    this.arrowNext = element.querySelector('.carousel__arrow_right');
    this.inner = element.querySelector('.carousel__inner');
    this.quantity = element.querySelectorAll('.carousel__slide').length;

    this.arrowPrev.style.display = 'none';

    element.addEventListener("click", this.onClick);

    return element;
  }

  onClick = (event) => {
    let widthElement = this.inner.clientWidth;
    const target = event.target;

    const nextSlide = () => {
      this.count += 1;
      this.inner.style.transform = `translateX(-${widthElement * this.count}px)`;

      if (this.count === this.quantity - 1) { this.arrowNext.style.display = 'none'; }
      if (this.count !== 0) { this.arrowPrev.style.display = ''; }
    };

    const prevSlide = () => {
      this.count -= 1;
      this.inner.style.transform = `translateX(-${widthElement * this.count}px)`;

      if (this.count !== this.quantity - 1) { this.arrowNext.style.display = ''; }
      if (this.count === 0) { this.arrowPrev.style.display = 'none'; }
    };

    if (target.closest('.carousel__arrow_right')) { nextSlide(); }
    if (target.closest('.carousel__arrow_left')) { prevSlide(); }

    if (target.closest('.carousel__button')) {

      const clickEvent = new CustomEvent('product-add', {
        bubbles: true,
        detail: this.slides[this.count].id,
      });

      this.elem.dispatchEvent(clickEvent);
    }
  }
}
