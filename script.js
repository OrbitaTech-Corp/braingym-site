// ============================================================
// BrainGym — animation engine (GSAP + ScrollTrigger) + i18n
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// i18n — PT-BR ↔ EN
// HTML ships with PT-BR baked in. The EN dictionary swaps innerHTML
// for every [data-i18n] node when the user toggles language. Selection
// is persisted in localStorage. <html lang> is updated on each switch.
// ============================================================
const I18N = {
  en: {
    // Nav
    'nav.features':   'Features',
    'nav.badges':     'Achievements',
    'nav.why':        'Why',
    'nav.download':   'Download',
    'nav.cta':        'Get it free',

    // Hero
    'hero.eyebrow':   'Coming soon to the App Store',
    'hero.title.l1':  'EVERY DAY',
    'hero.title.l2':  '<span class="grad">MATTERS.</span>',
    'hero.title.l3':  'EACH DAY <span class="cyan">COUNTS.</span>',
    'hero.tagline':   'Track streaks, earn XP, level up with friends. <strong class="wordmark wordmark--inline">BrainGym</strong> turns every study session into real proof, not just a checkbox.',
    'hero.cta.small': 'Download on the',
    'hero.cta.ghost': 'See how it works',

    // Stats
    'stat.streak':    'Avg streak (days)',
    'stat.sessions':  'Sessions logged',
    'stat.badges':    'Badges to unlock',
    'stat.retention': 'Weekly retention',

    // Marquee
    'marquee':        'DAILY CHECK-IN <span class="sep">/</span> STREAK <span class="sep">/</span> XP &amp; LEVELS <span class="sep">/</span> SOCIAL FEED <span class="sep">/</span> BADGES <span class="sep">/</span> WIDGETS <span class="sep">/</span> DAILY CHECK-IN <span class="sep">/</span> STREAK <span class="sep">/</span>',

    // Features
    'features.eyebrow': 'How it works',
    'features.title':   'Four habits.<br><span class="outline">One app.</span>',
    'rail.01':          'Home',
    'rail.02':          'Challenges',
    'rail.03':          'Feed',
    'rail.04':          'Stats',

    'feat.01.pill':  'Habit 01 · Home',
    'feat.01.title': 'Your home screen,<br>your habit.',
    'feat.01.desc':  "Daily streak, today's sessions, time studied, and your best record, all on the first screen. Your subjects listed, ready for a check-in in seconds.",
    'feat.01.b1':    'Personal greeting + level and XP',
    'feat.01.b2':    'Streak card with at-risk indicator',
    'feat.01.b3':    'Shortcuts: My Subjects and Calendar',
    'feat.01.b4':    'Embedded weekly stats widget',

    'feat.02.pill':  'Habit 02 · Challenges',
    'feat.02.title': 'Group<br>challenges.',
    'feat.02.desc':  'Create a challenge, pick subjects, set dates and ranking mode. Invite friends and see who shows up. Discipline becomes healthy competition.',
    'feat.02.b1':    'Custom period: week, month, sprint',
    'feat.02.b2':    'Ranked by check-ins, time, or XP',
    'feat.02.b3':    'Weekly goal per participant',
    'feat.02.b4':    'Live leaderboard tracking',

    'feat.03.pill':  'Habit 03 · Feed',
    'feat.03.title': 'A feed that<br>pulls you up.',
    'feat.03.desc':  "Every friend's session becomes a post. React, comment, celebrate. Seeing others studying is the push you needed to open the app again.",
    'feat.03.b1':    'Chronological check-in timeline',
    'feat.03.b2':    'Quick reactions on every post',
    'feat.03.b3':    'Proof photo + subject + session length',
    'feat.03.b4':    'Filters: today, friends, all',

    'feat.04.pill':  'Habit 04 · Stats',
    'feat.04.title': 'Stats that<br>matter.',
    'feat.04.desc':  'Total sessions, accumulated time, average session, and best streak. Weekly activity in bars, breakdown by subject, monthly trend. Honest data to course-correct.',
    'feat.04.b1':    '4 metric cards at the top',
    'feat.04.b2':    'Navigable weekly activity',
    'feat.04.b3':    'Subject breakdown with %',
    'feat.04.b4':    'Monthly trend with line chart',

    // Badges
    'badges.eyebrow': 'Collection',
    'badges.title':   '<span class="grad">42</span><br>badges to<br>hunt down.',
    'badges.intro':   'Each milestone becomes a medal. Some you unlock in 3 days, others only after months of discipline. Drag to see them all.',

    'badge.01.name': 'Spark',
    'badge.01.desc': 'Your first official check-in. Welcome to the discipline club.',
    'badge.01.req':  'REQ · 1 session',

    'badge.02.name': 'Streak<br>of Seven.',
    'badge.02.desc': '7 days straight without missing. The habit starts coming off paper.',
    'badge.02.req':  'REQ · 7-day streak',

    'badge.03.name': 'Surgical<br>Aim',
    'badge.03.desc': "100h on a single subject. You're not learning anymore, you're mastering it.",
    'badge.03.req':  'REQ · 100h per subject',

    'badge.04.name': 'High<br>Tide',
    'badge.04.desc': '30 days straight. Studying became as automatic as brushing your teeth.',
    'badge.04.req':  'REQ · 30-day streak',

    'badge.05.name': 'Own<br>Garden',
    'badge.05.desc': '5 different subjects with active streaks at once. Polymath in the making.',
    'badge.05.req':  'REQ · 5 active streaks',

    'badge.06.name': 'No<br>Mercy',
    'badge.06.desc': "100 days straight. You don't study anymore, you ARE study.",
    'badge.06.req':  'REQ · 100-day streak',

    'badge.07.name': 'The<br>Legend',
    'badge.07.desc': "365 days. A whole year of check-ins. This isn't about the app anymore, it's about who you've become.",
    'badge.07.req':  'REQ · 365-day streak',

    // Compare
    'compare.eyebrow':       'The problem',
    'compare.title':         "You've tried<br><span class=\"accent\">everything.</span>",
    'compare.before.label':  'Before BrainGym',
    'compare.before.title':  'Routines<br>always broke.',
    'compare.before.b1':     'Pretty spreadsheet on Monday, abandoned by Wednesday',
    'compare.before.b2':     'Cold timer app, no reason to open it tomorrow',
    'compare.before.b3':     'Notion full of templates you never filled in',
    'compare.before.b4':     'Studied 4h yesterday? Forgot. No proof, no pride',
    'compare.before.b5':     'Studying alone, nobody sees, nobody pushes',

    'compare.after.label':   'With BrainGym',
    'compare.after.title':   'The streak<br>pulls you back.',
    'compare.after.b1':      'Daily streak with freeze for off days',
    'compare.after.b2':      'Photo + timer = visual proof that becomes memory',
    'compare.after.b3':      "Home screen widget reminding you what's left today",
    'compare.after.b4':      'XP, levels, and badges. The game is to keep playing',
    'compare.after.b5':      'Feed and challenges. The whole team studying together',

    // Quotes
    'quotes.eyebrow': 'Closed beta',
    'quotes.title':   'What testers<br>are saying.',
    'quote.01.text':  '"I was at 73 days streak when I finally felt like quitting. Then I remembered the 100-day badge. I came back."',
    'quote.01.role':  'Pre-med student',
    'quote.02.text':  '"Photo check-in is the detail that changes everything. You can\'t lie to the app, so you stop lying to yourself."',
    'quote.02.role':  'Civil servant exam · TJ',
    'quote.03.text':  '"My whole college group migrated. Now BrainGym\'s feed comes before Instagram when I wake up."',
    'quote.03.role':  'USP · Computer Eng.',

    // CTA
    'cta.eyebrow':   'Available soon',
    'cta.title.l1':  'YOUR STREAK',
    'cta.title.l2':  'STARTS <span class="accent">TODAY.</span>',
    'cta.sub':       "Free to start. No card. No ads. Just you, your subject, and the app that'll remind you to show up.",

    // Footer
    'footer.privacy': 'Privacy',
    'footer.terms':   'Terms',
    'footer.contact': 'Contact',
    'footer.made':    'Made in Brazil',
    'footer.tagline': 'Every day matters. Each day counts.',

    // Meta (document.title etc.)
    'meta.title':       'BrainGym · Every day matters. Each day counts.',
    'meta.description': 'Track streaks, earn XP, level up with friends. Photo check-in, daily streaks, and badges. Discipline that becomes habit.',
  }
};

// Cache the original PT-BR HTML on first apply so we can restore it.
const PT_CACHE = new WeakMap();

function applyLang(lang) {
  if (lang !== 'pt' && lang !== 'en') lang = 'pt';
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  try { localStorage.setItem('braingym.lang', lang); } catch (_) {}

  const dict = lang === 'en' ? I18N.en : null;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (!PT_CACHE.has(el)) PT_CACHE.set(el, el.innerHTML);
    if (dict && Object.prototype.hasOwnProperty.call(dict, el.dataset.i18n)) {
      el.innerHTML = dict[el.dataset.i18n];
    } else {
      el.innerHTML = PT_CACHE.get(el);
    }
  });

  // <title> + meta description / og
  const title = lang === 'en' ? I18N.en['meta.title'] : 'BrainGym · Todo dia importa. Cada dia conta.';
  const desc  = lang === 'en' ? I18N.en['meta.description'] : 'Acompanhe sequências, ganhe XP, suba de nível com amigos. Check-in com foto, streaks diárias e badges. Disciplina que vira hábito.';
  document.title = title;
  document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(m => m.setAttribute('content', desc));
  document.querySelectorAll('meta[property="og:title"]').forEach(m => m.setAttribute('content', title));

  // Toggle UI active state
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.classList.toggle('is-active', b.dataset.lang === lang);
  });
}

function initLang() {
  let saved = 'pt';
  try { saved = localStorage.getItem('braingym.lang') || 'pt'; } catch (_) {}
  if (saved === 'en') applyLang('en');
  // Wire toggle clicks
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.addEventListener('click', () => applyLang(b.dataset.lang));
  });
}
initLang();

// Smooth scroll on anchor clicks
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length <= 1) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Wrap each word of hero/cta lines for a stagger reveal =====
// Each word becomes <span class="word"><span class="word-i">…</span></span>
// so we can translateY(110%) on .word-i and clip with overflow:hidden on .word.
function wrapWords() {
  document.querySelectorAll('.hero__title .line, .cta__title .line').forEach(line => {
    const inner = line.querySelector('span[data-text]');
    if (!inner) return;

    const frag = document.createDocumentFragment();
    const wrap = (node) => {
      const outer = document.createElement('span');
      outer.className = 'word';
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.lineHeight = '0.95';
      outer.style.paddingBottom = '0.04em';
      const innerSpan = document.createElement('span');
      innerSpan.className = 'word-i';
      innerSpan.style.display = 'inline-block';
      innerSpan.style.willChange = 'transform';
      if (node.nodeType === Node.TEXT_NODE) {
        innerSpan.textContent = node.textContent;
      } else {
        innerSpan.appendChild(node.cloneNode(true));
      }
      outer.appendChild(innerSpan);
      return outer;
    };

    Array.from(inner.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            frag.appendChild(document.createTextNode(p));
          } else {
            frag.appendChild(wrap(document.createTextNode(p)));
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        frag.appendChild(wrap(node));
      }
    });

    inner.innerHTML = '';
    inner.appendChild(frag);
  });
}
wrapWords();

// ===== Heatmap dots
(function buildHeatmap(){
  const heat = document.getElementById('heatmap');
  if (!heat) return;
  const total = 14 * 6;
  for (let i = 0; i < total; i++) {
    const s = document.createElement('span');
    const r = Math.random();
    if (r > 0.7) s.style.background = '#3B82F6';
    else if (r > 0.5) s.style.background = 'rgba(59,130,246,0.6)';
    else if (r > 0.3) s.style.background = 'rgba(59,130,246,0.3)';
    heat.appendChild(s);
  }
})();

if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
  document.documentElement.classList.add('no-gsap');
  console.warn('[BrainGym] GSAP not loaded — static fallback active.');
} else {
  bootAnimations();
}

function bootAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Only after GSAP is confirmed loaded do we let CSS hide .fade-up elements.
  // If JS never reaches this point, .fade-up stays visible (graceful degradation).
  // If we further detect a paused ticker (hidden tab), we don't add it either.
  if (!document.hidden && !reduceMotion) {
    document.documentElement.classList.add('js-ready');
  }

  // ===== Smooth scroll (Lenis) =============================
  // Lerps the native scroll position for a buttery, weighty feel.
  // Bridged into ScrollTrigger so all scroll-tied animations stay in sync.
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !reduceMotion) {
    lenis = new Lenis({
      duration: 1.15,                 // higher = more "weight"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;          // exposed for cross-module reuse (rail jump, etc)
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Anchor links should use Lenis so the smoothing applies during jumps.
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length <= 1) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        lenis.scrollTo(el, { offset: -60, duration: 1.4, lock: true });
      }, { capture: true });
    });
  }

  // ===== Nav scrolled state ================================
  ScrollTrigger.create({
    start: 80, end: 'max',
    toggleClass: { targets: '[data-nav]', className: 'is-scrolled' },
  });

  // ===== Scroll progress bar ================================
  gsap.to('.scroll-progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  // marqueeTween is created later; the velocity hook references it via closure.
  let marqueeTween = null;

  // ===== Scroll-velocity reaction (alive feel) =============
  // Marquee subtly squishes and speeds up/slows down based on scroll velocity
  // for that satisfying "things react to your scroll" feedback.
  if (lenis) {
    const marqueeTrack = document.getElementById('marquee');
    lenis.on('scroll', ({ velocity }) => {
      const v = Math.max(-3, Math.min(3, velocity / 60));   // normalize
      if (marqueeTrack) {
        gsap.to(marqueeTrack, {
          skewX: v * 4,
          scaleY: 1 - Math.abs(v) * 0.04,
          duration: 0.5, ease: 'power3.out', overwrite: 'auto',
        });
      }
      if (marqueeTween) {
        gsap.to(marqueeTween, {
          timeScale: 1 + Math.abs(v) * 1.2,
          duration: 0.4, overwrite: 'auto',
        });
      }
    });
  }

  if (reduceMotion) {
    gsap.set('.fade-up', { opacity: 1, y: 0 });
    initPinnedFeatures(true);
    return;
  }

  // ===== Hero entrance ====================================
  // Only animate elements that start hidden via the .fade-up class (CSS-controlled
  // initial state). Hero title and phone are always visible in their natural CSS
  // state — no hide-then-reveal — so a paused GSAP ticker (e.g. backgrounded tab,
  // preview tools) can never leave them stuck invisible.
  gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } })
    .to('.eyebrow.fade-up', { y: 0, opacity: 1, duration: 0.6 })
    .to('.hero__tagline',   { y: 0, opacity: 1, duration: 0.7 }, 0.15)
    .to('.hero__ctas',      { y: 0, opacity: 1, duration: 0.7 }, 0.3);

  // ===== Hero phone — scrubbed tilt + parallax while user scrolls the hero
  gsap.to('.hero__phone-wrap', {
    rotationY: 8,
    rotationX: -4,
    yPercent: -22,
    scale: 0.94,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
  });

  // Hero copy slides up slightly faster than the phone — depth via differential parallax.
  gsap.to('.hero__copy', {
    yPercent: -12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
    },
  });

  // Section titles drift up subtly as you pass them — gives the page weight.
  gsap.utils.toArray('.section__title, .compare h4, .quotes .section__title').forEach(t => {
    gsap.to(t, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  });

  // ===== Hero stats fade-in ================================
  gsap.to('.hero__stats .stat', {
    y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
    scrollTrigger: { trigger: '.hero__stats', start: 'top 90%', toggleActions: 'play none none none' }
  });

  // ===== Counter animations =================================
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || (target >= 1000 ? '+' : '');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 95%',
      once: true,
      onEnter: () => {
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.floor(o.v).toLocaleString('pt-BR') + suffix;
          }
        });
      }
    });
  });

  // ===== Marquee infinite scroll ============================
  marqueeTween = gsap.to('#marquee', {
    xPercent: -50,
    repeat: -1,
    duration: 30,
    ease: 'none'
  });

  // ===== Section title reveal ===============================
  gsap.utils.toArray('.section__title').forEach(t => {
    if (t.closest('.cta')) return;
    gsap.from(t, {
      scrollTrigger: { trigger: t, start: 'top 85%' },
      y: 60, opacity: 0, duration: 1, ease: 'expo.out'
    });
  });
  gsap.utils.toArray('.section__eyebrow').forEach(t => {
    gsap.from(t, {
      scrollTrigger: { trigger: t, start: 'top 90%' },
      x: -20, opacity: 0, duration: 0.6, ease: 'power2.out'
    });
  });

  // ===== Hero parallax glows ================================
  gsap.to('.hero__glow', {
    y: 200,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero__glow--cyan', {
    y: 100, x: -100,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero__glow--accent', {
    y: 150, x: 100,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // ===== Pinned features ====================================
  initPinnedFeatures(false);

  // ===== Horizontal badges ==================================
  const badgesTrack = document.getElementById('badgesTrack');
  const badgesSection = document.getElementById('badges');
  if (badgesTrack && badgesSection) {
    const getDistance = () => badgesTrack.scrollWidth - window.innerWidth;
    ScrollTrigger.create({
      trigger: badgesSection,
      start: 'top top',
      end: () => `+=${getDistance() + 200}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      animation: gsap.to(badgesTrack, {
        x: () => -getDistance(),
        ease: 'none'
      })
    });
  }

  // ===== Comparison columns =================================
  gsap.utils.toArray('.compare__col').forEach((col, i) => {
    gsap.from(col, {
      scrollTrigger: { trigger: col, start: 'top 80%' },
      y: 60, opacity: 0, duration: 0.9, ease: 'expo.out', delay: i * 0.1
    });
  });
  gsap.utils.toArray('.compare__list li').forEach((li) => {
    gsap.from(li, {
      scrollTrigger: { trigger: li, start: 'top 92%' },
      x: -20, opacity: 0, duration: 0.5, ease: 'power2.out'
    });
  });

  // ===== Quotes =============================================
  gsap.utils.toArray('.quote').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 50, opacity: 0, duration: 0.8, ease: 'expo.out', delay: i * 0.1
    });
  });

  // ===== CTA ================================================
  // CTA title and elements are visible by default; we layer in a soft fade-up
  // only via gsap.from on elements that gracefully degrade. The big Anton
  // title is intentionally NOT animated to avoid stuck-invisible regressions.
  ScrollTrigger.create({
    trigger: '.cta',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.from('.cta__sub',       { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.from('.cta .btn-store', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.35 });
    }
  });

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

function initPinnedFeatures(reduceMotion) {
  const wrap = document.getElementById('pinnedWrap');
  if (!wrap) return;
  const features = gsap.utils.toArray('.pinned__feat');
  const phones   = gsap.utils.toArray('#phoneStack .phone');
  const railItems = gsap.utils.toArray('.pinned__rail-item');
  const total    = features.length;
  if (!total) return;

  gsap.set('.pinned__feat:not(.is-active)', { opacity: 0, y: 20 });
  gsap.set('#phoneStack .phone:not(.is-active)', { opacity: 0, y: 60, scale: 0.94 });

  // Helper to swap active feature/phone/rail in sync.
  const setActive = (idx) => {
    features.forEach((f, i) => {
      const active = i === idx;
      f.classList.toggle('is-active', active);
      gsap.to(f, {
        opacity: active ? 1 : 0,
        y: active ? 0 : 20,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    phones.forEach((p, i) => {
      const active = i === idx;
      p.classList.toggle('is-active', active);
      gsap.to(p, {
        opacity: active ? 1 : 0,
        y: active ? 0 : 60,
        scale: active ? 1 : 0.94,
        rotateY: active ? 0 : -10,
        duration: 0.7,
        ease: 'expo.out'
      });
    });
    railItems.forEach((r, i) => r.classList.toggle('is-active', i === idx));
  };

  if (reduceMotion || typeof ScrollTrigger === 'undefined') {
    setActive(0);
    return;
  }

  const pinST = ScrollTrigger.create({
    trigger: wrap,
    start: 'top top+=80',
    end: () => `+=${window.innerHeight * total}`,
    pin: true,
    scrub: false,
    snap: {
      snapTo: (v) => Math.round(v * (total - 1)) / (total - 1),
      duration: 0.4,
      ease: 'power2.inOut'
    },
    onUpdate: (self) => {
      const idx = Math.min(total - 1, Math.max(0, Math.floor(self.progress * total - 0.0001)));
      setActive(idx);
    }
  });

  // Rail click → smooth-jump to that feature's snap point.
  // Computes scroll position from the pin trigger's start/end and the desired
  // progress (idx / (total - 1)), then routes through Lenis if available so
  // the jump stays consistent with the rest of the page.
  const lenis = window.__lenis || null;
  railItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.target, 10);
      if (Number.isNaN(idx)) return;
      const progress = total > 1 ? idx / (total - 1) : 0;
      const targetY = pinST.start + progress * (pinST.end - pinST.start);
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.0, lock: true });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });
}
