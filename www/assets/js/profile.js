/**
 * Holt die gespeicherten Daten aus dem lokalen Storage.
 */
const storedUserData = localStorage.getItem('userData');

/**
 * Holt die HTML-Elemente für die Eingabefelder.
 */
const ID_username = document.getElementById('username');
const ID_account = document.getElementById('account');

/**
 * Zeigt das Benutzerprofil an.
 * ----------------------------
 * Diese Funktion liest die gespeicherten Benutzerdaten aus und zeigt den Benutzernamen
 * und die Initialen an.
 */
function showUserProfile() {
    try {
        const userData = JSON.parse(storedUserData);
        const userName = userData.name;
        const initials = extractInitials(userName);
        ID_account.textContent = initials;
        ID_username.textContent = userName;
    } catch(err) {
        console.error('Keine Benutzerdaten gefunden.', err);
    }
}

/**
 * Extrahiert die Initialen aus einem Benutzernamen.
 * -------------------------------------------------
 * Diese Funktion teilt den Benutzernamen in einzelne Namensteile auf, extrahiert den
 * ersten Buchstaben jedes Namens und gibt diese als Initialen zurück.
 * -------------------------------------------------
 * @param {String} userName Der Benutzername.
 * @returns {String} Die Initialen des Benutzers.
 */
function extractInitials(userName) {
    return userName.split(' ').map(namePart => namePart[0]).join('').toUpperCase();
}