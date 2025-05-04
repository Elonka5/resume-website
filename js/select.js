// const dropdown = document.getElementById("languageSwitcher");
// const dropdownBtn = dropdown.querySelector(".dropdown-toggle");
// const menu = dropdown.querySelector(".dropdown-menu");
// const selectedValue = dropdown.querySelector(".selected-value");

// menu.addEventListener("click", (e) => {
//   if (e.target.tagName === "LI") {
//     const value = e.target.getAttribute("data-value");
//     selectedValue.textContent = e.target.textContent;

//     menu.querySelectorAll("li").forEach(li => li.classList.remove("active"));
//     e.target.classList.add("active");
//     dropdown.classList.remove("open");
//   }
// });

// dropdownBtn.addEventListener("click", () => {
//   dropdown.classList.toggle("open");
// });

// document.addEventListener("click", (e) => {
//   if (!dropdown.contains(e.target)) {
//     dropdown.classList.remove("open");
//   }
// });