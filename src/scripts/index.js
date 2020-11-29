import PhotoGrid from './components/photo-grid';

// bootstrap stuff
(async function () {
  await PhotoGrid.render(document.querySelector('.photo-grid'));
})();
