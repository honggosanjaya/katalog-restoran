import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Utama = {
  async render() {
    return `
      <section id="hero">
        <div class="hero__content">
          <h2>LuWe Apps</h2>
          <p>temukan restoran disekitar anda</p>
        </div>
      </section>

      <section id="daftar-restoran">
        <h2 class="page__title">Explore Restaurant</h2>
        <div id="list-restaurants" class="list-restaurants">
 
        </div>
      </section>
        
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurant();
    const restaurantsContainer = document.querySelector('#list-restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Utama;
