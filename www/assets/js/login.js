// login.js

/**
 * Holt die gespeicherten Daten aus dem lokalen Speicher.
 * @type {Object|null}
 */
const storedDatabase = JSON.parse(localStorage.getItem('firebasedatabase'));
storedDatabase || console.error('Keine gespeicherten Daten gefunden!');

/**
 * Versucht, einen Benutzer mit den angegebenen Anmeldeinformationen einzuloggen.
 * @returns {Promise<void>}
 */
async function login() {
    const inputEmail = document.getElementById('userEmail');
    const inputPassword = document.getElementById('userPassword');
    try {
        const users = await fetchUsers();
        const user = findUser(users, inputEmail.value, inputPassword.value);
        handleUserResult(user);
    } catch (error) {
        throw new Error("Fehler beim Login:", error.message);
    }
}

/**
 * Lädt die Benutzerdaten von der API.
 * @returns {Promise<Object[]>} Ein Array von Objekten mit Benutzerdaten.
 * @throws {Error} Wenn ein HTTP-Fehler auftritt oder die Daten nicht im erwarteten Format sind.
 */
async function fetchUsers() {
    const url = storedDatabase.baseURL + storedDatabase.patchUsers;
    try {
        const response = await fetch(url);
        const data = await response.json();
        validateResponse(response, data);
        return data;
    } catch (error) {
        throw new Error("Fehler beim Abrufen der Benutzerdaten:", error);
    }
}

/**
 * Überprüft die API-Antwort und die Daten auf Fehler.
 * @param {Response} response - Die Antwort der fetch-Anfrage.
 * @param {any} data - Die Daten, die von der API zurückgegeben werden.
 * @throws {Error} Wenn ein HTTP-Fehler auftritt oder die Daten nicht im erwarteten Format sind.
 */
function validateResponse(response, data) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if (!Array.isArray(data)) {
        throw new Error("Benutzerdaten sind nicht im erwarteten Format.");
    }
}

/**
 * Sucht nach einem Benutzer in der gegebenen Liste anhand von E-Mail und Passwort.
 * @param {Array} users - Das Array mit Benutzerdaten.
 * @param {string} email - Die E-Mail-Adresse des zu suchenden Benutzers.
 * @param {string} password - Das Passwort des zu suchenden Benutzers.
 * @returns {object | undefined} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
function findUser(users, email, password) {
    return users.find(u => u.email === email && u.password === password);
}

/**
 * Verarbeitet das Ergebnis des Benutzerlogins.
 * @param {object | undefined} user - Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
function handleUserResult(user) { // Ist noch nicht Fertig!
    const container = document.getElementById('loginPasswordContainer');
    user ? (
        container.style.borderColor = 'green',
        console.table(user)
    ) : (
        container.style.borderColor = 'brown',
        console.log("Benutzer nicht gefunden oder falsches Passwort.")
    )
}