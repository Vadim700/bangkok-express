import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  sliderSteps = null;
  sliderSpans = [];

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

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const value = this.elem.querySelector('.slider__value');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let width = this.elem.offsetWidth;
    let leftRelative = left / width;

    let segments = this.steps - 1;
    let sliderValue = Math.round(leftRelative * segments);
    this.value = sliderValue;
    value.innerHTML = sliderValue;

    let valuePersent = sliderValue / segments * 100;

    thumb.style.left = `${valuePersent}%`;
    progress.style.width = `${valuePersent}%`;

    const stepSlider = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(stepSlider);

    this.sliderSpans.forEach(item => item.classList.remove('slider__step-active'));
    this.sliderSpans[this.value].classList.add('slider__step-active');
  }
}
