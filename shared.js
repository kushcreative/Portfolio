/**
 * Kushal Portfolio — Shared JS
 * Lazy loading · Video deferral · Case study modals
 */
(function () {
  'use strict';

  /* ── LAZY LOAD: images & videos ── */
  function initLazyLoad() {
    const lazyEls = document.querySelectorAll('img.lazy, video.lazy, [data-lazy-src]');

    if (!lazyEls.length) return;

    const loadEl = (el) => {
      if (el.dataset.lazySrc) {
        if (el.tagName === 'VIDEO') {
          el.src = el.dataset.lazySrc;
          if (el.dataset.lazyPoster) el.poster = el.dataset.lazyPoster;
        } else if (el.tagName === 'IMG') {
          el.src = el.dataset.lazySrc;
        }
        delete el.dataset.lazySrc;
      }
      el.classList.add('loaded');
      el.classList.remove('lazy-shimmer');
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadEl(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '200px 0px', threshold: 0.01 }
      );
      lazyEls.forEach((el) => obs.observe(el));
    } else {
      lazyEls.forEach(loadEl);
    }
  }

  /* ── LAZY VIDEOS: load & play on click ── */
  function initVideoPlayers() {
    document.querySelectorAll('.video-wrap').forEach((wrap) => {
      const video = wrap.querySelector('video');
      const poster = wrap.querySelector('.video-poster');
      if (!video) return;

      wrap.addEventListener('click', () => {
        if (!video.src && video.dataset.lazySrc) {
          video.src = video.dataset.lazySrc;
          if (video.dataset.lazyPoster) video.poster = video.dataset.lazyPoster;
        }
        if (poster) poster.style.display = 'none';
        video.classList.add('loaded');
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    });
  }

  /* ── CASE STUDY MODALS ── */
  const caseStudies = {
    nexora: {
      title: 'NEXORA',
      subtitle: 'Brand identity — from wireframe to final 3D render.',
      steps: [
        {
          num: '01',
          title: 'Wireframe & Concept',
          desc: 'Initial layout exploration, grid systems and typographic hierarchy mapped in low-fidelity wireframes.',
          label: 'Wireframe',
          color: '#1a3318',
        },
        {
          num: '02',
          title: '3D Model & Blocking',
          desc: 'Crystalline geometry built in Blender — material tests, lighting rigs and camera blocking for hero assets.',
          label: '3D Model',
          color: '#2a5628',
        },
        {
          num: '03',
          title: 'Final Render',
          desc: 'Polished renders with gradient lighting, colour grading and export for digital deliverables.',
          label: 'Final Render',
          color: '#3a7336',
        },
      ],
      projectUrl: 'project-nexora.html',
    },
    chronex: {
      title: 'CHRONEX',
      subtitle: 'Luxury watch product render — full production pipeline.',
      steps: [
        {
          num: '01',
          title: 'Reference & Wireframe',
          desc: 'Dial proportions, bezel geometry and material references gathered. Block-out wireframe for accurate scale.',
          label: 'Wireframe',
          color: '#141d33',
        },
        {
          num: '02',
          title: '3D Model & Materials',
          desc: 'High-poly modelling with PBR materials — brushed steel, sapphire crystal and leather strap texturing.',
          label: '3D Model',
          color: '#1e2d4a',
        },
        {
          num: '03',
          title: 'Final Render',
          desc: 'Cinematic lighting setup, depth of field and post-processing for photorealistic product imagery.',
          label: 'Final Render',
          color: '#284a70',
        },
      ],
      projectUrl: 'project-chronex.html',
    },
  };

  function buildModalHTML() {
    if (document.getElementById('caseModal')) return;

    const modal = document.createElement('div');
    modal.id = 'caseModal';
    modal.className = 'case-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="case-overlay" id="caseOverlay"></div>
      <div class="case-panel">
        <button class="case-close" id="caseCloseBtn" aria-label="Close modal">✕</button>
        <p class="case-label">Behind the Scenes</p>
        <h2 class="case-title" id="caseModalTitle"></h2>
        <p class="case-subtitle" id="caseModalSubtitle"></p>
        <div class="process-timeline" id="caseTimeline"></div>
        <div class="case-actions">
          <a class="case-link case-link--primary" id="caseViewProject" href="#">View Full Project ↗</a>
          <button class="case-link" id="caseCloseBottom" type="button">Close</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function renderTimeline(steps) {
    return steps
      .map(
        (s) => `
      <div class="process-step-item">
        <div class="ps-marker">${s.num}</div>
        <div class="ps-content">
          <div class="ps-step-title">${s.title}</div>
          <div class="ps-step-desc">${s.desc}</div>
          <div class="ps-step-img">
            <div class="step-placeholder lazy-shimmer" style="background:linear-gradient(135deg,${s.color},${s.color}88)">
              ${s.label} — Replace with high-res asset
            </div>
          </div>
        </div>
      </div>`
      )
      .join('');
  }

  let lastTrigger = null;

  function openCaseModal(key, trigger) {
    const data = caseStudies[key];
    if (!data) return;

    lastTrigger = trigger || null;
    const modal = document.getElementById('caseModal');
    document.getElementById('caseModalTitle').textContent = data.title;
    document.getElementById('caseModalSubtitle').textContent = data.subtitle;
    document.getElementById('caseTimeline').innerHTML = renderTimeline(data.steps);
    document.getElementById('caseViewProject').href = data.projectUrl;

    modal.classList.add('case-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('caseCloseBtn').focus();
  }

  function closeCaseModal() {
    const modal = document.getElementById('caseModal');
    if (!modal) return;
    modal.classList.remove('case-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  }

  function initCaseModals() {
    buildModalHTML();

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-case]');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        openCaseModal(trigger.dataset.case, trigger);
      }
    });

    document.getElementById('caseOverlay').addEventListener('click', closeCaseModal);
    document.getElementById('caseCloseBtn').addEventListener('click', closeCaseModal);
    document.getElementById('caseCloseBottom').addEventListener('click', closeCaseModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCaseModal();
    });
  }

  /* ── REVEAL (shared) ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('vis');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
  }

  /* ── HAMBURGER / MOBILE NAV (shared — single source of truth for all pages) ── */
  function initHamburgerNav() {
    const btn = document.getElementById('navHamburger');
    const menu = document.getElementById('navMobileMenu');
    const closeBtn = document.getElementById('navMobileClose');
    if (!btn || !menu) return;

    function openMenu() {
      menu.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      btn.focus();
    }

    function toggleMenu() {
      if (menu.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    menu.addEventListener('click', (e) => {
      if (e.target === menu) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', () => {
    initLazyLoad();
    initVideoPlayers();
    initCaseModals();
    initReveal();
    initHamburgerNav();
  });
})();
