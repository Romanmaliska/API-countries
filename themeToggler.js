const toggler = document.querySelector(".toggler");
const text = document.querySelector(".toggler__text");
const icon = document.querySelector(".toggler__icon");
const mode = document.documentElement.classList;
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark-mode"){
  mode.toggle("dark-mode");
  text.textContent="Light Mode";
  icon.classList.replace("fa-solid","fa-regular");
}
else {
  mode.toggle("light-mode");
  text.textContent="Dark Mode";
  icon.classList.replace("fa-regular","fa-solid");
}

toggler.addEventListener("click", function () {
    if (mode.value == "light-mode") {
        mode.replace("light-mode", "dark-mode");
        localStorage.setItem("theme", "dark-mode");
        text.textContent="Light Mode"
        icon.classList.replace("fa-solid","fa-regular");
    } else {
        mode.replace("dark-mode", "light-mode");
        localStorage.setItem("theme", "light-mode");
        text.textContent="Dark Mode";
        icon.classList.replace("fa-regular","fa-solid");
    }
})
