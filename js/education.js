import {typeText } from "./lang.js";

export async function renderEducationList(translations) {
  const listContainer = document.getElementById("education-list");
  listContainer.innerHTML = '';
  let markup = "";

  Object.keys(translations.education).forEach((key) => {
    if (key !== "mainTitle" && key !== "description") {
      const education = translations.education[key];
      markup += `
        <li class="education-item">
          <h3 class="education-item-title" data-i18n-key="education.${key}.animatedTitle">${education.animatedTitle}</h3>
          <h4 class="education-item-subtitle" data-i18n="education.${key}.subtitle">${education.subtitle}</h4>
          <p class="education-item-date" data-i18n="education.${key}.date">${education.date}</p>
        </li>
      `;
    }
  });

  listContainer.insertAdjacentHTML("beforeend", markup);

  const animatedElements = listContainer.querySelectorAll("[data-i18n-key]");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const keys = el.getAttribute("data-i18n-key").split(".");
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

  animatedElements.forEach((el) => observer.observe(el));
}

