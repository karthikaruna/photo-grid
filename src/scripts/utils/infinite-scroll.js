export default function (base, currentPage, totalPages, loadMore) {
  const sentinel = document.createElement('div'),
    options = {
      rootMargin: '0px',
      threshold: 1
    };

  let loading,
    thresholdReached;

  function toggleLoading() {
    loading = !loading;
    sentinel.classList.toggle('loading');

    if (currentPage === totalPages) {
      thresholdReached = true;
      sentinel.classList.add('ended');
    }
  }

  sentinel.setAttribute('id', 'sentinel');
  base.appendChild(sentinel);

  const intersectionObserver = new IntersectionObserver(async entries => {
    if (!thresholdReached && !loading && entries[0].isIntersecting) {
      toggleLoading();
      await loadMore(++currentPage);
      toggleLoading();
    }
  }, options),
    { disconnect } = intersectionObserver;

  intersectionObserver.disconnect = function () {
    sentinel.remove();
    disconnect.apply(intersectionObserver, arguments);
  };
  
  intersectionObserver.observe(sentinel);

  return intersectionObserver;
}
