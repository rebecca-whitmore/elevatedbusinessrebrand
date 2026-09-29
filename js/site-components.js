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
          <a href="/#faq">FAQs</a>
          <a href="/#process">How it works</a>
          <a href="/#apply">Apply</a>
        </nav>
        <div class="footer-contact">
          <a href="mailto:rebecca@elevatedbusiness.co.uk">rebecca@elevatedbusiness.co.uk</a>
          <p>© <span data-current-year>${new Date().getFullYear()}</span> Elevated Business</p>
        </div>
      </footer>`;
  }
}

if (!customElements.get('eb-site-footer')) {
  customElements.define('eb-site-footer', ElevatedSiteFooter);
}
