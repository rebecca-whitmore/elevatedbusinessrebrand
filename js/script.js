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
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const button = form.querySelector('button[type="submit"]');
      const originalButtonText = button?.textContent || 'Send me The Elevated Edit';

      if (button) {
        button.disabled = true;
        button.textContent = 'Joining...';
      }

      if (status) {
        status.classList.remove('is-error', 'is-success');
        status.textContent = 'Adding you to The Elevated Edit...';
      }

      try {
        const formData = new FormData(form);
        const response = await fetch('/api/newsletter-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData.entries()))
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result.message || 'Signup is temporarily unavailable. Please try again shortly.');
        }

        form.reset();
        if (status) {
          status.classList.add('is-success');
          status.textContent = 'You’re in! Keep an eye on your inbox for The Elevated Edit.';
        }
      } catch (error) {
        if (status) {
          status.classList.add('is-error');
          status.textContent = error instanceof Error
            ? error.message
            : 'Signup is temporarily unavailable. Please try again shortly.';
        }
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalButtonText;
        }
      }
    });
  });

})();
