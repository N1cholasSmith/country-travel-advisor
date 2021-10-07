// TO DO LIST (feel free to tackle any of these)
// 1. make evenlistener("click") function  === Done ===
// 2. on enter or click the second page should load (atm its a manual load) === Done ===
// 3. autocomplete to be added to search bar (this is a possible source) === Done ===
//          https://tarekraafat.github.io/autoComplete.js/#/usage
// 4. Country Info background needs to be changed === API call to upsplash API dynamic return image based on searched country === in progress ===
// 5. countryInfo card needs a transparent background and font-size to be increased


var searchHistory = JSON.parse(localStorage.getItem("searchHistoryKey"));
if (searchHistory === null) {
  console.log("setting searchHistory to empty array");
  searchHistory = [];
}
// console.log(searchHistory);
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
  var queryString = "./countryinfo.html?q=" + searchInput;

  // Reset the search input value
  saveToHistory();
  this.reset();
  if (searchInput) {
    location.assign(queryString);
  }
}

// Store variables in local storage

function saveToHistory() {
  const searchInput = SearchBoxInputEl.value;
  console.log(searchHistory);

  if (searchHistory.includes(searchInput) === false) {
    searchHistory.push(searchInput);
  }
  citiesStr = JSON.stringify(searchHistory);
  localStorage.setItem("searchHistoryKey", citiesStr);
}
    event.preventDefault();

    let searchInput = SearchBoxInputEl.value;
    searchInput = searchInput.toLowerCase();
    // var queryString = "./countryinfo.html?q=" + searchInput;

    fetchCountryData(searchInput);
    // Reset the search input value
    this.reset();
    // if (searchInput) {
    //   location.assign(queryString);
    // }
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


//hides the go back button on this file
// document.getElementById("goBack").style.display = "none";

// ================ NICE TO HAVES================================================

// var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.mapbox.com/styles/v1.7.1/mapid/tiles/0/0/0?access_token=pk.eyJ1IjoiZGV2cmF5aGUiLCJhIjoiY2t1NWNsNHRoM2ExMDJucW1zMDlrMDB2ZyJ9.Yo-UqtdijyJ8P_7VfmMmng', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     // mapbox://styles/mapbox/navigation-day-v1
//     // styles/v1.7.1/mapid/tiles/{z}/{x}/{y}
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiZGV2cmF5aGUiLCJhIjoiY2t1NWNsNHRoM2ExMDJucW1zMDlrMDB2ZyJ9.Yo-UqtdijyJ8P_7VfmMmng'
// }).addTo(mymap);

// var marker = L.marker([51.5, -0.09]).addTo(mymap);

// var circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(mymap);

// console.log('pk.eyJ1IjoiZGV2cmF5aGUiLCJhIjoiY2t1NWNsNHRoM2ExMDJucW1zMDlrMDB2ZyJ9.Yo-UqtdijyJ8P_7VfmMmng');

// function covid(data){
//   var data = fetch(`https://coronavirus.m.pipedream.net/`)
//   .then(response => response.json())
//   .then((data)=>{
//     console.log(data)
//   })
// }

// countryData();

// Comment this out for now.
// function initMap() {
//   // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.036 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 9,
//     center: uluru,
//   });
//   // The marker, positioned at Uluru
//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// }
// initMap();



