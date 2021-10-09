
var searchHistory = JSON.parse(localStorage.getItem("searchHistoryKey"));
if (searchHistory === null) {
  console.log("setting searchHistory to empty array");
  searchHistory = [];
}
console.log(searchHistory);

var searchFormEl = document.querySelector("#searchForm");
var SearchBoxInputEl = document.querySelector("#searchBoxInput");

var alertEl = document.getElementById("Alert");
var searchFormEl = document.querySelector("#searchForm");
var SearchBoxInputEl = document.querySelector("#searchBoxInput");
var countryData = JSON.parse(localStorage.getItem("countryData")) || {};
console.log("countryData", countryData)

// var SearchBoxBtnEl = document.querySelector("#searchBoxButton");
// var countryInfo = document.querySelector("#countryInformation");

var SearchBoxEl = document.querySelector("#SearchBox-input");

// Don't think the following line is needed anymore
// var countryInfo = document.querySelector("#countryInformation");

document
  .getElementById("searchForm")
  .addEventListener("submit", handleSearchFormSubmit);

// Adding focused state, so the input field will out collapse during input
document
  .getElementById("searchForm")
  .addEventListener("click", () => {
    document.getElementById("searchBoxInput").classList.add("focused");
  });

// Not sure what this function does, comment for now
// document
//   .addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.autocomplete');
//     var instances = M.Autocomplete.init(elems, { limit: 10 });
//     instances.destroy();
//     instances.open();
//   });

function handleSearchFormSubmit(event) {

  event.preventDefault();

  let searchInput = SearchBoxInputEl.value;
  searchInput = searchInput.toLowerCase();

  // Reset the search input value
  this.reset();
  fetchCountryData(searchInput)
}

// Store variables in local storage
function saveToHistory() {
  let searchInput = SearchBoxInputEl.value;
  searchInput = searchInput.toLowerCase();
  console.log(searchHistory);

  if (searchHistory.includes(searchInput) === false) {
    searchHistory.push(searchInput);
  }
  citiesStr = JSON.stringify(searchHistory);
  localStorage.setItem("searchHistoryKey", citiesStr);
}


// Moved the fetch data function from back to script.js...
function fetchCountryData(country) {
  // Change the first and last character on fetch URL from ` to '
  // Was causing the country variable not recognised issue
  fetch('https://travelbriefing.org/' + country + '?format=json')
      .then(response => {
          // console.log(response);
          // console.log(response.status); // 200
          // console.log(response.statusText); // OK
          if (response.status != 200) {
            console.log("Response status is not 200!!")
            alertInvalidInput();
          }
          return response.json();
      })
      .then(data => {
        countryData = data;
        if ((country !== "netherlands") && (data.names.name === "Netherlands")) {
          console.log("Invalid search!")
          alertInvalidInput();
        }
        // Inside this else block of code will only run when fetch data is successfully performed
        else {
          countryData.names.name = country;
          localStorage.setItem("countryData", JSON.stringify(countryData));
          // Relocated saveToHistory function here, so that only valid search result is pushed to local storage
          saveToHistory();
          console.log("Search is valid!")
          console.log(data);
          location.assign("./countryinfo.html");
        }
      })
      .catch(err => {
          console.error(err);
          console.log("error detected");
      });
};

function alertInvalidInput() {
  alertEl.textContent = "";
  var alert = document.createElement("h1");
  alert.textContent = "Please enter a valid country";
  alertEl.append(alert);
}
