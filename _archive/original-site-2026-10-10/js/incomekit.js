const countdowns = document.querySelectorAll('[data-countdown]');

countdowns.forEach((countdown) => {
  const deadline = new Date(countdown.dataset.deadline).getTime();
  const days = countdown.querySelector('[data-days]');
  const hours = countdown.querySelector('[data-hours]');
  const minutes = countdown.querySelector('[data-minutes]');
  const seconds = countdown.querySelector('[data-seconds]');

  const updateCountdown = () => {
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      countdown.innerHTML = '<strong class="countdown-ended">The launch offer has ended</strong>';
      return false;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
    hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
    minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    seconds.textContent = String(totalSeconds % 60).padStart(2, '0');
    return true;
  };

  if (updateCountdown()) {
    const timer = window.setInterval(() => {
      if (!updateCountdown()) window.clearInterval(timer);
    }, 1000);
  }
});

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}
