// export async function loadTranslations(lang) {
//     const res = await fetch(`locales/${lang}.json`);
//     if (!res.ok) throw new Error(`Translation load failed for lang: ${lang}`);
//     return await res.json();
//   }

import { renderEducationList } from "./education.js";
import { renderProjectList } from "./projects.js";

  
//   export function typeText(el, texts, speed = 100, pause = 1000) {
//     let currentTextIndex = 0;
//     let charIndex = 0;
  
//     function typeNextChar() {
//       const currentText = texts[currentTextIndex];
//       if (charIndex < currentText.length) {
//         el.textContent += currentText[charIndex];
//         charIndex++;
//         setTimeout(typeNextChar, speed);
//       } else {
//         currentTextIndex++;
//         if (currentTextIndex < texts.length) {
//           setTimeout(() => {
//             el.textContent = '';
//             charIndex = 0;
//             typeNextChar();
//           }, pause);
//         }
//       }
//     }
  
//     el.textContent = '';
//     typeNextChar();
//   }
  
//   export function applyTranslations(translations) {

//     const elements = document.querySelectorAll('[data-i18n]');
//     elements.forEach(el => {
//       const keys = el.getAttribute('data-i18n').split('.');
//       let text = translations;
//       for (let key of keys) {
//         if (text[key]) text = text[key];
//       }
//       if (typeof text === 'string') {
//         el.textContent = text;
//       }
//     });
  

//     const animatedElements = document.querySelectorAll('[data-i18n-key]');
//     animatedElements.forEach(el => {
//       const keys = el.getAttribute('data-i18n-key').split('.');
//       let value = translations;
//       for (let key of keys) value = value?.[key];
//       if (Array.isArray(value)) {
//         typeText(el, value);
//       }
//     });
//   }
  
//   async function setLanguage(lang) {
//     localStorage.setItem('lang', lang);
//     const translations = await loadTranslations(lang);
//     applyTranslations(translations);
//   }
  
//   document.addEventListener('DOMContentLoaded', () => {
//     const switcher = document.getElementById('languageSwitcher');
//     const savedLang = localStorage.getItem('lang') || 'uk';
//     if (switcher) {
//       switcher.value = savedLang;
//       switcher.addEventListener('change', (e) => setLanguage(e.target.value));
//     }
//     setLanguage(savedLang);
//   });

export async function loadTranslations(lang) {
    const res = await fetch(`locales/${lang}.json`);
    if (!res.ok) throw new Error(`Translation load failed for lang: ${lang}`);
    return await res.json();
  }
  
  export function typeText(el, texts, speed = 100, pause = 1000) {
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
  
  export function applyTranslations(translations) {
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
  
    const animatedElements = document.querySelectorAll('[data-i18n-key]');
    const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const keys = el.getAttribute('data-i18n-key').split('.');
              let value = translations;
              for (let key of keys) value = value?.[key];
              if (Array.isArray(value)) {
                typeText(el, value);
              }
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.4 }
      );
    
      animatedElements.forEach(el => observer.observe(el));
  }
  
  export async function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
    return translations; 
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const switcher = document.getElementById('languageSwitcher');
    const savedLang = localStorage.getItem('lang') || 'uk';
    if (switcher) {
      switcher.value = savedLang;
      switcher.addEventListener('change', (e) => setLanguage(e.target.value));
    }
    const translations = await setLanguage(savedLang);
    renderEducationList(translations);
    renderProjectList(translations);
  });