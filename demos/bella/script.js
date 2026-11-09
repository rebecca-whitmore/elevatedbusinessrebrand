(() => {
  const nav = document.querySelector('#navigation');
  const toggle = document.querySelector('.menu-toggle');
  const dialog = document.querySelector('.dialog');
  const message = dialog.querySelector('[data-dialog-message]');
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('[data-demo-action]').forEach((control) => control.addEventListener('click', (event) => { if (control.tagName === 'A') event.preventDefault(); message.textContent = control.dataset.demoAction === 'enquiry' ? 'In a completed client website, this would open an enquiry route for this design.' : 'In a completed client website, this would lead to the appropriate agreed client route.'; dialog.showModal(); }));
  dialog.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => dialog.close()));
})();
