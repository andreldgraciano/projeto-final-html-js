async function loadPlanets(url = 'https://swapi.dev/api/planets/', allPlanets = []) {
  const response = await fetch(url);
  const data = await response.json();
  allPlanets = allPlanets.concat(data.results);

  if (data.next) {
      return loadPlanets(data.next, allPlanets);
  } else {
      console.log(allPlanets);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  loadPlanets()
});