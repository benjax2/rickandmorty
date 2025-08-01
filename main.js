let contenedor = document.querySelector("#contenedor");

async function traerpokemones(numeroInicialPokemones) {
    contenedor.innerHTML = "";
    for (let i = numeroInicialPokemones; i < numeroInicialPokemones + 10; i++) {
    let respuesta = await fetch(`https://rickandmortyapi.com/api/character/${i}`);
    let data = await respuesta.json();
    renderizarPersonajes(data);
    }
}




// Función para renderizar cada personaje en una tarjeta
function renderizarPersonaje(personaje) {
  const contenedor = document.getElementById("contenedor");
  const tarjeta = document.createElement("div");
  tarjeta.className = "bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105";

  tarjeta.innerHTML = `
    <img src="${personaje.image}" alt="${personaje.name}" class="w-120 h-60 object-cover">
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">${personaje.name}</h2>
      <p class="text-gray-600">Especie: ${personaje.species}</p>
      <p class="text-gray-600">Estado: ${personaje.status}</p>
    </div>
  `;

  contenedor.appendChild(tarjeta);
}

// Función para traer 10 personajes desde un ID inicial
async function traerpokemones(numeroInicialPersonajes) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  for (let i = numeroInicialPersonajes; i < numeroInicialPersonajes + 10; i++) {
    try {
      const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${i}`);
      const data = await respuesta.json();
      renderizarPersonaje(data);
      if (!respuesta.ok){
        throw new Error('No se pudo encontrar el resultado');
      }
    } catch (error) {
      console.error(`Error al cargar el personaje ${i}`, error);
    }
  }
}

// Llama a la función con el ID inicial que quieras
traerpokemones(1);

let next = document.querySelector("#siguiente");
let contador = 1;
next.addEventListener("click", function (e) {
  contador += 10;
  traerpokemones(contador);
});

let ant = document.querySelector("#anterior");

ant.addEventListener("click", function (e) {
  if (contador > 10) {
    contador -= 10;
    traerpokemones(contador);
  }
});
