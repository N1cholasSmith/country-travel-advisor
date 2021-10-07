
var searchHistory = JSON.parse(localStorage.getItem("searchHistoryKey"));
if (searchHistory === null) {
  console.log("setting searchHistory to empty array");
  searchHistory = [];
}
console.log(searchHistory);

var serachFormEl = document.querySelector("#searchForm");
var SearchBoxInputEl = document.querySelector("#searchBoxInput");

var alertEl = document.getElementById("Alert");
var serachFormEl = document.querySelector("#searchForm");
var SearchBoxInputEl = document.querySelector("#searchBoxInput");
var countryData = JSON.parse(localStorage.getItem("countryData")) || {};
console.log("countryData", countryData)

// var SearchBoxBtnEl = document.querySelector("#searchBoxButton");
// var countryInfo = document.querySelector("#countryInformation");

var SearchBoxEl = document.querySelector("#SearchBox-input");
var countryInfo = document.querySelector("#countryInformation");

document
  .getElementById("searchForm")
  .addEventListener("submit", handleSearchFormSubmit);

document.getElementById("searchForm").addEventListener("click", () => {
  document.getElementById("searchBoxInput").classList.add("focused");
});

function handleSearchFormSubmit(event) {

  event.preventDefault();

  let searchInput = SearchBoxInputEl.value;
  searchInput = searchInput.toLowerCase();
  var queryString = "./countryinfo.html?q=" + searchInput;

  // Reset the search input value
  saveToHistory();
  this.reset();
  fetchCountryData(searchInput)
  // if (searchInput) {
  //   location.assign(queryString);
  // }
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
            console.log(response);
            console.log(response.status); // 200
            console.log(response.statusText); // OK
            if (response.status != 200) {
                console.log("Response status is not 200!!")
            }
            return response.json();
        })
        .then(
            data => {
                countryData = data;
                if ((country !== "netherlands") && (data.names.name === "Netherlands")) {
                    console.log("Invalid search!")
                    alertEl.textContent = "";
                    var alert = document.createElement("h1");
                    alert.textContent = "Please enter a valid country";
                    alertEl.append(alert);
                }
                else {
                    countryData.names.name = country;
                    
                    localStorage.setItem("countryData", JSON.stringify(countryData));
              
                    // countryData.push();
                    // this.reset();
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


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, { limit: 10 });
    // instances.destroy();
    // instances.open();
});



