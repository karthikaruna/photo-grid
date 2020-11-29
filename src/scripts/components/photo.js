export default class {
  static render(base, { photo, onZoom }) {
    const container = document.createElement('div'),
      windowWidth = window.innerWidth;

    container.classList.add('grid-masonry-item');
    container.insertAdjacentHTML('beforeend', `
      <img width="${photo.width}" height="${photo.height}"
        srcset="${photo.urls.thumb} 200w,
          ${photo.urls.small} 400w,
          ${photo.urls.regular} 1080w
        "
        sizes="(min-width: 1500px) ${Math.ceil(windowWidth / 6)}px,
          (min-width: 1200px) ${Math.ceil(windowWidth / 5)}px,
          (min-width: 992px) ${Math.ceil(windowWidth / 4)}px,
          (min-width: 768px) ${Math.ceil(windowWidth / 3)}px,
          (min-width: 576px) ${Math.ceil(windowWidth / 2)}px
        "
        src="${photo.urls.regular}"
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
