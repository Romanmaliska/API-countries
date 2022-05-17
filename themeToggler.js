const toggler = document.querySelector(".toggler");
const text = document.querySelector(".toggler__text");
const icon = document.querySelector(".toggler__icon");
const rootClassList = document.documentElement.classList;
const currentTheme = localStorage.getItem("theme");
const OSThemeSetting = window.matchMedia("(prefers-color-scheme: dark)");


if (OSThemeSetting.matches && !localStorage.theme) {
    rootClassList.add("dark-mode");
    text.textContent = "Light Mode";
    icon.classList.replace("fa-solid", "fa-regular");
} else if (!localStorage.theme) {
      rootClassList.add("light-mode");
      text.textContent = "Dark Mode";
      icon.classList.replace("fa-regular", "fa-solid");
  }
  else{
    rootClassList.add(localStorage.theme);
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
  