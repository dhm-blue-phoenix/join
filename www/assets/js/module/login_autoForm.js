import { findUserById } from './modules.js';

const storedAutoLogin = localStorage.getItem('autoLogin');
const storedUserID = localStorage.getItem('userID');

const ID_inputEmail = document.getElementById('userEmail');
const ID_inputPW = document.getElementById('userPassword');
const ID_inputCheckbox = document.getElementById('inputCheckbox');

/**
 * Führt eine automatische Befüllung des Formulars durch.
 * ====================================================================================================
 * Diese Funktion führt mehrere Schritte durch, um das Formular automatisch auszufüllen:
 * - Lädt den Benutzernamen aus der URL.
 * - Überprüft und speichert Daten, die aus der URL geladen wurden.
 * - Prüft, ob eine automatische Anmeldung vorhanden ist, und füllt das Formular entsprechend aus.
 * ====================================================================================================
 * @returns {Promise<void>} Eine Promise, die auf die Beendigung aller asynchronen Operationen wartet.
 * @async
 * ====================================================================================================
 */
export async function autoForm() {
    const encode = loadUsernameFromURL();
    let userData;
    if (userData !== null) userData = checkDataAvailableFromUrl(encode, userData);
    if (storedAutoLogin === 'true') userData = await checkStoredFromAutoLogin();
    if(userData !== null) return fillForm(userData);
};

/**
 * Überprüft die Verfügbarkeit von Benutzerdaten aus der URL.
 * ====================================================================================================
 * Diese Funktion aktualisiert `userData`, falls die Benutzerdaten aus der URL verfügbar sind,
 * und stellt sicher, dass das Kontrollkästchen für die automatische Anmeldung abgewählt ist.
 * ====================================================================================================
 * @param {Array} encode - Ein Array, das die aus der URL geladenen Benutzerdaten enthält.
 * @param {Object|null} userData - Das aktuelle Benutzer-Datenobjekt, das aktualisiert werden kann.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
function checkDataAvailableFromUrl(encode) {
    ID_inputCheckbox.checked = false;
    return [encode[0], encode[1]];
};

/**
 * Überprüft, ob eine automatische Anmeldung gespeichert ist und aktualisiert `userData`.
 * ====================================================================================================
 * Diese Funktion überprüft, ob `storedAutoLogin` auf `'true'` gesetzt ist. Wenn ja, wird der
 * Benutzer anhand der gespeicherten Benutzer-ID gefunden und `userData` entsprechend aktualisiert.
 * Das Kontrollkästchen für die automatische Anmeldung wird aktiviert.
 * ====================================================================================================
 * func findUserById() - findet man in der './modules.js'
 * ====================================================================================================
 * @param {Object|null} userData - Das aktuelle Benutzer-Datenobjekt, das aktualisiert werden kann.
 * ====================================================================================================
 * @returns {Promise<void>} Eine Promise, die auf die Beendigung der asynchronen Operation wartet.
 * @async
 * ====================================================================================================
 */
async function checkStoredFromAutoLogin() {
    const user = await findUserById(storedUserID);
    ID_inputCheckbox.checked = true;
    return [user[1], user[3]];
};

/**
 * Füllt die Formularfelder mit den angegebenen Benutzerdaten.
 * ====================================================================================================
 * Diese Funktion setzt die Werte der Formularfelder auf die übergebenen Benutzerdaten.
 * ====================================================================================================
 * @param {Array<string>} userData Ein Array, das E-Mail-Adresse und Passwort enthält.
 * ====================================================================================================
 */
const fillForm = (userData) => {
    ID_inputEmail.value = userData[0];
    ID_inputPW.value = userData[1];
};

/**
 * Lädt die E-Mail-Adresse und das Passwort aus der URL.
 * ====================================================================================================
 * Diese Funktion verwendet URL-Parameter, um die E-Mail-Adresse und das Passwort zu extrahieren.
 * ====================================================================================================
 * @returns {Array<string>} Ein Array mit E-Mail-Adresse und Passwort.
 * ====================================================================================================
 */
const loadUsernameFromURL = () => {
    const encodeEmail = decodeURIComponent(new URLSearchParams(window.location.search).get("formEmail"));
    const encodePw = decodeURIComponent(new URLSearchParams(window.location.search).get("formPw"));
    return [encodeEmail, encodePw];
};