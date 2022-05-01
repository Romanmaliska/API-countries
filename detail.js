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
        displayCountryDetail(output);
        displayBorderCountry(output);
    })
    .catch((err) => console.error(err));

const detailContainer = document.querySelector(".detail-container");

const displayCountryDetail = (output) => {
    const showDetail = `
                <div class="flag-container">
                <img src=${
                    output.flag
                } class="flag" alt="" width="264" height="160">
                </div>
                
                <div class="top-details">
                <h2>${output.name}</h2>
                <p>Native Name: <span>${output.nativeName}</span></p>
                <p>Population: <span>${
                    output.population
                        ? output.population.toLocaleString()
                        : "no data"
                }</span></p>
                <p>Region: <span>${output.region}</span></p>
                <p>SubRegion: <span>${
                    output.subregion ? output.subregion : "no data"
                }</span></p>
                <p>Capital: <span>${
                    output.capital ? output.capital : "no data"
                }</span></p>
                </div>

                <div class="bottom-details">
                <p>Top Level Domain: <span>${
                    output.topLevelDomain ? output.topLevelDomain : "no data"
                }</span></p>
                <p>Currencies: <span>${
                    output.currencies
                        ? output.currencies
                              .map((currency) => currency.name)
                              .join(", ")
                        : "no data"
                }</span></p>
                <p>Languages: <span>${
                    output.languages
                        ? output.languages
                              .map((language) => language.name)
                              .join(", ")
                        : "no data"
                }</span></p>
                </div>`;
    detailContainer.innerHTML = showDetail;
};

/* Border buttons function */

const borderCountryBtn = document.querySelector(".border-container");

const displayBorderCountry = (output) => {
    const showBtn = output.borders
        ? output.borders
              .map((border) => {
                  return `
        <a href="detail.html?countryCode=${border}"><button type="button" class="btn">${border}</button></a>`;
              })
              .join("")
        : `<p>${output.name} has no border country.</p>`;

    borderCountryBtn.innerHTML = `<h3>Border Countries:</h3> ${showBtn}`;
};

/* Back button function */

const backBtn = document.querySelector(".backBtn");

backBtn.addEventListener("click", () => (window.location.href = "index.html"));
