const initialiseElevatedLandingPage = () => {
  const burst = document.querySelector('[data-scroll-burst]');
  const year = document.querySelector('[data-current-year]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (year) year.textContent = new Date().getFullYear();
  if (!burst || reduceMotion.matches) return;

  let ticking = false;

  const updateBurst = () => {
    const scrollProgress = window.scrollY;
    burst.style.setProperty('--eb-spin', `${8 + scrollProgress * 0.14}deg`);
    burst.style.setProperty('--eb-shift', `${Math.min(scrollProgress * 0.09, 80)}px`);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateBurst);
      ticking = true;
    }
  }, { passive: true });

  updateBurst();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseElevatedLandingPage, { once: true });
} else {
  initialiseElevatedLandingPage();
}
