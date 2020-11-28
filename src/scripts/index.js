import GridMasonry from './utils/grid-masonry';
import PhotoGrid from './components/photo-grid';

// bootstrap stuff
(async function () {
  await PhotoGrid.render(document.querySelector('.photo-grid'));
  GridMasonry.init(document.querySelector('.grid-masonry'));
})();
