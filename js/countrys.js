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
            const localStorage = window.localStorage;

            cardDiv.innerHTML = `
                <div class="card my-3 flag-card ${index === 0 ? 'selected' : ''}">
                    <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${countryName} Flag">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <p class="flag-caption mb-0">${countryName}</p>
                        <i class="bi ml-auto star" style="font-size: 1.3rem; color: black;"></i>
                     </div>
                </div>
            `;

            if (typeof localStorage !== 'undefined') {
                const favoriteCountries = JSON.parse(localStorage.getItem('favoriteCountries')) || [];

                if (favoriteCountries.includes(country.cca3)) {
                    cardDiv.querySelector('.star').classList.add('bi-star-fill');
                    cardDiv.querySelector('.star').style.color = '#FFD700';
                }
                else {
                    cardDiv.querySelector('.star').classList.add('bi-star');
                }
            }

            cardDiv.querySelector('.flag-card').addEventListener('click', (event) => {
                if (!event.target.classList.contains('star')) {
                    window.location.href = `country-detail.html#${country.cca3}`;
                }
            });

            cardDiv.querySelector('.star').addEventListener('click', (event) => {
                if (typeof localStorage !== 'undefined') {

                    const favoriteCountries = JSON.parse(localStorage.getItem('favoriteCountries')) || [];

                    if (event.target.classList.contains('bi-star')) {

                        favoriteCountries.push(country.cca3);
                        localStorage.setItem('favCountrys', JSON.stringify(favoriteCountries));

                        event.target.classList.remove('bi-star');
                        event.target.classList.add('bi-star-fill');
                        event.target.style.color = '#FFD700';
                    } else {
                        const countryIndex = favoriteCountries.indexOf(country.cca3);
                        console.log("ci:", countryIndex);

                        if (countryIndex > -1) {
                            favoriteCountries.splice(countryIndex, 1);
                            console.log("fa: ",favoriteCountries);
                            localStorage.setItem('favCountrys', JSON.stringify(favoriteCountries));
                        }

                        event.target.classList.remove('bi-star-fill');
                        event.target.classList.add('bi-star');
                        event.target.style.color = 'black';
                    }
                }
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