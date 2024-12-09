import { getFavorites, addFavorite, removeFavorite, isFavorite } from './local-storage-js.js';

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

            const countryName = country.translations.por?.common || country.name.common;

            cardDiv.innerHTML = `
                <div class="card my-3 flag-card ${index === 0 ? 'selected' : ''}">
                    <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${countryName} Flag">
                    <div class="card-body pb-0 d-flex justify-content-between align-items-center">
                        <p class="flag-caption mb-0">${countryName}</p>
                        <i class="bi ${isFavorite(countryName) ? 'bi-star-fill' : 'bi-star'} favorite-icon" style="cursor: pointer;" data-country="${countryName}"></i>
                    </div>
                </div>
            `;

            countryCardsContainer.appendChild(cardDiv);
        });

        // Add event listeners for all star icons
        const starIcons = countryCardsContainer.querySelectorAll('.favorite-icon');
        starIcons.forEach(icon => {
            icon.addEventListener('click', toggleFavorite);
        });
    }

    function toggleFavorite(event) {
        const starIcon = event.target;
        const countryName = starIcon.getAttribute('data-country');

        if (isFavorite(countryName)) {
            removeFavorite(countryName);
            starIcon.classList.replace('bi-star-fill', 'bi-star'); // Switch to hollow star
        } else {
            addFavorite(countryName);
            starIcon.classList.replace('bi-star', 'bi-star-fill'); // Switch to filled star
        }
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
