(() => {
  const emblem = '<span class="brand-emblem brand-emblem--small" aria-hidden="true"><i></i><i></i><i></i></span>';
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  const homeHref = isHomePage ? '#top' : '/';
  const subscribeHref = isHomePage ? '#join' : '/#join';

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="site-header" data-site-header>
          <div class="shell site-header__inner">
            <a class="wordmark" href="${homeHref}" aria-label="Elevated Business, go to homepage">
              ${emblem}
              <span>Elevated Business</span>
            </a>
            <a class="button button--header" href="${subscribeHref}">Subscribe</a>
          </div>
        </header>`;
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer class="site-footer">
          <div class="shell site-footer__top">
            <a class="wordmark wordmark--footer" href="${homeHref}">
              ${emblem}
              <span>Elevated Business</span>
            </a>
            <p>Practical sales and marketing advice for service businesses that want to be noticed, chosen and remembered.</p>
          </div>
          <div class="shell site-footer__bottom">
            <div>
              <a href="mailto:rebecca@elevatedbusiness.co.uk">rebecca@elevatedbusiness.co.uk</a>
              <span>© 2026 Elevated Business. All rights reserved.</span>
            </div>
            <nav aria-label="Legal">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/cookie-policy">Cookie Policy</a>
              <a href="/terms-and-conditions">Terms and Conditions</a>
            </nav>
          </div>
        </footer>`;
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
})();
