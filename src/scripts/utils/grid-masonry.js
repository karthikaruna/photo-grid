const breakpointsAndCols = {
  'min-width: 1500px': 6,
  'min-width: 1200px': 5,
  'min-width: 992px': 4,
  'min-width: 768px': 3,
  'min-width: 576px': 2
};

let _target,
  _resizeId;

function setup(target) {
  setColsClass(target);
  addBreakElements(target);
};

function setColsClass(target) {
  if (target.classList.contains(`grid-masonry-cols-${getCurrentCols()}`)) {
    return;
  }

  target.className = target.className.replace(/(grid-masonry-cols-\d+)/, '');
  target.classList.add(`grid-masonry-cols-${getCurrentCols()}`);
};

function getCurrentCols() {
  const keys = Object.keys(breakpointsAndCols);

  for (const key of keys) {
    /* For some reason, matchMedia doesn't work as expected when you use responsive mode
    Works perfectly when you resize the browser window directly */
    if (window.matchMedia(`(${key})`).matches) {
      return breakpointsAndCols[key];
    }
  }

  return 1;
};

function addBreakElements(target) {
  const breakElements = target.querySelectorAll('.grid-masonry-break');

  if ([...breakElements].length === (getCurrentCols() - 1)) {
    return;
  }

  for (let i = 1; i < getCurrentCols(); i++) {
    const breakElement = document.createElement('div');

    breakElement.classList.add('grid-masonry-break');
    breakElement.classList.add(`grid-masonry-break-${i}`);
    target.appendChild(breakElement);
  }
};

function setHeight(target) {
  if (getCurrentCols() < 2) {
    target.style.removeProperty('height');

    return;
  }

  const heights = [];

  [...target.children].forEach(item => {
    if (item.classList.contains('grid-masonry-break')) {
      return;
    }

    const computedStyles = window.getComputedStyle(item),
      order = computedStyles.getPropertyValue('order'),
      height = computedStyles.getPropertyValue('height');

    if (!heights[order - 1]) {
      heights[order - 1] = 0;
    }

    heights[order - 1] += Math.ceil(parseFloat(height));
  });

  // Height of the tallest column
  target.style.height = `${Math.max(...heights)}px`;
};

function addEventListeners() {
  window.addEventListener('load', onLoad);
  window.addEventListener('resize', onResize);
};

function onLoad() {
  setHeight(_target);
};

function onResize() {
  if (_resizeId) {
    window.cancelAnimationFrame(_resizeId);
  }

  _resizeId = window.requestAnimationFrame(refresh);
};

function refresh() {
  setColsClass(_target);
  removeBreakElements(_target);
  addBreakElements(_target);
  setHeight(_target);
};

function removeBreakElements(target) {
  const breakElements = target.querySelectorAll('.grid-masonry-break');

  if ([...breakElements].length === (getCurrentCols() - 1)) {
    return;
  }

  [...breakElements].forEach(breakElement => {
    breakElement.remove();
  });
};

function destroy() {
  removeEventListeners();
};

function removeEventListeners() {
  window.removeEventListener('load', onLoad);
  window.removeEventListener('resize', onResize);
};

export default class GridMasonry {
  static init(target) {
    _target = target;
    setup(target);
    setHeight(target);
    addEventListeners();

    this.refresh = refresh;
    this.destroy = destroy;
  }
};
