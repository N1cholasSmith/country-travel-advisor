// Retrieves search history and country data from local storage, set to empty array or object if local storage is empty
var searchHistory = JSON.parse(localStorage.getItem("searchHistoryKey")) || [];
var countryData = JSON.parse(localStorage.getItem("countryData")) || {};
var searchFormEl = document.querySelector("#searchForm");
var SearchBoxInputEl = document.querySelector("#searchBoxInput");
var alertEl =document.querySelector("#Alert");
var searchFormEl = document.querySelector("#searchForm");

// Listen to submit event on search form
document
  .getElementById("searchForm")
  .addEventListener("submit", handleSearchFormSubmit);

// Adding focused state, so the input field will out collapse during input
document
  .getElementById("searchForm")
  .addEventListener("click", () => {
    document.getElementById("searchBoxInput").classList.add("focused");
  });


function handleSearchFormSubmit(event) {
  event.preventDefault();

  let searchInput = SearchBoxInputEl.value;
  // Convert the whole input to all lowercase then convert first letter to upper case
  searchInput = searchInput.toLowerCase();
  searchInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);

  // Reset the search input value
  this.reset();
  fetchCountryData(searchInput)
}

// Store variables in local storage
function saveToHistory(country) {
  if (searchHistory.includes(country) === false) {
    searchHistory.push(country);
  }
  citiesStr = JSON.stringify(searchHistory);
  localStorage.setItem("searchHistoryKey", citiesStr);
}

// Fetch country data from API
function fetchCountryData(country) {
  // Change the first and last character on fetch URL from ` to '
  // Was causing the country variable not recognised issue
  fetch('https://travelbriefing.org/' + country + '?format=json')
      .then(response => {
          // Display error message if response in not valid
          if (response.status != 200) {
            alertInvalidInput();
          }
          return response.json();
      })
      .then(data => {
        countryData = data;
        // Check for valid country name, due to API will return Netherlands as result with incorrect country name
        if ((country !== "netherlands") && (data.names.name === "Netherlands")) {
          alertInvalidInput();
        }
        // Inside this else block of code will only run when fetch data is successfully performed
        else {
          localStorage.setItem("countryData", JSON.stringify(countryData));
          // Only valid search result is pushed to local storage
          saveToHistory(country);
          // Navigate to countryinfo page
          location.assign("./countryinfo.html");
        }
      })
      .catch(err => {
          console.error(err);
      });
};

// Display error message
function alertInvalidInput() {
  alertEl.textContent = "";
  var alert = document.createElement("h1");
  alert.textContent = "Please enter a valid country";
  alertEl.append(alert);
}
