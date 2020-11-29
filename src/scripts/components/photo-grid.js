import GridMasonry from '../utils/grid-masonry';
import NetworkStuff from '../services/network-stuff';
import Photo from './photo';
import PhotoFullview from './photo-fullview';
import setupInfiniteScroll from '../utils/infinite-scroll';

function onZoom(photo) {
  PhotoFullview.open(photo);
}

let _searchTerm,
  _infiniteScroller;

export default class PhotoGrid {
  static async render(base, searchTerm) {
    let photos,
      totalPages;

    // reset
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    base.querySelector('.grid-masonry') && base.querySelector('.grid-masonry').remove();
    _infiniteScroller && _infiniteScroller.disconnect();

    _searchTerm = searchTerm;

    if (_searchTerm) {
      const response = await NetworkStuff.searchPhotos(_searchTerm, 1);

      photos = response.results;
      if (!photos.length) {
        alert('No results found!');
        return;
      }

      totalPages = response.total_pages;
    } else {
      photos = await NetworkStuff.getPhotos(1);
    }

    const container = document.createElement('div');

    container.classList.add('grid-masonry');
    photos.forEach(photo => Photo.render(container, { photo, onZoom }));
    base.appendChild(container);
    GridMasonry.init(container);

    _infiniteScroller = setupInfiniteScroll(base, 1, totalPages, PhotoGrid.loadMore);
  }

  static async loadMore(page) {
    const photoFragment = document.createDocumentFragment();
    let photos;

    if (_searchTerm) {
      photos = (await NetworkStuff.searchPhotos(_searchTerm, page)).results;
    } else {
      photos = await NetworkStuff.getPhotos(page);
    }

    photos.forEach(photo => Photo.render(photoFragment, { photo, onZoom }));
    GridMasonry.appendNewItems(photoFragment);
  }
};
