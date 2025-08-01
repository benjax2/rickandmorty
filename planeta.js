window.addEventListener('DOMContentLoaded', () => {
  traerUbicaciones();
});

async function traerUbicaciones(desdeId = 1) {
  const aside = document.getElementById('aside-ubicaciones');
  if (!aside) return;
  aside.innerHTML =
    '<h2 class="text-2xl text-green-400 font-bold mb-8">Ubicaciones</h2>';

  const ids = Array.from({ length: 20 }, (_, idx) => desdeId + idx);

  try {
    const respuesta = await fetch(
      `https://rickandmortyapi.com/api/location/${ids.join(',')}`
    );
    if (!respuesta.ok) throw new Error('No se pudo encontrar el resultado');

    const data = await respuesta.json();
    const ubicaciones = Array.isArray(data) ? data : [data];

    ubicaciones.forEach((loc) => renderizarUbicacion(loc, aside));
  } catch (error) {
    console.error('Error al traer ubicaciones:', error.message);
  }
}

function renderizarUbicacion(ubicacion, aside) {
  const div = document.createElement('div');
  div.className =
    'group p-4 mb-3 rounded-lg bg-white/80 shadow-md hover:bg-gradient-to-r hover:from-green-200 hover:to-blue-200 transition-all duration-300 cursor-pointer border-l-4 border-green-400 hover:border-blue-400';
  div.innerHTML = `
    <h3 class="text-lg font-bold text-gray-800 group-hover:text-green-700 transition">${ubicacion.name}</h3>
    <p class="text-sm text-gray-500 font-mono mb-1 group-hover:text-blue-700 transition">Tipo: ${ubicacion.type}</p>
    <p class="text-sm text-gray-500">Dimensión: ${ubicacion.dimension}</p>
    <p class="text-xs text-gray-400">Personajes residentes: ${ubicacion.residents.length}</p>
  `;
  div.addEventListener('click', () => {
    mostrarPersonajesDeUbicacion(
      ubicacion.residents.slice(0, 10),
      ubicacion.name
    );
  });

  aside.appendChild(div);
}

async function mostrarPersonajesDeUbicacion(residentUrls, nombreUbicacion) {
  const contenedor = document.getElementById('personajes');
  contenedor.innerHTML = `
    <h2 class="text-2xl text-green-500 font-bold mb-4 text-center">Residentes en ${nombreUbicacion}</h2>
    <div class="flex flex-wrap gap-4 justify-center items-start"></div>
  `;
  const wrapper = contenedor.querySelector('div');

  if (residentUrls.length === 0) {
    wrapper.innerHTML =
      '<p class="text-gray-500">No hay personajes residentes en esta ubicación.</p>';
    return;
  }

  try {
    const ids = residentUrls.map((url) => url.split('/').pop()).join(',');
    const respuesta = await fetch(
      `https://rickandmortyapi.com/api/character/${ids}`
    );
    if (!respuesta.ok) throw new Error('Error al cargar personajes');

    const data = await respuesta.json();
    const personajes = Array.isArray(data) ? data : [data];

    wrapper.innerHTML = '';
    personajes.forEach((p) => {
      const div = document.createElement('div');
      div.className =
        'bg-white/90 rounded-lg shadow-lg p-3 flex flex-col items-center w-40 hover:scale-105 transition';
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="w-24 h-24 rounded-full mb-2 border-4 border-green-300 shadow">
        <h4 class="font-bold text-gray-800 text-center">${p.name}</h4>
        <span class="text-xs text-gray-500">${p.species} - ${p.status}</span>
      `;
      wrapper.appendChild(div);
    });
  } catch (error) {
    wrapper.innerHTML = `<p class="text-red-500">No se pudieron cargar los personajes.</p>`;
    console.error(error);
  }
  ñ;
}
