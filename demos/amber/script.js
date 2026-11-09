(() => {
  const navigation = document.querySelector('#site-navigation');
  const menuButton = document.querySelector('.menu-toggle');
  const dialog = document.querySelector('.demo-dialog');
  const message = dialog.querySelector('[data-dialog-message]');
  const closeButtons = dialog.querySelectorAll('button');

  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('[data-demo-action]').forEach((control) => {
    control.addEventListener('click', (event) => {
      if (control.tagName === 'A') event.preventDefault();
      const action = control.dataset.demoAction;
      message.textContent = action === 'enquiry'
        ? 'In a completed client website, this would open an enquiry route for this design.'
        : 'In a completed client website, this would lead to the agreed consultation, treatment or journal route.';
      dialog.showModal();
    });
  });

  closeButtons.forEach((button) => button.addEventListener('click', () => dialog.close()));
})();
