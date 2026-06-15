// ---------- Data ----------
const amenities = [
  { i: '👤', t: 'Personal Training', d: '1-on-1 plans tailored to your transformation goals.' },
  { i: '👥', t: 'Experienced Trainers', d: 'Certified coaches with years on the floor.' },
  { i: '💧', t: 'Steam Room', d: 'Recover and reset every Saturday.' },
  { i: '🧘', t: 'Yoga Room', d: 'Mobility, breath, and balance — properly programmed.' },
  { i: '❤', t: 'Cardio Section', d: 'Top-tier treadmills, bikes, rowers and ellipticals.' },
  { i: '🔥', t: 'Warmup Area', d: 'Dedicated zone to prime your body for heavy work.' },
  { i: '▦', t: 'Muscle Training Zones', d: 'Separate sections for push, pull, and legs.' },
  { i: '❄', t: 'AC Environment', d: 'Climate-controlled comfort, even during heavy sets.' },
  { i: '⚙', t: 'Premium Equipment', d: 'High-grade machines and free weights, well-maintained.' },
];
const baseFeatures = ['Full gym floor access','All cardio equipment','Locker room & showers','Saturday steam room'];
const plans = [
  { d: '1 Month', p: 2000, m: 2000, f: baseFeatures },
  { d: '3 Months', p: 4500, m: 1500, f: [...baseFeatures, '1 free PT session'] },
  { d: '6 Months', p: 8000, m: 1333, f: [...baseFeatures, '3 free PT sessions', 'Diet consultation'] },
  { d: '12 Months', p: 13500, m: 1125, best: true, f: [...baseFeatures, '6 free PT sessions', 'Personal diet plan', '24/7 access', 'Member-only events'] },
];
const trainers = [
  { img: 'assets/trainer-1.jpg', name: 'Arjun Mehta', role: 'Head Strength Coach' },
  { img: 'assets/trainer-2.jpg', name: 'Priya Singh', role: 'Yoga & Mobility' },
  { img: 'assets/trainer-3.jpg', name: 'Rohan Kapoor', role: 'Body Transformation' },
];
const reviews = [
  { name: 'Vikram S.', tag: 'Member · 2 yrs', text: "Lost 18kg in 8 months. The trainers actually care — they don't just count reps, they coach you.", a: 'V' },
  { name: 'Aisha R.', tag: 'Member · 1 yr', text: 'Cleanest gym I have ever trained in. The yoga room and steam room are next level.', a: 'A' },
  { name: 'Daniel K.', tag: 'Member · 6 mo', text: 'Premium equipment, no waiting around even at peak hours. Worth every rupee.', a: 'D' },
];

// ---------- Render ----------
const $ = (s) => document.querySelector(s);

$('#amenitiesGrid').innerHTML = amenities.map(a => `
  <div class="glass amenity reveal">
    <div class="ico">${a.i}</div>
    <h3>${a.t}</h3>
    <p>${a.d}</p>
  </div>`).join('');

$('#plans').innerHTML = plans.map(p => `
  <div class="glass plan reveal ${p.best ? 'best' : ''}">
    ${p.best ? '<span class="badge-best">★ Best Value</span>' : ''}
    <div class="duration">${p.d}</div>
    <div class="price">₹${p.p.toLocaleString()}</div>
    <div class="per">≈ ₹${p.m.toLocaleString()} / month</div>
    <hr/>
    <ul>${p.f.map(x => `<li>${x}</li>`).join('')}</ul>
    <a href="#contact" class="${p.best ? 'btn-neon' : 'btn-ghost'}">Join ${p.d}</a>
  </div>`).join('');

$('#trainersGrid').innerHTML = trainers.map(t => `
  <div class="trainer reveal">
    <img src="${t.img}" alt="${t.name}"/>
    <div class="info">
      <span>${t.role}</span>
      <strong>${t.name}</strong>
    </div>
  </div>`).join('');

$('#reviewsGrid').innerHTML = reviews.map(r => `
  <div class="glass review reveal">
    <div class="stars">★★★★★</div>
    <p>"${r.text}"</p>
    <div class="who">
      <div class="avatar">${r.a}</div>
      <div><strong>${r.name}</strong><small>${r.tag}</small></div>
    </div>
  </div>`).join('');

// ---------- Scroll progress + navbar ----------
const progress = $('#scrollProgress');
const navbar = $('#navbar');
const backToTop = $('#backToTop');
function onScroll() {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + '%';
  navbar.classList.toggle('scrolled', h.scrollTop > 30);
  backToTop.classList.toggle('visible', h.scrollTop > 600);
  // hero parallax
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) heroBg.style.transform = `scale(1.1) translateY(${h.scrollTop * 0.25}px)`;
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Back to top ----------
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Mobile menu ----------
const hamburger = $('#hamburger');
const mobileMenu = $('#mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '-60px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Counters ----------
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    const start = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

// ---------- Contact form ----------
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  $('#formStatus').textContent = '✓ Thanks! We will get back to you shortly.';
  e.target.reset();
});