import {
  animate,
  hover,
  press,
  scroll,
  stagger,
} from 'https://cdn.jsdelivr.net/npm/motion@13.1.1/+esm';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const spring = { type: 'spring', stiffness: 360, damping: 30, mass: 0.7 };

function elements(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function markManaged(items) {
  items.forEach((item) => {
    item.dataset.motionManaged = 'true';
    if (item.classList.contains('reveal')) {
      item.style.transition = 'none';
      item.style.opacity = '1';
      item.style.transform = 'none';
      item.classList.add('vis', 'visible');
    }
  });
  return items;
}

function linkToScroll(targets, keyframes, options = {}) {
  const items = markManaged((Array.isArray(targets) ? targets : [targets]).filter(Boolean));
  if (!items.length) return;

  const {
    target = items[0],
    offset = ['start end', 'start 0.58'],
    delay,
    ease = [0.22, 1, 0.36, 1],
  } = options;

  const animation = animate(items, keyframes, {
    duration: 1,
    delay,
    ease,
  });

  animation.pause();
  scroll((progress) => {
    animation.time = progress * animation.duration;
  }, { target, offset });
}

function scrollReveal(items, options = {}) {
  const targets = items.filter(Boolean);
  if (!targets.length) return;

  const {
    target = targets[0],
    distance = 42,
    interval = 0.055,
    offset = ['start 0.96', 'start 0.58'],
    scale = 0.985,
  } = options;

  linkToScroll(
    targets,
    {
      opacity: [0, 1],
      y: [distance, 0],
      scale: [scale, 1],
    },
    {
      target,
      offset,
      delay: stagger(interval),
    }
  );
}

function initHeroScroll() {
  const studioHero = document.querySelector('.hero-left')?.closest('.hero');
  if (studioHero) {
    const eyebrow = studioHero.querySelector('.hero-eyebrow');
    const title = studioHero.querySelector('.hero-name');
    const positioning = studioHero.querySelector('.hero-positioning');
    const description = studioHero.querySelector('.hero-desc');
    const buttons = studioHero.querySelector('.hero-btns');
    const visual = studioHero.querySelector('.hero-right');

    linkToScroll(eyebrow, { opacity: [1, 0.28], y: [0, -26] }, {
      target: studioHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(title, { y: [0, -78], scale: [1, 0.9], opacity: [1, 0.62] }, {
      target: studioHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(positioning, { y: [0, -48], opacity: [1, 0.38] }, {
      target: studioHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(description, { y: [0, -34], opacity: [1, 0.24] }, {
      target: studioHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(buttons, { y: [0, -18], opacity: [1, 0.18] }, {
      target: studioHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(visual, { y: [0, 84], x: [0, 18], scale: [1, 1.055], rotateZ: [0, 1.15] }, {
      target: studioHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
  }

  const tvaHero = document.querySelector('.site-main .hero');
  if (tvaHero) {
    const copy = tvaHero.querySelector(':scope > div:first-child');
    const cardStage = tvaHero.querySelector('.id-card-stage');
    const label = copy?.querySelector('.tech-label');
    const title = copy?.querySelector('.display');
    const description = copy?.querySelector('.lead');
    const roles = copy?.querySelector('.roles');
    const button = copy?.querySelector('.btn');

    if (copy) {
      markManaged([copy]);
      copy.style.opacity = '1';
      copy.style.transform = 'none';
    }
    if (cardStage) {
      markManaged([cardStage]);
      cardStage.style.opacity = '1';
      cardStage.style.transform = 'none';
    }

    linkToScroll(label, { opacity: [1, 0.25], y: [0, -22] }, {
      target: tvaHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(title, { y: [0, -72], scale: [1, 0.91], opacity: [1, 0.58] }, {
      target: tvaHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(description, { y: [0, -38], opacity: [1, 0.3] }, {
      target: tvaHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(roles, { y: [0, -24], opacity: [1, 0.3] }, {
      target: tvaHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(button, { y: [0, -12], opacity: [1, 0.2] }, {
      target: tvaHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(cardStage, { y: [0, 74], x: [0, 16], scale: [1, 1.04], rotateZ: [0, 1.25] }, {
      target: tvaHero,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
  }
}

function initPageHeaderScroll() {
  const headers = unique(elements('.page-header, .page-hero, .contact-hero, .proj-hero, .project-hero'));

  headers.forEach((header) => {
    const title = header.querySelector('.page-title, .ch-title, .proj-title, .project-title, h1');
    const copy = header.querySelector('.page-desc, .ch-sub, .project-tagline, .proj-sub');
    const label = header.querySelector('.eyebrow, .ch-label, .proj-label, .tech-label');
    const number = header.querySelector('.file-number');
    const visual = header.querySelector('canvas, .project-visual, img');

    linkToScroll(title, { y: [0, -64], scale: [1, 0.94], opacity: [1, 0.6] }, {
      target: header,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(copy, { y: [0, -30], opacity: [1, 0.38] }, {
      target: header,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(label, { y: [0, -18], opacity: [1, 0.3] }, {
      target: header,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(number, { y: [0, 84], rotateZ: [0, 2.5] }, {
      target: header,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
    linkToScroll(visual, { y: [0, 46], scale: [1, 1.035] }, {
      target: header,
      offset: ['start start', 'end start'],
      ease: 'linear',
    });
  });
}

function initSectionScroll() {
  const sections = unique(elements('main section, .site-main section')).filter(
    (section) =>
      !section.closest('.id-card-scene') &&
      !section.matches('.hero, .page-hero, .contact-hero, .project-hero, .proj-hero, .scroll-swap-wrap')
  );

  sections.forEach((section) => {
    linkToScroll(section, { opacity: [0.72, 1], y: [30, 0], scale: [0.992, 1] }, {
      target: section,
      offset: ['start 0.98', 'start 0.58'],
    });
  });

  const titles = unique(elements('.sec-title, .section-title')).filter(
    (title) => !title.closest('.hero, .page-hero, .contact-hero, .project-hero, .proj-hero')
  );

  titles.forEach((title) => {
    linkToScroll(title, { opacity: [0.2, 1, 0.82], y: [48, 0, -18], scale: [0.965, 1, 0.99] }, {
      target: title.closest('section') || title,
      offset: ['start 0.96', 'center 0.58', 'end 0.12'],
      ease: 'linear',
    });
  });
}

function initWorkScroll() {
  const groups = [
    ['.projects-grid', ':scope > .proj-card'],
    ['.work-grid', ':scope > .work-card'],
    ['.grid.cols-2', ':scope > .record'],
  ];

  groups.forEach(([containerSelector, childSelector]) => {
    elements(containerSelector).forEach((container) => {
      const cards = elements(childSelector, container);
      cards.forEach((card, index) => {
        const angle = index % 2 === 0 ? -1.15 : 1.15;
        linkToScroll(
          card,
          {
            opacity: [0, 1, 1],
            y: [58, 0, -12],
            scale: [0.968, 1, 1],
            rotateZ: [angle, 0, -angle * 0.18],
          },
          {
            target: container,
            offset: ['start 0.96', 'center 0.54'],
            delay: index * 0.065,
          }
        );
      });
    });
  });

  const cards = unique(elements('.proj-card, .work-card, .record'));
  cards.forEach((card) => {
    const media = card.querySelector('.proj-thumb, canvas, img');
    if (!media) return;
    linkToScroll(media, { y: [-14, 16], scale: [1.025, 1.025] }, {
      target: card,
      offset: ['start end', 'end start'],
      ease: 'linear',
    });
  });

  unique(elements('.project-visual, .video-wrap, .branding-item, .gallery-item')).forEach((visual, index) => {
    linkToScroll(visual, {
      y: [-12, 18],
      scale: [1.012, 1.028],
      rotateZ: [index % 2 ? 0.35 : -0.35, 0],
    }, {
      target: visual,
      offset: ['start end', 'end start'],
      ease: 'linear',
    });
  });
}

function initContactScroll() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  const fields = elements(
    ':scope > .reveal, :scope > .form-row, :scope > .field, :scope > .btn, :scope > .tech-label',
    form
  );

  scrollReveal(fields, {
    target: form,
    distance: 44,
    interval: 0.075,
    offset: ['start 0.96', 'center 0.66'],
    scale: 0.99,
  });
}

function initRemainingScrollReveals() {
  elements('.reveal:not([data-motion-managed])').forEach((item) => {
    const horizontal = item.classList.contains('up');
    linkToScroll(
      item,
      {
        opacity: [0, 1],
        x: horizontal ? [-30, 0] : 0,
        y: horizontal ? 0 : [36, 0],
        scale: [0.988, 1],
      },
      {
        target: item,
        offset: ['start 0.96', 'start 0.66'],
      }
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
  const scene = document.querySelector('[data-tva-id-card]');
  const card = scene?.querySelector('.tva-id-card');
  if (!scene || !card) return;

  scene.style.animation = 'none';
  const state = { rx: 0, ry: 0, rz: 0 };
  let animation;
  let autoTimer;
  let autoDirection = 1;
  let dragSafetyTimer;
  let activePointerId;
  let dragging = false;
  let suppressClick = false;
  let dragDistance = 0;
  let startX = 0;
  let startY = 0;
  let startRX = 0;
  let startRY = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const render = () => {
    if (![state.rx, state.ry, state.rz].every(Number.isFinite)) {
      state.rx = 0;
      state.ry = 0;
      state.rz = 0;
    }
    card.style.transform = `rotateX(${state.rx}deg) rotateY(${state.ry}deg) rotateZ(${state.rz}deg)`;
    const back = Math.abs(Math.round(state.ry / 180)) % 2 === 1;
    scene.setAttribute('aria-pressed', String(back));
    scene.setAttribute(
      'aria-label',
      `Interactive TVA identification card showing the ${back ? 'back' : 'front'}. Drag to rotate or press Enter to flip.`
    );
  };

  const stop = () => {
    clearTimeout(autoTimer);
    animation?.stop();
    animation = undefined;
  };

  const scheduleAuto = (delay = 2200) => {
    clearTimeout(autoTimer);
    if (reducedMotion || dragging || document.hidden) return;
    autoTimer = setTimeout(() => {
      const readableFace = Math.round(state.ry / 180) * 180;
      animation = animate(state, {
        rx: autoDirection * 1.5,
        ry: readableFace + autoDirection * 8,
        rz: 0,
      }, {
        duration: 4.8,
        ease: 'easeInOut',
        onUpdate: render,
        onComplete: () => {
          autoDirection *= -1;
          scheduleAuto(0);
        },
      });
    }, delay);
  };

  const springTo = (target, resumeAuto = false) => {
    stop();
    if (reducedMotion) {
      Object.assign(state, target);
      render();
      return;
    }
    animation = animate(state, target, {
      type: 'spring',
      stiffness: 210,
      damping: 27,
      mass: 0.78,
      onUpdate: render,
      onComplete: resumeAuto ? () => scheduleAuto() : undefined,
    });
  };

  const settle = (flip = false) => {
    const targetY = flip
      ? Math.round(state.ry / 180) * 180 + 180
      : Math.round(state.ry / 180) * 180;
    springTo({ rx: 0, ry: targetY, rz: 0 }, true);
  };

  const armDragSafety = () => {
    clearTimeout(dragSafetyTimer);
    dragSafetyTimer = setTimeout(() => {
      if (!dragging) return;
      dragging = false;
      dragDistance = Math.max(dragDistance, 7);
      suppressClick = true;
      scene.classList.remove('is-dragging');
      if (activePointerId !== undefined && scene.hasPointerCapture(activePointerId)) {
        scene.releasePointerCapture(activePointerId);
      }
      activePointerId = undefined;
      settle(false);
    }, 1600);
  };

  scene.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    stop();
    dragging = true;
    suppressClick = false;
    dragDistance = 0;
    startX = event.clientX;
    startY = event.clientY;
    startRX = state.rx;
    startRY = state.ry;
    activePointerId = event.pointerId;
    scene.classList.add('is-dragging');
    scene.setPointerCapture(event.pointerId);
    armDragSafety();
  });

  scene.addEventListener('pointermove', (event) => {
    if (dragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      dragDistance = Math.max(dragDistance, Math.hypot(dx, dy));
      if (dragDistance >= 7) suppressClick = true;
      springTo({
        rx: clamp(startRX - dy * 0.2, -18, 18),
        ry: startRY + dx * 0.72,
      });
      armDragSafety();
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
    if (event?.type !== 'pointerup' || dragDistance >= 7) suppressClick = true;
    clearTimeout(dragSafetyTimer);
    scene.classList.remove('is-dragging');
    const pointerId = event?.pointerId ?? activePointerId;
    if (pointerId !== undefined && scene.hasPointerCapture(pointerId)) {
      scene.releasePointerCapture(pointerId);
    }
    activePointerId = undefined;
    settle(false);
  };

  scene.addEventListener('pointerup', release);
  scene.addEventListener('pointercancel', release);
  scene.addEventListener('lostpointercapture', release);
  scene.addEventListener('click', (event) => {
    if (suppressClick) {
      suppressClick = false;
      event.preventDefault();
      return;
    }
    settle(true);
  });
  window.addEventListener('pointerup', release, true);
  window.addEventListener('pointercancel', release, true);
  window.addEventListener('blur', () => {
    if (!dragging) return;
    dragDistance = Math.max(dragDistance, 7);
    release();
  });
  scene.addEventListener('pointerleave', () => {
    if (!dragging) settle(false);
  });
  scene.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault();
      settle(true);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(dragSafetyTimer);
      dragging = false;
      activePointerId = undefined;
      scene.classList.remove('is-dragging');
      stop();
    } else {
      state.rx = 0;
      state.ry = Math.round(state.ry / 180) * 180;
      state.rz = 0;
      render();
      scheduleAuto();
    }
  });

  window.addEventListener('pagehide', stop, { once: true });
  card.style.transformOrigin = '50% 50%';
  state.rx = 0;
  state.ry = 0;
  state.rz = 0;
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

  document.documentElement.dataset.motion = 'scroll';
  initHeroScroll();
  initPageHeaderScroll();
  initSectionScroll();
  initWorkScroll();
  initContactScroll();
  initRemainingScrollReveals();
  initNavigationAndButtons();
  initTVACard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion, { once: true });
} else {
  initMotion();
}
