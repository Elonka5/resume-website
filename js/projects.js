export async function renderProjectList(translations) {
  const listContainer = document.getElementById('projects');
  listContainer.innerHTML = '';
  let markup = '';

  Object.keys(translations.projects).forEach((key) => {
    if (key !== 'animatedTitle') {
      const project = translations.projects[key];
      markup += `
      <li class="stack-item">
        <div class="gradient"></div>
        <img src="${project.src}" alt="${project.alt}" width="400" height="300" loading="lazy">
        <div class="polaroid"></div> 
        <ul class="polaroid-body">
          <li class="stack-text">
         <h3 class="project-item-title" data-i18n="projects.${key}.title">${project.title}</h3>
            <p class="project-item-date" data-i18n="projects.${key}.date">${project.date}</p>
            <p class="project-description">${project.description}</p>
            <div class="project-description-wrapper">
              <p class="project-description" data-i18n="projects.${key}.technologies">
                <strong>${project.technologies}</strong> 
              </p>
              <p class="project-description" data-i18n="projects.${key}.techStack">${project.techStack}</p>
            </div>
            <a href="${project.link}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${project.ariaLabel}"
               class="btn project-btn"
            >
              <span data-i18n="projects.${key}.textLink">${project.textLink}</span>
              <span class="circle">
                <svg class="btn-icon">
                  <use href="./assets/icons/icons.svg#arrow"></use>
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </li>
    `;
    }
  });

  listContainer.insertAdjacentHTML('beforeend', markup);

  const items = listContainer.querySelectorAll('.stack-item');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  items.forEach((item) => observer.observe(item));
}
