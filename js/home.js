document.addEventListener('DOMContentLoaded', () => {
    const countryCard = document.getElementById('country-cards');
    const localStorage = window.localStorage;
    const favoriteCountries = JSON.parse(localStorage.getItem('favoriteCountries')) || [];

    function loadRandomCountries() {

        var url = "https://restcountries.com/v3.1/all"

        $.ajax({
            url: url,
            method: "GET",
            success: function (countries) {
                const randomCountries = countries.sort(() => Math.random() - 0.5).slice(0, 3); // 3 paises random
                showCountries(randomCountries);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function showCountries(countries) {
        countryCard.innerHTML = '';

        countries.forEach((country) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = `col-md-3`;
            
            const isFavorite = favoriteCountries.includes(country.cca3);
            const countryName = country.translations.por?.common || country.name.common;

            cardDiv.innerHTML = `
            <div class="card flag-card">
                <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${countryName} Flag">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <p class="flag-caption">${countryName}</p>
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
        });

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
        }
    }

    // MAIN
    loadRandomCountries();
});