import { extractInitials } from "./module/extractInitials.js";

const storedLocalUserId = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const ID_username = document.getElementById('username');
const ID_account = document.getElementById('account');

/**
 * Initialisiert das Benutzerprofil, nachdem die DOM-Inhalte vollständig geladen sind.
 * ====================================================================================================
 * 1. Überprüft, ob eine Benutzer-ID im lokalen Speicher oder in der Sitzung gespeichert ist.
 * 2. Lädt den Benutzernamen anhand dieser Benutzer-ID.
 * 3. Extrahiert die Initialen aus dem Benutzernamen.
 * 4. Zeigt den Benutzernamen und die Initialen im Profil an.
 * ====================================================================================================
 * func extractInitials() - findet man in der ./module/extractInitials.js
 * ====================================================================================================
 * @async
 * @function
 * @throws {Error} Wenn keine Benutzer-ID gefunden wird, der Benutzername nicht geladen werden kann oder ein Fehler beim Verarbeiten auftritt.
 * ====================================================================================================
*/
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const username = await loadUserName();
        const initials = extractInitials(username);
        ID_account.textContent = initials;
        ID_username && (ID_username.textContent = username);
    } catch (err) {
        console.error('Es ist ein Problem beim Laden des Benutzerprofils aufgetreten!', err);
    }
});

/**
 * Lädt den Benutzernamen anhand der gespeicherten Benutzer-ID.
 * ====================================================================================================
 * Ruft die Benutzer-ID von der Funktion checkStored() ab und sucht den Benutzernamen mittels der Benutzer-ID.
 * ====================================================================================================
 * func findUserById() - findet man in der dataResponse.js
 * ====================================================================================================
 * @async
 * @returns {string} Der Benutzername des gefundenen Benutzers.
 * @throws {Error} Wenn der Benutzer nicht gefunden wird.
 * ====================================================================================================
 */
async function loadUserName() {
    let userID = checkStored();
    const userData = await findUserById(userID);
    return userData[2];
}

/**
 * Überprüft die gespeicherten Benutzer-IDs.
 * ====================================================================================================
 * Prüft, ob eine Benutzer-ID entweder im lokalen Speicher oder in der Sitzung gespeichert ist,
 * und gibt diese zurück.
 * ====================================================================================================
 * @returns {string|null} Die gespeicherte Benutzer-ID oder null, falls keine gefunden wurde.
 * ====================================================================================================
 */
function checkStored() {
    if (storedLocalUserId !== null) return storedLocalUserId;
    if (storedSessionUserID !== null) return storedSessionUserID;
    throw new Error('Benutzer ID nicht gefunden!');
}