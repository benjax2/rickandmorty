async function fetchData() {
  try {
    const characterName = document.getElementById('characterName');

    const response = await fetch('https://rickandmortyapi.com/api/character');

    if (!response.ok) {
      throw new Error('No se pudo encontrar el resultado');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
