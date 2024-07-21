// register.js

/**
 * Holt die gespeicherten Daten aus dem lokalen Speicher.
 * @type {Object|null}
 */
const storedDatabase = JSON.parse(localStorage.getItem('firebasedatabase'));

/**
 * DOM-Elemente für den Eingabebereich.
 * @type {HTMLInputElement}
 */
const ID_inputName = document.getElementById('inputName');
const ID_inputEmail = document.getElementById('inputEmail');
const ID_inputPW = document.getElementById('inputPassword');
const ID_inputCFPW = document.getElementById('inputConfirmPassword');

/**
 * Initialisiert den Registrierungsprozess.
 * Verhindert das Standardverhalten des Ereignisses (wie das Neuladen der Seite),
 * überprüft das Vorhandensein gespeicherter Daten für 'firebasedatabase' im localStorage
 * und ruft die Registrierungsfunktion auf, wenn gespeicherte Daten vorhanden sind.
 * @param {Event} event - Das Ereignisobjekt, das verhindert wird.
 * @throws {Error} Wenn keine gespeicherten Daten für 'firebasedatabase' im localStorage gefunden werden.
 */
function initRegister(event) {
    event.preventDefault();
    if (!storedDatabase) {
        throw new Error('Keine gespeicherten Daten zu "firebasedatabase" im localStorage gefunden!');
    }
    register();
}

/**
 * Führt den Registrierungsvorgang aus.
 * Sammelt die Formulardaten, überprüft das Passwort und verarbeitet das Ergebnis.
 */
function register() {
    const formData = loadFormData();
    checkPassword(formData.pw, formData.cfpw);
    checkIsNewUser(formData);
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * @returns {Object} Ein Objekt mit den gesammelten Formulardaten (Name, E-Mail, Passwort).
 */
function loadFormData() {
    return {
        'name': ID_inputName.value,
        'email': ID_inputEmail.value,
        'pw': ID_inputPW.value,
        'cfpw': ID_inputCFPW.value
    };
}

/**
 * Überprüft, ob das eingegebene Passwort und die Bestätigung übereinstimmen.
 * @param {string} pw - Das eingegebene Passwort.
 * @param {string} cfpw - Die Bestätigung des Passworts.
 * @throws {Error} Wenn das Passwort nicht übereinstimmt.
 */
function checkPassword(pw, cfpw) {
    if (pw !== cfpw) {
        throw new Error('Das Passwort stimmt nicht überein!');  // [!] Wird noch angepasst für den User!
    }
}

/**
 * Überprüft, ob der Benutzer bereits existiert.
 * @param {Object} newUser - Das Objekt mit den Benutzerdaten.
 */
async function checkIsNewUser(newUser) {
    try {
        const userPromise = await dataResponse(newUser.email, newUser.pw);
        const promise = userPromise;
        const user = Object.values(promise);
        console.warn('Register wurde beendet!\nVolgender Benutzer wurde in der Datenbank gefunden:', user);  // [!] Wird noch Entfernt!
        clearForm();
    } catch (err) {
        processResult(false, newUser);
    }
}

/**
 * Verarbeitet das Ergebnis der Passwortüberprüfung.
 * Wenn das Passwort übereinstimmt, wird das Formular geleert und der neue Benutzer hochgeladen.
 * Andernfalls wird ein Fehler in der Konsole ausgegeben.
 * @param {boolean} value - Das Ergebnis der Passwortüberprüfung.
 * @param {Object} newUser - Das Objekt mit den Benutzerdaten.
 */
function processResult(value, newUser) {
    if (!value) {
        clearForm();
        uploadNewUser(newUser);
    } else {
        console.warn('Benutzer konnte nicht Registriert werden!');  // [!] console.warn; Wird noch angepasst für den User!
    }
}

/**
 * Leert die Eingabefelder des Registrierungsformulars.
 */
function clearForm() {
    ID_inputName.value = '';
    ID_inputEmail.value = '';
    ID_inputPW.value = '';
    ID_inputCFPW.value = '';
}

/**
 * Lädt einen neuen Benutzer in die Datenbank hoch.
 * @param {Object} userData - Das Objekt mit den Benutzerdaten (Name, E-Mail, Passwort).
 * @returns {Promise<void>} Ein Promise, das den Abschluss des Hochladens signalisiert.
 * @throws {Error} Wenn beim Hochladen der Benutzerdaten ein Fehler auftritt.
 */
async function uploadNewUser(userData) {
    const url = storedDatabase.baseURL + storedDatabase.patchUsers;
    const user = { 'email': userData.email, 'name': userData.name, 'password': userData.pw };
    const storedUser = [ userData.email, userData.name, userData.pw ];
    try {
        const patchResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        if (!patchResponse.ok) {
            throw new Error('Fehler beim Hochladen der aktualisierten Benutzerdaten');
        }
        handleUserResult(storedUser);
    } catch (err) {
        throw new Error('Fehler beim Hochladen: ' + err.message);
    }
}