import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;

  constructor() {
    this.elem = this.render();
  }

  render() {
    const elem = createElement(this.template());

    const closeButton = elem.querySelector('.modal__close');
    closeButton.addEventListener("click", this.close);

    document.addEventListener('keydown', this.onEscape);

    return elem;
  }

  template() {
    return (
      `
        <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
          </div>
          
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>

      </div>
    `);
  }

  onEscape = (event) => {
    if (event.code === 'Escape') { this.close(); }
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  }

  setTitle = (title = '') => {
    const modalTitle = this.elem.querySelector('.modal__title');

    modalTitle.innerHTML = '';
    modalTitle.append(title);
  }

  setBody = (node) => {
    const modalBody = this.elem.querySelector('.modal__body');

    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();

    document.removeEventListener('keydown', this.onEscape);
  }
}
