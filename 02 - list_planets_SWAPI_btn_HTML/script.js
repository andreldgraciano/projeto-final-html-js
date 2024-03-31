async function loadPlanets(url = 'https://swapi.dev/api/planets/', allPlanets = []) {
  const response = await fetch(url);
  const data = await response.json();
  allPlanets = allPlanets.concat(data.results);

  if (data.next) {
      return loadPlanets(data.next, allPlanets);
  } else {
      return allPlanets;
  }
};

let ul_planets = document.getElementById('ul_planets');

function gerar_cor_hexadecimal() {
  let R = Math.floor(Math.random() * 186);
  let G = Math.floor(Math.random() * 50);
  let B = Math.floor(Math.random() * 256);
  let hex = '#' + R.toString(16).padStart(2, '0') +
                  G.toString(16).padStart(2, '0') +
                  B.toString(16).padStart(2, '0');
  return hex;
};

document.addEventListener("DOMContentLoaded", function() {
  loadPlanets().then(function(planets) {
    document.getElementById('paragraph').innerHTML = "";
    planets.forEach(planet => {
      let li = document.createElement('li');
      li.innerHTML = `<button style="background-color: ${gerar_cor_hexadecimal()};">${planet.name}</button>`;
      ul_planets.appendChild(li);
    });
  });
});
