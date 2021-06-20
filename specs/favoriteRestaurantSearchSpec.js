/* eslint-disable max-len */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';
/* eslint-disable no-undef */

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    // not empty - tes 1
    it('should be able to capture the query typed by user', () => {
      searchRestaurants('restoran a');

      expect(presenter.latestQuery).toEqual('restoran a');
    });

    // not empty - tes 2
    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('restoran a');

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('restoran a');
    });

    // not empty - tes 3
    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant-item').length)
        .toEqual(1);

      presenter._showFoundRestaurants([{
        id: 1,
        name: 'restoran satu',
      }, {
        id: 2,
        name: 'restoran dua',
      }]);
      expect(document.querySelectorAll('.restaurant-item').length)
        .toEqual(2);
    });

    // not empty - tes 4
    it('should show the name of the found restaurants', () => {
      presenter._showFoundRestaurants([{
        id: 1,
        name: 'restoran satu',
      }]);
      expect(document.querySelectorAll('.restaurant__name')
        .item(0).textContent)
        .toEqual('restoran satu');
    });

    // not empty - tes 5
    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantNames = document.querySelectorAll('.restaurant__name');
        expect(restaurantNames.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restoran satu').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('restoran satu');
    });
  });

  describe('When query is empty', () => {
    // empty - tes 1
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    // empty - tes 2
    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('when no favorite restaurants could be found', () => {
    // no restaurant - tes 1
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length)
          .toEqual(1);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restoran satu').and.returnValues([]);

      searchRestaurants('restoran satu');
    });

    // no restaurant - tes 2
    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restoran satu').and.returnValues([]);

      searchRestaurants('restoran satu');
    });
  });
});
