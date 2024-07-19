// dataResponse.js

/**
 * Holt die Benutzerdaten von der API und sucht nach einem bestimmten Benutzer.
 * @param {string} email - Die E-Mail-Adresse des Benutzers.
 * @param {string} pw - Das Passwort des Benutzers.
 * @returns {Promise<object | undefined>} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 * @throws {Error} Wenn ein Fehler bei der API-Anfrage oder bei der Benutzersuche auftritt.
 */
async function dataResponse(email, pw) {
    try {
        const users = await fetchUsers();
        return user = await findUser(users, email, pw);
    } catch (err) {
        throw new Error(`Fehler beim Abrufen oder Suchen des Benutzers: ${error.message}`);
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
        throw new Error(`Fehler beim Abrufen der Benutzerdaten: ${error.message}`);
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
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }
    if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Benutzerdaten sind nicht im erwarteten Format!');
    }
}

/**
 * Sucht nach einem Benutzer in der gegebenen Liste anhand von E-Mail und Passwort.
 * @param {object[]} users - Das Array mit Benutzerdaten.
 * @param {string} email - Die E-Mail-Adresse des zu suchenden Benutzers.
 * @param {string} password - Das Passwort des zu suchenden Benutzers.
 * @returns {object | undefined} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
function findUser(users, email, password) {
    return users.find(user => user.email === email && user.password === password);
}

/**
 * Verarbeitet das Ergebnis des Benutzerlogins.
 * Navigiert zur Zusammenfassungsseite nach erfolgreichem Login.
 * @param {object | undefined} user - Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
function handleUserResult(user) {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = './summary.html';
}