/* components.js — Injects header and footer into every page */
(function () {
  async function loadHTML(url) {
    const res = await fetch(url);
    return await res.text();
  }

  async function init() {
    // Inject header
    const headerEl = document.getElementById('header-placeholder');
    if (headerEl) {
      headerEl.innerHTML = await loadHTML('header.html');
      /* Re-run any scripts inside the injected HTML */
      headerEl.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        s.textContent = old.textContent;
        document.body.appendChild(s);
      });
    }

    // Inject footer
    const footerEl = document.getElementById('footer-placeholder');
    if (footerEl) {
      footerEl.innerHTML = await loadHTML('footer.html');
      footerEl.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        s.textContent = old.textContent;
        document.body.appendChild(s);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
