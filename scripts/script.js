document.addEventListener('DOMContentLoaded', function () {
    const characterInput = document.querySelector('.character');

    characterInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar el comportamiento predeterminado de enviar el formulario
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

    function displayCharacter(characterData) {
        const characterContainer = document.querySelector('.character-container');
        characterContainer.innerHTML = ''; // Limpiar el contenido actual
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
});