import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
// import data from '../DATA.json';
import App from './views/app';
import swRegister from './utils/sw-register';

const headerElement = document.getElementById('header');

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#header'),
  content: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

// Sticky Navbar
window.addEventListener('scroll', () => {
  headerElement.classList.toggle('sticky', window.scrollY > 0);
});
