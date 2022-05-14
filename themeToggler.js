const btn = document.querySelector(".js-switcher-btn");
const btnIcon = document.querySelector(".js-switcher-btn__icon")
const mode = document.documentElement.classList;
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark-mode"){
  mode.toggle("dark-mode");
  btn.textContent="Light Mode";
  btnIcon.classList.replace("fa-solid","fa-regular");
}
else {
  mode.toggle("light-mode");
  btn.textContent="Dark Mode";
  btnIcon.classList.replace("fa-regular","fa-solid");
}

btn.addEventListener("click", function () {
    if (mode.value == "light-mode") {
        mode.replace("light-mode", "dark-mode");
        localStorage.setItem("theme", "dark-mode");
        btn.textContent="Light Mode"
        btnIcon.classList.replace("fa-solid","fa-regular");
    } else {
        mode.replace("dark-mode", "light-mode");
        localStorage.setItem("theme", "light-mode");
        btn.textContent="Dark Mode";
        btnIcon.classList.replace("fa-regular","fa-solid");
    }
})
