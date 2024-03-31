async function loadPlanets(url = 'https://swapi.dev/api/planets/', allPlanets = []) {
  const response = await fetch(url);
  const data = await response.json();
  allPlanets = allPlanets.concat(data.results);

  if (data.next) {
      return loadPlanets(data.next, allPlanets);
  } else {
      return allPlanets;
  };
};

const ul_planets = document.querySelector('#ul_planets');
const inputSearch = document.querySelector("input[type='search']");

let allPlanets;

inputSearch.oninput = () => {
  ul_planets.innerHTML = "";
  
  allPlanets
    .filter((planet) =>
      planet.name.toLowerCase().includes(inputSearch.value.toLowerCase())
    )
    .forEach((planet) => {
      if (planet.name.toLowerCase() == inputSearch.value.toLowerCase()){
        carregarDados(planet);
      } else {
        carregarNome(planet);
      }
    });
};

document.addEventListener("DOMContentLoaded", function() {
  loadPlanets().then(function(planets) {
    document.querySelector('#paragraph').remove();
    document.querySelector('#main').classList.remove("oculto");
    allPlanets = planets;
    allPlanets.forEach(planet => {
        carregarNome(planet);
    });
  });
});

function carregarDados(planet) {
  let li = document.createElement('li');
      li.innerHTML = `
      <div class="detalhes">
        <p style="background-color: ${gerar_cor_hexadecimal()};">${planet.name}</p>
        <p><b>Nome:</b> ${planet.name}</p>
        <p><b>Clima:</b> ${capitalize(planet.climate)}</p>
        <p><b>População:</b> ${planet.population}</p>
        <p><b>Tipo do Terreno:</b> ${capitalize(planet.terrain)}</p>
      </div>`;
      ul_planets.appendChild(li);
};

function carregarNome(planet) {
  let li = document.createElement('li');
      li.innerHTML = `
      <div class="detalhes border">
        <p style="background-color: ${gerar_cor_hexadecimal()}; width: 150px;">${planet.name}</p>
      </div>`;
      ul_planets.appendChild(li);
};

function gerar_cor_hexadecimal() {
  let R = Math.floor(Math.random() * 186);
  let G = Math.floor(Math.random() * 50);
  let B = Math.floor(Math.random() * 256);
  let hex = '#' + R.toString(16).padStart(2, '0') +
                  G.toString(16).padStart(2, '0') +
                  B.toString(16).padStart(2, '0');
  return hex;
};
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}