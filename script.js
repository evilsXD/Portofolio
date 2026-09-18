// script.js

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     0. SCROLL REVEAL ANIMATION (konsisten setiap arah scroll)
  ========================================================= */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, {
    threshold: 0.15,
    rootMargin: '-15% 0px -15% 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));
  /* =========================================================
     1. TOGGLE BAHASA (ID/EN) — pakai innerHTML
  ========================================================= */
  const langToggle = document.getElementById('lang-toggle');
  const translatableEls = document.querySelectorAll('[data-id][data-en]');

  function applyLanguage(lang) {
    translatableEls.forEach(el => {
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.id;
    });
    langToggle.textContent = lang === 'en' ? 'ID' : 'EN';
    document.documentElement.lang = lang;
  }

  const savedLang = localStorage.getItem('lang') || 'id';
  applyLanguage(savedLang);

  langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.lang === 'en' ? 'en' : 'id';
    const newLang = currentLang === 'id' ? 'en' : 'id';
    applyLanguage(newLang);
    localStorage.setItem('lang', newLang);
  });


  /* =========================================================
     2. TOGGLE DARK / LIGHT MODE
  ========================================================= */
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      iconSun.classList.remove('hidden');
      iconMoon.classList.add('hidden');
    } else {
      htmlEl.classList.remove('dark');
      iconMoon.classList.remove('hidden');
      iconSun.classList.add('hidden');
    }
  }

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', () => {
    const isDark = htmlEl.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });


  /* =========================================================
     3. SMOOTH SCROLL SAAT LINK NAVBAR DIKLIK
  ========================================================= */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});