(() => {
  const landing = document.getElementById('portalLanding');
  const green = document.getElementById('enterGreen');
  if (!landing || !green) return;

  const randomBit = globalThis.crypto?.getRandomValues
    ? globalThis.crypto.getRandomValues(new Uint32Array(1))[0] & 1
    : Math.random() < .5;

  landing.classList.toggle('is-reversed', Boolean(randomBit));
  document.documentElement.classList.add('portal-active', 'portal-ready');

  green.addEventListener('click', (event) => {
    event.preventDefault();
    landing.classList.add('is-exiting');
    document.documentElement.classList.remove('portal-active');
    window.setTimeout(() => {
      landing.remove();
      document.documentElement.classList.remove('portal-ready');
    }, 460);
  });
})();
