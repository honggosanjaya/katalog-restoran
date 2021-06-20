import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId || '-'}" alt="${restaurant.name}">

    <div class="restaurant-item__content">
        <h3 class="restaurant__name"><a href="${`/#/detail/${restaurant.id || '-'}`}">${restaurant.name || '-'}</a></h3>
        <p class="restaurant__rating"><i class="bi bi-star-fill">${restaurant.rating || '-'}</i></p>
        <p class="restaurant__city">${restaurant.city || '-'}</p>
        <p class="restaurant__description">${restaurant.description || '-'}</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <img src="${CONFIG.BASE_IMAGE_URL + restaurant.restaurant.pictureId}" alt="${restaurant.restaurant.name}">
    
    <div class="restaurant-detail__info">
      <h3 class="restaurant__name">${restaurant.restaurant.name}</h3>
      <p class="restaurant__address">${`${restaurant.restaurant.address}, ${restaurant.restaurant.city}`}</P>
    </div>

    <div class="restaurant-detail__content">
      <p class="restaurant__category"><span>Category:</span> ${restaurant.restaurant.categories.map((category) => `${category.name}`).join(', ')}</P>
  
      <p class="restaurant__food"><span>Foods:</span> ${restaurant.restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}</P>

      <p class="restaurant__drink"><span>Drinks:</span> ${restaurant.restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}</P>

      <p class="restaurant__rating"><span>Rating:</span> ${restaurant.restaurant.rating}</P>

      <p class="restaurant__review"><span>Reviews:</span> ${restaurant.restaurant.customerReviews
    .map(
      (review) => `
        <ul>  
          <li class="reviewer-name">${review.name}</li>
          <li class="review-date">${review.date}</li>
          <li class="review">${review.review}</li>
        </ul>`,
    )
    .join('')}
      </P>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
