const darkSwitcher = document.querySelector(".switcher")
let isDark = localStorage.getItem("isDark") === "true"

document.body.classList.toggle("dark", isDark)

darkSwitcher.onclick = function () {
    isDark = !isDark
    document.body.classList.toggle("dark", isDark)
    localStorage.setItem("isDark", isDark)
}