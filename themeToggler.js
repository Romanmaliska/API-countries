const toggler = document.querySelector(".js-toggler");
const text = document.querySelector(".js-toggler__text");
const icon = document.querySelector(".js-toggler__icon");
const rootClassList = document.documentElement.classList;
const currentTheme = localStorage.getItem("theme");
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

if ((prefersDarkTheme.matches && !currentTheme) || currentTheme == "dark-mode") {
    rootClassList.add("dark-mode");
    text.textContent = "Light Mode";
    icon.classList.replace("fa-solid", "fa-regular");
} else {
    rootClassList.add("light-mode");
    text.textContent = "Dark Mode";
    icon.classList.replace("fa-regular", "fa-solid");
}

toggler.addEventListener("click", function () {
    if (rootClassList.contains("light-mode")) {
        rootClassList.replace("light-mode", "dark-mode");
        localStorage.setItem("theme", "dark-mode");
        text.textContent = "Light Mode";
        icon.classList.replace("fa-solid", "fa-regular");
    } else {
        rootClassList.replace("dark-mode", "light-mode");
        localStorage.setItem("theme", "light-mode");
        text.textContent = "Dark Mode";
        icon.classList.replace("fa-regular", "fa-solid");
    }
});