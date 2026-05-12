/* ═══════════════════════════════════════════════════
   JULEN GARCIA — PORTFOLIO JS
   GSAP + ScrollTrigger animations
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── GSAP SETUP ──────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── NAV SCROLL STATE ────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── HERO ENTRANCE ───────────────────────────────────
  // Elements already set to opacity:0 via CSS class .reveal-up
  // Use GSAP to animate them in on load
  const heroEls = document.querySelectorAll('.hero .reveal-up');
  gsap.to(heroEls, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
    delay: 0.2,
  });

  // ── HERO BG TEXT PARALLAX ───────────────────────────
  gsap.to('.hero-bg-text', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  // ── GENERIC SCROLL REVEALS ───────────────────────────
  // All .reveal-up elements outside hero
  gsap.utils.toArray('.reveal-up:not(.hero *)').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Reveal left
  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Reveal right
  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  // ── STAGGERED CHILDREN ──────────────────────────────
  // Service cards stagger
  const serviceCards = gsap.utils.toArray('.service-card');
  serviceCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ── PROJECT CARDS ───────────────────────────────────
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    const imgCol = card.querySelector('.project-img-col');
    const infoCol = card.querySelector('.project-info-col');
    const isReverse = card.classList.contains('project-card-reverse');

    gsap.fromTo(imgCol,
      { opacity: 0, x: isReverse ? 60 : -60 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' }
      }
    );
    gsap.fromTo(infoCol,
      { opacity: 0, x: isReverse ? -60 : 60 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.12,
        scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' }
      }
    );
  });

  // ── PROJECT IMAGE PARALLAX ──────────────────────────
  gsap.utils.toArray('.project-img-wrap').forEach(wrap => {
    const img = wrap.querySelector('.project-img, .project-img-ph');
    if (!img) return;
    gsap.to(img, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });

  // ── PULL QUOTE ──────────────────────────────────────
  gsap.fromTo('.pull-quote',
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1, scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pull-quote',
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    }
  );

  // ── STAT COUNTER ANIMATION ──────────────────────────
  const statVals = document.querySelectorAll('.stat-val');
  statVals.forEach(el => {
    const original = el.textContent;
    // Only animate purely numeric values
    if (/^[\d.]+$/.test(original.replace(/[^0-9.]/g, '').trim())) {
      const num = parseFloat(original.replace(/[^0-9.]/g, ''));
      const prefix = original.match(/^[^0-9]*/)?.[0] || '';
      const suffix = original.match(/[^0-9.]+$/)?.[0] || '';
      gsap.fromTo({ val: 0 },
        { val: num },
        {
          val: num,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = prefix + Math.round(this.targets()[0].val) + suffix;
          },
          scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 90%',
            once: true,
          }
        }
      );
    }
  });

  // ── HORIZONTAL SCROLL HINT FADE ─────────────────────
  gsap.to('.scroll-hint', {
    opacity: 0,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '20% top',
      scrub: true,
    }
  });

  // ── CONTACT FORM HANDLER ─────────────────────────────
  window.handleSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simula envío — reemplaza con tu lógica real (Formspree, EmailJS, etc.)
    setTimeout(() => {
      btn.textContent = '¡Mensaje enviado! ✓';
      btn.style.background = '#c8f04d';
      btn.style.color = '#080808';
      e.target.reset();

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 3500);
    }, 1200);
  };

  // ── SMOOTH ACTIVE NAV ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const observerOpts = { threshold: 0.4 };
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--white)'
            : '';
        });
      }
    });
  }, observerOpts);

  sections.forEach(s => sectionObserver.observe(s));

  // ── PROJECT IMAGE HOVER ──────────────────────────────
  document.querySelectorAll('.project-img-wrap').forEach(wrap => {
    wrap.addEventListener('mouseenter', () => {
      gsap.to(wrap, { scale: 1.02, duration: 0.4, ease: 'power2.out' });
    });
    wrap.addEventListener('mouseleave', () => {
      gsap.to(wrap, { scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });

});
