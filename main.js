
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


async function traerpokemones(numeroInicialPersonajes) {
  const contenedor = document.getElementById('characters');
  contenedor.innerHTML = '';

  for (let i = numeroInicialPersonajes; i < numeroInicialPersonajes + 12; i++) {
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
      console.error(`Error al cargar el personaje ${i}`, error);
    }
  }
}

// Llama a la función con el ID inicial que quieras
traerpokemones(1);
