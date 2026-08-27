/* ============================================================
   GM CRICKET ACADEMY — interactions
   Edit the DATA blocks below to update site content.
   ============================================================ */

/* ---------------- DATA (editable) ---------------- */
const COACHES = [
  { name: "[HEAD COACH NAME]", role: "HEAD COACH", short: "Leads the academy's coaching structure across all three branches.",
    details: { Experience: "[PLACEHOLDER]", "Playing background": "[PLACEHOLDER]", "Coaching experience": "5+ years", Specialization: "[PLACEHOLDER]", Qualifications: "Certified coach", "Coaching philosophy": "Technique first, temperament always." } },
  { name: "[COACH NAME 2]", role: "BATTING COACH", short: "Certified coach focused on batting technique and shot selection.",
    details: { Experience: "5+ years", "Playing background": "[PLACEHOLDER]", "Coaching experience": "[PLACEHOLDER]", Specialization: "Batting", Qualifications: "Certified coach", "Coaching philosophy": "[PLACEHOLDER]" } },
  { name: "[COACH NAME 3]", role: "BOWLING COACH", short: "Works on pace, spin, control and match-situation bowling plans.",
    details: { Experience: "5+ years", "Playing background": "[PLACEHOLDER]", "Coaching experience": "[PLACEHOLDER]", Specialization: "Bowling", Qualifications: "Certified coach", "Coaching philosophy": "[PLACEHOLDER]" } },
  { name: "[COACH NAME 4]", role: "FIELDING & FITNESS", short: "Fitness, agility and fielding standards across all age groups.",
    details: { Experience: "5+ years", "Playing background": "[PLACEHOLDER]", "Coaching experience": "[PLACEHOLDER]", Specialization: "Fitness & fielding", Qualifications: "Certified coach", "Coaching philosophy": "[PLACEHOLDER]" } },
  { name: "[COACH NAME 5]", role: "JUNIOR COACH", short: "Foundation-level coaching for the youngest players at the academy.",
    details: { Experience: "5+ years", "Playing background": "[PLACEHOLDER]", "Coaching experience": "[PLACEHOLDER]", Specialization: "Foundation training", Qualifications: "Certified coach", "Coaching philosophy": "[PLACEHOLDER]" } },
  { name: "[COACH NAME 6]", role: "WOMEN'S CRICKET", short: "Supports the academy's girls' pathway including MPL preparation.",
    details: { Experience: "5+ years", "Playing background": "[PLACEHOLDER]", "Coaching experience": "[PLACEHOLDER]", Specialization: "Women's cricket", Qualifications: "Certified coach", "Coaching philosophy": "[PLACEHOLDER]" } }
];

const STEPS = [
  ["01","PERSONALIZED TRAINING","Individual plans built around each player's level and goals."],
  ["02","SKILL DEVELOPMENT","Batting, bowling, fielding and wicket-keeping fundamentals."],
  ["03","FITNESS & NUTRITION","Conditioning and nutrition guidance for young athletes."],
  ["04","MATCH PRACTICE","Regular practice matches on well-maintained grounds and wickets."],
  ["05","SELECTION","Selection matches that create real progression opportunities."],
  ["06","VIDEO ANALYSIS","Technique reviewed on video for measurable correction."],
  ["07","PERFORMANCE TRACKING","Progress recorded across seasons and shared with parents."],
  ["08","MENTAL CONDITIONING","Focus, composure and handling pressure situations."],
  ["09","LEADERSHIP","Captaincy, responsibility and team-first values."]
];

const PROGRAMS = [
  ["Foundation Training","Introductory cricket for beginners building core basics.","Focus: Basics, coordination, game awareness"],
  ["Youth Development","Structured technical development for growing players.","Focus: Technique, fitness, match temperament"],
  ["Advanced Training","High-intensity training for competitive age-group cricket.","Focus: Specialisation, video analysis"],
  ["Competitive Cricket","Preparation for tournaments and representative selection.","Focus: Match play, selection readiness"],
  ["Individual Coaching","One-to-one sessions with a dedicated coach.","Focus: Personalised correction"],
  ["Match Preparation","Short-cycle preparation ahead of trials and tournaments.","Focus: Strategy, conditioning, mindset"]
];

const BATCHES = [
  ["Bhugaon","U-10 / U-12","Foundation Batch","Mon · Wed · Fri","[TIME]","Group Training","Open"],
  ["Bhugaon","U-14","Development Batch","Tue · Thu · Sat","[TIME]","Skill + Match","Few seats"],
  ["Sus","U-16","Advanced Batch","Mon · Wed · Fri","[TIME]","Advanced Training","Open"],
  ["Sus","U-19","Competitive Batch","Tue · Thu · Sat","[TIME]","Match Practice","Few seats"],
  ["Bavdhan","All ages","Morning Batch","Mon – Sat","[TIME]","Group Training","Open"],
  ["Bavdhan","Girls","Women's Batch","[DAYS]","[TIME]","Skill + Match","Open"]
];

const BRANCHES = [
  ["BHUGAON","Bhugaon, Pune — [FULL ADDRESS PLACEHOLDER]","Well-maintained ground with high-quality wickets for daily training and practice matches."],
  ["SUS","Sus, Pune — [FULL ADDRESS PLACEHOLDER]","Training base for development and competitive age-group batches."],
  ["BAVDHAN","Bavdhan, Pune — [FULL ADDRESS PLACEHOLDER]","Morning and evening batches with dedicated net sessions."]
];

const CATEGORIES = ["ALL","TRAINING","MATCHES","PLAYERS","COACHES","GROUNDS","EVENTS"];
const GALLERY = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  category: ["TRAINING","MATCHES","PLAYERS","COACHES","GROUNDS","EVENTS"][i % 6],
  caption: `GM Cricket Academy photo ${String(i + 1).padStart(2, "0")}`
}));

const WHATSAPP_NUMBER = "918799902124";

/* ---------------- helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ---------------- nav ---------------- */
const nav = $("#nav"), burger = $("#burger"), mobileMenu = $("#mobileMenu");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 40), { passive: true });

burger.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!open));
  burger.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  mobileMenu.hidden = open;
});
$$("#mobileMenu a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.hidden = true;
  burger.setAttribute("aria-expanded", "false");
}));

/* active link on scroll */
const sections = $$("section[id]");
const navLinks = $$(".nav__links a");
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

/* ---------------- reveals + counters ---------------- */
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
}, { threshold: 0.15 });
const observeReveals = () => $$(".reveal:not(.in)").forEach(el => revealObs.observe(el));

function animateCount(el) {
  const target = Number(el.dataset.count || 0), suffix = el.dataset.suffix || "";
  const dur = 1200, start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const countObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); } });
}, { threshold: 0.6 });

/* ---------------- render ---------------- */
$("#coachGrid").innerHTML = COACHES.slice(1).map((c, i) => `
  <article class="card reveal">
    <div class="card__media"><img src="assets/p${i + 1}.jpg" alt="${c.name}" /></div>
    <div class="card__body">
      <p class="card__role">${c.role}</p>
      <h3 class="card__title">${c.name}</h3>
      <p class="card__text">${c.short}</p>
      <div class="card__foot"><button class="link-cta" data-coach="${i + 1}">VIEW PROFILE &rarr;</button></div>
    </div>
  </article>`).join("");

$("#steps").innerHTML = STEPS.map(([n, t, d]) =>
  `<li class="reveal"><b>${n}</b><h3>${t}</h3><p>${d}</p></li>`).join("");

$("#programGrid").innerHTML = PROGRAMS.map(([t, d, f]) => `
  <article class="card reveal">
    <div class="card__media ph"><span>PROGRAM IMAGE</span></div>
    <div class="card__body">
      <h3 class="card__title">${t}</h3>
      <p class="card__text">${d}</p>
      <p class="card__role">${f}</p>
    </div>
  </article>`).join("");

const availPill = a => `<span class="pill ${a === "Open" ? "pill--open" : "pill--few"}">${a}</span>`;
$("#batchBody").innerHTML = BATCHES.map(b => `
  <tr><td>${b[0]}</td><td>${b[1]}</td><td>${b[2]}</td><td>${b[3]}</td><td>${b[4]}</td></tr>`).join("");

$("#batchCards").innerHTML = BATCHES.map(b => `
  <article class="bcard reveal">
    <h3>${b[2]}</h3><p class="card__role">${b[0]} &middot; ${b[1]}</p>
    <dl><dt>DAYS</dt><dd>${b[3]}</dd><dt>TIME</dt><dd>${b[4]}</dd><dt>TYPE</dt><dd>${b[5]}</dd><dt>SEATS</dt><dd>${availPill(b[6])}</dd></dl>
    <a class="btn btn--purple btn--sm" href="#contact">ENQUIRE</a>
  </article>`).join("");

$("#branchGrid").innerHTML = BRANCHES.map(([n, loc, d]) => `
  <article class="card reveal">
    <div class="card__media ph"><span>GROUND PHOTO</span></div>
    <div class="card__body">
      <h3 class="card__title">${n}</h3>
      <p class="card__role">${loc}</p>
      <p class="card__text">${d}</p>
      <div class="card__foot" style="display:flex;gap:12px;flex-wrap:wrap">
        <a class="btn btn--gold btn--sm" href="https://www.google.com/maps/search/${encodeURIComponent(n + " Pune cricket ground")}" target="_blank" rel="noopener">VIEW ON MAP</a>
        <a class="btn btn--purple btn--sm" href="#contact">ENQUIRE NOW</a>
      </div>
    </div>
  </article>`).join("");

/* ---------------- gallery ---------------- */
const galGrid = $("#galGrid"), pageNum = $("#pageNum");
let activeCat = "ALL", page = 0;
const PER_PAGE = 8;

$("#filters").innerHTML = CATEGORIES.map(c =>
  `<button role="tab" class="${c === "ALL" ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");

const filtered = () => activeCat === "ALL" ? GALLERY : GALLERY.filter(g => g.category === activeCat);
const pages = () => Math.max(1, Math.ceil(filtered().length / PER_PAGE));

function renderGallery() {
  const list = filtered();
  page = Math.min(page, pages() - 1);
  const slice = list.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  galGrid.innerHTML = slice.length
    ? slice.map(g => `<button class="tile" data-id="${g.id}" aria-label="Open ${g.caption}">
        <span>PHOTO ${String(g.id).padStart(2, "0")}</span><em>${g.category}</em></button>`).join("")
    : `<p class="lead lead--light">No photos in this category yet.</p>`;
  pageNum.textContent = `${String(page + 1).padStart(2, "0")} / ${String(pages()).padStart(2, "0")}`;
  $("#prevPage").disabled = page === 0;
  $("#nextPage").disabled = page >= pages() - 1;
}
renderGallery();

$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button[data-cat]"); if (!b) return;
  activeCat = b.dataset.cat; page = 0;
  $$("#filters button").forEach(x => x.classList.toggle("active", x === b));
  renderGallery();
});
$("#prevPage").addEventListener("click", () => { if (page > 0) { page--; renderGallery(); } });
$("#nextPage").addEventListener("click", () => { if (page < pages() - 1) { page++; renderGallery(); } });

/* lightbox */
const lightbox = $("#lightbox");
let lbIndex = 0, lbList = [];
function openLightbox(id) {
  lbList = filtered();
  lbIndex = Math.max(0, lbList.findIndex(g => g.id === id));
  lightbox.hidden = false; document.body.style.overflow = "hidden";
  paintLightbox(); $(".lb__close").focus();
}
function paintLightbox() {
  const g = lbList[lbIndex];
  $("#lbImg").querySelector("span").textContent = `PHOTO ${String(g.id).padStart(2, "0")} — PLACEHOLDER`;
  $("#lbCaption").textContent = `${g.category} · ${g.caption}`;
  $("#lbCounter").textContent = `${lbIndex + 1} / ${lbList.length}`;
}
function closeLightbox() { lightbox.hidden = true; document.body.style.overflow = ""; }
const lbStep = d => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; paintLightbox(); };

galGrid.addEventListener("click", e => {
  const t = e.target.closest(".tile"); if (t) openLightbox(Number(t.dataset.id));
});
$("#lbPrev").addEventListener("click", () => lbStep(-1));
$("#lbNext").addEventListener("click", () => lbStep(1));
lightbox.addEventListener("click", e => { if (e.target.hasAttribute("data-lb-close") || e.target === lightbox) closeLightbox(); });

/* ---------------- coach modal ---------------- */
const coachModal = $("#coachModal");
function openCoach(i) {
  const c = COACHES[i];
  $("#coachModalRole").textContent = c.role;
  $("#coachModalName").textContent = c.name;
  $("#coachModalDetails").innerHTML = Object.entries(c.details)
    .map(([k, v]) => `<dt>${k.toUpperCase()}</dt><dd>${v}</dd>`).join("");
  coachModal.hidden = false; document.body.style.overflow = "hidden";
  $(".modal__close").focus();
}
function closeCoach() { coachModal.hidden = true; document.body.style.overflow = ""; }
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-coach]");
  if (btn) { openCoach(Number(btn.dataset.coach)); return; }
  if (e.target.closest("[data-close]")) closeCoach();
});
addEventListener("keydown", e => {
  if (e.key === "Escape") { closeCoach(); closeLightbox(); }
  if (!lightbox.hidden) { if (e.key === "ArrowRight") lbStep(1); if (e.key === "ArrowLeft") lbStep(-1); }
});

/* ---------------- head coach video ---------------- */
const video = $("#coachVideo"), playBtn = $("#playBtn"), muteBtn = $("#muteBtn"), videoEmpty = $("#videoEmpty");
video.muted = false;
video.addEventListener("loadeddata", () => { videoEmpty.hidden = true; });
video.addEventListener("error", () => { videoEmpty.hidden = false; });
video.addEventListener("canplay", () => { videoEmpty.hidden = true; });
playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (video.paused) { video.play().catch(() => {}); playBtn.textContent = "PAUSE"; playBtn.setAttribute("aria-label", "Pause video"); }
  else { video.pause(); playBtn.textContent = "PLAY"; playBtn.setAttribute("aria-label", "Play video"); }
});
muteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "UNMUTE" : "MUTE";
  muteBtn.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
});

/* ---------------- enquiry form → WhatsApp ---------------- */
$("#enquiryForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, err = $("#formErr");
  const data = {
    player: f.player.value.trim(), parent: f.parent.value.trim(), age: f.age.value.trim(),
    phone: f.phone.value.trim(), branch: f.branch.value, message: f.message.value.trim()
  };
  const missing = !data.player || !data.parent || !data.age || !data.phone || !data.branch;
  if (missing) { err.hidden = false; err.textContent = "Please complete all required fields before sending."; return; }
  if (!/^[0-9+\-\s()]{8,15}$/.test(data.phone)) { err.hidden = false; err.textContent = "Please enter a valid phone number."; return; }
  err.hidden = true;

  const text =
`*GM Cricket Academy — New Enquiry*

*Player Name:* ${data.player}
*Parent Name:* ${data.parent}
*Age:* ${data.age}
*Branch:* ${data.branch}
*Program / Coaching:* ${data.program}
*Phone:* ${data.phone}${data.message ? `\n*Message:* ${data.message}` : ""}

Sent from the GM Cricket Academy website.`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

/* ---------------- init ---------------- */
$("#year").textContent = new Date().getFullYear();
observeReveals();
$$("[data-count]").forEach(el => countObs.observe(el));
