export default class {
  static render(base, { photo, onZoom }) {
    const container = document.createElement('div');

    container.classList.add('grid-masonry-item');
    container.insertAdjacentHTML('beforeend', `
      <img width="${photo.width}" height="${photo.height}" 
        src="${photo.urls.thumb}" 
        alt="${photo.alt_description}"
      >
      <span class="like ${localStorage.getItem(`photo:${photo.id}:liked`) ? 'liked' : ''}"></span>
      <span class="zoom"></span>
    `);

    container.addEventListener('click', ({ target }) => {
      if (target.matches('.like')) {
        localStorage.getItem(`photo:${photo.id}:liked`)
          ? localStorage.removeItem(`photo:${photo.id}:liked`)
          : localStorage.setItem(`photo:${photo.id}:liked`, 1);
  
        target.classList.toggle('liked');
      } else if (target.matches('.zoom')) {
        onZoom(photo);
      }
    });

    base.appendChild(container);
  }
};
