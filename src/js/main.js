import { loadTranslations, applyTranslations, animateI18nKeys } from './lang.js';
import { renderSkillsList } from './skills.js';
import { renderEducationList } from './education.js';

const skills = [
  "JavaScript", "TypeScript", "Responsive Design", "HTML5", "CSS", "SCSS",
  "React", "React Router", "Redux", "Next.js", "Next Intl",
  "Tailwind", "Material UI", "Node.js", "Git", "API Integration"
];

document.addEventListener('DOMContentLoaded', async () => {
  const savedLang = localStorage.getItem('lang') || 'uk';
  const translations = await loadTranslations(savedLang);

  applyTranslations(translations);
  animateI18nKeys(translations);
  renderSkillsList(skills);
  renderEducationList(translations);

  const switcher = document.getElementById('languageSwitcher');
  if (switcher) {
    switcher.value = savedLang;
    switcher.addEventListener('change', async (e) => {
      const newLang = e.target.value;
      localStorage.setItem('lang', newLang);
      const newTranslations = await loadTranslations(newLang);
      applyTranslations(newTranslations);
      animateI18nKeys(newTranslations);
      renderEducationList(newTranslations);
    });
  }
});
