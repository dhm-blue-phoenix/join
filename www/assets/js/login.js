// login.js

/**
 * Gibt die gespeicherten Daten aus dem localStorage zurück.
 * @type {Array<object>|null} - Die gespeicherten Daten oder null, wenn nichts gefunden wurde.
 */
const storedDatabase = JSON.parse(localStorage.getItem('firebasedatabase'));
const storedUserData = JSON.parse(localStorage.getItem('user'));

/**
 * Führt einen automatischen Login durch, falls gespeicherte Benutzerdaten vorhanden sind.
 */
function autoLogin() {
    if (!storedUserData) {
        console.warn('Keine gespeicherten Daten für "user" im localStorage gefunden!'); // [!] cosnole.warn. Wird noch Entfernt!
        return;
    }
    login(storedUserData[0], storedUserData[2]);
}

/**
 * Initialisiert den Login-Prozess, indem das Standardverhalten des Ereignisses verhindert wird,
 * überprüft wird, ob gespeicherte Daten für 'firebasedatabase' im localStorage vorhanden sind,
 * und ruft die Login-Funktion auf, wenn Daten gefunden wurden.
 * Wirft einen Fehler, wenn keine gespeicherten Daten gefunden werden.
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
 * @param {string} [storedEmail] - Die gespeicherte E-Mail-Adresse des Benutzers.
 * @param {string} [storedPW] - Das gespeicherte Passwort des Benutzers.
 * @returns {Promise<void>}
 */
async function login(storedEmail, storedPW) {
    const { email, pw } = getCredentials(storedEmail, storedPW);
    try {
        const userPromise = await dataResponse(email, pw);
        const user = Object.values(userPromise);
        handleUserResult(user);
    } catch (error) {
        console.warn('Benutzer nicht gefunden oder falsches Passwort!');
    }
}

/**
 * Holt die Anmeldedaten entweder aus den übergebenen Parametern oder aus den Eingabefeldern im Dokument.
 * @param {string} storedEmail - Die gespeicherte E-Mail-Adresse des Benutzers.
 * @param {string} storedPW - Das gespeicherte Passwort des Benutzers.
 * @returns {{ email: string, password: string }} - Ein Objekt mit der E-Mail-Adresse und dem Passwort.
 */
function getCredentials(storedEmail, storedPW) {
    const inputEmail = document.getElementById('userEmail');
    const inputPassword = document.getElementById('userPassword');
    let email = storedEmail;
    let pw = storedPW;
    inputEmail.value && inputPassword.value && (email = inputEmail.value, pw = inputPassword.value);
    return { email, pw };
}