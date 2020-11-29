let _img;

export default class PhotoFullview {
  static render(base) {
    const containerFragment = document.createDocumentFragment(),
      close = document.createElement('span');

    _img = document.createElement('img');
    close.classList.add('close');
    close.innerHTML = '×';
    close.addEventListener('click', () => {
      base.classList.remove('open');
      document.body.classList.remove('photo-fullview-active');
    });

    containerFragment.appendChild(_img);
    containerFragment.appendChild(close);
    base.appendChild(containerFragment);
  }

  static open(photo) {
    _img.setAttribute('width', photo.width);
    _img.setAttribute('height', photo.height);
    _img.setAttribute('src', photo.urls.full);
    _img.setAttribute('alt', photo.alt_description);
    _img.style.backgroundColor = photo.color;
    _img.parentNode.classList.add('open');
    document.body.classList.add('photo-fullview-active');
  }
};
