import Carousel from './6-module/3-task/index.js';
import slides from './6-module/3-task/slides.js';

import RibbonMenu from './7-module/1-task/index.js';
import categories from './7-module/1-task/categories.js';

import StepSlider from './7-module/4-task/index.js';
import ProductsGrid from './8-module/2-task/index.js';

import CartIcon from './8-module/1-task/index.js';
import Cart from './8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {

    const dataSelector = (str = '') => document.querySelector(`[${str}]`);

    const carousel = new Carousel(slides);
    dataSelector('data-carousel-holder').append(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    dataSelector('data-ribbon-holder').append(ribbonMenu.elem);

    const stepSlider = new StepSlider({ steps: 3 });
    dataSelector('data-slider-holder').append(stepSlider.elem);

    const cartIcon = new CartIcon();
    dataSelector('data-cart-icon-holder').append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    const getProduct = async () => {
      try {
        const response = await fetch('./products.json', {
          method: 'GET',
        });

        const products = await response.json();
        return products;

      } catch (error) {
        console.log(error);
      }
    };

    const products = await getProduct();

    const productsGrid = new ProductsGrid(await getProduct());
    dataSelector('data-products-grid-holder').innerHTML = '';
    dataSelector('data-products-grid-holder').append(productsGrid.elem);

    // eslint-disable-next-line no-unused-expressions
    this.productsGrid?.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {
      const selected = products.find(item => item.id === event.detail);
      cart.addProduct(selected);
    });

    document.body.addEventListener('slider-change', (event) => productsGrid.updateFilter({ maxSpiciness: event.detail }));

    document.body.addEventListener('ribbon-select', (event) => productsGrid.updateFilter({ category: event.detail }));

    const noNuts = document.getElementById('nuts-checkbox');
    const vegeterianOnly = document.getElementById('vegeterian-checkbox');

    noNuts.addEventListener('change', (event) => productsGrid.updateFilter({ noNuts: true }));

    vegeterianOnly.addEventListener('change', (event) => productsGrid.updateFilter({ vegeterianOnly: true }));

  }
}

