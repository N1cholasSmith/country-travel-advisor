// Initialize and add the map
var country = 'Netherlands';
var countryData = {
  caUrl: null,
  uaUrl: null,
  currency: null,
  compareAus: null,
  electricity: {vol:null, freq:null, plugs:null,},
  language: null,
  maps: {lat:null, lon:null},
  names: {name:null, fullName:null, continent:null},
  neighbors: [{id:null, name:null},{id:null, name:null},{id:null, name:null},{id:null, name:null},{id:null, name:null}],
  telephone: {callingCode:null, police:null, ambulance:null, fire:null},
  jan: {tMin:null, tMax:null, tAvg:null},
  feb: {tMin:null, tMax:null, tAvg:null},
  mar: {tMin:null, tMax:null, tAvg:null},
  apr: {tMin:null, tMax:null, tAvg:null},
  may: {tMin:null, tMax:null, tAvg:null},
  jun: {tMin:null, tMax:null, tAvg:null},
  jul: {tMin:null, tMax:null, tAvg:null},
  aug: {tMin:null, tMax:null, tAvg:null},
  sep: {tMin:null, tMax:null, tAvg:null},
  oct: {tMin:null, tMax:null, tAvg:null},
  nov: {tMin:null, tMax:null, tAvg:null},
  dec: {tMin:null, tMax:null, tAvg:null},
}

// Fetch data from API
function countryData(country){
  fetch(`https://travelbriefing.org/' + ${country} + '?format=json`)
  .then(response => {
    return response.json();
    console.log(response);
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
  console.error(err);
  });
}

countryData();


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


