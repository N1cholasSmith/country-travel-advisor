// Define variables
// Fetch country data from local storage, or set to empty if data not exist
var countryData = JSON.parse(localStorage.getItem("countryData")) || [];
var searchHistory = JSON.parse(localStorage.getItem("searchHistoryKey")) || [];
searchHistory = searchHistory.sort();
var country = countryData.names.name;
var weatherData = [];
var unsplashUrl = "";

var openWeatherMapAPiKey = "1f9d3014d1a028a24c084adbdcec9008";
var unsplashAccessKey = "sUG4r-3ndwxJ_35XLlzNo7x-v70k-44ugUAux9bNqLQ";

var bodyEl = document.querySelector("body");
var countryInfo = document.querySelector("#countryInformation");
var searchHistoryMLEl = document.querySelector("#searchHistoryMediumLarge");
var searchHistoryMobileEl = document.querySelector("#searchHistoryMobile");
var alertEl = document.querySelector("#Alert");
var infoListEl = document.querySelector("#InfoList");
var displayCountryel = document.querySelector(".CountryName");
var progressBarEl = document.querySelector("#progressBar");
var NextDoor = document.querySelector("#NextDoor");
var YourSearchEl = document.querySelector(".YourSearch");
// document.querySelector("#emoji").innerHTML = "📞 ";

$(document).ready(
    // Activates the Search History dropdown
    $(".dropdown-trigger-ML").dropdown(),
    $(".dropdown-trigger-Mobile").dropdown(),
    // Hide Nav to hamburger icon on med to mobile screen
    $('.sidenav').sidenav()
);

// Runs on page load
function init() {
    document.getElementById("searchForm").addEventListener("submit", handleSearchFormSubmit);
    document.getElementById("clearBtn").addEventListener("click", clearHistory);

    // Show progress bar
    let progressTxtEl = document.querySelector(".YourSearch");
    progressTxtEl.textContent = "Taking you to " + country + ".....";
    progressBarEl.style.display = "block";

    unsplashGetDataUrl = "https://api.unsplash.com/search/photos/?client_id="
        + unsplashAccessKey
        + "&query="
        + country
        + "&order_by=relevant"
        + "&page=1"
        + "&per_page=10"
        + "&auto=format"
        // + "&color=colorOfChoice" - this parameter can be added later if certain color theme best match the website and fonts display
        ;

    unsplashGetPhotoUrl = "https://api.unsplash.com/photos/?client_id="
        + unsplashAccessKey
        + "&id=";

    fetchCountryPhoto(unsplashGetDataUrl);

    fetchWeatherData(country);

    displayHistory(searchHistory, searchHistoryMLEl);
    displayHistory(searchHistory, searchHistoryMobileEl);

};

// Fetch country data from API
function fetchCountryData(country, targetId) {

    fetch('https://travelbriefing.org/' + country + '?format=json')
        .then(response => {
            console.log(response);
            console.log(response.status); // 200
            console.log(response.statusText); // OK
            if (response.status != 200) {
                if (targetId === "searchForm") {
                    alertInvalidInput();
                }
                console.log("Response status is not 200!!")
            }
            return response.json();
        })
        .then(data => {
            if ((country !== "netherlands") && (data.names.name === "Netherlands")) {
                console.log("Invalid search!")
                if (targetId === "searchForm") {
                    alertInvalidInput();
                }
            }
            // Within else block of code only runs when fetch is successfully performed
            else {
                localStorage.setItem("countryData", JSON.stringify(data));
                saveToHistory(country);
                console.log("Search is valid!")
                console.log(data);
                location.assign("./countryinfo.html");
            }
        })
        .catch(err => {
            console.error(err);
        });
};

// Fetch photo data from unsplash
function fetchCountryPhoto(dataUrl) {
    console.log("UnsplashUrl: " + dataUrl);
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
            // unsplashGetPhotoUrl += firstRelevantPhotoID;
            // console.log(unsplashGetPhotoUrl);

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
            emergency();
            neighboringCountries();
        })
        .catch(function (error) {
            console.log(error);
        });
};

// Displays info on cards
function countryInfoCard() {

    // Country info good to know variables
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

    var tempEl = document.createElement("li");
    var feelsLikeEl = document.createElement("li");
    var humidityEl = document.createElement("li");
    var weatherIconLiEL = document.createElement("li");

    YourSearchEl.textContent = "All About " + countryData.names.name;
    currency.textContent = "Currency: " + countryData.currency.code;
    rate.textContent = "Rate: " + countryData.currency.rate;
    languageSpoken.textContent = "Language: " + countryData.language[0].language;
    // electricity.textContent = searchHistory.electricity
    volt.textContent = "Voltage: " + countryData.electricity.voltage;
    frequency.textContent = "Frequency: " + countryData.electricity.frequency;
    waterQuality.textContent = "Water Quality: " + countryData.water.short;
    tempEl.textContent = "Today's temperature: " + parseFloat(weatherData.main.temp).toFixed(1) + "°C";
    feelsLikeEl.textContent = "Feels like: " + parseFloat(weatherData.main.feels_like).toFixed(1) + "°C";
    humidityEl.textContent = "Humidity: " + weatherData.main.humidity + "%";


    heading.textContent = "Before You Go ";
    currency.textContent = " Currency: " + countryData.currency.code;
    rate.textContent = " Currency rate: " + parseFloat(countryData.currency.rate).toFixed(2);
    languageSpoken.textContent = " Language spoken: " + countryData.language[0].language;
    // electricity.textContent = searchHistory.electricity
    volt.textContent = " Voltage: " + countryData.electricity.voltage;
    frequency.textContent = " Electricity frequency: " + countryData.electricity.frequency;
    waterQuality.textContent = " Water Status: " + countryData.water.short;


    countryInfo.append(heading, infoList);
    infoList.append(unorderedList);

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

    emergency();

    neighboringCountries();

    // shows go back button
    document.getElementById("goBack").style.display = "block";

    // Hides progress bar
    progressBarEl.style.display = "none";
};

// Display info on neighboring country card
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
    // Commenting these out, content displayed on button instead
    // neighbor1.textContent = countryData.neighbors[0].name
    // neighbor2.textContent = countryData.neighbors[1].name
    // neighbor3.textContent = countryData.neighbors[2].name
    // neighbor4.textContent = countryData.neighbors[3].name

    NextDoor.append(heading, infoList);
    infoList.append(unorderedList);
    unorderedList.append(
        neighborsTitle,
        neighbor1,
        neighbor2,
        neighbor3,
        neighbor4
    )

    // convert neighbor countries to button with hyper link to display that country's info
    var neighbor1Btn = document.createElement("a");
    var neighbor2Btn = document.createElement("a");
    var neighbor3Btn = document.createElement("a");
    var neighbor4Btn = document.createElement("a");
    neighbor1.append(neighbor1Btn);
    neighbor2.append(neighbor2Btn);
    neighbor3.append(neighbor3Btn);
    neighbor4.append(neighbor4Btn);
    neighbor1Btn.classList.add("waves-effect", "waves-light", "btn", "neighbourBtn");
    neighbor2Btn.classList.add("waves-effect", "waves-light", "btn", "neighbourBtn");
    neighbor3Btn.classList.add("waves-effect", "waves-light", "btn", "neighbourBtn");
    neighbor4Btn.classList.add("waves-effect", "waves-light", "btn", "neighbourBtn");
    neighbor1Btn.textContent = countryData.neighbors[0].name
    neighbor2Btn.textContent = countryData.neighbors[1].name
    neighbor3Btn.textContent = countryData.neighbors[2].name
    neighbor4Btn.textContent = countryData.neighbors[3].name

    let neighbourBtnAll = document.querySelectorAll(".neighbourBtn");
    neighbourBtnAll.forEach(function (neighborBtnEach) {
        neighborBtnEach.addEventListener('click', handleBtnClick);
    })
};

// Display info on emergency telephone card
function emergency() {
    infoListEl.innerHTML = "";
    var heading = document.createElement("h1");
    var infoList = document.createElement("div");
    var unorderedList = document.createElement("ul");
    var emergencyNumbers = document.createElement("li");
    var callingCode = document.createElement("li");
    var police = document.createElement("li");
    var ambulance = document.createElement("li");
    var fire = document.createElement("li");
    var policeAEl = document.createElement("a");
    var ambulanceAEl = document.createElement("a");
    var fireAEl = document.createElement("a");

    heading.textContent = "Emergency Telephone Numbers ";
    callingCode.textContent = " Calling Code: " + countryData.telephone.calling_code;
    policeAEl.textContent = " Police: " + countryData.telephone.police;
    ambulanceAEl.textContent = " Ambulance: " + countryData.telephone.ambulance;
    fireAEl.textContent = " Fire: " + countryData.telephone.fire;
    policeAEl.setAttribute("href", "tel:" + countryData.telephone.police);
    ambulanceAEl.setAttribute("href", "tel:" + countryData.telephone.ambulance);
    fireAEl.setAttribute("href", "tel:" + countryData.telephone.fire);

    police.appendChild(policeAEl);
    ambulance.appendChild(ambulanceAEl);
    fire.appendChild(fireAEl);

    infoListEl.append(heading, infoList);
    infoList.append(unorderedList);
    unorderedList.append(
        emergencyNumbers,
        callingCode,
        police,
        ambulance,
        fire
    )
};

// Display items on search history card
// Data is search History data, displayEl is the element to display within
function displayHistory(data, displayEl) {
    // let headingEl = document.createElement("h1");
    // headingEl.textContent = "Search History";
    // console.log("displayHistory!");

    for (i=0; i<data.length; i++) {
        // let ulEl = document.createElement("ul")
        let liEl = document.createElement('li');
        let btnEl = document.createElement('a');
        displayEl.prepend(liEl);
        // searchHistoryMobileEl.prepend(liEl);
        // ulEl.append(liEl)
        liEl.append(btnEl);
        // liEL.classList.add();
        btnEl.classList.add('historyBtn');
        btnEl.textContent = data[i];
        console.log(data[i]);
    }

    // This else statement is for when clearing history, still displays card title
    // data == false which means data is an empty array [];
    if (data == false) { 
        displayEl.prepend(headingEl);
    }

    //Listen to click event on history item button
    let historyBtnElAll = document.querySelectorAll('.historyBtn');
    historyBtnElAll.forEach(function(historyBtnElEach) {
    historyBtnElEach.addEventListener('click', handleBtnClick);
    })
};

// Store variables in local storage
function saveToHistory(countryName) {
  
    if ((searchHistory.includes(countryName) === false) && (countryName !== [])) {
      searchHistory.push(countryName);
    }
    searchHistory = searchHistory.sort();
    citiesStr = JSON.stringify(searchHistory);
    localStorage.setItem("searchHistoryKey", citiesStr);
};

//Clear search history
function clearHistory() {
    localStorage.removeItem("searchHistoryKey");
    location.reload();
}

// Handle search form submit action
function handleSearchFormSubmit(event) {

    event.preventDefault();
    console.log(event.target.id);
    let targetId = event.target.id;
    searchBoxInputEl = document.getElementById("searchInput")
    let searchInput = searchBoxInputEl.value;
    searchInput = searchInput.toLowerCase();

    // saveToHistory();
    // Reset the search input value
    this.reset();
    fetchCountryData(searchInput, targetId)
};

// Handle button click for both search history buttons and neighboring countries buttons
function handleBtnClick(event) {
    let country = event.target.textContent;

    fetchCountryData(country);
};

// Alert invalid input error message
function alertInvalidInput() {
    let inputEl = document.getElementById("searchInput");
    inputEl.setAttribute("placeholder", "Invalid Input!");
};

init();

