import GridMasonry from '../utils/grid-masonry';
import NetworkStuff from '../services/network-stuff';
import Photo from './photo';
import setupInfiniteScroll from '../utils/infinite-scroll';

function onZoom(photo) { }

async function getPhotos(page) {
  try {
    return await NetworkStuff.getPhotos(page);
  } catch (exception) {
    console.error('Error getting photos.', exception);
  }
}

export default class {
  static async render(base) {
    const photos = await getPhotos(1),
      container = document.createElement('div');

    container.classList.add('grid-masonry');

    photos.forEach(photo => Photo.render(container, { photo, onZoom }));
    base.appendChild(container);

    GridMasonry.init(container);
    setupInfiniteScroll(base, 1, this.loadMore);
  }

  static async loadMore(page) {
    const photos = await getPhotos(page),
      photoFragment = document.createDocumentFragment();

    photos.forEach(photo => Photo.render(photoFragment, { photo, onZoom }));
    GridMasonry.appendNewItems(photoFragment);
  }
};
