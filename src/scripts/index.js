import PhotoFullview from './components/photo-fullview';
import PhotoGrid from './components/photo-grid';
import SearchBar from './components/search-bar';

// bootstrap stuff
(async function () {
  SearchBar.render(
    document.querySelector('.search-bar'),
    searchTerm => PhotoGrid.render(document.querySelector('.photo-grid'), searchTerm)
  );
  await PhotoGrid.render(document.querySelector('.photo-grid'));
  PhotoFullview.render(document.querySelector('.photo-fullview'));
})();
