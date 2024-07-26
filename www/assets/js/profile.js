const ID_username = document.getElementById('username');
const ID_account = document.getElementById('account');

/**
 * Zeigt das Benutzerprofil an.
 * ----------------------------
 * Holt den Benutzernamen aus der URL und zeigt ihn dann im Profil an.
 * ----------------------------
 * @async
 */
async function showUserProfile() {
    try {
        const username = lodeUsernameFromURL();
        if(username === null) {
            return;
        }
        const initials = extractInitials(username);
        ID_account.textContent = initials;
        ID_username.textContent = username;
    } catch (err) {
        console.error('Keine Benutzerdaten gefunden.', err);
    }
}

/**
 * Holt den Benutzernamen aus der URL.
 * -----------------------------------
 * @returns {string} - Der Benutzername aus der URL oder null, wenn kein Benutzername in der URL vorhanden ist.
 */
function lodeUsernameFromURL() {
    return new URLSearchParams(window.location.search).get("username"); 
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