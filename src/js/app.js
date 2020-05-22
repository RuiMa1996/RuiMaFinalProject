const startingLocation = document.querySelector('.origin-form');
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
      console.log(arrayOfResults);
    });
}

startingLocation.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  displayStartingLocation(input.value);
  input.value = "";
})