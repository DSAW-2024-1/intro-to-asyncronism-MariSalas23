document.addEventListener('DOMContentLoaded', function () {
    const characterInput = document.querySelector('.character');
    const phraseInput = document.querySelector('.phrase');
    const characterContainer = document.querySelector('.character-container');
    const randomCharacterButton = document.querySelector('.random-character-btn');

    // Función para buscar con el input del nombre
    characterInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar enviar el formulario por defecto
            const characterName = characterInput.value.trim();
            if (characterName !== '') {
                try {
                    const characterData = await fetchCharacterData(characterName);
                    displayCharacter(characterData);
                } catch (error) {
                    console.error('Error fetching character data:', error);
                    alert('Error fetching character data. Please try again later.');
                }
            } else {
                alert('Please enter a character name.');
            }
        }
    });

    // Función para buscar con el input de la frase
    phraseInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar enviar el formulario por defecto
            const phrase = phraseInput.value.trim();
            if (phrase !== '') {
                try {
                    const quoteData = await fetchQuoteDataWithRetry(phrase);
                    displayQuote(quoteData);
                } catch (error) {
                    console.error('Error fetching quote data:', error);
                    alert('Error fetching quote data. Please try again later.');
                }
            } else {
                alert('Please enter a phrase.');
            }
        }
    });

    // Botón al dar click
    randomCharacterButton.addEventListener('click', async function () {
        try {
            const randomQuoteData = await fetchRandomQuoteData();
            displayCharacter(randomQuoteData);
        } catch (error) {
            console.error('Error fetching random character data:', error);
            alert('Error fetching random character data. Please try again later.');
        }
    });

    // Función para buscar un personaje aleatorio en la API
    async function fetchRandomQuoteData() {
        const url = 'https://thesimpsonsquoteapi.glitch.me/quotes';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch random character data');
            }
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * (data.length-1));
            return data[randomIndex];
        } catch (error) {
            throw new Error('Error fetching random character data');
        }
    }

    // Función para buscar por el nombre en la API
    async function fetchCharacterData(name) {
        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch character data');
        }
        const data = await response.json();
        if (data.length === 0) {
            throw new Error('No character data found');
        }
        return data[0];
    }

    // Función para buscar por la frase en la API
    async function fetchQuoteData(phrase) {
        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes`);
        if (!response.ok) {
            throw new Error('Failed to fetch quote data');
        }
        const data = await response.json();
        const matchingQuote = data.find(quote => quote.quote.toLowerCase().includes(phrase.toLowerCase()));
        if (!matchingQuote) {
            throw new Error('No quote data found');
        }
        return matchingQuote;
    }

    // Función para realizar la solicitud con reintento en caso de error
    async function fetchQuoteDataWithRetry(phrase, maxAttempts = 5) {
        let attempt = 0;
        while (attempt < maxAttempts) {
            try {
                return await fetchQuoteData(phrase);
            } catch (error) {
                attempt++;
                console.error(`Attempt ${attempt} failed:`, error);
            }
        }
        throw new Error(`Exceeded maximum number of attempts (${maxAttempts})`);
    }

    // Funciones para mostrar los personajes y su información
    
    function displayCharacter(characterData) {
        characterContainer.innerHTML = ''; // Limpiar el contenido
        characterContainer.innerHTML = `
            <div class="image-container-character">
                <img src="${characterData.image}" alt="Character Image" style="max-width: 100px;">
            </div>
            <div class="text-container-character">
                <h2>Character:</h2>
                <p>${characterData.character}</p>
                <h2>Quote:</h2>
                <p>${characterData.quote}</p>
            </div>
        `;
    }

    function displayQuote(quoteData) {
        characterContainer.innerHTML = '';
        characterContainer.innerHTML = `
            <div class="image-container-character">
                <img src="${quoteData.image}" alt="Character Image" style="max-width: 100px;">
            </div>
            <div class="text-container-character">
                <h2>Character:</h2>
                <p>${quoteData.character}</p>
                <h2>Quote:</h2>
                <p>${quoteData.quote}</p>
            </div>
        `;
    }
});