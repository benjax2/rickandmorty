// Función para renderizar cada personaje en una tarjeta
function renderizarPersonaje(personaje) {
  const contenedor = document.getElementById('characters');
  const tarjeta = document.createElement('div');
  tarjeta.className =
    'bg-[#22223b] border-2 border-[#39FF14] rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[340px] flex flex-col justify-between';

  tarjeta.innerHTML = `
    <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-56 object-cover">
    <div class="p-6 flex flex-col items-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-2 text-[#39FF14] text-center" style="font-family: 'Luckiest Guy', cursive;">${personaje.name}</h2>
      <p class="text-lg text-gray-300 text-center"> ${personaje.species}</p>
      <p class="text-lg text-gray-300 text-center"> ${personaje.status}</p>
    </div>
  `;

  contenedor.appendChild(tarjeta);
}
// Carga inicial: 12 personajes (por ID)
async function traerPersonajes(desdeId = 1) {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';

  for (let i = desdeId; i < desdeId + 12; i++) {
    try {
      const respuesta = await fetch(
        `https://rickandmortyapi.com/api/character/${i}`
      );
      if (!respuesta.ok) {
        throw new Error('No se pudo encontrar el resultado');
      }
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