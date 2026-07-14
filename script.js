// ---- config ----

const CONFIG = {
  lat: 43.4437, lng: -80.4923,          // 585 Queen St S, Kitchener
  timeZone: 'America/Toronto',
  method: 2, school: 1,                 
  iqamahOffsets: { fajr: 20, dhuhr: 15, asr: 15, maghrib: 5, isha: 10 },
};

// ---- events ----
// add events to this list 
const EVENTS = [

  // {
  //   date: '2026-08-01', time: '12:30 PM', location: 'Victoria Park',
  //   title: 'Community BBQ',
  //   note: 'Food, games, and a chance to meet your neighbours. Families welcome.',
  // },
];


// ---- timezone helpers ----
// everything is pinned to Toronto time so a visitor in another timezone
// still sees the masjid's times
function tzParts(date) {
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone: CONFIG.timeZone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p = Object.fromEntries(dtf.formatToParts(date).map(x => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, hh: (+p.hour) % 24, mm: +p.minute, ss: +p.second };
}
function tzOffsetHours(y, m, d) {
  const probe = new Date(Date.UTC(y, m - 1, d, 12));
  const p = tzParts(probe);
  return (Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm, p.ss) - probe.getTime()) / 3600000;
}

// ---- day's schedule ----
const PRAYERS = [
  { key: 'fajr',    label: 'Fajr',    arabic: 'الفجر' },
  { key: 'sunrise', label: 'Sunrise', arabic: 'الشروق' },
  { key: 'dhuhr',   label: 'Dhuhr',   arabic: 'الظهر' },
  { key: 'asr',     label: 'Asr',     arabic: 'العصر' },
  { key: 'maghrib', label: 'Maghrib', arabic: 'المغرب' },
  { key: 'isha',    label: 'Isha',    arabic: 'العشاء' },
];


const timingsCache = {};

async function daySchedule(y, m, d) {
  const key = `${y}-${m}-${d}`;
  if (!timingsCache[key]) {
    const date = `${String(d).padStart(2, '0')}-${String(m).padStart(2, '0')}-${y}`;
    const url = `https://api.aladhan.com/v1/timings/${date}`
      + `?latitude=${CONFIG.lat}&longitude=${CONFIG.lng}`
      + `&method=${CONFIG.method}&school=${CONFIG.school}&timezonestring=${CONFIG.timeZone}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`aladhan responded ${res.status}`);
    timingsCache[key] = (await res.json()).data.timings;
  }
  const names = { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' };
  const midnightUTC = Date.UTC(y, m - 1, d) - tzOffsetHours(y, m, d) * 3600e3;
  const out = {};
  for (const k in names) {
    const [hh, mm] = timingsCache[key][names[k]].split(':').map(Number);
    out[k] = { mins: hh * 60 + mm, ts: midnightUTC + (hh * 60 + mm) * 60e3 };
  }
  return out;
}
function fmtMins(mins) {
  let h = Math.floor(mins / 60) % 24, m = mins % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return { text: `${h}:${String(m).padStart(2, '0')}`, ap };
}

let state = null; // { today, nextKey, nextTs, nextLabel, iqamahTs }

async function rebuild() {
  try {
    const now = new Date();
    const p = tzParts(now);
    const today = await daySchedule(p.y, p.m, p.d);
    const order = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']; // shuruq is not a prayer
    let nextKey = null, nextTs = null;
    for (const k of order) {
      if (today[k].ts > now.getTime()) { nextKey = k; nextTs = today[k].ts; break; }
    }
    if (!nextKey) { // count down to tomorrow's Fajr
      const np = tzParts(new Date(now.getTime() + 24 * 3600e3));
      const tomorrow = await daySchedule(np.y, np.m, np.d);
      nextKey = 'fajr'; nextTs = tomorrow.fajr.ts;
    }
    const label = PRAYERS.find(x => x.key === nextKey).label;
    state = {
      today, nextKey, nextTs, nextLabel: label,
      iqamahTs: nextTs + (CONFIG.iqamahOffsets[nextKey] || 0) * 60e3,
    };
    renderGrid();
    renderHero(now);
  } catch (err) {

    console.error('prayer times failed to load:', err);
    if (!state) {
      document.getElementById('times-grid').innerHTML =
        `<p class="times-error">Prayer times couldn’t load. Check your connection and refresh the page.</p>`;
    }
  }
}

function renderGrid() {
  const grid = document.getElementById('times-grid');
  grid.innerHTML = PRAYERS.map(pr => {
    const t = state.today[pr.key];
    const f = fmtMins(t.mins);
    const isNext = pr.key === state.nextKey;
    let iqamah = '';
    if (pr.key !== 'sunrise') {
      const iq = fmtMins(t.mins + CONFIG.iqamahOffsets[pr.key]);
      iqamah = `<span class="p-iqamah">Iqamah <b>${iq.text} ${iq.ap}</b></span>`;
    } else {
      iqamah = `<span class="p-iqamah">Shuruq</span>`;
    }
    return `<div class="time-card${isNext ? ' is-next' : ''}">
      <span class="p-name">${pr.label}</span>
      <span class="p-arabic" lang="ar" dir="rtl">${pr.arabic}</span>
      <span class="p-time">${f.text}<small> ${f.ap}</small></span>
      ${iqamah}
    </div>`;
  }).join('');
}

function renderHero(now) {
  document.getElementById('next-name').textContent = state.nextLabel;
  const athan = tzParts(new Date(state.nextTs));
  const iq = tzParts(new Date(state.iqamahTs));
  const f = m => { const x = fmtMins(m.hh * 60 + m.mm); return `${x.text} ${x.ap}`; };
  document.getElementById('next-athan').textContent = f(athan);
  document.getElementById('next-iqamah').textContent = f(iq);
  document.getElementById('date-greg').textContent = new Intl.DateTimeFormat('en-CA', {
    timeZone: CONFIG.timeZone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(now);
  try {
    document.getElementById('date-hijri').textContent = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      timeZone: CONFIG.timeZone, day: 'numeric', month: 'long', year: 'numeric',
    }).format(now).replace(' AH', ' AH');
  } catch (e) { document.getElementById('date-hijri').textContent = ''; }
}

function tick() {
  if (!state) return;
  const now = Date.now();
  let diff = state.nextTs - now;
  if (diff <= 0) { rebuild(); diff = 0; } // rebuild is async; the next tick picks up the new target
  const s = Math.floor(diff / 1000);
  document.getElementById('cd-h').textContent = String(Math.floor(s / 3600)).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s % 60).padStart(2, '0');
}

rebuild();
tick();
setInterval(tick, 1000);
setInterval(rebuild, 15 * 60e3); 

// ---- events list ----
function renderEvents() {
  const list = document.getElementById('events-list');
  const p = tzParts(new Date());
  const todayISO = `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
  const upcoming = EVENTS
    .filter(e => e.date >= todayISO)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!upcoming.length) {
    list.innerHTML = `<p class="events-empty">No events are scheduled right now. Check back soon.</p>`;
    return;
  }
  list.innerHTML = upcoming.map(e => {
    const [y, m, d] = e.date.split('-').map(Number);
    const utc = new Date(Date.UTC(y, m - 1, d));
    const mo = utc.toLocaleDateString('en-CA', { month: 'short', timeZone: 'UTC' });
    const weekday = utc.toLocaleDateString('en-CA', { weekday: 'long', timeZone: 'UTC' });
    const meta = [weekday, e.time, e.location].filter(Boolean).join(' · ');
    return `<div class="event-row">
      <div class="event-date"><span class="mo">${mo}</span><span class="day">${d}</span></div>
      <div class="event-info">
        <h3>${e.title}</h3>
        <p class="meta">${meta}</p>
        ${e.note ? `<p>${e.note}</p>` : ''}
      </div>
    </div>`;
  }).join('');
}
renderEvents();
setInterval(renderEvents, 3600e3); 

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}
document.querySelectorAll('.prog-photo').forEach(img => img.addEventListener('click', () => openLightbox(img)));
document.querySelector('.gallery').addEventListener('click', e => {
  if (e.target.tagName === 'IMG') openLightbox(e.target);
});
function closeLightbox() {
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
}
lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ---- gallery ----
(function () {
  const gal = document.querySelector('.gallery');
  const prev = document.querySelector('.gal-prev');
  const next = document.querySelector('.gal-next');
  const originals = Array.from(gal.children);
  const N = originals.length, CLONES = 3;
  originals.slice(-CLONES).reverse().forEach(n => gal.insertBefore(n.cloneNode(true), gal.firstChild));
  originals.slice(0, CLONES).forEach(n => gal.appendChild(n.cloneNode(true)));
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = () => Array.from(gal.children);
  const unit = () => items()[0].getBoundingClientRect().width + 14;
  const centeredIndex = () => {
    const first = items()[0];
    return (gal.scrollLeft + (gal.clientWidth - first.getBoundingClientRect().width) / 2 - first.offsetLeft) / unit();
  };
  const centerOn = (i, instant) => {
    const it = items()[i];
    gal.scrollTo({
      left: it.offsetLeft - (gal.clientWidth - it.getBoundingClientRect().width) / 2,
      behavior: instant || !smooth ? 'auto' : 'smooth',
    });
  };
  centerOn(CLONES + 1, true);
  prev.addEventListener('click', () => gal.scrollBy({ left: -unit(), behavior: smooth ? 'smooth' : 'auto' }));
  next.addEventListener('click', () => gal.scrollBy({ left: unit(), behavior: smooth ? 'smooth' : 'auto' }));
  let settle;
  gal.addEventListener('scroll', () => {
    clearTimeout(settle);
    settle = setTimeout(() => {
      const p = centeredIndex();
      if (p < CLONES - 0.5) gal.scrollLeft += N * unit();
      else if (p > CLONES + N - 0.5) gal.scrollLeft -= N * unit();
    }, 130);
  }, { passive: true });
  window.addEventListener('resize', () => centerOn(Math.round(Math.min(Math.max(centeredIndex(), CLONES), CLONES + N - 1)), true));
})();

// close the mobile menu once a link is tapped
document.querySelectorAll('#navlinks a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('navlinks').classList.remove('open');
  document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
}));

// ---- starbackground ----

(function () {
  const cv = document.getElementById('pattern');
  const ctx = cv.getContext('2d');
  function star(cx, cy, r1, r2, rot) {
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const a = rot + i * Math.PI / 8;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  function draw() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.offsetWidth, h = cv.offsetHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const s = 108;
    ctx.lineWidth = 1;
    for (let row = -1; row * s * 0.5 < h + s; row++) {
      const y = row * s * 0.5;
      const xoff = (row % 2 === 0) ? 0 : s * 0.5;
      for (let col = -1; col * s < w + s; col++) {
        const x = col * s + xoff;
        const fade = 0.5 + 0.5 * (y / h); 
        ctx.strokeStyle = `rgba(217, 178, 60, ${0.05 + 0.06 * fade})`;
        star(x, y, 40, 16.5, Math.PI / 16);
        ctx.strokeStyle = `rgba(230, 240, 233, ${0.028 * fade})`;
        star(x, y, 24, 10, Math.PI / 16 + Math.PI / 8);
      }
    }
  }
  draw();
  let raf;
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); });
})();
