document.addEventListener('DOMContentLoaded', () => {
    const countryCardsContainer = document.getElementById('country-cards');
    const searchBar = document.getElementById('search-bar');
    let allCountries = [];

    function fetchRandomCountries() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://restcountries.com/v3.1/all', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Acabou o request
                if (xhr.status === 200) { // HTTP OK
                    try {
                        const countries = JSON.parse(xhr.responseText);

                        countries.sort((a, b) =>
                            (a.translations.por.common || a.name.common || '').localeCompare(b.translations.por.common || b.name.common || '', 'pt', { sensitivity: 'base' })
                        );

                        allCountries = countries;

                        displayCountries(countries);
                    } catch (error) {
                        console.error('Error parsing country data:', error);
                    }
                } else {
                    console.error('Error fetching country data:', xhr.status, xhr.statusText);
                }
            }
        };

        xhr.onerror = function () {
            console.error('Network error while fetching country data');
        };

        xhr.send();
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
                        <i class="bi 'bi-star-fill' : 'bi-star'} favorite-icon" style="cursor: pointer;" data-country="${countryName}"></i>
                    </div>
                </div>
            `;

            cardDiv.querySelector('.flag-card').addEventListener('click', () => {
                window.location.href = `detail-country.html#${country.cca3}`;
            });

            countryCardsContainer.appendChild(cardDiv);
        });

        const starIcons = countryCardsContainer.querySelectorAll('.favorite-icon');
        starIcons.forEach(icon => {
            icon.addEventListener('click', toggleFavorite);
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
