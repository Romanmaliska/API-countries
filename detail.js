let countryCode;

const searchCountryCode = () => {
    let location = window.location.search;
    let params = new URLSearchParams(location);
    countryCode = params.get("countryCode");
};

searchCountryCode();

fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
    .then((result) => result.json())
    .then((output) => {
        console.log(typeof(output.population));
        displayCountryDetail(output);
        displayBorderCountry(output);
    })
    .catch((err) => console.error(err));

const detailContainer = document.querySelector(".detail-container");

const displayCountryDetail = (output) => {
    const showDetail = `
                <img src=${output.flag} class="flag" alt"" width="264" height="160">
                <h2>${output.name}</h2>
                <div class="top">
                <p>Native Name: <span>${output.nativeName}</span></p>
                <p>Population: <span>${output.population.toLocaleString()}</span></p>
                <p>Region: <span>${output.region}</span></p>
                <p>SubRegion: <span>${output.subregion}</span></p>
                <p>Capital: <span>${output.capital}</span></p>
                </div>
                <p>Top Level Domain: <span>${output.topLevelDomain}</span></p>
                <p>Currencies: <span>${output.currencies.map((currency) =>  currency.name).join(", ")}</span></p>
                <p>Languages: <span>${output.languages.map((language) =>  language.name).join(", ")}</span></p>`;
    detailContainer.innerHTML = showDetail;
};


/* Back button function */

const backBtn = document.querySelector(".backBtn");

backBtn.addEventListener("click", () => (window.location.href = "index.html"));

/* Border buttons function */

const borderCountryBtn = document.querySelector(".border-container");

const displayBorderCountry = (output) => {
    const showBtn = output.borders
        .map((border) => {
            return `
            <a href="detail.html?countryCode=${border}"><button type="button" class="btn">${border}</button></a>`;
        })
        .join("");

    borderCountryBtn.innerHTML = showBtn;
};
