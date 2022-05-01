fetch("https://restcountries.com/v2/all")
    .then((result) => result.json())
    .then((output) => {
        outputCountries = output;
        displayCountries(output);
    })
    .catch((err) => console.error(err));

/* To display countries container */

const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.querySelector("#inputSearch");
let outputCountries;

const displayCountries = (output) => {
    const showCountries = output
        .map((country) => {
            return `
                <div class="country">
                <a href="/detail.html?countryCode=${country.alpha3Code}">
                <img src=${
                    country.flag
                } class="flag" alt="" width="264" height="160">
                <div class="description">
                <h2>${country.name}</h2>
                <p>Population: <span>${country.population.toLocaleString()}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
                </div>
                </a>
                </div>`;
        })
        .join("");
    countriesContainer.innerHTML = showCountries;
};

/* Input field element function to filter countries */

const searchCountry = () => {
    if (lastEvent === "Select" || lastEvent === undefined) {
        const searchAll = outputCountries.filter((country) => {
            if (
                country.name
                    .toLowerCase()
                    .includes(inputSearch.value.toLowerCase())
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
        displayCountries(searchAll);
    } else {
        const searchByRegion = outputCountries
            .filter((country) => country.region === lastEvent)
            .filter((country) => {
                if (
                    country.name
                        .toLowerCase()
                        .includes(inputSearch.value.toLowerCase())
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
        displayCountries(searchByRegion);
    }
};

inputSearch.addEventListener("input", searchCountry);

/* Select country by region element */

const selectRegion = document.querySelector("select");
let lastEvent;

const filterRegion = (event) => {
    lastEvent = event.target.value;
    const selected = outputCountries.filter((country) => {
        if (event.target.value === country.region) {
            return country;
        } else if (event.target.value === "Select") {
            return country;
        }
    });
    displayCountries(selected);
    inputSearch.value = "";
};

selectRegion.addEventListener("change", filterRegion);
