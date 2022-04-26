fetch("https://restcountries.com/v2/all")
    .then((result) => result.json())
    .then((output) => {
        console.log(output);
        outputCountries = output;
        displayCountries(output);
    })
    .catch((err) => console.error(err));

const countriesContainer = document.querySelector("main");
const inputSearch = document.querySelector("#inputSearch");
let outputCountries;

const displayCountries = (output) => {
    const showCountries = output
        .map((country) => {
            return `<div class="country">
                <img src=${country.flag} alt"" width="264" height="160">
                <h2>${country.name}</h2>
                <p>Population: <span>${country.population}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
                </div>`;
        })
        .join("");
    countriesContainer.innerHTML = showCountries;
};

const searchCountry = () => {
    const search = outputCountries.filter((country) => {
        if (
            country.name.toLowerCase().includes(inputSearch.value.toLowerCase())
        ) {
            return country;
        } else if (
            country.altSpellings &&
            country.altSpellings.some((item) => {
                return item
                    .toLowerCase()
                    .includes(inputSearch.value.toLowerCase());
            })
        ) {
            return country;
        } else if (
            Object.values(country.translations).some((item) => {
                return item
                    .toLowerCase()
                    .includes(inputSearch.value.toLowerCase());
            })
        ) {
            return country;
        }
    });
    displayCountries(search);
};

inputSearch.addEventListener("input", searchCountry);
