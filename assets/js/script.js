
// TO DO LIST (feel free to tackle any of these)
// 1. make evenlistener("click") function  === Done ===
// 2. on enter or click the second page should load (atm its a manual load) === Done ===
// 3. autocomplete to be added to search bar (this is a possible source) === Done ===
//          https://tarekraafat.github.io/autoComplete.js/#/usage
// 4. Country Info background needs to be changed === API call to upsplash API dynamic return image based on searched country === in progress ===
// 5. countryInfo card needs a transparent background and font-size to be increased

var serachFormEl = document.querySelector("#searchForm");
var SearchBoxInputEl = document.querySelector("#searchBoxInput");
// var SearchBoxBtnEl = document.querySelector("#searchBoxButton");
// var countryInfo = document.querySelector("#countryInformation");

var SearchBoxEl = document.querySelector("#SearchBox-input")
var countryInfo = document.querySelector("#countryInformation")

document.getElementById("searchForm").addEventListener("submit", handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
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

// Fetch country data from API
function fetchCountryData(country) {
  // Change the first and last character on fetch URL from ` to '
  // Was causing the country variable not recognised issue
  fetch('https://travelbriefing.org/' + country + '?format=json')
      .then(response => {
          // Invalid input message for all status other than 200
          if (response.status != 200) {
            SearchBoxInputEl.setAttribute("placeholder","Invalid input! Country name only!");
          }
          return response.json();
      })
      .then(data => {
          // The API will still return Netherlands as a result string with invalid country name input, thus this condition check
          // for invalid input, then display error messageon the place holder.
          if ( (country !== "netherlands") && (data.names.name === "Netherlands")) {
            SearchBoxInputEl.setAttribute("placeholder","Invalid input! Country name only!");
          }
          else {
            // Convert data from object to string and store at local storage
            localStorage.setItem("countryData", JSON.stringify(data));
            // Navigate page to countryinfo.html on successful data fetch
            location.assign("./countryinfo.html");
            countryData = data;
          }
      })
      .catch(err => {
          console.error(err);
      });
};

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
