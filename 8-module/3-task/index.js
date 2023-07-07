export default class Cart {
  cartItems = []; // корзина

  constructor(cartIcon) {
    this.cartIcon = cartIcon; // иконка корзины
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

    if (amount > 0) {
      finded.count++;
    } else {
      finded.count--;
    }

    if (!finded.count) { this.cartItems.splice(finded); }

    this.onProductUpdate(this.cartIcon);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

