(function () {
  function shouldBypass(url) {
    try {
      const target = new URL(url, window.location.origin);
      if (target.origin !== window.location.origin) return false; 
      if (target.hash && !target.pathname.endsWith('.html') && target.search === '') return false; 
      return true;
    } catch (e) {
      return false;
    }
  }

  function withTimestamp(url) {
    const u = new URL(url, window.location.origin);
    u.searchParams.set('v', Date.now().toString());
    return u.pathname + u.search + u.hash;
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

    if (shouldBypass(href)) {
      e.preventDefault();
      window.location.href = withTimestamp(href);
    }
  }, true);
})();
