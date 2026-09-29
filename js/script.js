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

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 500);
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
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

  const applicationForm = document.querySelector('#website-application');
  if (applicationForm) {
    const steps = [...applicationForm.querySelectorAll('[data-form-step]')];
    const stepLabel = applicationForm.querySelector('[data-step-label]');
    const stepName = applicationForm.querySelector('[data-step-name]');
    const progress = applicationForm.querySelector('[data-progress]');
    const progressFill = progress?.querySelector('span');
    let currentStep = 0;

    const showStep = (index) => {
      currentStep = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, stepIndex) => {
        const active = stepIndex === currentStep;
        step.hidden = !active;
        step.classList.toggle('is-active', active);
      });
      if (stepLabel) stepLabel.textContent = `Step ${currentStep + 1} of ${steps.length}`;
      if (stepName) stepName.textContent = steps[currentStep].dataset.stepTitle;
      if (progress) progress.setAttribute('aria-valuenow', String(currentStep + 1));
      if (progressFill) progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
      applicationForm.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    };

    const validateStep = (step) => {
      let valid = true;
      step.querySelectorAll('input, textarea, select').forEach((field) => {
        const fieldValid = field.checkValidity();
        field.closest('.field')?.classList.toggle('is-invalid', !fieldValid);
        if (!fieldValid && valid) {
          field.reportValidity();
          valid = false;
        }
      });
      step.querySelectorAll('[data-required-choice]').forEach((group) => {
        const groupValid = Boolean(group.querySelector('input:checked'));
        group.classList.toggle('is-invalid', !groupValid);
        if (!groupValid) valid = false;
      });
      return valid;
    };

    applicationForm.querySelectorAll('[data-next]').forEach((button) => {
      button.addEventListener('click', () => {
        if (validateStep(steps[currentStep])) showStep(currentStep + 1);
      });
    });
    applicationForm.querySelectorAll('[data-back]').forEach((button) => {
      button.addEventListener('click', () => showStep(currentStep - 1));
    });
    applicationForm.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('input', () => field.closest('.field')?.classList.remove('is-invalid'));
      field.addEventListener('change', () => field.closest('[data-required-choice]')?.classList.remove('is-invalid'));
    });

    applicationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!validateStep(steps[currentStep])) return;
      steps[currentStep].hidden = true;
      const sending = applicationForm.querySelector('[data-form-sending]');
      const complete = applicationForm.querySelector('[data-form-complete]');
      const errorBox = applicationForm.querySelector('[data-form-error]');
      const errorMessage = applicationForm.querySelector('[data-form-error-message]');
      if (errorBox) errorBox.hidden = true;
      if (sending) sending.hidden = false;

      applicationForm.querySelectorAll('input[type="tel"]').forEach((field) => {
        let phone = field.value.trim().replace(/[\s().-]/g, '');
        if (phone.startsWith('00')) phone = `+${phone.slice(2)}`;
        if (phone.startsWith('0')) phone = `+44${phone.slice(1)}`;
        if (/^44\d+$/.test(phone)) phone = `+${phone}`;
        field.value = phone;
      });

      try {
        if (typeof window.Forminit !== 'function') throw new Error('The secure form service did not load. Please check your connection and try again.');
        const forminit = new window.Forminit();
        const { error } = await forminit.submit('1ley20bm1gd', new FormData(applicationForm));
        if (error) throw new Error(error.message || 'Please check your details and try again.');
        if (sending) sending.hidden = true;
        if (complete) {
          complete.hidden = false;
          complete.focus();
        }
        applicationForm.reset();
      } catch (error) {
        if (sending) sending.hidden = true;
        steps[currentStep].hidden = false;
        if (errorMessage) errorMessage.textContent = error.message || 'Please try again. If the problem continues, email rebecca@elevatedbusiness.co.uk.';
        if (errorBox) {
          errorBox.hidden = false;
          errorBox.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
        }
      }
    });
  }

  const exitPrompt = document.querySelector('[data-exit-prompt]');
  if (exitPrompt && window.matchMedia('(pointer: fine)').matches) {
    let promptAvailable = false;
    let promptShown = false;
    try { promptShown = sessionStorage.getItem('elevated-exit-prompt') === 'shown'; } catch (error) { promptShown = false; }
    window.setTimeout(() => { promptAvailable = true; }, 12000);

    const closeExitPrompt = () => {
      if (exitPrompt.open) exitPrompt.close();
      document.body.classList.remove('modal-open');
    };
    const showExitPrompt = (event) => {
      if (!promptAvailable || promptShown || event.clientY > 5 || event.relatedTarget || document.querySelector('dialog[open]')) return;
      promptShown = true;
      try { sessionStorage.setItem('elevated-exit-prompt', 'shown'); } catch (error) { /* Session storage may be unavailable. */ }
      exitPrompt.showModal();
      document.body.classList.add('modal-open');
      document.removeEventListener('mouseout', showExitPrompt);
    };
    document.addEventListener('mouseout', showExitPrompt);
    exitPrompt.querySelectorAll('[data-exit-close]').forEach((button) => button.addEventListener('click', closeExitPrompt));
    exitPrompt.addEventListener('click', (event) => {
      const bounds = exitPrompt.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) closeExitPrompt();
    });
    exitPrompt.addEventListener('close', () => document.body.classList.remove('modal-open'));
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseElevatedSite, { once: true });
} else {
  initialiseElevatedSite();
}
