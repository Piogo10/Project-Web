document.addEventListener('DOMContentLoaded', () => {
    const countryCardsContainer = document.getElementById('country-cards');
    const searchBar = document.getElementById('search-bar');
    let allCountries = [];

    async function fetchRandomCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();

            countries.sort((a, b) =>
                (a.translations.por.common || a.name.common || '').localeCompare(b.translations.por.common || b.name.common || '', 'pt', { sensitivity: 'base' })
            );

            allCountries = countries;

            displayCountries(countries);
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
                <div class="card my-3 flag-card ${index === 0 ? 'selected' : ''}">
                    <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${country.name.common} Flag">
                    <div class="card-body pb-0">
                        <p class="flag-caption">${country.translations.por?.common || country.name.common}</p>
                    </div>
                </div>
            `;

            cardDiv.querySelector('.flag-card').addEventListener('click', () => {
                window.location.href = `detail-country.html?cca=${country.cca3}`;
            });

            countryCardsContainer.appendChild(cardDiv);
        });
    }

    searchBar.addEventListener('input', (event) => {
        const searchQuery = event.target.value.toLowerCase();

        const filteredCountries = allCountries.filter(country =>
            (country.translations.por.common || country.name.common || '').toLowerCase().includes(searchQuery)
        );

        displayCountries(filteredCountries);
    });

    fetchRandomCountries();
});
