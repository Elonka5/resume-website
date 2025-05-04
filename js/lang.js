import { renderEducationList } from "./education.js";
import { initForm } from "./form.js";
import { renderProjectList } from "./projects.js";

// export async function loadTranslations(lang) {
//     const res = await fetch(`locales/${lang}.json`);
//     if (!res.ok) throw new Error(`Translation load failed for lang: ${lang}`);
//     return await res.json();
//   }
  
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
    
//     const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
//   placeholderElements.forEach((el) => {
//     const keys = el.getAttribute("data-i18n-placeholder").split(".");
//     let text = translations;
//     for (let key of keys) {
//       if (text[key]) text = text[key];
//     }
//     if (typeof text === "string") {
//       el.placeholder = text;
//     }
//   });
  
//     const animatedElements = document.querySelectorAll('[data-i18n-key]');
//     const observer = new IntersectionObserver(
//         (entries, obs) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               const el = entry.target;
//               const keys = el.getAttribute('data-i18n-key').split('.');
//               let value = translations;
//               for (let key of keys) value = value?.[key];
//               if (Array.isArray(value)) {
//                 typeText(el, value);
//               }
//               obs.unobserve(el);
//             }
//           });
//         },
//         { threshold: 0.4 }
//       );
    
//       animatedElements.forEach(el => observer.observe(el));
//   }
  
//   export async function setLanguage(lang) {
//     localStorage.setItem('lang', lang);
//     const translations = await loadTranslations(lang);
//     applyTranslations(translations);
//     return translations; 
//   }
  
//   document.addEventListener('DOMContentLoaded', async () => {
//     const switcher = document.getElementById('languageSwitcher');
//     const savedLang = localStorage.getItem('lang') || 'uk';
//     if (switcher) {
//       switcher.value = savedLang;
//       switcher.addEventListener('change', (e) => setLanguage(e.target.value));
//     }
//     const translations = await setLanguage(savedLang);
//     renderEducationList(translations);
//     renderProjectList(translations);
//     initForm(translations);
//   });

  
export async function loadTranslations(lang) {
  const res = await fetch(`locales/${lang}.json`);
  if (!res.ok) throw new Error(`Translation load failed for lang: ${lang}`);
  return await res.json();
}

export function typeText(el, texts, speed = 100, pause = 1000) {
  if (el._typeTimeouts) {
    el._typeTimeouts.forEach(timeout => clearTimeout(timeout));
  }
  el._typeTimeouts = [];

  let currentTextIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    const currentText = texts[currentTextIndex];
    if (charIndex < currentText.length) {
      el.textContent += currentText[charIndex];
      charIndex++;
      const timeout = setTimeout(typeNextChar, speed);
      el._typeTimeouts.push(timeout);
    } else {
      currentTextIndex++;
      if (currentTextIndex < texts.length) {
        const timeout = setTimeout(() => {
          el.textContent = '';
          charIndex = 0;
          typeNextChar();
        }, pause);
        el._typeTimeouts.push(timeout);
      }
    }
  }

  el.textContent = '';
  typeNextChar();
}

export function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.getAttribute('data-i18n').split('.');
    let text = translations;
    for (let key of keys) {
      if (text[key]) text = text[key];
    }
    if (typeof text === 'string') el.textContent = text;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const keys = el.getAttribute("data-i18n-placeholder").split(".");
    let text = translations;
    for (let key of keys) {
      if (text[key]) text = text[key];
    }
    if (typeof text === "string") {
      el.placeholder = text;
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
  const dropdown = document.getElementById('languageSwitcher');
  const selectedValue = dropdown.querySelector('.selected-value');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const langItems = dropdownMenu.querySelectorAll('li');

  const savedLang = localStorage.getItem('lang') || 'uk';


  const activeItem = [...langItems].find(li => li.dataset.value === savedLang);
  if (activeItem) {
    selectedValue.textContent = activeItem.textContent;
    langItems.forEach(li => li.classList.remove('active'));
    activeItem.classList.add('active');
  }


  const translations = await setLanguage(savedLang);
  renderEducationList(translations);
  renderProjectList(translations);
  initForm(translations);


  langItems.forEach(item => {
    item.addEventListener('click', async () => {
      const newLang = item.dataset.value;
      if (newLang === localStorage.getItem('lang')) return;

      langItems.forEach(li => li.classList.remove('active'));
      item.classList.add('active');
      selectedValue.textContent = item.textContent;

      const newTranslations = await setLanguage(newLang);
      renderEducationList(newTranslations);
      renderProjectList(newTranslations);
      initForm(newTranslations);
    });
  });


  const toggleBtn = dropdown.querySelector('.dropdown-toggle');
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});
