import config from '../../../config/config';

function getFromUnsplash(endPoint) {
  return fetch(config.unsplashNamespace + '/' + endPoint, {
    method: 'GET',
    headers: {
      'Authorization': `Client-ID ${config.unsplashClientId}`
    }
  })
    .then(response => response.json());
}

export default class {
  static async getPhotos(page) {
    return getFromUnsplash(`photos?page=${page}&per_page=30`);
  }
}
