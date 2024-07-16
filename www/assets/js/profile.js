// profile.js

/**
 * Holt die gespeicherten Daten aus dem lokalen Speicher.
 * @type {Array|null}
 */
const storedUserData = JSON.parse(localStorage.getItem('user'));

/**
 * DOM-Elemente für den Eingabebereich.
 * @type {HTMLInputElement}
 */
const ID_username = document.getElementById('username');
const ID_account = document.getElementById('account');

/**
 * Zeigt den Benutzernamen im angegebenen Container an, falls gespeicherte Benutzerdaten vorhanden sind.
 * Wirft einen Fehler, wenn keine gespeicherten Benutzerdaten gefunden werden.
 * @throws {Error} Wenn keine gespeicherten Benutzerdaten gefunden werden.
 */
function showUserName() {
    if (!storedUserData || !Array.isArray(storedUserData)) {
        throw new Error('Keine gültigen gespeicherten Daten zu "user" im localStorage gefunden!');
    }
    displayUserName(storedUserData);
}

/**
 * Zeigt den Benutzernamen im angegebenen Container an.
 * @param {Array} userData - Die gespeicherten Benutzerdaten.
 */
function displayUserName(userData) {
    const userName = userData[1]; // Der Benutzername ist der zweite Eintrag im Array
    if (!userName || typeof userName !== 'string') {
        throw new Error('Ungültige Benutzerdaten: "name" fehlt oder ist kein String');
    }
    const initials = extractInitials(userName);
    ID_account.textContent = initials;
    ID_username.textContent = userName;
}

/**
 * Extrahiert die Initialen aus dem Benutzernamen.
 * @param {string} userName - Der Name des Benutzers.
 * @returns {string} Die Initialen des Benutzers in Großbuchstaben.
 */
function extractInitials(userName) {
    return userName.split(' ').map(namePart => namePart[0]).join('').toUpperCase();
}