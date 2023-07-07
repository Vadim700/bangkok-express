import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modalBody = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) { // Добавляет товар в корзину

    if (product) {
      const finded = this.cartItems.find(item => item.product.id === product.id);

      if (this.cartItems.includes(finded)) {
        finded.count++;
      } else {
        const item = {
          product: product,
          count: 1
        };
        this.cartItems.push(item);
      }
    }

    this.onProductUpdate(this.cartIcon);
  }

  updateProductCount(productId, amount) { // меняет количество единиц товара

    const finded = this.cartItems.find(item => productId === item.product.id);
    const findedIndex = this.cartItems.findIndex(item => productId === item.product.id);

    if (amount > 0) {
      finded.count++;
    } else {
      finded.count--;
    }

    if (!finded.count) { this.cartItems.splice(findedIndex, 1); }

    this.onProductUpdate(finded);
  }

  isEmpty() { // Возвращает true если корзина пустая

    return this.cartItems.length === 0;
  }

  getTotalCount() { // Возвращает общее количество товаров в корзине
    let totalCount = 0;
    this.cartItems.forEach(item => totalCount += item.count);

    return totalCount;
  }

  getTotalPrice() { // Возвращает стоимость всех товаров в корзине
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += item.product.price * item.count);

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="./assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="./assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="./assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`
    <form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modalBody = new Modal();
    document.body.append(this.modalBody.elem);
    document.body.classList.add('is-modal-open');

    const wrap = document.createElement('div');

    this.cartItems.forEach(item => {
      wrap.prepend(this.renderProduct(item.product, item.count));
    });

    wrap.append(this.renderOrderForm());

    this.modalBody.setTitle('Your order');
    this.modalBody.setBody(wrap);

    document.forms[0].addEventListener('submit', this.onSubmit);

    wrap.addEventListener("click", (event) => {
      const target = event.target;
      const cardId = target.closest('.cart-product')?.dataset.productId;

      if (target.closest('.cart-counter__button_plus')) { this.updateProductCount(cardId, 1); }
      if (target.closest('.cart-counter__button_minus')) { this.updateProductCount(cardId, -1); }
    });
  }

  onProductUpdate(cartItem) {

    if (document.body.classList.contains('is-modal-open')) {

      const productId = cartItem.product.id;

      const modal = document.querySelector('.modal');
      const productCount = modal.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      const productPrice = modal.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      const infoPrice = modal.querySelector(`.cart-buttons__info-price`);
      const itemCart = productCount.closest('.cart-product');

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count === 0) { itemCart.remove(); }

      if (this.isEmpty()) {
        document.body.classList.remove('is-modal-open');
        this.modalBody.close();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    event.preventDefault();

    document.querySelector('[type="submit"]').classList.add('is-loading');

    const formData = new FormData(document.querySelector('.cart-form'));

    const postOrder = async () => {
      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
        });

        this.modalBody.setTitle('Success!');

        this.cartItems.length = 0;

        const success = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `;

        document.querySelector('.modal__body').innerHTML = success;

        const json = await response.json();

      } catch (error) {
        console.error(error);
      }
    };

    postOrder();
  }

  addEventListeners = (event) => {

    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

