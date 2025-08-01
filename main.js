// Renderiza una tarjeta de personaje
function renderizarPersonaje(personaje) {
  const contenedor = document.getElementById('contenedor');

  const tarjeta = document.createElement('div');
  tarjeta.className =
    'bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105';

  tarjeta.innerHTML = `
    <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-60 object-cover">
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">${personaje.name}</h2>
      <p class="text-gray-600">Especie: ${personaje.species}</p>
      <p class="text-gray-600">Estado: ${personaje.status}</p>
      <p class="text-gray-600">Género: ${personaje.gender}</p>
    </div>
  `;

  contenedor.appendChild(tarjeta);
}

// Carga inicial: 10 personajes (por ID)
async function traerPersonajes(desdeId = 1) {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';

  for (let i = desdeId; i < desdeId + 10; i++) {
    try {
      const respuesta = await fetch(
        `https://rickandmortyapi.com/api/character/${i}`
      );
      if (!respuesta.ok) throw new Error('No se pudo cargar el personaje');
      const data = await respuesta.json();
      renderizarPersonaje(data);
    } catch (error) {
      console.error(`Error con el personaje ID ${i}:`, error.message);
    }
  }
}

// Búsqueda por nombre
async function buscarPorNombre() {
  const contenedor = document.getElementById('contenedor');
  const input = document.getElementById('busqueda-nombre');
  const nombre = input.value.trim().toLowerCase();

  contenedor.innerHTML = '';

  if (!nombre) {
    contenedor.innerHTML =
      '<p class="text-red-600 p-4">Ingresa un nombre válido.</p>';
    return;
  }

  try {
    const respuesta = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${nombre}`
    );
    if (!respuesta.ok) throw new Error('No se encontró el personaje');
    const data = await respuesta.json();
    data.results.forEach((personaje) => renderizarPersonaje(personaje));
  } catch (error) {
    contenedor.innerHTML = `<p class="text-red-600 p-4">Error: ${error.message}</p>`;
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Carga inicial
  traerPersonajes(1);

  // Búsqueda
  const inputNombre = document.getElementById('busqueda-nombre');
  const botonBuscar = document.getElementById('btn-buscar');

  inputNombre.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscarPorNombre();
  });

  botonBuscar.addEventListener('click', buscarPorNombre);
});
