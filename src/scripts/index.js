import PhotoGrid from './components/photo-grid';
import SearchBar from './components/search-bar';

// bootstrap stuff
(async function () {
  SearchBar.render(document.querySelector('.search-bar'));
  await PhotoGrid.render(document.querySelector('.photo-grid'));
})();
