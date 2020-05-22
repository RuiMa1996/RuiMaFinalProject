const startingLocation = document.querySelector('.origin-form');
const resultsOfStart = document.querySelector('.origins');
const lockInWinnipeg = '-97.325875, 49.766204, -96.953987, 49.99275';
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJzbGltcmVhcGVycnVpIiwiYSI6ImNrYTVpazZ6YzAwajYzZ21nNHlmY2VtMDkifQ.6XvTvzaHaHxeGag0GKOs4w';

function displayStartingLocation(query) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}&limit=10&bbox=${lockInWinnipeg}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error ('No results found');
      }
    })
    .then(searchResults => {
      let arrayOfResults;
      arrayOfResults = searchResults.features;
      displayResults(arrayOfResults);
    });
}

function displayResults(array) {
  resultsOfStart.innerHTML = "";
  for(let location of array) {
    resultsOfStart.insertAdjacentHTML('afterbegin', `
      <li data-long=${location.center[0]} data-lat=${location.center[1]} class="">
        <div class="name">${location.text}</div>
        <div>${location.properties.address}</div>
      </li>
    `)
  }
}

startingLocation.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  displayStartingLocation(input.value);
  input.value = "";
})