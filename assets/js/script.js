// let mapBoxAPIKey = config.mapBoxAPIKey;

// var mymap = L.map("mapid").setView([51.505, -0.09], 13);

// .tileLayer(
//   "https://api.mapbox.com/styles/v1.7.1/mapid/tiles/0/0/0?access_token=" +
//     mapBoxAPIKey,
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     // mapbox://styles/mapbox/navigation-day-v1
//     // styles/v1.7.1/mapid/tiles/{z}/{x}/{y}
//     id: "mapbox/streets-v11",
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: mapBoxAPIKey,
//   }
// ).addTo(mymap);

// var marker = L.marker([51.5, -0.09]).addTo(mymap);

// var circle = L.circle([51.508, -0.11], {
//   color: "red",
//   fillColor: "#f03",
//   fillOpacity: 0.5,
//   radius: 500,
// }).addTo(mymap);

// const cityEl = document.getElementById("cityName");

const results = () => {
  window.location.href = "map.html";
};

// function countryData() {
//   fetch(`https://travelbriefing.org/Netherlands?format=json`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       cityEl.textContent = temp.value;
//       // console.log(data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }
// countryData();
// button.onclick = function results() {

// }

// Listen to form submit event
// document
//   .getElementById("searchForm")
//   .addEventListener("submit", handleSearchFormSubmit);
