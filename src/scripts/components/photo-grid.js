import NetworkStuff from '../services/network-stuff';

async function getPhotos(page) {
  try {
    return await NetworkStuff.getPhotos(page);
  } catch (exception) {
    console.error('Error getting photos.', exception);
  }
}

export default class {
  static async render(base) {
    this.base = base;

    const photos = await getPhotos(1),
      container = document.createElement('div');

    container.classList.add('grid-masonry');

    photos.forEach(photo => {
      console.log(photo);
      container.insertAdjacentHTML('beforeend', `
        <div class="grid-masonry-item">
          <img width="${photo.width}" height="${photo.height}" src="${photo.urls.thumb}">
        </div>
      `);
    });
    this.base.insertAdjacentElement('beforeend', container);
  }
};
