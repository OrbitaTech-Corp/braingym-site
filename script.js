// BrainGym — landing.
// PT/EN copy, the nav backdrop, and the scroll scenes: scrolling drives the
// shelf gathering into the B, a study day playing out, and a pinned phone
// changing screens. With reduced motion every scene shows its final state.
// The language choice is stored under `braingym.lang`, shared with legal.js.

(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) root.classList.add('rm');

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  const range = (p, a, b) => clamp((p - a) / (b - a));

  // ------------------------------------------------------------------ copy

  const KEY = 'braingym.lang';
  let lang = 'pt';

  const EN = {
    'nav.how': 'How it works',
    'nav.features': 'Features',
    'nav.pro': 'PRO',
    'nav.download': 'Get the app',
    'open.intro': 'One book a day.',
    'open.hint': 'Scroll to build it',
    'hero.badge': 'Coming soon to the App Store',
    'hero.title1': 'Every day',
    'hero.title2': 'counts.',
    'hero.lead': 'Study, check in with a photo and watch your streak grow. With friends alongside, it gets a lot harder to stop.',
    'hero.store_small': 'Coming soon on the',
    'hero.how': 'See how it works',
    'how.overline': 'How it works',
    'how.title': 'One day at a time.',
    'how.s1.title': 'Study',
    'how.s1.body': 'Run the timer or log it afterwards. Any subject counts: exams, college, languages, coding.',
    'how.s2.title': 'Check in with a photo',
    'how.s2.body': 'A photo of your desk, taken on the spot, proves the studying happened. No tapping a box and moving on.',
    'how.s3.title': 'Keep the streak',
    'how.s3.body': 'One check-in a day adds to your streak. Days turn at midnight in your time zone, and we remind you if today is still open.',
    'stage.subject': 'Math · focus',
    'stage.days': 'day streak',
    'f1.overline': 'Streak',
    'f1.title': "Don't break the chain.",
    'f1.body': 'When today is still open, the app shows how long you have until midnight. One photo and the day is safe.',
    'f2.overline': 'Challenges',
    'f2.title': 'Challenge your crew.',
    'f2.body': 'Start a challenge, invite friends with a 6-letter code and follow the ranking and the weekly goal.',
    'f3.overline': 'Feed',
    'f3.title': 'Nobody studies alone.',
    'f3.body': "See who's studying right now, react to your friends' check-ins and celebrate each other's milestones.",
    'f4.overline': 'Progress',
    'f4.title': 'Your progress, day by day.',
    'f4.body': "A map of your year of studying, records, level and achievements. All on your profile, so you can see how far you've come.",
    'pro.title': "A bad day doesn't erase your streak.",
    'pro.body': 'PRO protects your streak once a week and unlocks everything for people who take studying seriously.',
    'pro.l1': 'Streak protection, once a week',
    'pro.l2': 'Unlimited subjects and challenges',
    'pro.l3': 'Challenges with up to 50 people',
    'pro.l4': 'Advanced stats and your full photo history',
    'pro.l5': 'Global ranking and a PRO badge on your profile',
    'pro.fine': 'The app is free. PRO is optional, comes with a free trial and can be cancelled anytime.',
    'cta.title1': 'Start today.',
    'cta.title2': 'Tomorrow already counts.',
    'cta.body': 'BrainGym is coming soon to iPhone.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of Use',
    'footer.contact': 'Contact',
    'footer.made': 'Made in Brazil',
  };

  const PT = {};
  document.querySelectorAll('[data-i18n]').forEach((el) => { PT[el.dataset.i18n] = el.textContent; });

  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'pt';
    const dict = lang === 'en' ? EN : PT;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = dict[el.dataset.i18n];
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-lang]').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === lang));
    root.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = lang === 'en' ? 'BrainGym · Every day counts.' : 'BrainGym · Cada dia conta.';
    try { localStorage.setItem(KEY, lang); } catch (_) {}
    buildWeek();
    layout();
  }

  document.querySelectorAll('[data-lang]').forEach((btn) => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));

  // ------------------------------------------------------------- the shelf
  // Port of EstanteMark (BrandMark.swift): progress 0 = the B, 1 = shelf.

  const BOOKS = [
    { name: 'stem', kind: 'upright', r: [22, 12, 33, 88] },
    { name: 'top', kind: 'lying', r: [35, 12, 56.6, 21] },
    { name: 'today', kind: 'endOn', spine: 6.4, r: [59.4, 12, 68.6, 42.6], today: true, tilt: -4 },
    { name: 'waist', kind: 'lying', r: [35, 44, 61, 53] },
    { name: 'lower', kind: 'endOn', spine: 7.6, r: [62.4, 44.6, 73.4, 88] },
    { name: 'bottom', kind: 'lying', r: [35, 79, 61, 88] },
  ].map((b) => {
    const [x0, y0, x1, y1] = b.r;
    return { ...b, x: x0, y: y0, w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
  });
  const SHELF_ORDER = ['stem', 'lower', 'bottom', 'waist', 'top', 'today'];
  const ASSEMBLE = ['stem', 'bottom', 'waist', 'top', 'lower', 'today'];
  const SPAN = 0.44;
  const STAGGER = (1 - SPAN) / (ASSEMBLE.length - 1);
  const COLORS = { main: '#7DC4A8', today: '#EDEFF1', cut: '#0B0D10' };

  function pivot(b, lx, ly, tx, ty, deg) {
    const a = deg * Math.PI / 180;
    const vx = b.cx - lx, vy = b.cy - ly;
    return { dx: tx + vx * Math.cos(a) - vy * Math.sin(a) - b.cx, dy: ty + vx * Math.sin(a) + vy * Math.cos(a) - b.cy, angle: deg };
  }

  const SHELF = (() => {
    const out = {};
    let x = 14;
    SHELF_ORDER.forEach((name) => {
      const b = BOOKS.find((k) => k.name === name);
      const lying = b.kind === 'lying';
      const w = lying ? b.h : b.w, h = lying ? b.w : b.h;
      if (name === 'today') {
        x += 2.6;
        out[name] = pivot(b, b.x, b.y + b.h, x, 88, -8);
      } else {
        out[name] = { dx: x + w / 2 - b.cx, dy: 88 - h / 2 - b.cy, angle: lying ? -90 : 0 };
      }
      x += w + 1.5;
    });
    return out;
  })();

  function bodyPath(ctx, b, rl, rr) {
    rr = Math.min(rr, b.h / 2, b.w); rl = Math.min(rl, b.h / 2);
    const { x, y, w, h } = b;
    ctx.beginPath();
    ctx.moveTo(x + rl, y);
    ctx.lineTo(x + w - rr, y);
    ctx.arc(x + w - rr, y + rr, rr, -Math.PI / 2, 0);
    ctx.lineTo(x + w, y + h - rr);
    ctx.arc(x + w - rr, y + h - rr, rr, 0, Math.PI / 2);
    ctx.lineTo(x + rl, y + h);
    ctx.arc(x + rl, y + h - rl, rl, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + rl);
    ctx.arc(x + rl, y + rl, rl, Math.PI, Math.PI * 1.5);
    ctx.closePath();
  }

  function bands(ctx, b) {
    const lw = b.w < 9 ? 0.95 : 1.1;
    [b.y + 2.8, b.y + 4.7, b.y + b.h - 3.6].forEach((y) => ctx.fillRect(b.x + 1.1, y, b.w - 2.2, lw));
  }

  function pages(ctx, b, rad) {
    rad = Math.min(rad, b.h / 2, b.w);
    const edge = (y) => {
      if (y < b.y + rad) { const d = b.y + rad - y; return b.x + b.w - rad + Math.sqrt(Math.max(rad * rad - d * d, 0)); }
      if (y > b.y + b.h - rad) { const d = y - (b.y + b.h - rad); return b.x + b.w - rad + Math.sqrt(Math.max(rad * rad - d * d, 0)); }
      return b.x + b.w;
    };
    const stops = b.h < 25 ? [1 / 3, 2 / 3] : [0.25, 0.5, 0.75];
    stops.forEach((k) => {
      const y = b.y + b.h * k, x0 = b.x + 1.4;
      ctx.fillRect(x0, y - 0.55, edge(y) - 2.4 - x0, 1.1);
    });
  }

  function drawShelf(ctx, size, p) {
    const dpr = ctx.canvas.width / size;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.setTransform(dpr * size / 100, 0, 0, dpr * size / 100, 0, 0);

    if (p > 0.0001) {
      ctx.globalAlpha = clamp((p - 0.15) / 0.6);
      ctx.fillStyle = COLORS.main;
      ctx.beginPath(); ctx.roundRect(8, 89.4, 84, 2.6, 1.3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(8.5, 80, 2.4, 10, 1.2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    BOOKS.forEach((b) => {
      const index = ASSEMBLE.length - 1 - ASSEMBLE.indexOf(b.name);
      const e = smooth(clamp((p - index * STAGGER) / SPAN));
      const inB = b.tilt ? pivot(b, b.x + b.w, b.y + b.h, b.x + b.w, b.y + b.h, b.tilt) : { dx: 0, dy: 0, angle: 0 };
      const on = SHELF[b.name];
      const dx = lerp(inB.dx, on.dx, e), dy = lerp(inB.dy, on.dy, e), angle = lerp(inB.angle, on.angle, e);

      ctx.save();
      ctx.translate(b.cx + dx, b.cy + dy);
      ctx.rotate(angle * Math.PI / 180);
      ctx.translate(-b.cx, -b.cy);

      const radius = b.kind === 'endOn' ? lerp(b.spine, 1.2, e) : 1.2;
      ctx.fillStyle = b.today ? COLORS.today : COLORS.main;
      bodyPath(ctx, b, 1.2, radius);
      ctx.fill();

      ctx.fillStyle = COLORS.cut;
      if (b.kind === 'upright') bands(ctx, b);
      else if (b.kind === 'lying') [b.x + 2.8, b.x + 4.7, b.x + b.w - 3.6].forEach((x) => ctx.fillRect(x, b.y + 1.1, 1.1, b.h - 2.2));
      else {
        ctx.globalAlpha = 1 - e; pages(ctx, b, radius);
        ctx.globalAlpha = e; bands(ctx, b);
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    });
  }

  // ---------------------------------------------------------------- scenes

  const vp = { w: 0, h: 0 };
  const sceneProgress = (el) => {
    const r = el.getBoundingClientRect();
    const total = r.height - vp.h;
    return total > 0 ? clamp(-r.top / total) : (r.top < 0 ? 1 : 0);
  };

  // 1 · Opening
  const open = document.querySelector('[data-scene="open"]');
  const canvas = document.querySelector('[data-open-mark]');
  const ctx = canvas && canvas.getContext('2d');
  const intro = document.querySelector('[data-open-intro]');
  const copy = document.querySelector('[data-open-copy]');
  const hint = document.querySelector('[data-open-hint]');
  const geo = { S: 0, m: 0, startY: 0, endY: 0, copyTop: 0 };

  function layoutOpen() {
    if (!open) return;
    const S = Math.round(Math.min(vp.h * 0.6, vp.w * 0.86, 560));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = S * dpr; canvas.height = S * dpr;
    canvas.style.width = S + 'px'; canvas.style.height = S + 'px';
    const m = Math.round(clamp(vp.h * 0.17, 92, 150));
    const gap = 18;
    const hc = copy.offsetHeight;
    const total = m + gap + hc;
    const top = Math.max(72, (vp.h - total) / 2);
    Object.assign(geo, { S, m, startY: vp.h / 2 + S * 0.02, endY: top + m / 2, copyTop: top + m + gap });
    copy.style.top = geo.copyTop + 'px';
    intro.style.top = Math.max(84, geo.startY - S / 2 - 8) + 'px';
  }

  function renderOpen(p) {
    if (!open) return;
    const build = smooth(range(p, 0.02, 0.5));       // shelf → B
    const shrink = smooth(range(p, 0.5, 0.8));       // B moves up and shrinks
    const reveal = smooth(range(p, 0.62, 0.9));      // copy comes in
    drawShelf(ctx, geo.S, 1 - build);
    const k = lerp(1, geo.m / geo.S, shrink);
    const cy = lerp(geo.startY, geo.endY, shrink);
    canvas.style.transform = `translate(${vp.w / 2 - geo.S / 2}px, ${cy - geo.S / 2}px) scale(${k})`;
    intro.style.opacity = 1 - range(build, 0, 0.45);
    intro.style.transform = `translateY(${-24 * range(build, 0, 0.45)}px)`;
    copy.style.opacity = reveal;
    copy.style.transform = `translate(-50%, ${36 * (1 - reveal)}px)`;
    copy.style.pointerEvents = reveal > 0.6 ? 'auto' : 'none';
    hint.style.opacity = 1 - range(p, 0.02, 0.12);
  }

  // 2 · A study day
  const day = document.querySelector('[data-scene="day"]');
  const steps = [...document.querySelectorAll('[data-day-step]')];
  const layers = [...document.querySelectorAll('[data-day-layer]')];
  const clock = document.querySelector('[data-day-clock]');
  const ring = document.querySelector('[data-day-ring]');
  const photo = document.querySelector('[data-day-photo]');
  const flash = document.querySelector('[data-day-flash]');
  const check = document.querySelector('[data-day-check]');
  const count = document.querySelector('[data-day-count]');
  const week = document.querySelector('[data-day-week]');
  let lastStep = -1, lastFilled = -1;

  function buildWeek() {
    if (!week) return;
    const fmt = new Intl.DateTimeFormat(lang === 'en' ? 'en' : 'pt-BR', { weekday: 'narrow' });
    const today = new Date();
    week.innerHTML = '';
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const el = document.createElement('span');
      el.className = 'streak__day';
      el.innerHTML = `<b>✓</b><small>${fmt.format(d).toUpperCase()}</small>`;
      week.appendChild(el);
    }
    lastFilled = -1;
  }

  function renderDay(p) {
    if (!day) return;
    const step = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
    if (step !== lastStep) {
      steps.forEach((li, i) => li.classList.toggle('is-on', i === step));
      lastStep = step;
    }
    const o = [
      1 - range(p, 0.3, 0.36),
      range(p, 0.3, 0.36) * (1 - range(p, 0.63, 0.69)),
      range(p, 0.63, 0.69),
    ];
    layers.forEach((l, i) => {
      l.style.opacity = o[i];
      l.style.transform = `scale(${0.96 + 0.04 * o[i]})`;
    });

    // Timer: a 25-minute session runs out as you scroll.
    const t = range(p, 0.02, 0.3);
    const left = Math.round(25 * 60 * (1 - t));
    clock.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    ring.style.strokeDashoffset = 339.3 * (1 - t);

    // Photo: lands on the desk, flashes, gets its check.
    const ph = range(p, 0.36, 0.6);
    const drop = smooth(range(ph, 0, 0.7));
    photo.style.transform = `translateY(${(1 - drop) * 180}px) rotate(${lerp(14, -4, drop)}deg)`;
    flash.style.opacity = Math.max(0, 1 - Math.abs(ph - 0.78) / 0.08) * 0.9;
    const c = range(ph, 0.82, 1);
    check.style.transform = `scale(${c < 1 ? smooth(c) * 1.15 : 1})`;

    // Streak: the week fills in and the count climbs to seven.
    const filled = Math.min(7, Math.floor(range(p, 0.7, 0.96) * 7 + 0.0001));
    if (filled !== lastFilled) {
      [...week.children].forEach((d, i) => d.classList.toggle('is-on', i < filled));
      count.textContent = filled;
      lastFilled = filled;
    }
  }

  // 3 · Features
  const feat = document.querySelector('[data-scene="feat"]');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const screens = [...document.querySelectorAll('[data-feat-screen]')];
  const phone = document.querySelector('[data-feat-phone]');
  const glow = document.querySelector('[data-feat-glow]');
  const pill = document.querySelector('[data-feat-pill]');
  const TINTS = { gold: 'rgba(217,179,106,.22)', sage: 'rgba(125,196,168,.22)', blue: 'rgba(143,195,221,.22)' };
  let lastChapter = -1;

  function renderFeat(p) {
    if (!feat) return;
    let best = 0, bestD = Infinity;
    chapters.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - vp.h / 2);
      if (d < bestD) { bestD = d; best = i; }
    });
    if (best !== lastChapter) {
      chapters.forEach((c, i) => c.classList.toggle('is-on', i === best));
      screens.forEach((s, i) => s.classList.toggle('is-on', i === best));
      glow.style.setProperty('--tint', TINTS[chapters[best].dataset.tint] || TINTS.sage);
      pill.classList.toggle('is-on', best === 0);
      lastChapter = best;
    }
    phone.style.transform = `rotate(${lerp(-3, 3, p)}deg) translateY(${lerp(16, -16, p)}px)`;
  }

  // Parallax and the reading bar
  const parallax = [...document.querySelectorAll('[data-speed]')];
  const bar = document.querySelector('[data-scrollbar]');
  const nav = document.querySelector('[data-nav]');

  function frame() {
    ticking = false;
    const y = window.scrollY;
    nav && nav.classList.toggle('is-scrolled', y > 16);
    const max = document.documentElement.scrollHeight - vp.h;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (reduceMotion) return;

    if (open) { const r = open.getBoundingClientRect(); if (r.bottom > 0 && r.top < vp.h) renderOpen(sceneProgress(open)); }
    if (day) { const r = day.getBoundingClientRect(); if (r.bottom > 0 && r.top < vp.h) renderDay(sceneProgress(day)); }
    if (feat && vp.w > 960) { const r = feat.getBoundingClientRect(); if (r.bottom > 0 && r.top < vp.h) renderFeat(sceneProgress(feat)); }
    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      const d = r.top + r.height / 2 - vp.h / 2;
      el.style.transform = `translateY(${d * parseFloat(el.dataset.speed)}px)`;
    });
  }

  let ticking = false;
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };

  function layout() {
    vp.w = window.innerWidth; vp.h = window.innerHeight;
    layoutOpen();
    if (reduceMotion) {
      // Finished states, laid out once.
      renderOpen(1); renderDay(1);
      chapters.forEach((c) => c.classList.add('is-on'));
      screens.forEach((s, i) => s.classList.toggle('is-on', i === 0));
    }
    lastStep = -1; lastFilled = -1; lastChapter = -1;
    frame();
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', () => { layout(); });

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  if (!saved) saved = (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  applyLang(saved);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  // Simple reveals for the sections after the scenes.
  const targets = document.querySelectorAll('.reveal, .mark');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add('is-in'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
