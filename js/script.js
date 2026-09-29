const initialiseElevatedSite = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const year = document.querySelector('[data-current-year]');
  const star = document.querySelector('[data-scroll-burst]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (year) year.textContent = new Date().getFullYear();

  if (star && !reduceMotion.matches) {
    let ticking = false;
    const moveStar = () => {
      star.style.setProperty('--spin', `${8 + window.scrollY * 0.13}deg`);
      star.style.setProperty('--shift', `${Math.min(window.scrollY * 0.045, 52)}px`);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(moveStar);
        ticking = true;
      }
    }, { passive: true });
    moveStar();
  }

  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    };
    menuButton.addEventListener('click', () => {
      const opening = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', opening);
      menuButton.setAttribute('aria-expanded', String(opening));
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll('[data-modal-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(`[data-modal="${button.dataset.modalOpen}"]`);
      if (!modal) return;
      modal.showModal();
      document.body.classList.add('modal-open');
    });
  });

  document.querySelectorAll('[data-modal]').forEach((modal) => {
    const close = () => {
      modal.close();
      document.body.classList.remove('modal-open');
    };
    modal.querySelector('[data-modal-close]')?.addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      const bounds = modal.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) close();
    });
    modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseElevatedSite, { once: true });
} else {
  initialiseElevatedSite();
}
