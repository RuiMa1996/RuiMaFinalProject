const startingLocation = document.querySelector('.origin-form');
const destination = document.querySelector('.destination-form')
const resultsOfStart = document.querySelector('.origins');
const resultsOfDestination = document.querySelector('.destinations');
const searchTripButton = document.querySelector('.button-container');
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

function displayDestination(query) {
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
      resultsOfDestinations(arrayOfResults);
    });
}

function displayResults(array) {
  resultsOfStart.innerHTML = "";
  for(let location of array) {
    resultsOfStart.insertAdjacentHTML('beforeend', `
      <li data-long=${location.center[0]} data-lat=${location.center[1]} class="">
        <div class="name">${location.place_name.split(',')[0]}</div>
        <div>${location.place_name.split(',')[1]}</div>
      </li>
    `)
  }
}

function resultsOfDestinations(array) {
  resultsOfDestination.innerHTML = "";
  for(let location of array) {
    resultsOfDestination.insertAdjacentHTML('beforeend', `
      <li data-long=${location.center[0]} data-lat=${location.center[1]} class="">
        <div class="name">${location.place_name.split(',')[0]}</div>
        <div>${location.place_name.split(',')[1]}</div>
      </li>
    `)
  }
}

startingLocation.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  displayStartingLocation(input.value);
  input.value = "";
});

destination.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  displayDestination(input.value);
  input.value = "";
});

resultsOfStart.addEventListener('click', function(e) {
  const rightClick = e.target.closest('li');
  for(let child of resultsOfStart.children) {
    child.className = "";
  }
  rightClick.className = "selected";
});

resultsOfDestination.addEventListener('click', function(e) {
  const rightClick = e.target.closest('li');
  for(let child of resultsOfDestination.children) {
    child.className = "";
  }
  rightClick.className = "selected";
});

searchTripButton.addEventListener('click', function(e) {
  if(e.target.className === "plan-trip") {
    console.log('hi');
  }
})