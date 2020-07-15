import './stylesheets/custom-style.scss';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/leaflet-draw/dist/leaflet.draw.css';

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

document.querySelectorAll('.navbar-link').forEach(function(navbarLink){
  navbarLink.addEventListener('click', function(){
    navbarLink.nextElementSibling.classList.toggle('is-hidden-mobile');
  });
});