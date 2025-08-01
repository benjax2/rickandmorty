async function traerEpisodio(desdeId = 1) {
  const aside = document.getElementById('aside-episodios');
  if (!aside) return;
  aside.innerHTML =
    '<h2 class="text-2xl text-green-400 font-bold mb-8">Episodios</h2>';

  const ids = Array.from({ length: 20 }, (_, idx) => desdeId + idx);
  try {
    const respuesta = await fetch(
      `https://rickandmortyapi.com/api/episode/${ids.join(',')}`
    );
    if (!respuesta.ok) {
      throw new Error('No se pudo encontrar el resultado');
    }
    const data = await respuesta.json();

    const episodios = Array.isArray(data) ? data : [data];
    episodios.forEach((ep) => renderizarEpisodio(ep, aside));
  } catch (error) {
    console.error('Error al traer episodios:', error.message);
  }
}

function renderizarEpisodio(episodio, aside) {
  const div = document.createElement('div');
  div.className = `episodio group p-4 mb-3 rounded-lg bg-white/80 shadow-md hover:bg-gradient-to-r hover:from-green-200 hover:to-blue-200 transition-all duration-300 cursor-pointer border-l-4 border-green-400 hover:border-blue-400`;
  div.innerHTML = `
    <p class="text-sm text-gray-500 font-mono mb-1 group-hover:text-blue-700 transition">${episodio.episode}</p>
    <h3 class="text-lg font-bold text-gray-800 group-hover:text-green-700 transition">${episodio.name}</h3>
   
  `;
  div.addEventListener('click', () => mostrarPersonajesEpisodio(episodio));
  aside.appendChild(div);
}

async function mostrarPersonajesEpisodio(episodio) {
  const card = document.querySelector('.card');
  if (!card) return;
  card.innerHTML = `<h2 class="text-2xl text-green-400 font-bold mb-4 text-center">Personajes de ${episodio.episode}</h2><div class="flex flex-wrap gap-4 justify-center items-start"></div>`;
  const personajesContainer = card.querySelector('div');
  if (!episodio.characters || episodio.characters.length === 0) {
    personajesContainer.innerHTML =
      '<p class="text-gray-500">No hay personajes para este episodio.</p>';
    return;
  }

  try {
    const ids = episodio.characters
      .map((url) => url.split('/').pop())
      .join(',');
    const resp = await fetch(
      `https://rickandmortyapi.com/api/character/${ids}`
    );
    if (!resp.ok) throw new Error('No se pudieron obtener los personajes');
    let data = await resp.json();
    const personajes = Array.isArray(data) ? data : [data];
    personajesContainer.innerHTML = '';
    personajes.forEach((personaje) => {
      const cardPers = document.createElement('div');
      cardPers.className =
        'bg-white/90 rounded-lg shadow-lg p-3 flex flex-col items-center w-40 hover:scale-105 transition';
      cardPers.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}" class="w-24 h-24 rounded-full mb-2 border-4 border-green-300 shadow">
        <h4 class="font-bold text-nowrap text-gray-800 text-center">${personaje.name}</h4>
        <span class="text-xs text-gray-500">${personaje.species} - ${personaje.status}</span>
      `;
      personajesContainer.appendChild(cardPers);
    });
  } catch (error) {
    personajesContainer.innerHTML = `<p class="text-red-500">Error al cargar personajes.</p>`;
  }
}
window.addEventListener('DOMContentLoaded', () => {
  traerEpisodio();
});
window.addEventListener('DOMContentLoaded', () => {
  traerEpisodio();
});
