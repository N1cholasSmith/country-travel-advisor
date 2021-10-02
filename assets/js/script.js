
// TO DO LIST (feel free to tackle any of these)
// 1. make evenlistener("click") function
// 2. on enter or click the second page should load (atm its a manual load)
// 3. autocomplete to be added to search bar (this is a possible source)
//          https://tarekraafat.github.io/autoComplete.js/#/usage
// 4. Country Info background needs to be changed
// 5. countryInfo card needs a transparent background and font-size to be increased


var SearchBoxEl = document.querySelector(".SearchBox-input")
var submitButton = document.querySelector(".SearchBox-button")
var countryInfo = document.querySelector("#countryInformation")

function countryData() {
  console.log(countryData)
  fetch(`https://travelbriefing.org/${SearchBoxEl.value}?format=json`)

  // Initialize and add the map
  var country = 'Netherlands';
  var countryData = {
    caUrl: null,
    uaUrl: null,
    currency: null,
    compareAus: null,
    electricity: { vol: null, freq: null, plugs: null, },
    language: null,
    maps: { lat: null, lon: null },
    names: { name: null, fullName: null, continent: null },
    neighbors: [{ id: null, name: null }, { id: null, name: null }, { id: null, name: null }, { id: null, name: null }, { id: null, name: null }],
    telephone: { callingCode: null, police: null, ambulance: null, fire: null },
    jan: { tMin: null, tMax: null, tAvg: null },
    feb: { tMin: null, tMax: null, tAvg: null },
    mar: { tMin: null, tMax: null, tAvg: null },
    apr: { tMin: null, tMax: null, tAvg: null },
    may: { tMin: null, tMax: null, tAvg: null },
    jun: { tMin: null, tMax: null, tAvg: null },
    jul: { tMin: null, tMax: null, tAvg: null },
    aug: { tMin: null, tMax: null, tAvg: null },
    sep: { tMin: null, tMax: null, tAvg: null },
    oct: { tMin: null, tMax: null, tAvg: null },
    nov: { tMin: null, tMax: null, tAvg: null },
    dec: { tMin: null, tMax: null, tAvg: null },
  }
}

// Fetch data from API
function countryData(country) {
  fetch(`https://travelbriefing.org/' + ${country} + '?format=json`)
    .then(response => {
      return response.json();
      console.log(response);
    })
    .then(data => {
      console.log(data);

      localStorage.setItem("countries", JSON.stringify(data));
    })
    .catch(err => {
      console.error(err);
    });
}


SearchBoxEl.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    countryData();
  }
});