// Función para buscar un personaje random
async function getRandomQuote() {
    const url = 'https://thesimpsonsquoteapi.glitch.me/quotes';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            displayRandomQuote(randomQuote);
        } else {
            console.log('No se encontraron citas.');
        }
    } catch (error) {
        console.error('Error al obtener citas aleatorias:', error);
    }
}

function displayRandomQuote(quote) {
    const quoteContainer = document.querySelector('.character-container');
    quoteContainer.innerHTML = `
        <div class="image-container-character">
            <img src="${quote.image}" alt="Character Image" style="max-width: 100px;">
        </div>
        <div class="text-container-character">
            <h2>Character:</h2>
            <p>${quote.character}</p>
            <h2>Quote:</h2>
            <p>${quote.quote}</p>
        </div>
    `;
}

// Configuración del botón para buscar un personaje random
document.addEventListener('DOMContentLoaded', function () {
    const randomQuoteBtn = document.querySelector('.random-character-btn');

    randomQuoteBtn.addEventListener('click', function () {
        getRandomQuote();
    });
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