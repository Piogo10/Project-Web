document.addEventListener('DOMContentLoaded', () => {
    const countryCardsContainer = document.getElementById('country-cards');

    function fetchRandomCountries() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://restcountries.com/v3.1/all', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Acabou o request
                if (xhr.status === 200) { // HTTP OK
                    try {
                        const countries = JSON.parse(xhr.responseText);
                        const randomCountries = countries.sort(() => 0.5 - Math.random()).slice(0, 3);

                        displayCountries(randomCountries);
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

            cardDiv.innerHTML = `
                <div class="card flag-card ${index === 0 ? 'selected' : ''}">
                    <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${country.name.common} Flag">
                    <div class="card-body pb-0">
                        <p class="flag-caption">${country.translations.por?.common || country.name.common}</p>
                    </div>
                </div>
            `;

            cardDiv.querySelector('.flag-card').addEventListener('click', () => {
                window.location.href = `detail-country.html#${country.cca3}`;
            });

            countryCardsContainer.appendChild(cardDiv);
        });
    }

    fetchRandomCountries();
});