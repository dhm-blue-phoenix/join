// login.js

/**
 * Holt die gespeicherten Daten aus dem lokalen Speicher.
 * @type {Object|null}
 */
const storedDatabase = JSON.parse(localStorage.getItem('firebasedatabase'));

/**
 * Verhindert das Standardverhalten des Ereignisses (z. B. das Neuladen der Seite),
 * überprüft das Vorhandensein gespeicherter Daten für 'firebasedatabase' im localStorage
 * und ruft die Login-Funktion auf, wenn gespeicherte Daten vorhanden sind.
 * Wirft einen Fehler, wenn keine gespeicherten Daten für 'firebasedatabase' gefunden werden.
 * @param {Event} event - Das Ereignisobjekt, das verhindert wird.
 * @throws {Error} Wenn keine gespeicherten Daten für 'firebasedatabase' im localStorage gefunden werden.
 */
function initLogin(event) {
    event.preventDefault();
    if (!storedDatabase) {
        throw new Error('Keine gespeicherten Daten für "firebasedatabase" im localStorage gefunden!');
    }
    login();
}

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
    } catch (err) {
        console.error('Fehler beim Login:', err);
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
        return Object.values(data);
    } catch (err) {
        throw new Error('Fehler beim Abrufen der Benutzerdaten:', err);
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
    if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Benutzerdaten sind nicht im erwarteten Format!');
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
 * Navigiert zur Zusammenfassungsseite nach erfolgreichem Login.
 * @param {object | undefined} user - Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
function handleUserResult(user) {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = './summary.html';
    } else {
        console.log('Benutzer nicht gefunden oder falsches Passwort.');
    }
}