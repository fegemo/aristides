import './guggenheim.js';

const guggenheim = window.guggenheim;
const paginate = window.paginate;
const baguetteBox = window.baguetteBox;

const windowWidth = document.documentElement.offsetWidth;

function expandImages() {
  const galleryEl = document.querySelector('.gallery-full .guggenheim-slider');
  const dataSource = galleryEl.innerHTML;
  let data = null;
  try {
    data = JSON.parse(dataSource);
  } catch (error) {
    // ...ignora
  }

  let galleryContent = '';

  const expandFolder = item => {
    const { folder, quantity, description } = item;
    for (let i = 0; i < quantity; i++) {
      const index = ('' + i).padStart(2, '0');
      const largeFileName = `imagens/${folder}/foto${index}.jpg`;
      const thumbFileName = `imagens/${folder}/thumb/foto${index}.jpg`;
      const template = `
        <a href="${largeFileName}" class="guggenheim-item ${folder}" title="${description}">
          <img src="${thumbFileName}" alt="${description}">
        </a>`;

      galleryContent += template;
    }
  };

  data.forEach(expandFolder);
  galleryEl.innerHTML = galleryContent;

  const shuffle = (el) => {
    for (let i = el.children.length; i >= 0; i--) {
        el.appendChild(el.children[Math.random() * i | 0]);
    }
  };

  shuffle(galleryEl);
}

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
    initializeBaguetteBox();
  }));
}

function initializeBaguetteBox() {
  console.log('initializeBaguetteBox called');


  baguetteBox.run('.gallery, .gallery-full', {
    noScrollbars: true,
    ignoreClass: 'out'
  });
}


export default function galleries() {
  expandImages();
  setTimeout(() => {
    initializeGuggenheim();
    initializeBaguetteBox();
  }, 600);
}
