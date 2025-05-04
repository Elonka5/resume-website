const skills = [
    "JavaScript",
    "TypeScript",
    "Responsive Design",
    "HTML5",
    "CSS",
    "SCSS",
    "React",
    "React Router",
    "Redux",
    "Next.js",
    "Next Intl",
    "Tailwind",
    "Material UI",
    "Node.js",
    "Git",
    "API Integration",
  ];
  
function renderSkillsList(array) {
    let markup = '';
  
    array.forEach((skill, index) => {
      markup += `<li class="skill-item" style="animation-delay: ${index * 0.2}s">${skill}</li>`;
    });
  
    const listContainer = document.getElementById('skills-list');
    listContainer.innerHTML = markup;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          renderSkillsList(skills);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.4,
    });
  
    observer.observe(skillsSection);
  });
  