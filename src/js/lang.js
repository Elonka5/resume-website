async function loadTranslations(lang) {
    const res = await fetch(`locales/${lang}.json`);
    if (!res.ok) throw new Error(`Translation load failed for lang: ${lang}`);
    return await res.json();
  }
  
  function typeText(el, texts, speed = 100, pause = 1000) {
    let currentTextIndex = 0;
    let charIndex = 0;
  
    function typeNextChar() {
      const currentText = texts[currentTextIndex];
      if (charIndex < currentText.length) {
        el.textContent += currentText[charIndex];
        charIndex++;
        setTimeout(typeNextChar, speed);
      } else {
        currentTextIndex++;
        if (currentTextIndex < texts.length) {
          setTimeout(() => {
            el.textContent = '';
            charIndex = 0;
            typeNextChar();
          }, pause);
        }
      }
    }
  
    el.textContent = '';
    typeNextChar();
  }
  
  function applyTranslations(translations) {
    // Статичний текст
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const keys = el.getAttribute('data-i18n').split('.');
      let text = translations;
      for (let key of keys) {
        if (text[key]) text = text[key];
      }
      if (typeof text === 'string') {
        el.textContent = text;
      }
    });
  
    // Динамічний типований текст
    const animatedElements = document.querySelectorAll('[data-i18n-key]');
    animatedElements.forEach(el => {
      const keys = el.getAttribute('data-i18n-key').split('.');
      let value = translations;
      for (let key of keys) value = value?.[key];
      if (Array.isArray(value)) {
        typeText(el, value);
      }
    });
  }
  
  async function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('languageSwitcher');
    const savedLang = localStorage.getItem('lang') || 'uk';
    if (switcher) {
      switcher.value = savedLang;
      switcher.addEventListener('change', (e) => setLanguage(e.target.value));
    }
    setLanguage(savedLang);
  });
  