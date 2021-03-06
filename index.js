let outputCountries;

fetch("https://restcountries.com/v2/all")
    .then((result) => result.json())
    .then((output) => {
        outputCountries = output;
        searchCountry();
    })
    .catch((err) => console.error(err));

/* To display countries container */

const countriesContainer = document.querySelector(".js-countries-grid");

/* Input field element and select element function to filter countries */

const selectRegion = document.querySelector("select");
const inputSearch = document.querySelector("#inputSearch");

const searchCountry = () => {
    let selectValue = selectRegion.value;
    let inputValue = inputSearch.value.toLowerCase();
    let searchResult = outputCountries;
    if (selectValue) {
        searchResult = searchResult.filter(
            (country) => country.region === selectValue
        );
    }

    if (inputValue) {
        searchResult = searchResult.filter(
            (country) =>
                country.name.toLowerCase().includes(inputValue) ||
                (country.altSpellings &&
                    country.altSpellings.some((item) => {
                        return item.toLowerCase().includes(inputValue);
                    })) ||
                Object.values(country.translations).some((item) => {
                    return item.toLowerCase().includes(inputValue);
                })
        );
    }

    const showCountries = searchResult
        .map((country) => {
            return `
            <div class="js-country">
                <a href="./detail.html?countryCode=${country.alpha3Code}">
                    <img src=${country.flag}
                        class="js-country__flag" alt="" width="264" height="160">
                    <h2 class="js-country__head">${country.name}</h2>
                    <p class="js-country__text">Population: <span>${country.population.toLocaleString()}</span></p>
                    <p class="js-country__text">Region: 
                        <span>${country.region}</span></p>
                    <p class="js-country__text">Capital: 
                        <span>${country.capital}</span></p>
                </a>
            </div>
            `;
        })
        .join("");

    countriesContainer.innerHTML = showCountries;
};

inputSearch.addEventListener("input", searchCountry);
selectRegion.addEventListener("change", searchCountry);
