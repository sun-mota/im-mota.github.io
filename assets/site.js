(function () {
  var root = document.documentElement;

  /* Theme toggle */
  var btn = document.querySelector('.theme');
  function current() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function sync() {
    var dark = current() === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  if (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
    sync();
  }

  /* Highlight the nav link for the section in view */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var a = byId[e.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* Load the Auro components only when the demo is near the viewport */
  var demo = document.querySelector('[data-auro-demo]');
  var status = document.querySelector('[data-auro-status]');
  if (!demo) return;
  var loaded = false;
  function addCss(href) {
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  }
  function load() {
    if (loaded) return;
    loaded = true;
    if (status) status.textContent = 'Loading components…';
    addCss('/assets/vendor/auro/tokens-classic.css');
    addCss('/assets/vendor/auro/tokens-alaska.css');
    import('/assets/vendor/auro/auro-formkit-demo.js').then(function () {
      if (status) status.textContent = 'Components loaded. Try them with a mouse, a keyboard or a screen reader.';
    }).catch(function () {
      if (status) status.textContent = 'The components could not load. You can try them on the Auro docs site instead.';
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { load(); io.disconnect(); }
    }, { rootMargin: '600px 0px' });
    io.observe(demo);
  } else {
    load();
  }
})();
