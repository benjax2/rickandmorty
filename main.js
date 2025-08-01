const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';
const charactersContainer = document.getElementById('characters-container');
const infoMessageContainer = document.getElementById('info-message-container');
const characterSearchInput = document.getElementById('character-search-input');
const statusFilter = document.getElementById('status-filter');
const speciesFilter = document.getElementById('species-filter');
const genderFilter = document.getElementById('gender-filter');
const prevPageButton = document.getElementById('prev-page-button');
const nextPageButton = document.getElementById('next-page-button');
const searchForm = document.getElementById('search-form');

let currentPage = 1;
let totalPages = 1;

// --- Mostrar mensaje o loading spinner ---
function displayMessage(message, isLoader = false) {
  infoMessageContainer.innerHTML = '';
  charactersContainer.innerHTML = '';

  const msg = document.createElement('div');
  msg.className = 'py-10 text-center text-xl text-gray-400';

  msg.innerHTML = isLoader
    ? `
      <div class="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-4">${message}</p>`
    : message;

  infoMessageContainer.appendChild(msg);
}

// --- Limpia mensajes ---
function clearMessages() {
  infoMessageContainer.innerHTML = '';
}

// --- Renderizar tarjeta individual ---
function renderCharacterCard(character) {
  const card = document.createElement('div');
  card.className =
    'bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:ring-2 hover:ring-green-400 flex flex-col';

  card.innerHTML = `
    <img src="${character.image}" alt="${character.name}" 
      class="w-full object-center border-b border-gray-700 transition duration-300" />

    <div class="p-4 flex-grow">
      <h2 class="text-2xl font-bold text-green-400 mb-2 truncate">${
        character.name
      }</h2>
      <p class="text-gray-300 text-sm"><strong>Estado:</strong> ${
        character.status
      }</p>
      <p class="text-gray-300 text-sm"><strong>Especie:</strong> ${
        character.species
      }</p>
      <p class="text-gray-300 text-sm"><strong>Género:</strong> ${
        character.gender
      }</p>
      ${
        character.origin?.name !== 'unknown'
          ? `<p class="text-gray-300 text-sm"><strong>Origen:</strong> ${character.origin.name}</p>`
          : ''
      }
      ${
        character.location?.name !== 'unknown'
          ? `<p class="text-gray-300 text-sm"><strong>Ubicación:</strong> ${character.location.name}</p>`
          : ''
      }
    </div>
  `;

  charactersContainer.appendChild(card);
}

// --- Obtener personajes desde la API ---
async function fetchCharacters(page = 1) {
  displayMessage('Cargando personajes...', true);

  const params = new URLSearchParams();
  const name = characterSearchInput.value.trim();
  const status = statusFilter.value;
  const species = speciesFilter.value;
  const gender = genderFilter.value;

  if (name) params.append('name', name);
  if (status) params.append('status', status);
  if (species) params.append('species', species);
  if (gender) params.append('gender', gender);
  params.append('page', page);

  try {
    const res = await fetch(`${API_BASE_URL}?${params.toString()}`);

    if (!res.ok) {
      if (res.status === 404) {
        displayMessage('No se encontraron personajes.');
        disablePagination();
        return;
      }
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    clearMessages();
    charactersContainer.innerHTML = '';

    data.results.slice(0, 8).forEach(renderCharacterCard);

    currentPage = page;
    totalPages = data.info.pages;

    updatePagination(data.info);
  } catch (error) {
    console.error(error);
    displayMessage('Ocurrió un error al cargar personajes.');
    disablePagination();
  }
}

// --- Habilitar/deshabilitar paginación ---
function updatePagination(info) {
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage >= totalPages;
}

// --- Desactivar paginación si hay error ---
function disablePagination() {
  prevPageButton.disabled = true;
  nextPageButton.disabled = true;
}

// --- Listeners ---
function setupEventListeners() {
  // Buscar
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchCharacters(1);
  });

  // Filtros
  [statusFilter, speciesFilter, genderFilter].forEach((filter) =>
    filter.addEventListener('change', () => fetchCharacters(1))
  );

  // Paginación
  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) fetchCharacters(currentPage - 1);
  });

  nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) fetchCharacters(currentPage + 1);
  });
}

// --- Inicializar ---
function init() {
  setupEventListeners();
  fetchCharacters(1);
}

document.addEventListener('DOMContentLoaded', init);
