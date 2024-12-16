/**
 * Get the list of favorite countries from localStorage.
 * @returns {Array} - Array of favorite country names.
 */
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

/**
 * Add a country to the list of favorites in localStorage.
 * @param {string} countryName - The name of the country to add.
 */
export function addFavorite(countryName) {
    const favorites = getFavorites();
    if (!favorites.includes(countryName)) {
        favorites.push(countryName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

/**
 * Remove a country from the list of favorites in localStorage.
 * @param {string} countryName - The name of the country to remove.
 */
export function removeFavorite(countryName) {
    let favorites = getFavorites();
    favorites = favorites.filter(name => name !== countryName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/**
 * Check if a country is in the list of favorites.
 * @param {string} countryName - The name of the country to check.
 * @returns {boolean} - True if the country is a favorite, false otherwise.
 */
export function isFavorite(countryName) {
    const favorites = getFavorites();
    return favorites.includes(countryName);
}
