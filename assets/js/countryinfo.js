// import { createApi } from "unsplash-js";

// no longer needed
// var SearchBoxEl = document.querySelector("#SearchBox-input")
var bodyEl = document.querySelector("body");
var countryInfo = document.querySelector("#countryInformation")
var countryData = JSON.parse(localStorage.getItem("countryData"));
var country = countryData.names.name;
var weatherData = [];
var openWeatherMapAPiKey = '1f9d3014d1a028a24c084adbdcec9008';
var upsplashUrl = "";
var alertEl = document.querySelector(".Alert");
var infoListEl = document.querySelector("#InfoList");
var upsplashAccessKey = "sUG4r-3ndwxJ_35XLlzNo7x-v70k-44ugUAux9bNqLQ";
// var displayCountryel = document.querySelector(".CountryName");
var progressBarEl = document.querySelector("#progressBar");
var NextDoor = document.querySelector("#NextDoor");
var YourSearchEl = document.querySelector(".YourSearch");

function getParams() {
    // Display progress bar
    progressBarEl.style.display = "block";

    // Get the country name out of the URL
    // Commenting the below codes out - due to fetch country data relocated back to script.js
    // let searchParamsArr = document.location.search.split("?");
    // console.log(searchParamsArr);
    // var country = searchParamsArr[1].split("=").pop();
    // country = country.toLowerCase();
    // console.log("country: " + country);

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

    // fetchCountryData(country);

    fetchWeatherData(country);
};

// Moved the fetch data function from back to script.js...
// function fetchCountryData(country) {
//     // Change the first and last character on fetch URL from ` to '
//     // Was causing the country variable not recognised issue
//     fetch('https://travelbriefing.org/' + country + '?format=json')
//         .then(response => {
//             console.log(response);
//             console.log(response.status); // 200
//             console.log(response.statusText); // OK
//             if (response.status != 200) {
//                 console.log("Response status is not 200!!")
//             }
//             return response.json();
//         })
//         .then(data => {
//             if ( (country !== "netherlands") && (countryData.names.name === "Netherlands")) {
//                 console.log("Response status is not 200!!")
//             }
//             localStorage.setItem("countryData", data)
//             this.reset();
//             location.assign("./countryinfo.html");
//             countryData = data;
//             console.log(countryData);
//             console.log(emergency)
//         })
//         .catch(err => {
//             console.error(err);
//         });
//   };

// Fetch photo data from upsplash
function fetchCountryPhoto(dataUrl) {
    console.log("UpsplashUrl: " + dataUrl);
    fetch(dataUrl)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.results[0].id);
            let firstRelevantPhotoUrl = data.results[0].urls.full;
            console.log(firstRelevantPhotoUrl);
            // upsplashGetPhotoUrl += firstRelevantPhotoID;
            // console.log(upsplashGetPhotoUrl);

            bodyEl.style = "background-image: url(" + firstRelevantPhotoUrl + ")";
        })
        .catch(err => {
            console.error(err);
        });
};

// Fetch weather data
function fetchWeatherData(country) {
    let openWeatherMapUrl = "https://api.openweathermap.org/data/2.5/weather?q="
        + country
        + "&units=metric&appid="
        + openWeatherMapAPiKey;

    fetch(openWeatherMapUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherData = data;
            countryInfoCard();
        })
        .catch(function (error) {
            console.log(error);
        });
};

function countryInfoCard() {

    countryInfo.innerHTML = "";
    var heading = document.createElement("h1");
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

    var tempEl = document.createElement("li");
    var feelsLikeEl = document.createElement("li");
    var humidityEl = document.createElement("li");
    var weatherIconLiEL = document.createElement("li");
    var weatherIconEl = document.createElement("img");
    weatherIconLiEL.appendChild(weatherIconEl);
    YourSearchEl.textContent = " All About " + countryData.names.name
    currency.textContent = "Currency: " + countryData.currency.code
    rate.textContent = "Rate: " + countryData.currency.rate
    languageSpoken.textContent = "Language: " + countryData.language[0].language
    // electricity.textContent = searchHistory.electricity
    volt.textContent = "Voltage: " + countryData.electricity.voltage
    frequency.textContent = "Frequency: " + countryData.electricity.frequency
    waterQuality.textContent = "Water Quality: " + countryData.water.short
    tempEl.textContent = "Temperature: " + weatherData.main.temp;
    feelsLikeEl.textContent = "Feels like: " + weatherData.main.feels_like;
    humidityEl.textContent = "Humidity: " + weatherData.main.humidity;


    // Commenting the below lines out, decided to not use weather icon for now.
    // let weatherIcon = weatherData.weather[0].icon;
    // weatherIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/'
    //     + weatherIcon
    //     + '@2x.png');
    heading.textContent = "Good to knows "
    currency.textContent = " Currency: " + countryData.currency.code
    rate.textContent = " Currency rate: " + countryData.currency.rate
    languageSpoken.textContent = " Language spoken: " + countryData.language[0].language
    // electricity.textContent = searchHistory.electricity
    volt.textContent = " Voltage: " + countryData.electricity.voltage
    frequency.textContent = " Electricity frequency: " + countryData.electricity.frequency
    waterQuality.textContent = " Water Status: " + countryData.water.short


    countryInfo.append(heading, infoList);
    infoList.append(unorderedList);

    // unorderedList.appendChild(countryName);
    // unorderedList.appendChild(currency);
    // unorderedList.appendChild(rate);
    // unorderedList.appendChild(languageSpoken);
    // unorderedList.appendChild(electricity);
    // unorderedList.appendChild(volt);
    // unorderedList.appendChild(frequency);
    // unorderedList.appendChild(waterQuality);
    // unorderedList.appendChild(tempEl);
    // unorderedList.appendChild(feelsLikeEl);
    // unorderedList.appendChild(humidityEl);
    // unorderedList.appendChild(weatherIconLiEL);

    // Option 2 to keep it more neat
    unorderedList.append(countryName,
        currency,
        rate,
        languageSpoken,
        electricity,
        volt,
        frequency,
        waterQuality,
        tempEl,
        feelsLikeEl,
        humidityEl,
        weatherIconLiEL)

    // shows go back button
    document.getElementById("goBack").style.display = "block";

    // Hides progress bar
    progressBarEl.style.display = "none";

};

function emergency() {

    if (infoListEl) {
        infoListEl.innerHTML = "";
    }

    var heading = document.createElement("h1")
};

// shows go back button
document.getElementById("goBack").style.display = "block";

// Hides progress bar
progressBarEl.style.display = "none";

function emergency() {
    InfoListEl.innerHTML = "";
    var heading = document.createElement("h1");
    var infoList = document.createElement("div");
    var unorderedList = document.createElement("ul");
    var emergencyNumbers = document.createElement("li");
    var callingCode = document.createElement("li");
    var police = document.createElement("li");
    var ambulance = document.createElement("li");
    var fire = document.createElement("li");

    heading.textContent = "Emergency Telephone Numbers "
    callingCode.textContent = " Calling Code: " + countryData.telephone.calling_code
    police.textContent = " Police: " + countryData.telephone.police
    ambulance.textContent = " Ambulance: " + countryData.telephone.ambulance
    fire.textContent = " Fire: " + countryData.telephone.fire

    // infoListEl.append(heading, infoList);
    infoList.append(unorderedList);
    unorderedList.appendChild(emergencyNumbers);
    unorderedList.appendChild(callingCode);
    unorderedList.appendChild(police);
    unorderedList.appendChild(ambulance);
    unorderedList.appendChild(fire);
};


function neighboringCountries() {
    NextDoor.innerHTML = "";
    // console.log(neighboringCountries)
    var heading = document.createElement("h1");
    var infoList = document.createElement("div");
    var unorderedList = document.createElement("ul");
    var neighborsTitle = document.createElement("li");
    var neighbor1 = document.createElement("li");
    var neighbor2 = document.createElement("li");
    var neighbor3 = document.createElement("li");
    var neighbor4 = document.createElement("li");
    heading.textContent = "Neighboring Countries"
    neighbor1.textContent = countryData.neighbors[0].name
    neighbor2.textContent = countryData.neighbors[1].name
    neighbor3.textContent = countryData.neighbors[2].name
    neighbor4.textContent = countryData.neighbors[3].name

    NextDoor.append(heading, infoList);
    infoList.append(unorderedList);
    unorderedList.appendChild(neighborsTitle);
    unorderedList.appendChild(neighbor1);
    unorderedList.appendChild(neighbor2);
    unorderedList.appendChild(neighbor3);
    unorderedList.appendChild(neighbor4);
};

getParams();
