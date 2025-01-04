document.addEventListener('DOMContentLoaded', () => {
    const countryCard = document.getElementById('country-cards');
    const searchBar = document.getElementById('search-bar');
    const errorMSG = document.getElementById('error-msg');
    const localStorage = window.localStorage;

    const favoriteCountries = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    let allCountries = [];

    function loadCountries() {

        const url = "https://restcountries.com/v3.1/all"

        $.ajax({
            url: url,
            method: "GET",
            success: function (countries) {
                countries.sort((a, b) =>
                    (a.translations.por.common || a.name.common || '').localeCompare(b.translations.por.common || b.name.common || '', 'pt', { sensitivity: 'base' })
                );
                allCountries = countries;
                showCountries(allCountries);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function showCountries(countries, isSearch = false) {
        countryCard.innerHTML = '';
        errorMSG.style.display = 'none';

        // pras labels ficarem todas pipis
        if (favoriteCountries.length === 0) {
            errorMSG.textContent = 'Não possui nenhum país favorito.';
            errorMSG.style.display = 'block';
            return;
        }
        else if (isSearch){
            errorMSG.textContent = 'Sem resultados...';
            errorMSG.style.display = 'block';
        }

        countries.forEach((country) => {
            errorMSG.style.display = 'none';

            if (favoriteCountries.includes(country.cca3)) {
                const cardDiv = document.createElement('div');
                cardDiv.className = `col-md-3`;
                
                const isFavorite = favoriteCountries.includes(country.cca3);
                const countryName = country.translations.por?.common || country.name.common;
    
                cardDiv.innerHTML = `
                <div class="card my-3 flag-card">
                    <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${countryName} Flag">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <p class="flag-caption mb-0">${countryName}</p>
                        <i class="bi ml-auto star" style="font-size: 1.3rem; color: black;"></i>
                     </div>
                </div>`;

                const starIcon = cardDiv.querySelector('.star');
                starIcon.classList.add(isFavorite ? 'bi-star-fill' : 'bi-star');
                starIcon.style.color = isFavorite ? '#FFD700' : 'black';

                cardDiv.querySelector('.flag-card').addEventListener('click', (event) => {
                    if (!event.target.classList.contains('star')) {
                        window.location.href = `country-detail.html#${country.cca3}`;
                    }
                });

                //toogle favoritos
                starIcon.addEventListener('click', () => toogleFavorites(country, starIcon));

                countryCard.appendChild(cardDiv);
            }
        });
    }

    function toogleFavorites(country, starIcon){
        const isFavorite = favoriteCountries.includes(country.cca3);

        if (isFavorite) {
            favoriteCountries.splice(favoriteCountries.indexOf(country.cca3), 1);
            starIcon.classList.replace('bi-star-fill', 'bi-star');
            starIcon.style.color = 'black';
        } else {
            favoriteCountries.push(country.cca3);
            starIcon.classList.replace('bi-star', 'bi-star-fill');
            starIcon.style.color = '#FFD700';
        }

        localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
        showCountries(allCountries.filter(c => favoriteCountries.includes(c.cca3)));
    }

    searchBar.addEventListener('input', (event) => {
        const searchQuery = event.target.value.toLowerCase();

        const filteredCountries = allCountries.filter(country => 
            favoriteCountries.includes(country.cca3) && 
            (country.translations.por.common || country.name.common || '').toLowerCase().includes(searchQuery)
        );

        showCountries(filteredCountries, true);
    });

    // MAIN
    loadCountries();
});
