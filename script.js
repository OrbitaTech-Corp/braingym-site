// BrainGym — landing: PT/EN, nav on scroll, reveal on view.
// The language choice is stored under `braingym.lang`, shared with the
// legal pages (legal.js).

(() => {
  document.documentElement.classList.remove('no-js');
  const KEY = 'braingym.lang';

  const EN = {
    'nav.how': 'How it works',
    'nav.features': 'Features',
    'nav.pro': 'PRO',
    'nav.download': 'Get the app',
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

  // The Portuguese copy lives in the HTML; keep it to switch back.
  const PT = {};
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    PT[el.dataset.i18n] = el.textContent;
  });

  function apply(lang) {
    const dict = lang === 'en' ? EN : PT;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = dict[el.dataset.i18n];
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = lang === 'en' ? 'BrainGym · Every day counts.' : 'BrainGym · Cada dia conta.';
    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => apply(btn.dataset.lang));
  });

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  if (!saved) saved = (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  apply(saved === 'en' ? 'en' : 'pt');

  // Nav gets a backdrop once the page moves.
  const nav = document.querySelector('[data-nav]');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal blocks, and stack the B's books, as they come into view.
  const targets = document.querySelectorAll('.reveal, .mark');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add('is-in'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
