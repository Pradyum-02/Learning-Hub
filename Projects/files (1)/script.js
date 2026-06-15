/* ===================================================
   LIFE PRO FITNESS CLUB — script.js
   Premium Luxury Gym Website – Interactive Features
=================================================== */

'use strict';

/* ============ LOADER ============ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1700);
  document.body.style.overflow = 'hidden';
});


/* ============ NAVBAR: Scroll + Active ============ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  /* Glassmorphism toggle */
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else                      navbar.classList.remove('scrolled');

  /* Active nav link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

  /* Back-to-top */
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 500) btt.classList.add('show');
  else                       btt.classList.remove('show');
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* ============ HAMBURGER MENU ============ */
const hamburger   = document.getElementById('hamburger');
const mobileLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = mobileLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

/* Close menu on link click */
mobileLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


/* ============ SMOOTH SCROLL ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 10;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth',
    });
  });
});


/* ============ BACK TO TOP ============ */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============ INTERSECTION OBSERVER: Reveal Animations ============ */
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ============ ANIMATED COUNTERS ============ */
const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.round(current).toLocaleString();
    }, stepTime);
  });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  statsObserver.observe(statsSection);
}


/* ============ CONTACT FORM ============ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Basic validation */
    const name    = contactForm.querySelector('#name').value.trim();
    const phone   = contactForm.querySelector('#phone').value.trim();
    const email   = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !phone || !email || !message) return;

    /* Disable button while "sending" */
    const submitBtn = contactForm.querySelector('.btn-primary');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1200);
  });
}


/* ============ GALLERY HOVER TITLES ============ */
/* Already handled with CSS transitions */


/* ============ DYNAMIC YEAR IN FOOTER ============ */
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace(
    /\d{4}/, new Date().getFullYear()
  );
}


/* ============ PLAN CARD ENTRANCE STAGGER ============ */
/* Handled by Intersection Observer above; individual delays applied via CSS */


/* ============ PARALLAX HERO SHAPES (lightweight) ============ */
const heroShapes = document.querySelectorAll('.hero-shape');

window.addEventListener('mousemove', (e) => {
  const { innerWidth: w, innerHeight: h } = window;
  const rx = (e.clientX / w - 0.5) * 2; // -1 to 1
  const ry = (e.clientY / h - 0.5) * 2;

  heroShapes.forEach((shape, i) => {
    const depth = (i + 1) * 14;
    const tx = rx * depth;
    const ty = ry * depth;
    shape.style.transform = `translate(${tx}px, ${ty}px)`;
  });
}, { passive: true });


/* ============ FEATURE CARD RIPPLE ============ */
document.querySelectorAll('.feature-card, .plan-card, .trainer-card').forEach(card => {
  card.addEventListener('pointerdown', (e) => {
    const rect   = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    Object.assign(ripple.style, {
      position: 'absolute',
      left: x + 'px',
      top:  y + 'px',
      width:  size + 'px',
      height: size + 'px',
      background: 'rgba(242, 159, 67, 0.08)',
      borderRadius: '50%',
      transform: 'scale(0)',
      animation: 'ripple 0.6s ease-out forwards',
      pointerEvents: 'none',
    });

    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

/* Inject ripple keyframe if not already present */
if (!document.getElementById('rippleStyle')) {
  const s = document.createElement('style');
  s.id = 'rippleStyle';
  s.textContent = `
    @keyframes ripple {
      to { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(s);
}


/* ============ NAVBAR LOGO HOVER EFFECT ============ */
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.transition = 'transform 0.3s ease';
    navLogo.style.transform  = 'scale(1.04)';
  });
  navLogo.addEventListener('mouseleave', () => {
    navLogo.style.transform = 'scale(1)';
  });
}


/* ============ SCROLL PROGRESS INDICATOR ============ */
const progressBar = document.createElement('div');
Object.assign(progressBar.style, {
  position:   'fixed',
  top:        '0',
  left:       '0',
  height:     '2px',
  background: 'linear-gradient(90deg, #F29F43, #F57C00)',
  zIndex:     '9999',
  width:      '0%',
  transition: 'width 0.1s linear',
  pointerEvents: 'none',
});
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });
