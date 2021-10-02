
// TO DO LIST (feel free to tackle any of these)
// 1. make evenlistener("click") function
// 2. on enter or click the second page should load (atm its a manual load)
// 3. autocomplete to be added to search bar (this is a possible source)
//          https://tarekraafat.github.io/autoComplete.js/#/usage
// 4. Country Info background needs to be changed
// 5. countryInfo card needs a transparent background and font-size to be increased

var serachFormEl = document.querySelector("#searchForm");
var SearchBoxInputEl = document.querySelector("#serachBoxInput");
var SearchBoxBtnEl = document.querySelector("#searchBoxButton");
var countryInfo = document.querySelector("#countryInformation");

document.getElementById("searchForm").addEventListener("submit", handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();

  let searchInput = SearchBoxInputEl.value;
  var queryString = "./countryinfo.html?q=" + searchInput;

  this.reset();
  if (searchInput) {
    location.assign(queryString);
  }
}


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
