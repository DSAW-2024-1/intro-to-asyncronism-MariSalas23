let currentPage = 1;
    let allCharacters = new Set(); // Conjunto para almacenar nombres de personajes únicos

    async function fetchCharacters(page) {
      try {
        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=10&page=${page}`);
        const data = await response.json();

        const quoteContainer = document.getElementById('quote-container');

        data.forEach(quote => {
          const character = quote.character;
          const quoteText = quote.quote;
          const imageUrl = quote.image;

          if (!allCharacters.has(character)) {
            allCharacters.add(character); // Agregar el nombre del personaje al conjunto

            const quoteElement = document.createElement('p');
            const characterElement = document.createElement('p');
            const imageElement = document.createElement('img');

            quoteElement.textContent = `"${quoteText}"`;
            characterElement.textContent = `- ${character}`;
            imageElement.src = imageUrl;
            imageElement.alt = "Image of the character";

            quoteContainer.appendChild(quoteElement);
            quoteContainer.appendChild(characterElement);
            quoteContainer.appendChild(imageElement);
          }
        });
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    }

    // Mostrar los primeros personajes al cargar la página
    window.onload = async function() {
      await fetchCharacters(currentPage);
    };

    // Manejar el evento de clic en el botón "Cargar más"
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', async function() {
      currentPage++;
      await fetchCharacters(currentPage);
    });

// Opciones para el número de frases (de 1 a 4)
function validateNumber() {
    let select = document.querySelector('.contPhrase');
    let opcionSeleccionada = parseInt(select.value);

    if (opcionSeleccionada < 1 || opcionSeleccionada > 4) {
        alert("Seleccione una opción válida entre 1 y 4.");
        select.value = "";
    }
}