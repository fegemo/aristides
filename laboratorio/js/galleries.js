import './guggenheim.js';

const guggenheim = window.guggenheim;
const paginate = window.paginate;
const baguetteBox = window.baguetteBox;

const windowWidth = document.documentElement.offsetWidth;

function initializeGuggenheim() {
  const gallery = guggenheim('#projects-gallery', {
    selector: '.guggenheim-item',
    slider: '.guggenheim-slider',
    rows: 4,
    cols: windowWidth <= 450 ? 2 : 3,
    width: Math.min(500, windowWidth),
    height: 400
  });

  const pagination = paginate('#gallery-full-pagination', gallery, {
    limitButtons: false
  });
  const filters = document.querySelectorAll('[data-guggenheim]');
  filters.forEach(el => el.addEventListener('click', e => {
    const filter = e.target.dataset.guggenheim;
    if (filter) {
      gallery.filter(filter);
    } else {
      gallery.reset();
    }
  }));
}

function initializeBaguetteBox() {
  baguetteBox.run('.gallery, .gallery-full', {
    noScrollbars: true
  });
}


export default function galleries() {
  setTimeout(() => {
    initializeGuggenheim();
    initializeBaguetteBox();
  }, 300);
}
