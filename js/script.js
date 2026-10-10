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

  const popupKeys = {
    timed: 'eb_timed_signup_seen',
    exit: 'eb_exit_intent_seen'
  };
  const popupMemory = new Set();
  let activeModal = null;
  let previouslyFocused = null;
  let lastModalClosedAt = 0;

  const hasSessionFlag = (key) => {
    if (popupMemory.has(key)) return true;
    try {
      return window.sessionStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  };

  const setSessionFlag = (key) => {
    popupMemory.add(key);
    try {
      window.sessionStorage.setItem(key, '1');
    } catch {
      // The in-memory fallback still prevents repeats on the current page.
    }
  };

  const closeModal = () => {
    if (!activeModal) return;
    const modal = activeModal;
    activeModal = null;
    lastModalClosedAt = Date.now();
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    window.setTimeout(() => {
      modal.hidden = true;
    }, 220);
    if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
  };

  const showModal = (name, sessionKey) => {
    if (activeModal || hasSessionFlag(sessionKey)) return false;
    if (Date.now() - lastModalClosedAt < 15000) return false;

    const modal = document.querySelector(`[data-modal="${name}"]`);
    if (!modal) return false;

    setSessionFlag(sessionKey);
    previouslyFocused = document.activeElement;
    activeModal = modal;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    window.requestAnimationFrame(() => {
      modal.classList.add('is-open');
      const closeButton = modal.querySelector('.site-modal__close');
      if (closeButton instanceof HTMLElement) closeButton.focus();
    });
    return true;
  };

  document.querySelectorAll('[data-modal-close]').forEach((control) => {
    control.addEventListener('click', closeModal);
  });

  document.querySelectorAll('[data-modal-scroll]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('data-modal-scroll'));
      closeModal();
      window.setTimeout(() => {
        target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        const firstInput = target?.querySelector('input:not([type="hidden"])');
        if (firstInput instanceof HTMLElement) firstInput.focus({ preventScroll: true });
      }, 240);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!activeModal) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = Array.from(activeModal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
    )).filter((item) => item instanceof HTMLElement && !item.hidden);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const tryTimedPopup = () => {
    if (!document.querySelector('[data-modal="timed-signup"]')) return;
    if (hasSessionFlag(popupKeys.timed)) return;
    if (document.activeElement?.closest?.('[data-newsletter-form]')) {
      window.setTimeout(tryTimedPopup, 5000);
      return;
    }
    if (!showModal('timed-signup', popupKeys.timed)) {
      window.setTimeout(tryTimedPopup, 5000);
    }
  };

  if (document.querySelector('[data-modal="timed-signup"]')) {
    window.setTimeout(tryTimedPopup, 20000);
  }

  if (document.querySelector('[data-modal="exit-intent"]') && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const pageOpenedAt = Date.now();
    document.addEventListener('mouseout', (event) => {
      if (event.relatedTarget || event.clientY > 0 || Date.now() - pageOpenedAt < 5000) return;
      showModal('exit-intent', popupKeys.exit);
    });
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
        setSessionFlag(popupKeys.timed);
        setSessionFlag(popupKeys.exit);
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
