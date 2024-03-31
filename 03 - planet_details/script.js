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

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

let open_historico;

document.addEventListener("DOMContentLoaded", function() {
  loadPlanets().then(function(planets) {
    document.getElementById('paragraph').innerHTML = "";
    
    planets.forEach(planet => {
      let li = document.createElement('li');
      li.innerHTML = `
      <button class="btn" style="background-color: ${gerar_cor_hexadecimal()};">${planet.name}</button>
      <div class="oculto detalhes">
        <p><b>Nome:</b> ${planet.name}</p>
        <p><b>Clima:</b> ${capitalize(planet.climate)}</p>
        <p><b>População:</b> ${planet.population}</p>
        <p><b>Tipo do Terreno:</b> ${capitalize(planet.terrain)}</p>
      </div>`;
      ul_planets.appendChild(li);
    });

    let buttons = document.querySelectorAll('#ul_planets .btn');

    buttons.forEach(button => {
      button.addEventListener('click', function() {
        if (open_historico) {
          if (open_historico == button) {
            console.log("clicou no mesmo")
            const next_element = this.nextElementSibling;
            next_element.classList.toggle('oculto');
        } else {
            console.log("clicou em diferente")
            const next_element_old = open_historico.nextElementSibling;
            next_element_old.classList.add('oculto');
            const next_element = this.nextElementSibling;
            next_element.classList.toggle('oculto');
            open_historico = button;
        };
        } else {
            console.log("primeiro click")
            const next_element = this.nextElementSibling;
            next_element.classList.toggle('oculto');
            open_historico = button;
        };
      });
    });
  });
});

