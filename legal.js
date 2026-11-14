// BrainGym — páginas legais: alternância PT/EN e nav com estado de scroll.
// Compartilha a chave `braingym.lang` com a landing, então o idioma escolhido
// na home continua valendo aqui.

(() => {
  const KEY = 'braingym.lang';
  const docs = document.querySelectorAll('[data-legal-doc]');
  const buttons = document.querySelectorAll('[data-legal-lang]');

  const NAV_LABELS = {
    pt: { 'index.html': 'Início', 'privacy.html': 'Privacidade', 'terms.html': 'Termos de Uso' },
    en: { 'index.html': 'Home', 'privacy.html': 'Privacy', 'terms.html': 'Terms of Use' },
  };

  function apply(lang) {
    docs.forEach((doc) => {
      doc.hidden = doc.dataset.legalDoc !== lang;
    });
    buttons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.legalLang === lang);
    });

    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    document.querySelectorAll('.nav__links a').forEach((a) => {
      const label = NAV_LABELS[lang][a.getAttribute('href')];
      if (label) a.textContent = label;
    });

    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => apply(btn.dataset.legalLang));
  });

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  apply(saved === 'en' ? 'en' : 'pt');

  const nav = document.querySelector('[data-nav]');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
