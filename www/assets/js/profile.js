const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const ID_username = document.getElementById('username');
const ID_account = document.getElementById('account');

/**
 * Zeigt das Benutzerprofil an.
 * ----------------------------
 * Lädt den Benutzernamen über die gespeicherte Benutzer-ID, extrahiert die Initialen
 * und zeigt beides im Profil an.
 * ----------------------------
 * func extractInitials() - findet man in der extractInitials.js
 * ----------------------------
 * @async
 * @function
 * @throws {Error} Wenn keine Benutzerdaten gefunden werden.
 */
async function showUserProfile() {
    try {
        const username = await loadUserName();
        const initials = extractInitials(username);
        ID_account.textContent = initials;
        ID_username.textContent = username;
    } catch (err) {
        console.error('Keine Benutzerdaten gefunden.', err);
    }
}

/**
 * Überprüft die gespeicherten Benutzer-IDs.
 * -----------------------------------------
 * Prüft, ob eine Benutzer-ID entweder im lokalen Speicher oder in der Sitzung gespeichert ist,
 * und gibt diese zurück.
 * -----------------------------------------
 * @returns {string|null} Die gespeicherte Benutzer-ID oder null, falls keine gefunden wurde.
 */
function checkStored() {
    if (storedLocalUserID !== null) return userID = storedLocalUserID;
    if (storedSessionUserID !== null) return userID = storedSessionUserID;
}

/**
 * Lädt den Benutzernamen anhand der gespeicherten Benutzer-ID.
 * ------------------------------------------------------------
 * Ruft die Benutzer-ID von der Funktion checkStored() ab und sucht den Benutzernamen mittels der Benutzer-ID.
 * ------------------------------------------------------------
 * func findUserById() - findet man in der dataResponse.js
 * ------------------------------------------------------------
 * @async
 * @returns {string} Der Benutzername des gefundenen Benutzers.
 * @throws {Error} Wenn der Benutzer nicht gefunden wird.
 */
async function loadUserName() {
    let userID = checkStored();
    const userData = await findUserById(userID);
    return userData[2];
}
