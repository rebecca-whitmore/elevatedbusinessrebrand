class ElevatedSiteHeader extends HTMLElement {
  connectedCallback() {
    const currentPage = this.getAttribute('page') || '';
    const focusMode = this.getAttribute('mode') === 'focus';
    const current = (page) => currentPage === page ? ' aria-current="page"' : '';
    const showHomeLink = currentPage !== 'home' && currentPage !== 'apply';

    this.innerHTML = `
      <header class="site-header${focusMode ? ' site-header-focus' : ''}" data-header>
        <a class="brand" href="/" aria-label="Elevated Business home">
          <span class="brand-mark" aria-hidden="true">EB</span>
          <span>Elevated<br>Business</span>
        </a>
        ${focusMode ? `
          <a class="focus-help" href="mailto:rebecca@elevatedbusiness.co.uk">Need help?</a>
        ` : `
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-toggle>
            <span></span><span></span><span></span><span class="sr-only">Open menu</span>
          </button>
          <nav class="site-nav" id="site-nav" aria-label="Main navigation" data-menu>
            ${showHomeLink ? '<a href="/">Home</a>' : ''}
            <a href="/meet-rebecca"${current('meet')}>Meet Rebecca</a>
            <a href="/how-it-works"${current('how')}>How it works</a>
            <a href="/#work">Inspiration</a>
            <a href="/#faq">FAQs</a>
            <a class="nav-cta" href="/apply"${current('apply')}>Apply for your free website <span aria-hidden="true">↗</span></a>
          </nav>
        `}
      </header>`;
  }
}

class ElevatedSiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <a class="brand" href="/" aria-label="Elevated Business home">
          <span class="brand-mark" aria-hidden="true">EB</span>
          <span>Elevated Business</span>
        </a>
        <p>Beautiful websites.<br>No design fee.</p>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="/meet-rebecca">Meet Rebecca</a>
          <a href="/how-it-works">How it works</a>
          <a href="/#faq">FAQs</a>
          <a href="/apply">Apply</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/cookie-policy">Cookies</a>
          <a href="/terms-and-conditions">Terms</a>
        </nav>
        <div class="footer-contact">
          <a href="mailto:rebecca@elevatedbusiness.co.uk">rebecca@elevatedbusiness.co.uk</a>
          <p>© <span data-current-year>${new Date().getFullYear()}</span> Elevated Business</p>
        </div>
      </footer>`;
  }
}

if (!customElements.get('eb-site-header')) {
  customElements.define('eb-site-header', ElevatedSiteHeader);
}

if (!customElements.get('eb-site-footer')) {
  customElements.define('eb-site-footer', ElevatedSiteFooter);
}
