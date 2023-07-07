import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  buttonRight = null;
  buttonLeft = null;
  inner = null;
  slides = [];

  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  render() {
    const elem = createElement(this.template());

    this.buttonLeft = elem.querySelector('.ribbon__arrow_left');
    this.buttonRight = elem.querySelector('.ribbon__arrow_right');
    this.inner = elem.querySelector('.ribbon__inner');
    this.slides = [...elem.querySelectorAll('.ribbon__item')];

    elem.addEventListener("click", this.onClick);
    this.inner.addEventListener('scroll', this.onScroll);

    return elem;
  }

  template() {
    return (
      `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.categories.map(item => {
        return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
      }).join('\n')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `
    );
  }

  onClick = (event) => {
    const target = event.target;

    if (target.closest('.ribbon__item')) {
      event.preventDefault();
      let index = this.slides.indexOf(target);

      this.slides.map(item => item.classList.remove('ribbon__item_active'));
      target.classList.add('ribbon__item_active');

      const ribbonSelectEvent = new CustomEvent('ribbon-select', {
        bubbles: true,
        detail: this.categories[index].id,
      });
      this.elem.dispatchEvent(ribbonSelectEvent);
    }

    if (target.closest('.ribbon__arrow_right')) { this.inner.scrollBy(350, 0); }
    if (target.closest('.ribbon__arrow_left')) { this.inner.scrollBy(-350, 0); }
  }

  onScroll = () => {
    const scrollWidth = this.inner.scrollWidth;
    const scrollLeft = this.inner.scrollLeft;
    const clientWidth = this.inner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (this.inner.scrollLeft > 0) { this.buttonLeft.classList.add('ribbon__arrow_visible'); }
    if (this.inner.scrollLeft === 0) { this.buttonLeft.classList.remove('ribbon__arrow_visible'); }

    if (scrollRight < 1) { this.buttonRight.classList.remove('ribbon__arrow_visible'); }
    if (scrollRight > 1) { this.buttonRight.classList.add('ribbon__arrow_visible'); }
  }
}
