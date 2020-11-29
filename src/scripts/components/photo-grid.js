import GridMasonry from '../utils/grid-masonry';
import NetworkStuff from '../services/network-stuff';
import Photo from './photo';
import setupInfiniteScroll from '../utils/infinite-scroll';

function onZoom(photo) { }

let _searchTerm,
  _infiniteScroller;

export default class PhotoGrid {
  static async render(base, searchTerm) {
    let photos,
      totalPages;

    _searchTerm = searchTerm;

    if (_searchTerm) {
      const response = await NetworkStuff.searchPhotos(_searchTerm, 1);

      photos = response.results;
      totalPages = response.total_pages;
    } else {
      photos = await NetworkStuff.getPhotos(1);
    }

    const container = document.createElement('div');

    container.classList.add('grid-masonry');

    photos.forEach(photo => Photo.render(container, { photo, onZoom }));

    base.querySelector('.grid-masonry')?.remove();
    base.appendChild(container);

    GridMasonry.init(container);

    _infiniteScroller?.disconnect();
    _infiniteScroller = setupInfiniteScroll(base, 1, totalPages, PhotoGrid.loadMore);
  }

  static async loadMore(page) {
    const photoFragment = document.createDocumentFragment();
    let photos;

    if (_searchTerm) {
      const response = await NetworkStuff.searchPhotos(_searchTerm, page);

      photos = response.results;
    } else {
      photos = await NetworkStuff.getPhotos(page);
    }

    photos.forEach(photo => Photo.render(photoFragment, { photo, onZoom }));
    GridMasonry.appendNewItems(photoFragment);
  }
};
