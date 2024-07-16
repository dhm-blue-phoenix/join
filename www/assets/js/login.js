// login.js

/**
 * Gibt die gespeicherten Daten aus dem localStorage zurück.
 * @type {Array<object>|null} - Die gespeicherten Daten oder null, wenn nichts gefunden wurde.
 */
const storedDatabase = JSON.parse(localStorage.getItem('firebasedatabase'));

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
 * @returns {Promise<void>}
 */
async function login() {
    const inputEmail = document.getElementById('userEmail');
    const inputPassword = document.getElementById('userPassword');
    const userPromise = await dataResponse(inputEmail.value, inputPassword.value);
    userPromise.then(promise => {
        const user = Object.values(promise);
        handleUserResult(user);   
    }).catch(err => {
        console.error(err);
    });
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