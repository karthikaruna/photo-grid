export default function (base, currentPage, loadMore) {
  const sentinel = document.createElement('div'),
    options = {
      rootMargin: '0px',
      threshold: 1
    };

  let loading;

  function toggleLoading() {
    loading = !loading;
    sentinel.classList.toggle('loading');
  }

  sentinel.setAttribute('id', 'sentinel');
  base.appendChild(sentinel);

  const intersectionObserver = new IntersectionObserver(async entries => {
    if (!loading && entries[0].isIntersecting) {
      toggleLoading();
      await loadMore(++currentPage);
      toggleLoading();
    }
  }, options);
  
  intersectionObserver.observe(sentinel);

  return intersectionObserver;
}
