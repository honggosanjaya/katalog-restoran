import Utama from '../views/pages/utama';
import Detail from '../views/pages/detail';
import Favorit from '../views/pages/favorit';

const routes = {
  '/': Utama, // default page
  '/utama': Utama,
  '/detail/:id': Detail,
  '/favorit': Favorit,
};

export default routes;
