import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  sliderSteps = null;
  sliderSpans = [];
  thumb = null;
  progress = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.render();
  }

  render() {
    this.elem = createElement(this.template());

    this.elem.addEventListener("click", this.onClick);

    this.sliderSteps = this.elem.querySelector('.slider__steps');
    const spans = Array(this.steps).fill(`<span></span>`).join('\n');
    this.sliderSteps.innerHTML = spans;

    this.sliderSpans = [...this.elem.querySelectorAll('.slider__steps span')];
    this.sliderSpans[0].classList.add('slider__step-active');

    this.progress = this.elem.querySelector('.slider__progress');

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.addEventListener('pointerdown', this.onPointerDown);
    this.thumb.ondragstart = () => false;

    return this.elem;
  }

  template() {
    return (`
      <div class="slider">
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">0</span> 
        </div>
        <div class="slider__progress" style="width: 0%;"></div>
        <div class="slider__steps"></div >
      </div >
    `);
  }

  onClick = (event) => {
    const target = event.target;

    const value = this.elem.querySelector('.slider__value');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let width = this.elem.offsetWidth;
    let leftRelative = left / width;

    let segments = this.steps - 1;
    let sliderValue = Math.round(leftRelative * segments);
    this.value = sliderValue;
    value.innerHTML = sliderValue;

    let valuePersent = sliderValue / segments * 100;

    this.thumb.style.left = `${valuePersent}%`;
    this.progress.style.width = `${valuePersent}%`;

    const stepSlider = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(stepSlider);

    this.sliderSpans.forEach(item => item.classList.remove('slider__step-active'));
    this.sliderSpans[this.value].classList.add('slider__step-active');
  }

  onPointerDown = (event) => {
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    this.elem.classList.add('slider_dragging');

    if (event.clientX < this.elem.getBoundingClientRect().right && event.clientX > this.elem.getBoundingClientRect().left) {
      const value = this.elem.querySelector('.slider__value');

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let width = this.elem.offsetWidth;
      let leftRelative = left / width;

      let segments = this.steps - 1;
      let sliderValue = Math.round(leftRelative * segments);
      this.value = sliderValue;
      value.innerHTML = sliderValue;

      let leftRelativeWidth = Math.round(leftRelative * 100);

      this.thumb.style.left = `${leftRelativeWidth}%`;
      this.progress.style.width = `${leftRelativeWidth}%`;

      this.sliderSpans.forEach(item => item.classList.remove('slider__step-active'));
      this.sliderSpans[this.value].classList.add('slider__step-active');
    }
  }

  onPointerUp = (event) => {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.onPointerMove);

    const stepSlider = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(stepSlider);
  }
}
