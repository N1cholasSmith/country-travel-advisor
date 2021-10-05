// import { createApi } from "unsplash-js";

// no longer needed
// var SearchBoxEl = document.querySelector("#SearchBox-input")
var bodyEl = document.querySelector("body");
var countryInfo = document.querySelector("#countryInformation")
var countryData = [];

var upsplashAccessKey = "sUG4r-3ndwxJ_35XLlzNo7x-v70k-44ugUAux9bNqLQ";
var upsplashUrl = "";

function getParams() {
    // Get the country name out of the URL
    let searchParamsArr = document.location.search.split("?");
    console.log(searchParamsArr);
    var country = searchParamsArr[1].split("=").pop();
    console.log("country: " + country);

    upsplashGetDataUrl = "https://api.unsplash.com/search/photos/?client_id="
        + upsplashAccessKey
        + "&query="
        + country
        + "&order_by=relevant"
        + "&page=1"
        + "&per_page=10"
        + "&auto=format"
        // + "&color=colorOfChoice" - this parameter can be added later if certain color theme best match the website and fonts display
        ;

    upsplashGetPhotoUrl = "https://api.unsplash.com/photos/?client_id="
        + upsplashAccessKey
        + "&id=";

    fetchCountryPhoto(upsplashGetDataUrl);

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
            console.log(emergency)
            countryInfoCard();
            emergency();
            neighboringCountries();
        })
        .catch(err => {
            console.error(err);
        });
}

// Fetch photo data from upsplash
function fetchCountryPhoto(dataUrl, photoUrl) {
    console.log("UpsplashUrl: " + dataUrl);
    fetch(dataUrl)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.results[0].id);
            let firstRelevantPhotoID = data.results[0].id;
            let firstRelevantPhotoUrl = data.results[0].urls.full;
            console.log(firstRelevantPhotoUrl);
            // upsplashGetPhotoUrl += firstRelevantPhotoID;
            // console.log(upsplashGetPhotoUrl);

            bodyEl.style = "background-image: url(" + firstRelevantPhotoUrl + ")";
            // fetch(upsplashGetPhotoUrl)
            // .then(response => {
            //     console.log(response)
            //     return response.json();
            // })
            // .then(data => {
            //     console.log("firstRelevantPhotoData:" + data);
            // })
            // .catch(err => {
            //     console.error(err);
            // });
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

    //shows go back button
    document.getElementById("goBack").style.display = "block";


    countryName.textContent = "Country Name: " + countryData.names.name
    currency.textContent = " Currency: " + countryData.currency.code
    rate.textContent = " Currency rate: " + countryData.currency.rate
    languageSpoken.textContent = " Language spoken: " + countryData.language[0].language
    // electricity.textContent = searchHistory.electricity
    volt.textContent = " Voltage: " + countryData.electricity.voltage
    frequency.textContent = " Electricity frequency: " + countryData.electricity.frequency
    waterQuality.textContent = " Water Status: " + countryData.water.short



    countryInfo.append(infoList);
    infoList.append(unorderedList);
    unorderedList.appendChild(countryName);
    unorderedList.appendChild(currency);
    unorderedList.appendChild(rate);
    unorderedList.appendChild(languageSpoken);
    unorderedList.appendChild(electricity);
    unorderedList.appendChild(volt);
    unorderedList.appendChild(frequency);
    unorderedList.appendChild(waterQuality);
};

function emergency(){
    
    var infoList = document.createElement("div");
    var unorderedList = document.createElement("ul");
    var emergencyNumbers = document.createElement("li");
    var callingCode = document.createElement("li");
    var police = document.createElement("li");
    var ambulance = document.createElement("li");
    var fire = document.createElement("li");

    emergencyNumbers.textContent = "Emergency Telephone Numbers "
    callingCode.textContent = " Calling Code: " + countryData.telephone.calling_code
    police.textContent = " Police: " + countryData.telephone.police
    ambulance.textContent = " Ambulance: " + countryData.telephone.ambulance
    fire.textContent = " Fire: " + countryData.telephone.fire
    
    countryInfo.append(infoList);
    infoList.append(unorderedList);
    unorderedList.appendChild(emergencyNumbers);
    unorderedList.appendChild(callingCode);
    unorderedList.appendChild(police);
    unorderedList.appendChild(ambulance);
    unorderedList.appendChild(fire);
  
}

function neighboringCountries(){
    console.log(neighboringCountries)

    var infoList = document.createElement("div");
    var unorderedList = document.createElement("ul");
    var neighborsTitle = document.createElement("li");
    var neighbor1 = document.createElement("li");
    var neighbor2 = document.createElement("li");
    var neighbor3 = document.createElement("li");
    var neighbor4 = document.createElement("li");

    neighborsTitle.textContent = "Neighboring Countries"
    neighbor1.textContent = countryData.neighbors[0].name
    neighbor2.textContent = countryData.neighbors[1].name
    neighbor3.textContent = countryData.neighbors[2].name
    neighbor4.textContent = countryData.neighbors[3].name
    
    countryInfo.append(infoList);
    infoList.append(unorderedList);
    unorderedList.appendChild(neighborsTitle);
    unorderedList.appendChild(neighbor1);
    unorderedList.appendChild(neighbor2);
    unorderedList.appendChild(neighbor3);
    unorderedList.appendChild(neighbor4);
}

getParams();
