const toggler = document.querySelector(".toggler");
const text = document.querySelector(".toggler__text");
const icon = document.querySelector(".toggler__icon");
const rootClassList = document.documentElement.classList;
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark-mode") {
    rootClassList.add("dark-mode");
    text.textContent = "Light Mode";
    icon.classList.replace("fa-solid", "fa-regular");
} else {
    rootClassList.add("light-mode");
    text.textContent = "Dark Mode";
    icon.classList.replace("fa-regular", "fa-solid");
}

toggler.addEventListener("click", function () {
    if (rootClassList.value == "light-mode") {
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
