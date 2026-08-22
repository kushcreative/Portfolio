(() => {
  'use strict';

  const path = location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/') {
    location.replace(Math.random() < 0.5 ? '/studio' : '/tva');
    return;
  }

  const match = path.match(/^\/(studio|tva)(\/.*)?$/i);
  if (!match) return;

  const currentSite = match[1].toLowerCase();
  const targetSite = currentSite === 'studio' ? 'tva' : 'studio';
  let suffix = match[2] || '';

  suffix = suffix
    .replace(/\/index(?:\.html)?$/i, '')
    .replace(/\.html$/i, '')
    .replace(/\/+$/, '');

  const sharedRoutes = new Set([
    '',
    '/work',
    '/creative-os',
    '/lab',
    '/about',
    '/contact',
    '/project-nexora',
    '/project-chronex',
    '/project-echoes',
    '/project-poster'
  ]);

  const targetPath = `/${targetSite}${sharedRoutes.has(suffix) ? suffix : ''}`;
  const navigation = performance.getEntriesByType('navigation')[0];
  const isReload = navigation
    ? navigation.type === 'reload'
    : performance.navigation && performance.navigation.type === 1;

  if (isReload) {
    location.replace(`${targetPath}${location.search}${location.hash}`);
    return;
  }

  const updateSwitchLink = () => {
    const selector = currentSite === 'studio' ? '.nav-logo, .lab-back' : '.brand';
    const label = targetSite === 'studio' ? 'Open Studio' : 'Open TVA';

    document.querySelectorAll(selector).forEach(link => {
      link.setAttribute('href', targetPath);
      link.setAttribute('aria-label', label);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateSwitchLink, { once: true });
  } else {
    updateSwitchLink();
  }
})();
