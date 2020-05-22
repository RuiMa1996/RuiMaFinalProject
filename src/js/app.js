const startingLocation = document.querySelector('.origin-form');
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJzbGltcmVhcGVycnVpIiwiYSI6ImNrYTVpazZ6YzAwajYzZ21nNHlmY2VtMDkifQ.6XvTvzaHaHxeGag0GKOs4w';

startingLocation.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  console.log(input.value);
})