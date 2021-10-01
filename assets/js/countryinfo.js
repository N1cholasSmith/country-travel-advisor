var SearchBoxEl = document.querySelector("#SearchBox-input")
var countryInfo = document.querySelector("#countryInformation")
 

function countryInfoCard() {

    countryInfo.innerHTML = "";
    var searchHistory = JSON.parse(localStorage.getItem("countries"))||[]
    console.log(searchHistory)

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

    countryName.textContent = searchHistory.names.name
    currency.textContent = searchHistory.currency.code
    rate.textContent  = searchHistory.currency.rate
    languageSpoken.textContent = searchHistory.language[0].language
    // electricity.textContent = searchHistory.electricity
    volt.textContent = searchHistory.electricity.voltage
    frequency.textContent = searchHistory.electricity.frequency
    waterQuality.textContent = searchHistory.water.short

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

countryInfoCard();