// no longer needed
// var SearchBoxEl = document.querySelector("#SearchBox-input")
var countryInfo = document.querySelector("#countryInformation")
var countryData = [];

function getParams() {
    // Get the serach params out of the URL
    let searchParamsArr = document.location.search.split("?");
    console.log(searchParamsArr);
    var country = searchParamsArr[1].split("=").pop();
    console.log("country: " + country);

    fetchCountryData(country);
}

// Moved the fetch data function from script.js to here
// Avoided using localStorage to reduce chance of error
function fetchCountryData(country) {
    // Change the first and last character on fetch URL from ` to '
    // Was causing the country variable not recognised issue
    fetch('https://travelbriefing.org/' + country + '?format=json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            countryData = data;
            console.log(countryData);
            countryInfoCard();
        })
        .catch(err => {
            console.error(err);
        });
}

function countryInfoCard() {

    countryInfo.innerHTML = "";

    var infoList = document.createElement("div");
    var unorderedList = document.createElement("ul");
    var countryName = document.createElement("li");
    var currency = document.createElement("li");
    var rate = document.createElement("li");
    var languageSpoken = document.createElement("li");
    var electricity = document.createElement("li");
    var volt = document.createElement("li");
    var frequency = document.createElement("li");
    var waterQuality = document.createElement("li");


    countryName.textContent = "Country Name: " + countryData.names.name
    currency.textContent = " Currency: " + countryData.currency.code
    rate.textContent = countryData.currency.rate
    languageSpoken.textContent = countryData.language[0].language
    // electricity.textContent = searchHistory.electricity
    volt.textContent = countryData.electricity.voltage
    frequency.textContent = countryData.electricity.frequency
    waterQuality.textContent = countryData.water.short


    countryInfo.append(infoList)
    infoList.append(unorderedList)
    unorderedList.appendChild(countryName)
    unorderedList.appendChild(currency)
    unorderedList.appendChild(rate)
    unorderedList.appendChild(languageSpoken)
    unorderedList.appendChild(electricity)
    unorderedList.appendChild(volt)
    unorderedList.appendChild(frequency)
    unorderedList.appendChild(waterQuality)
};

getParams();
