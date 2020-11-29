import debounce from '../utils/debounce';

export default class {
  static render(base, onSearch) {
    const input = document.createElement('input');

    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', 'Search...');
    input.addEventListener('input', debounce(function () {
      onSearch(this.value);
    }, 750));

    base.appendChild(input);
  }
};
