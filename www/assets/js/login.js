// login.js

const baseURL = 'https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app';
const patchUsers = '/users.json';

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
        console.error("Fehler beim Login:", error.message);
    }
}

/**
 * Lädt die Benutzerdaten von der API.
 * @returns {Promise<Array>} Ein Array mit Benutzerdaten.
 * @throws {Error} Wenn ein HTTP-Fehler auftritt oder die Daten nicht im erwarteten Format sind.
 */
async function fetchUsers() {
    const response = await fetch(baseURL + patchUsers);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Benutzerdaten sind nicht im erwarteten Format.");
    }
    return data;
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
function handleUserResult(user) {
    const loginPasswordContainer = document.getElementById('loginPasswordContainer');
    if (user) {
        loginPasswordContainer.style.borderColor = 'green';
        console.table(user);
    } else {
        loginPasswordContainer.style.borderColor = 'brown';
        console.log("Benutzer nicht gefunden oder falsches Passwort.");
    }
}