/* =====================================================
   Pradyum Meshram — Portfolio JS
   Vanilla JS — no frameworks
   ===================================================== */

/* ---------- Loader ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 500);
});

/* ---------- Year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Navbar scroll + mobile ---------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  // scroll progress
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('scrollProgress').style.width = pct + '%';
  // back to top
  document.getElementById('toTop').classList.toggle('visible', window.scrollY > 500);
});
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');
}));
document.getElementById('toTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ---------- Cursor glow ---------- */
const cursor = document.getElementById('cursorGlow');
if (window.matchMedia('(hover:hover)').matches) {
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

/* ---------- Typing effect ---------- */
const phrases = [
  "Full Stack Developer",
  "Frontend Developer",
  "Problem Solver",
  "Building My Future Through Code"
];
const typed = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  typed.textContent = word.substring(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 80); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 40); }
  else {
    deleting = !deleting;
    if (!deleting) pi = (pi + 1) % phrases.length;
    setTimeout(type, deleting ? 1500 : 300);
  }
}
type();

/* ---------- Parallax (hero) ---------- */
const parallaxEls = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxEls.forEach(el => { el.style.transform = `translateY(${y * 0.08}px)`; });
});

/* ---------- Particles ---------- */
(() => {
  const c = document.getElementById('particles');
  const ctx = c.getContext('2d');
  let w, h, parts = [];
  function resize() { w = c.width = innerWidth; h = c.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  const count = Math.min(80, Math.floor(innerWidth / 20));
  const colors = ['#FF8C42','#7B61FF','#5DA9FF'];
  for (let i = 0; i < count; i++) {
    parts.push({
      x: Math.random()*w, y: Math.random()*h,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r: Math.random()*1.6+.4,
      c: colors[Math.floor(Math.random()*colors.length)]
    });
  }
  function tick() {
    ctx.clearRect(0,0,w,h);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x<0||p.x>w) p.vx*=-1;
      if (p.y<0||p.y>h) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.c;
      ctx.shadowBlur = 8; ctx.shadowColor = p.c;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Counters ---------- */
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const dur = 1600;
    const start = performance.now();
    function step(t) {
      const p = Math.min((t - start) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.num[data-target]').forEach(el => counterIO.observe(el));

/* ---------- Skills ---------- */
const skills = [
  { name:'HTML', pct:95, cat:'Frontend', icon:'fa-brands fa-html5' },
  { name:'CSS', pct:92, cat:'Frontend', icon:'fa-brands fa-css3-alt' },
  { name:'JavaScript', pct:88, cat:'Frontend', icon:'fa-brands fa-js' },
  { name:'React', pct:80, cat:'Frontend', icon:'fa-brands fa-react' },
  { name:'Node.js', pct:75, cat:'Backend', icon:'fa-brands fa-node-js' },
  { name:'Express.js', pct:72, cat:'Backend', icon:'fa-solid fa-server' },
  { name:'Python', pct:78, cat:'Backend', icon:'fa-brands fa-python' },
  { name:'Git & GitHub', pct:85, cat:'Tools', icon:'fa-brands fa-github' },
  { name:'MongoDB', pct:70, cat:'Database', icon:'fa-solid fa-leaf' },
  { name:'MySQL', pct:68, cat:'Database', icon:'fa-solid fa-database' },
  { name:'DSA', pct:65, cat:'Concepts', icon:'fa-solid fa-diagram-project' },
  { name:'Responsive Design', pct:90, cat:'Frontend', icon:'fa-solid fa-mobile-screen' },
];
const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.innerHTML = skills.map(s => `
  <div class="skill reveal">
    <div class="skill-head">
      <div class="name"><i class="${s.icon}"></i>${s.name}</div>
      <div class="pct">${s.pct}%</div>
    </div>
    <div class="bar"><span data-fill="${s.pct}"></span></div>
    <span class="cat">${s.cat}</span>
  </div>
`).join('');
// Re-observe new reveals + fill bars
document.querySelectorAll('.skill.reveal').forEach(el => io.observe(el));
const barIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const span = e.target;
    span.style.width = span.dataset.fill + '%';
    barIO.unobserve(span);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.bar > span').forEach(s => barIO.observe(s));

/* ---------- GitHub API ---------- */
const GH_USER = 'Pradyum-02';
const projectsGrid = document.getElementById('projectsGrid');
let allRepos = [];

async function loadGitHub() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`),
      fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`)
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub fetch failed');
    const user = await userRes.json();
    const repos = await reposRes.json();
    allRepos = repos.filter(r => !r.fork);

    // Stats
    document.getElementById('ghRepos').textContent = user.public_repos;
    document.getElementById('ghFollowers').textContent = user.followers;
    document.getElementById('ghFollowing').textContent = user.following;
    document.getElementById('ghStars').textContent = allRepos.reduce((s,r)=>s+r.stargazers_count,0);

    // Languages
    const langs = {};
    allRepos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language]||0)+1; });
    const total = Object.values(langs).reduce((a,b)=>a+b,0) || 1;
    const sorted = Object.entries(langs).sort((a,b)=>b[1]-a[1]).slice(0,6);
    document.getElementById('langBars').innerHTML = sorted.map(([l,n]) => {
      const p = Math.round((n/total)*100);
      return `<div class="lang-row"><span>${l}</span><div class="lbar"><span data-fill="${p}"></span></div><span class="lpct">${p}%</span></div>`;
    }).join('');
    // animate
    document.querySelectorAll('.lang-row .lbar > span').forEach(s => {
      setTimeout(() => { s.style.width = s.dataset.fill + '%'; }, 300);
    });

    renderProjects('all');
  } catch (err) {
    console.warn('GitHub API unavailable, showing fallback', err);
    // Fallback
    document.getElementById('ghRepos').textContent = '—';
    projectsGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--muted)">
      Couldn't load GitHub repos right now. Visit
      <a href="https://github.com/${GH_USER}" target="_blank" style="color:var(--orange)">github.com/${GH_USER}</a>.
    </p>`;
  }
}

function classify(repo) {
  const l = (repo.language || '').toLowerCase();
  const name = (repo.name + ' ' + (repo.description||'') + ' ' + (repo.topics||[]).join(' ')).toLowerCase();
  const cats = ['all'];
  if (l === 'javascript' || l === 'typescript') cats.push('javascript','frontend');
  if (l === 'python') cats.push('python','backend');
  if (l === 'html' || l === 'css') cats.push('frontend');
  if (/node|express|api|server|backend/.test(name)) cats.push('backend');
  if (/react|vue|next|frontend|portfolio|landing|ui/.test(name)) cats.push('frontend');
  return [...new Set(cats)];
}

function renderProjects(filter) {
  if (!allRepos.length) return;
  const filtered = allRepos
    .map(r => ({ ...r, _cats: classify(r) }))
    .filter(r => filter === 'all' || r._cats.includes(filter))
    .sort((a,b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 9);

  if (!filtered.length) {
    projectsGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--muted)">No projects in this category yet.</p>`;
    return;
  }

  projectsGrid.innerHTML = filtered.map((r, idx) => `
    <article class="project reveal ${idx===0?'featured':''}" data-cats="${r._cats.join(' ')}">
      <div class="ph">
        <h3>${escapeHtml(r.name)}</h3>
        ${r.language ? `<span class="lang">${r.language}</span>` : ''}
      </div>
      <p>${escapeHtml(r.description || 'A project crafted with care — exploring code and creativity.')}</p>
      <div class="meta">
        <span><i class="fa-solid fa-star"></i>${r.stargazers_count}</span>
        <span><i class="fa-solid fa-code-fork"></i>${r.forks_count}</span>
        <span><i class="fa-regular fa-clock"></i>${new Date(r.updated_at).toLocaleDateString()}</span>
      </div>
      <div class="actions">
        <a href="${r.html_url}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
        ${r.homepage ? `<a href="${r.homepage}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>` : ''}
        <button data-id="${r.id}" class="open-modal"><i class="fa-solid fa-circle-info"></i> Details</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.project.reveal').forEach(el => io.observe(el));
  document.querySelectorAll('.open-modal').forEach(btn => btn.addEventListener('click', () => openModal(+btn.dataset.id)));
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

/* Filters */
document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(btn.dataset.filter);
});

/* Modal */
const modal = document.getElementById('projectModal');
function openModal(id) {
  const r = allRepos.find(x => x.id === id);
  if (!r) return;
  document.getElementById('modalContent').innerHTML = `
    <h3>${escapeHtml(r.name)}</h3>
    <p class="desc">${escapeHtml(r.description || 'No description provided.')}</p>
    <div class="tags">
      ${r.language ? `<span class="tag">${r.language}</span>` : ''}
      ${(r.topics||[]).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
    </div>
    <div class="meta" style="display:flex;gap:1rem;color:var(--muted);font-family:var(--mono);font-size:.85rem;margin-bottom:1rem">
      <span><i class="fa-solid fa-star"></i> ${r.stargazers_count} stars</span>
      <span><i class="fa-solid fa-code-fork"></i> ${r.forks_count} forks</span>
      <span><i class="fa-regular fa-eye"></i> ${r.watchers_count} watching</span>
    </div>
    <div class="links">
      <a href="${r.html_url}" target="_blank" rel="noopener" class="btn btn-ghost"><i class="fa-brands fa-github"></i> View Code</a>
      ${r.homepage ? `<a href="${r.homepage}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
    </div>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}
modal.addEventListener('click', e => { if (e.target.dataset.close !== undefined) closeModal(); });
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- Contribution heatmap (decorative) ---------- */
(() => {
  const grid = document.getElementById('heatGrid');
  let html = '';
  for (let i = 0; i < 26 * 7; i++) {
    const r = Math.random();
    let lv = '';
    if (r > 0.85) lv = 'lv4';
    else if (r > 0.7) lv = 'lv3';
    else if (r > 0.5) lv = 'lv2';
    else if (r > 0.3) lv = 'lv1';
    html += `<div class="heat-cell ${lv}"></div>`;
  }
  grid.innerHTML = html;
})();

/* ---------- Contact form ---------- */
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  let ok = true;
  setErr('name', '');
  setErr('email', '');
  setErr('message', '');
  if (name.length < 2) { setErr('name','Please enter your name.'); ok = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('email','Enter a valid email.'); ok = false; }
  if (message.length < 10) { setErr('message','Message should be at least 10 characters.'); ok = false; }
  if (!ok) return;

  const btn = form.querySelector('.send-btn');
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
  setTimeout(() => {
    btn.classList.add('sent');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
    const status = document.getElementById('formStatus');
    status.textContent = "Thanks! I'll get back to you soon.";
    status.classList.add('ok');
    form.reset();
    setTimeout(() => {
      btn.classList.remove('sent');
      btn.innerHTML = '<span>Send Message</span><i class="fa-regular fa-paper-plane"></i>';
      status.textContent = '';
      status.classList.remove('ok');
    }, 3500);
  }, 900);
});
function setErr(field, msg) { document.querySelector(`.err[data-for="${field}"]`).textContent = msg; }

/* ---------- Init GitHub ---------- */
loadGitHub();
