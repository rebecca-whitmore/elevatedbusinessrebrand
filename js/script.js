(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-site-header]');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'The signup connection is being prepared. Your details have not been sent yet.';
      }
    });
  });

})();
