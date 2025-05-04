# Elona Savchenko's Resume Website 🎉

## Overview
Welcome to my personal resume website! This single-page application showcases my journey as a Junior Frontend Developer, featuring my skills, education, projects, and contact details. Built with a modern design, this site includes responsive layouts, stunning parallax effects, multilingual support (English and Ukrainian), and an interactive contact form. It’s crafted using HTML, CSS, and JavaScript, with a strong emphasis on accessibility, performance, and user experience.

## Key Features ✨
- **Responsive Navigation**: Seamlessly switches to a mobile menu (≤1024px) with a burger icon, and displays a horizontal header menu on larger screens.
- **Multilingual Support**: Effortlessly switch between English and Ukrainian with JSON-based translations.
- **Parallax Magic**: Enjoy smooth parallax scrolling in the projects section with layered images and gradient overlays.
- **Contact Form**: Submit messages with client-side validation for name, email, and message fields.
- **Dynamic Content**: Skills, education, and projects are rendered dynamically via JavaScript.
- **Accessibility First**: Semantic HTML, ARIA labels, and hidden decorative elements for screen reader compatibility.
- **Theme Switcher**: Toggle between light and dark modes with a sleek switcher.
- **Scroll-to-Top**: Click to smoothly return to the top of the page.

## Technologies Used 💻
- **HTML5**: Structured with semantic tags for better SEO and accessibility.
- **CSS3**: Custom styles with media queries, animations, and responsive design.
- **JavaScript (ES6+)**: Handles dynamic rendering, form validation, parallax, and interactivity.
- **JSON**: Powers multilingual translations (`en.json`, `uk.json`).
- **SVG**: Custom icons for navigation, social links, and buttons.
- **Google Fonts**: The elegant `Inter` font for typography.


## Getting Started 🚀
Follow these steps to set up and run the project locally:

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.).
- Optional: A local development server (e.g., VS Code Live Server extension or Node.js with `http-server`).

### Installation
1. **Clone the Repository**  
   Open your terminal and run the following command to clone the repository to your local machine:
   ```bash
   git clone https://github.com/Elonka5/resume-website.git
   ```
   Replace `https://github.com/Elonka5/resume-website.git` with the actual URL if it differs.

2. **Navigate to the Project Directory**  
   Change into the project directory:
   ```bash
   cd resume-website
   ```

3. **Start the Project**  
   - **Option 1: Open Directly**  
     Double-click `index.html` to open it in your browser, or drag it into a browser window.
   - **Option 2: Use a Local Server**  
     For best results (e.g., to handle module imports), install a local server:
     - Install Node.js and then run:
       ```bash
       npm install -g http-server
       http-server
       ```
     - Open your browser and navigate to `http://localhost:8080`.



## Accessibility ♿
- **Semantic HTML**: Utilizes `<header>`, `<nav>`, `<main>`, and `<section>` for structure.
- **ARIA Labels**: Dynamically populated via `data-i18n-aria` for screen readers.
- **Decorative Elements**: Marked with `aria-hidden="true"` (e.g., `.triangle`).
- **Keyboard Navigation**: Supports tab and enter key usage.

---

© 2025 Elona Savchenko. Built with ❤️ and code.