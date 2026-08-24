import {
  animate,
  hover,
  inView,
  press,
  scroll,
  stagger,
} from 'https://cdn.jsdelivr.net/npm/motion@13.1.1/+esm';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const spring = { type: 'spring', stiffness: 360, damping: 30, mass: 0.7 };
const gentleSpring = { type: 'spring', stiffness: 190, damping: 25, mass: 0.85 };

function elements(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function markManaged(items) {
  items.forEach((item) => {
    item.dataset.motionManaged = 'true';
  });
  return items;
}

function reveal(items, options = {}) {
  const targets = markManaged(items.filter(Boolean));
  if (!targets.length) return;

  const {
    trigger = targets[0],
    distance = 20,
    interval = 0.065,
    duration = 0.72,
  } = options;

  targets.forEach((target) => {
    target.style.willChange = 'transform, opacity';
  });

  inView(
    trigger,
    () => {
      const controls = animate(
        targets,
        { opacity: [0, 1], y: [distance, 0] },
        {
          duration,
          delay: stagger(interval),
          ease: [0.22, 1, 0.36, 1],
        }
      );

      controls.then(() => {
        targets.forEach((target) => {
          target.style.willChange = 'auto';
        });
      });
    },
    { amount: 0.12 }
  );
}

function initHero() {
  const studioHero = document.querySelector('.hero-left');
  if (studioHero) {
    reveal(elements(':scope > *', studioHero), {
      trigger: studioHero,
      distance: 24,
      interval: 0.085,
    });

    const visual = document.querySelector('.hero-right');
    if (visual) {
      markManaged([visual]);
      animate(
        visual,
        { opacity: [0, 1], x: [28, 0], scale: [0.97, 1] },
        { duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }
      );
    }

    const crt = document.querySelector('.crt-wrap');
    if (crt) {
      scroll(
        animate(crt, { y: [-8, 14] }, { ease: 'linear' }),
        { target: studioHero.closest('.hero'), offset: ['start start', 'end start'] }
      );
    }
  }

  const tvaHeroCopy = document.querySelector('.site-main .hero > div:first-child');
  if (tvaHeroCopy) {
    markManaged([tvaHeroCopy]);
    animate(tvaHeroCopy, { opacity: 1, y: 0 }, { duration: 0.01 });
    reveal(elements(':scope > *', tvaHeroCopy), {
      trigger: tvaHeroCopy,
      distance: 20,
      interval: 0.075,
    });

    const cardStage = document.querySelector('.id-card-stage');
    if (cardStage) {
      markManaged([cardStage]);
      animate(
        cardStage,
        { opacity: [0, 1], x: [24, 0], scale: [0.97, 1] },
        { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
      );
    }
  }
}

function initPageEntrances() {
  const path = location.pathname.replace(/\/(?:index\.html)?$/, '') || '/';
  const isWork = /\/(?:studio|tva)\/work$/.test(path);
  const isContact = /\/(?:studio|tva)\/contact$/.test(path);

  if (isWork || isContact) {
    const header = document.querySelector(isContact ? '.contact-hero, .page-hero' : '.page-header, .page-hero');
    if (header) {
      reveal(elements(':scope > *', header), {
        trigger: header,
        distance: 18,
        interval: 0.08,
      });
    }
  }
}

function initWork() {
  const groups = [
    ['.projects-grid', ':scope > .proj-card'],
    ['.work-grid', ':scope > .work-card'],
    ['.grid.cols-2', ':scope > .record'],
  ];

  groups.forEach(([containerSelector, childSelector]) => {
    elements(containerSelector).forEach((container) => {
      const cards = elements(childSelector, container);
      if (!cards.length) return;
      reveal(cards, {
        trigger: container,
        distance: 26,
        interval: 0.09,
        duration: 0.78,
      });
    });
  });

  const cards = elements('.proj-card, .work-card, .record');
  if (cards.length) {
    hover(cards, (card) => {
      animate(card, { y: -5, scale: 1.008 }, gentleSpring);
      return () => animate(card, { y: 0, scale: 1 }, gentleSpring);
    });
  }

  elements('.proj-card, .record').forEach((card) => {
    const media = card.querySelector('.proj-thumb, canvas');
    if (!media) return;
    scroll(
      animate(media, { y: [-6, 6], scale: [1.012, 1.012] }, { ease: 'linear' }),
      { target: card, offset: ['start end', 'end start'] }
    );
  });
}

function initContact() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  const fields = elements(
    ':scope > .reveal, :scope > .form-row, :scope > .field, :scope > .btn, :scope > .tech-label',
    form
  );
  reveal(fields, {
    trigger: form,
    distance: 16,
    interval: 0.07,
    duration: 0.64,
  });
}

function initRemainingReveals() {
  elements('.reveal:not([data-motion-managed])').forEach((item) => {
    const horizontal = item.classList.contains('up');
    item.dataset.motionManaged = 'true';
    item.style.willChange = 'transform, opacity';
    inView(
      item,
      () => {
        const controls = animate(
          item,
          {
            opacity: [0, 1],
            x: horizontal ? [-20, 0] : 0,
            y: horizontal ? 0 : [18, 0],
          },
          { duration: 0.68, ease: [0.22, 1, 0.36, 1] }
        );
        controls.then(() => {
          item.style.willChange = 'auto';
        });
      },
      { amount: 0.12 }
    );
  });
}

function initNavigationAndButtons() {
  const navLinks = elements('.nav-links a, .topnav a, .rail-nav a, footer nav a');
  if (navLinks.length) {
    hover(navLinks, (link) => {
      animate(link, { y: -1 }, spring);
      return () => animate(link, { y: 0 }, spring);
    });
  }

  elements('.nav-links a.active, .topnav a.active, .rail-nav a.active').forEach((active) => {
    animate(active, { opacity: [0.62, 1], y: [2, 0] }, { duration: 0.55, ease: 'easeOut' });
  });

  const controls = elements(
    '.btn, .btn-fill, .btn-outline, .nav-cta, .btn-process, .btn-view-proj, .form-submit, .filter-btn, .text-button, .text-link, .section-link'
  );

  if (controls.length) {
    hover(controls, (control) => {
      if (control.disabled) return;
      animate(control, { y: -2, scale: 1.012 }, spring);
      return () => animate(control, { y: 0, scale: 1 }, spring);
    });

    press(controls, (control) => {
      if (control.disabled) return;
      animate(control, { scale: 0.975 }, { type: 'spring', stiffness: 520, damping: 32 });
      return () => animate(control, { scale: 1 }, spring);
    });
  }
}

function initTVACard() {
  const scene = document.querySelector('[data-motion-tva-id-card], [data-tva-id-card]');
  const card = scene?.querySelector('.tva-id-card');
  if (!scene || !card) return;

  scene.setAttribute('data-tva-id-card', '');
  const state = { rx: 0, ry: 0 };
  let animation;
  let autoTimer;
  let dragging = false;
  let dragDistance = 0;
  let startX = 0;
  let startY = 0;
  let startRX = 0;
  let startRY = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const render = () => {
    card.style.transform = `rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
    const back = Math.abs(Math.round(state.ry / 180)) % 2 === 1;
    scene.setAttribute('aria-pressed', String(back));
    scene.setAttribute(
      'aria-label',
      `Interactive TVA identification card showing the ${back ? 'back' : 'front'}. Drag to rotate or press Enter to flip.`
    );
  };

  const stop = () => {
    animation?.stop();
    animation = undefined;
    clearTimeout(autoTimer);
  };

  const springTo = (target, onComplete) => {
    stop();
    if (reducedMotion) {
      Object.assign(state, target);
      render();
      onComplete?.();
      return;
    }
    animation = animate(state, target, {
      type: 'spring',
      stiffness: 210,
      damping: 27,
      mass: 0.78,
      onUpdate: render,
      onComplete,
    });
  };

  const scheduleAuto = () => {
    if (reducedMotion || dragging) return;
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      animation = animate(
        state,
        { rx: 0, ry: state.ry + 360 },
        {
          duration: 34,
          ease: 'linear',
          onUpdate: render,
          onComplete: scheduleAuto,
        }
      );
    }, 1800);
  };

  const settle = (flip = false) => {
    const targetY = flip
      ? Math.round(state.ry / 180) * 180 + 180
      : Math.round(state.ry / 180) * 180;
    springTo({ rx: 0, ry: targetY }, scheduleAuto);
  };

  scene.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    stop();
    dragging = true;
    dragDistance = 0;
    startX = event.clientX;
    startY = event.clientY;
    startRX = state.rx;
    startRY = state.ry;
    scene.classList.add('is-dragging');
    scene.setPointerCapture(event.pointerId);
  });

  scene.addEventListener('pointermove', (event) => {
    if (dragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      dragDistance = Math.max(dragDistance, Math.hypot(dx, dy));
      springTo({
        rx: clamp(startRX - dy * 0.2, -18, 18),
        ry: startRY + dx * 0.72,
      });
      if (Math.abs(dx) > Math.abs(dy)) event.preventDefault();
      return;
    }

    if (event.pointerType === 'mouse') {
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const baseY = Math.round(state.ry / 180) * 180;
      springTo({ rx: -y * 7, ry: baseY + x * 10 });
    }
  });

  const release = (event) => {
    if (!dragging) return;
    dragging = false;
    scene.classList.remove('is-dragging');
    if (scene.hasPointerCapture(event.pointerId)) scene.releasePointerCapture(event.pointerId);
    settle(dragDistance < 7);
  };

  scene.addEventListener('pointerup', release);
  scene.addEventListener('pointercancel', release);
  scene.addEventListener('pointerleave', () => {
    if (!dragging) settle(false);
  });
  scene.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault();
      settle(true);
    }
  });

  render();
  scheduleAuto();
}

function showReducedMotionContent() {
  elements('.reveal').forEach((item) => {
    item.style.opacity = '1';
    item.style.transform = 'none';
    item.classList.add('vis', 'visible');
  });
  document.documentElement.dataset.motion = 'reduced';
}

function initMotion() {
  if (reducedMotion) {
    showReducedMotionContent();
    initTVACard();
    return;
  }

  document.documentElement.dataset.motion = 'ready';
  initHero();
  initPageEntrances();
  initWork();
  initContact();
  initRemainingReveals();
  initNavigationAndButtons();
  initTVACard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion, { once: true });
} else {
  initMotion();
}
