import NetworkStuff from '../services/network-stuff';
import Photo from './photo';

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
  }
};
