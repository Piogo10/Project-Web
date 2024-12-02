document.addEventListener('DOMContentLoaded', () => {
    const countryCardsContainer = document.getElementById('country-cards');

    async function fetchRandomCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();

            const randomCountries = countries.sort(() => 0.5 - Math.random()).slice(0, 3);

            displayCountries(randomCountries);
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    }

    function displayCountries(countries) {
        countryCardsContainer.innerHTML = '';

        countries.forEach((country, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = `col-md-3 ${index === 0 ? 'selected' : ''}`;

            cardDiv.innerHTML = `
                <div class="card flag-card ${index === 0 ? 'selected' : ''}">
                    <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${country.name.common} Flag">
                    <div class="card-body pb-0">
                        <p class="flag-caption">${country.translations.por?.common || country.name.common}</p>
                    </div>
                </div>
            `;
            countryCardsContainer.appendChild(cardDiv);
        });
    }

    // Fetch and display random countries on page load
    fetchRandomCountries();
});
