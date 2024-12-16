document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    const cca = hash ? hash.substring(1) : null;

    if (cca) {
        getCountryDetails(cca);
    }
    else {
        console.log("EERO")
        window.location.href = 'home.html';
    }

    function getCountryDetails(cca) {

        var url = "https://restcountries.com/v3.1/alpha/" + cca;

        $.ajax({
            url: url,
            method: "GET",
            success: function (country) {
                showCountryDetails(country);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function showCountryDetails(country) {
        if (country) {
            const countryData = country[0];

            document.getElementById('country-details').innerHTML = `
                <h3 class="text-center mt-4">${countryData.translations.por?.common || countryData.name.common}</h3>

                <table class="table table-bordered mt-4">
                    <tbody>
                        <tr><td>Nome Comum:</td><td>${countryData.name?.common || 'N/A'}</td></tr>
                        <tr><td>Nome Oficial:</td><td>${countryData.name?.official || 'N/A'}</td></tr>
                        <tr><td>Nome Nativo:</td><td>${countryData.name?.nativeName?.deu?.common || 'N/A'} / ${countryData.name?.nativeName?.deu?.official || 'N/A'}</td></tr>
                        <tr><td>Bandeira:</td><td><img src="${countryData.flags?.png}" class="img-fluid" alt="Bandeira"></td></tr>
                        <tr><td>Códigos ISO:</td><td>Alpha-2: ${countryData.cca2 || 'N/A'}, Alpha-3: ${countryData.cca3 || 'N/A'}, Numérico: ${countryData.ccn3 || 'N/A'}</td></tr>
                        <tr><td>TLD (Domínio):</td><td>${countryData.tld?.join(', ') || 'N/A'}</td></tr>
                        <tr><td>População:</td><td>${countryData.population || 'N/A'}</td></tr>
                        <tr><td>Área:</td><td>${countryData.area || 'N/A'} km²</td></tr>
                        <tr><td>Continente:</td><td>${countryData.continents?.join(', ') || 'N/A'}</td></tr>
                        <tr><td>Região/Sub-região:</td><td>${countryData.region || 'N/A'} / ${countryData.subregion || 'N/A'}</td></tr>
                        <tr><td>Coordenadas:</td><td>Latitude: ${countryData.latlng ? countryData.latlng[0] : 'N/A'}, Longitude: ${countryData.latlng ? countryData.latlng[1] : 'N/A'}</td></tr>
                        <tr><td>Mapa:</td><td><a href="${countryData.maps?.googleMaps}">Google Maps</a> / <a href="${countryData.maps?.openStreetMaps}">OpenStreetMap</a></td></tr>
                        <tr><td>Países Vizinhos:</td><td>${countryData.borders?.join(', ') || 'N/A'}</td></tr>
                        <tr><td>Território Interior:</td><td>${countryData.landlocked ? 'Sim' : 'Não'}</td></tr>
                        <tr><td>Moeda:</td><td>${Object.values(countryData.currencies || {}).map(cur => cur.name).join(', ')}</td></tr>
                        <tr><td>Independência:</td><td>${countryData.independent ? 'Sim' : 'Não'}</td></tr>
                        <tr><td>Membro da ONU:</td><td>${countryData.unMember ? 'Sim' : 'Não'}</td></tr>
                        <tr><td>Idiomas:</td><td>${Object.values(countryData.languages || {}).join(', ')}</td></tr>
                        <tr><td>Gentílico:</td><td>Masculino: ${countryData.demonyms?.eng?.m || 'N/A'} / Feminino: ${countryData.demonyms?.eng?.f || 'N/A'}</td></tr>
                        <tr><td>Capital:</td><td>${countryData.capital?.join(', ') || 'N/A'}</td></tr>
                        <tr><td>Fuso Horário:</td><td>${countryData.timezones?.join(', ') || 'N/A'}</td></tr>
                        <tr><td>Início da Semana:</td><td>${countryData.startOfWeek || 'N/A'}</td></tr>
                        <tr><td>Código Telefónico:</td><td>${countryData.idd?.root || 'N/A'} ${countryData.idd?.suffixes?.join(', ') || ''}</td></tr>
                        <tr><td>Formato Postal:</td><td>${countryData.postalCode?.format || 'N/A'}</td></tr>
                        <tr><td>Brasão:</td><td><img src="${countryData.coatOfArms?.png}" class="img-fluid" alt="Brasão de Armas" style="max-width: 100px; height: auto;"></td></tr>
                    </tbody>
                </table>`;
        }
    }
});
