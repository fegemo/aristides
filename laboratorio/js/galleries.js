import './guggenheim.js';

const guggenheim = window.guggenheim;
const paginate = window.paginate;
const baguetteBox = window.baguetteBox;

const windowWidth = () => document.documentElement.offsetWidth;
const fullGalleryPicturesPerRow = [
  {
    minWindowWidth: 1600,
    pictures: 6,
    pictureWidth: 150
  },
  {
    minWindowWidth: 1200,
    pictures: 5,
    pictureWidth: 150
  },
  {
    minWindowWidth: 1080,
    pictures: 4,
    pictureWidth: 150
  },
  {
    minWindowWidth: 800,
    pictures: 3,
    pictureWidth: 150
  },
  {
    minWindowWidth: 620,
    pictures: 2,
    pictureWidth: 150
  },
  {
    minWindowWidth: 450,
    pictures: 3,
    pictureWidth: 150
  },
  {
    minWindowWidth: 320,
    pictures: 2,
    pictureWidth: 150
  },
  {
    minWindowWidth: 0,
    pictures: 1,
    pictureWidth: 150
  }
];
let currentFullGalleryConfig = null;
let fullGallery = null;

function getFullGaleryConfig(screenWidth) {
  const config = fullGalleryPicturesPerRow.find(item => screenWidth >= item.minWindowWidth)
  return {
    selector: '.guggenheim-item',
    slider: '.guggenheim-slider',
    rows: 4,
    cols: config.pictures,
    width: Math.min(config.pictures * config.pictureWidth, screenWidth),
    height: 400
  };
}

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

  const firstImages = Array.from(galleryEl.querySelectorAll('.guggenheim-item')).slice(0, 20).map(el => el.firstElementChild);
  const firstImagesPromises = firstImages.map(el => new Promise((resolve, reject) => {
    el.onload = () => resolve()
    el.onerror = () => reject();
  }));
  firstImagesPromises.push(new Promise(resolve => setTimeout(() => resolve(), 600)));

  return Promise.all(firstImagesPromises);
}

function filterGuggenheim(e) {
  const filter = e.target.dataset.guggenheim;
  if (filter) {
    fullGallery.filter(filter);
  } else {
    fullGallery.reset();
  }
  initializeBaguetteBox();
}

function initializeGuggenheim() {
  const config = getFullGaleryConfig(windowWidth());
  fullGallery = guggenheim('#projects-gallery', config);
  const pagination = paginate('#gallery-full-pagination', fullGallery, {
    limitButtons: false
  });
  fullGallery.reload(true);

  const filters = document.querySelectorAll('[data-guggenheim]');
  filters.forEach(el => el.removeEventListener('click', filterGuggenheim));
  filters.forEach(el => el.addEventListener('click', filterGuggenheim));

  return config;
}

function initializeBaguetteBox() {
  baguetteBox.run('.gallery, .gallery-full', {
    noScrollbars: true,
    ignoreClass: 'out'
  });
}

function windowResized(e) {
  const newConfig = getFullGaleryConfig(window.innerWidth);
  if (newConfig !== currentFullGalleryConfig) {
    currentFullGalleryConfig = initializeGuggenheim();
  }
}

export default function galleries() {
  expandImages().
    then(() => {
      currentFullGalleryConfig = initializeGuggenheim();
      initializeBaguetteBox();

      window.addEventListener('resize', windowResized);
    });
}
