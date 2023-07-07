import createElement from './assets/lib/create-element.js';
import ProductCard from './6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = this.render();
  }

  render() {
    this.elem = createElement(this.template());
    this.inner = this.elem.querySelector('.products-grid__inner');

    this.products.map(item => {
      let card = new ProductCard(item);
      this.inner.append(card.elem);
    });

    return this.elem;
  }

  template() {
    return (
      `<div class="products-grid">
        <div class="products-grid__inner"></div >
      </div > `
    );
  }

  updateFilter(filters) {

    Object.assign(this.filters, filters);

    const collector = [];

    for (const item of this.products) {

      if (this.filters.noNuts && item.nuts) { continue; }

      if (this.filters.vegeterianOnly && !item.vegeterian) { continue; }

      if (this.filters.category && filters.category !== item.category) { continue; }

      if (this.filters.maxSpiciness !== item.spiciness && this.filters.maxSpiciness <= item.spiciness) { continue; }

      collector.push(item);
    }

    this.inner.innerHTML = '';

    collector.map(item => {
      const card = new ProductCard(item);
      this.inner.append(card.elem);
    });
  }
}
