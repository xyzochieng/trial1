/* components.js — injects header + footer and wires up behaviour.
   NOTE: fetch() needs a web server (live server, hosting) — it will not work from file:// */
(function () {
  const load = async (url) => { const r = await fetch(url); if (!r.ok) throw new Error(url); return r.text(); };

  function initHeader() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const header = document.getElementById('site-header');
    if (!toggle) return;
    const dd = document.querySelector('.has-dropdown');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      if (!open) dd.classList.remove('mobile-open');
    });
    dd.querySelector('.nav-link--dropdown').addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth <= 900) dd.classList.toggle('mobile-open');
    });
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40));
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link,.dropdown a').forEach(a => {
      if (a.getAttribute('href') === page) { a.classList.add('active'); }
    });
  }

  async function init() {
    const h = document.getElementById('header-placeholder');
    const f = document.getElementById('footer-placeholder');
    try {
      if (h) { h.innerHTML = await load('header.html'); initHeader(); }
      if (f) { f.innerHTML = await load('footer.html'); document.getElementById('footer-year').textContent = new Date().getFullYear(); }
    } catch (e) { console.error('Component load failed. Run the site from a web server.', e); }
  }
  document.addEventListener('DOMContentLoaded', init);
})();
