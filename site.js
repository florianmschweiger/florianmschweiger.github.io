(() => {

  const panels = [...document.querySelectorAll('[data-panel]')];
  const links = [...document.querySelectorAll('[data-tab-link]')];
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.primary-nav');

  function showPanel(name, updateHistory = true) {
    const target = panels.some((panel) => panel.dataset.panel === name) ? name : 'overview';

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });

    links.forEach((link) => {
      const isActive = link.dataset.tabLink === target;
      if (link.closest('.primary-nav')) {
        link.toggleAttribute('aria-current', isActive);
      }
    });

    document.body.dataset.currentPanel = target;
    if (updateHistory) history.replaceState(null, '', `${location.pathname}${location.search}#${target}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showPanel(link.dataset.tabLink);
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    }
  });

  window.addEventListener('hashchange', () => showPanel(location.hash.slice(1), false));
  showPanel(location.hash.slice(1) || 'overview', false);
})();
