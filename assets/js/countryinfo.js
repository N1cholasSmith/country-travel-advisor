// Define variables
// Fetch country data from local storage, or set to empty if data not exist
var countryData = JSON.parse(localStorage.getItem("countryData")) || [];
var searchHistory = JSON.parse(localStorage.getItem("searchHistoryKey")) || [];
var country = countryData.names.name;
var weatherData = [];

var openWeatherMapAPiKey = "1f9d3014d1a028a24c084adbdcec9008";
var unsplashAccessKey = "sUG4r-3ndwxJ_35XLlzNo7x-v70k-44ugUAux9bNqLQ";

var searchHistoryMLEl = document.querySelector("#searchHistoryMediumLarge");
var searchHistoryMobileEl = document.querySelector("#searchHistoryMobile");
var progressBarEl = document.querySelector("#progressBar");

// Jquery function for main nav dropdown and mobile side nav
$(document).ready(
    // Activates the Search History dropdown for Medium to large screen nav bar
    $(".dropdown-trigger-ML").dropdown(),
    // Activates the Search History dropdown for Mobile screen nav bar
    $(".dropdown-trigger-Mobile").dropdown(),
    // Hide Nav to hamburger icon on med to mobile screen
    $('.sidenav').sidenav()
);

$(document).ready(function() {
    // Hides the progress bar when page finish loading
    progressBarEl.style.display = "none";
});

// Runs on page load
function init() {
    // listen to search form submit action
    document.getElementById("searchForm").addEventListener("submit", handleSearchFormSubmit);
    document.getElementById("searchFormMobile").addEventListener("submit", handleSearchFormSubmit);
    // listen to clear history button click
    document.getElementById("clearBtn").addEventListener("click", clearHistory);
    document.getElementById("clearBtnMobile").addEventListener("click", clearHistory);

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

    // Appends search history for medium to large screen drop down
    displayHistory(searchHistory, searchHistoryMLEl);
    // Appends search history for mobile screen drop down
    displayHistory(searchHistory, searchHistoryMobileEl);
};

// Fetch country data from API
function fetchCountryData(country, targetId) {

    fetch('https://travelbriefing.org/' + country + '?format=json')
        .then(response => {
            if (response.status != 200) {
                if (targetId === "searchForm") {
                    alertInvalidInput("searchForm");
                }
                else if (targetId === "searchFormMobile") {
                    alertInvalidInput("searchFormMobile");
                }
            }
            return response.json();
        })
        .then(data => {
            // Check for valid country name, due to API will return Netherlands as result with incorrect country name
            if ((country !== "netherlands") && (data.names.name === "Netherlands")) {
                if (targetId === "searchForm") {
                    alertInvalidInput("searchForm");
                }
                else if (targetId === "searchFormMobile") {
                    alertInvalidInput("searchFormMobile");
                }
            }
            // Within else block of code only runs when fetch is successfully performed
            else {
                localStorage.setItem("countryData", JSON.stringify(data));
                saveToHistory(country);
                location.assign("./countryinfo.html");
            }
        })
        .catch(err => {
            console.error(err);
        });
};

// Fetch photo data from unsplash
function fetchCountryPhoto(dataUrl) {
    fetch(dataUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // Get the most popular photo url of the country
            let firstRelevantPhotoUrl = data.results[0].urls.full;
            // Set background of the page with photo url
            let bodyEl = document.querySelector("body");
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
            weatherData = data;

            // Display info cards content on successful fetch data call
            countryInfoCard();
            emergency();
            neighbouringCountries();
        })
        .catch(function (error) {
            console.log(error);
        });
};

// Displays info on cards
function countryInfoCard() {

    let countryInfo = document.querySelector("#countryInformation");
    let YourSearchEl = document.querySelector(".YourSearch");

    // Country info good to know variables
    countryInfo.innerHTML = "";
    let heading = document.createElement("h1");
    let infoList = document.createElement("div");
    let unorderedList = document.createElement("ul");
    let countryName = document.createElement("li");
    let currency = document.createElement("li");
    let rate = document.createElement("li");
    let languageSpoken = document.createElement("li");
    let electricity = document.createElement("li");
    let volt = document.createElement("li");
    let frequency = document.createElement("li");
    let waterQuality = document.createElement("li");

    let tempEl = document.createElement("li");
    let feelsLikeEl = document.createElement("li");
    let humidityEl = document.createElement("li");
    let weatherIconLiEL = document.createElement("li");

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
};

// Display info on neighbouring country card
function neighbouringCountries() {
    let NextDoor = document.querySelector("#NextDoor");
    NextDoor.innerHTML = "";
    let heading = document.createElement("h1");
    let infoList = document.createElement("div");
    let unorderedList = document.createElement("ul");
    let neighborsTitle = document.createElement("li");
    let neighbor1 = document.createElement("li");
    let neighbor2 = document.createElement("li");
    let neighbor3 = document.createElement("li");
    let neighbor4 = document.createElement("li");
    heading.textContent = "Neighboring Countries"

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
    let neighbor1Btn = document.createElement("a");
    let neighbor2Btn = document.createElement("a");
    let neighbor3Btn = document.createElement("a");
    let neighbor4Btn = document.createElement("a");
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
    let infoListEl = document.querySelector("#InfoList");
    infoListEl.innerHTML = "";
    let heading = document.createElement("h1");
    let infoList = document.createElement("div");
    let unorderedList = document.createElement("ul");
    let emergencyNumbers = document.createElement("li");
    let callingCode = document.createElement("li");
    let police = document.createElement("li");
    let ambulance = document.createElement("li");
    let fire = document.createElement("li");
    let policeAEl = document.createElement("a");
    let ambulanceAEl = document.createElement("a");
    let fireAEl = document.createElement("a");

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

    for (i=0; i<data.length; i++) {
        let liEl = document.createElement('li');
        let btnEl = document.createElement('a');
        displayEl.prepend(liEl);
        liEl.append(btnEl);
        btnEl.classList.add('historyBtn');
        btnEl.textContent = data[i];
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
    // Reload page to reflect changes
    location.reload();
}

// Handle search form submit action
function handleSearchFormSubmit(event) {

    event.preventDefault();

    let targetId = event.target.id;
    searchBoxInputEl = document.getElementById("searchInput")
    searchBoxInputMobileEl = document.getElementById("searchInputMobile")

    if (searchBoxInputEl.value) {
        var searchInput = searchBoxInputEl.value;
    } else if (searchBoxInputMobileEl.value) {
        var searchInput = searchBoxInputMobileEl.value;
    }

    // Convert the whole input to all lowercase then convert first letter to upper case
    searchInput = searchInput.toLowerCase();
    searchInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);

    // saveToHistory();
    // Reset the search input value
    this.reset();
    fetchCountryData(searchInput, targetId)
};

// Handle button click for both search history buttons and neighboring countries buttons
function handleBtnClick(event) {
    let country = event.target.textContent;
    // Call fetch country data function with clicked country
    fetchCountryData(country);
};

// Alert invalid input error message
function alertInvalidInput(target) {
    if (target === "searchForm") {
        let inputEl = document.getElementById("searchInput");
        inputEl.setAttribute("placeholder", "Invalid Input!");
    }
    else if (target === "searchFormMobile") {
        let inputEl = document.getElementById("searchInputMobile");
        inputEl.setAttribute("placeholder", "Invalid Input!");
    }
    
};

// First function to call on page load
init();

