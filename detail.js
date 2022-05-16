/* Function for backbtn */

const backBtn = document.querySelector(".js-back-btn");

backBtn.addEventListener("click", () => history.back());

/* Function display country details */

const fetchData = async () => {
    const countryCode = new URLSearchParams(window.location.search).get(
        "countryCode"
    );
    try {
        const result = await fetch(
            `https://restcountries.com/v2/alpha/${countryCode}`
        );
        const output = await result.json();
        displayCountryDetail(output);
    } catch (err) {
        return console.error(err);
    }
};

fetchData();

const detailContainer = document.querySelector(".js-detail-grid");

const displayCountryDetail = async (output) => {
    let borderCountries = await Promise.all(
        (output.borders || []).map(async (code) => {
            try {
                const result = await fetch(
                    `https://restcountries.com/v2/alpha/${code}`
                );
                return await result.json();
            } catch (err) {
                return console.error(err);
            }
        })
    );

    const showDetail = `
        <div class="js-flag-wrapper">
            <img src=${
                output.flag
            } class="js-flag" alt="" width="320" height="275">
        </div>       
        <div class="js-header-wrapper">
            <h2 class="js-header">${output.name}</h2>
        </div>
        <div class="js-text-wrapper">
            <p class="js-text">Native Name: <span>${
                output.nativeName
            }</span></p>
            <p class="js-text">Population: <span>${
                output.population
                    ? output.population.toLocaleString()
                    : "no data"
            }</span></p>
            <p class="js-text">Region: <span>${output.region}</span></p>
            <p class="js-text">SubRegion: <span>${
                output.subregion || "no data"
            }</span></p>
            <p class="js-text">Capital: <span>${
                output.capital || "no data"
            }</span></p>
        </div>         
        <div class="js-text-wrapper">
            <p class="js-text">Top Level Domain: <span>${
                output.topLevelDomain || "no data"
            }</span></p>
            <p class="js-text">Currencies: <span>${
                output.currencies
                    ? output.currencies
                          .map((currency) => currency.name)
                          .join(", ")
                    : "no data"
            }</span></p>
            <p class="js-text">Languages: <span>${
                output.languages
                    ? output.languages
                          .map((language) => language.name)
                          .join(", ")
                    : "no data"
            }</span></p>
        </div>
        <div class="js-border-wrapper">
            <h3 class="js-border__header">Border Countries:</h3>
                 ${borderCountries
                     .map((border) => {
                         return `
            <a href="detail.html?countryCode=${border.alpha3Code}">
                <button type="button" class="btn js-border__btn hover">${border.name}</button>
            </a>`;
                     })
                     .join("")}
        </div>`;

    detailContainer.innerHTML = showDetail;
};
