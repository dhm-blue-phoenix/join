import { findUserById, loadUserData } from './module/dataResponse.js'

const storedAutoLogin = localStorage.getItem('autoLogin');
const storedUserID = localStorage.getItem('userID');

const ID_loginForm = document.getElementById('loginForm');

const ID_inputEmail = document.getElementById('userEmail');
const ID_inputPW = document.getElementById('userPassword');
const ID_inputCheckbox = document.getElementById('inputCheckbox');

const ID_ERR_EMAIL = document.getElementById('emailError');

/**
 * Wird ausgeführt, wenn das DOM vollständig geladen ist.
 * ====================================================================================================
 * Diese Funktion überprüft, ob das `ID_loginForm`-Element existiert, entfernt einen 
 * eventuell vorhandenen `submit`-Event-Listener und fügt einen neuen hinzu, der die Funktion 
 * `initLogin` aufruft. Anschließend wird die Funktion `autoForm` aufgerufen, um das Formular
 * entsprechend auszufüllen.
 * ====================================================================================================
 * @listens document#DOMContentLoaded
 * @returns {void}
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    ID_loginForm && (
        ID_loginForm.removeEventListener('submit', initLogin),
        ID_loginForm.addEventListener('submit', initLogin)
    );
    autoForm();
});

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
async function autoForm() {
    const encode = loadUsernameFromURL();
    let userData;
    if (userData !== null) userData = checkDataAvailableFromUrl(encode, userData);
    if (storedAutoLogin === 'true') userData = await checkStoredFromAutoLogin();
    fillForm(userData);
}

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
}

/**
 * Überprüft, ob eine automatische Anmeldung gespeichert ist und aktualisiert `userData`.
 * ====================================================================================================
 * Diese Funktion überprüft, ob `storedAutoLogin` auf `'true'` gesetzt ist. Wenn ja, wird der
 * Benutzer anhand der gespeicherten Benutzer-ID gefunden und `userData` entsprechend aktualisiert.
 * Das Kontrollkästchen für die automatische Anmeldung wird aktiviert.
 * ====================================================================================================
 * func findUserById() - findet man in der './module/dataResponse.js'
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
}

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
}

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
}









/**
 * Initialisiert den Anmeldevorgang.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer das Anmeldeformular absendet. Sie prüft, ob
 * die Checkbox für den automatischen Login aktiviert ist, und führt die Anmelde- und 
 * Authentifizierungslogik durch. Bei erfolgreicher Authentifizierung wird je nach Status
 * der Checkbox die Benutzer-ID lokal oder in der Sitzung gespeichert.
 * ====================================================================================================
 * func loadUserData() = findet man in der './module/dataResponse.js'
 * ====================================================================================================
 * @param {Event} event Das Ereignis, das durch das Absenden des Anmeldeformulars ausgelöst wird.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn der Anmeldevorgang abgeschlossen ist.
 * @throws {Error} Wenn ein Fehler beim Laden der Benutzerdaten oder beim Speichern der Benutzer-ID auftritt.
 * ====================================================================================================
 */
async function initLogin(event) {
    try {
        event.preventDefault();
        resetErrMessegs();
        const statusCheckbox = ID_inputCheckbox.checked;
        const formData = await loadFormData();
        const user = await loadUserData(formData);
        if (user === undefined) return checkUser(user);
        checkStatusFromCheckbox(statusCheckbox);
        loadWindow();
    } catch (err) {
        console.error(`Fehler beim Initialisieren der Anmeldung: ${err}`);
    }
}

/**
 * Setzt alle Fehlermeldungen zurück.
 * ====================================================================================================
 * Diese Funktion blendet alle Fehlermeldungen aus, um sicherzustellen, dass keine alten
 * Fehlermeldungen angezeigt werden, wenn das Formular erneut abgesendet wird.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
const resetErrMessegs = () => {
    ID_ERR_EMAIL.style.display = 'none';
}

/**
 * Zeigt eine Fehlermeldung an, wenn der Benutzer nicht gefunden wird.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer in der Datenbank nicht gefunden wird.
 * Die Fehlermeldung wird angezeigt, um den Benutzer darüber zu informieren.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
const checkUser = () => {
    ID_ERR_EMAIL.textContent = 'Benutzer nicht gefunden!';
    ID_ERR_EMAIL.style.display = 'block';
}

/**
 * Speichert die Benutzer-ID basierend auf dem Status der Checkbox.
 * ====================================================================================================
 * Diese Funktion speichert die Benutzer-ID entweder in den lokalen Speicher oder in die Sitzung,
 * abhängig davon, ob die Checkbox für den automatischen Login aktiviert ist oder nicht.
 * ====================================================================================================
 * @async
 * @param {boolean} statusCheckbox Der Status der Checkbox für den automatischen Login.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Benutzer-ID erfolgreich gespeichert wurde.
 * @throws {Error} Wenn ein Fehler beim Speichern der Benutzer-ID auftritt.
 * ====================================================================================================
 */
const checkStatusFromCheckbox = async (statusCheckbox) => {
    if (statusCheckbox) {
        await saveLocalUserID(user[0], true);
    } else {
        await saveSessionUserID(user[0], false);
    };
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ====================================================================================================
 * Diese Funktion liest die Werte aus den Eingabefeldern für E-Mail und Passwort und
 * gibt sie als Objekt zurück.
 * ====================================================================================================
 * @returns {Object} Ein Objekt mit den Formulardaten.
 * ====================================================================================================
 */
const loadFormData = () => {
    return {
        'email': ID_inputEmail.value,
        'pw': ID_inputPW.value
    };
}

/**
 * Speichert die Benutzer-ID und den Auto-Login-Status im lokalen Storage.
 * ====================================================================================================
 * Diese Funktion speichert die Benutzer-ID und den Auto-Login-Status im lokalen 
 * Storage. Zuvor wird der Benutzer-ID-Eintrag im Session-Storage gelöscht.
 * ====================================================================================================
 * @param {String} userID Die eindeutige Benutzer-ID.
 * @param {Boolean} autoLogin Der Auto-Login-Status.
 * ====================================================================================================
 */
const saveLocalUserID = (userID, autoLogin) => {
    sessionStorage.removeItem('userID');
    localStorage.setItem('userID', userID);
    localStorage.setItem('autoLogin', autoLogin);
}

/**
 * Speichert die Benutzer-ID im Session-Storage und den Auto-Login-Status im lokalen Storage.
 * ====================================================================================================
 * Diese Funktion speichert die Benutzer-ID im Session-Storage und den Auto-Login-Status 
 * im lokalen Storage. Zuvor wird der Benutzer-ID-Eintrag im lokalen Storage gelöscht.
 * ====================================================================================================
 * @param {String} userID Die eindeutige Benutzer-ID.
 * @param {Boolean} autoLogin Der Auto-Login-Status.
 * ====================================================================================================
 */
const saveSessionUserID = (userID, autoLogin) => {
    localStorage.removeItem('userID');
    sessionStorage.setItem('userID', userID);
    localStorage.setItem('autoLogin', autoLogin);
}

/**
 * Lädt die nächste Seite.
 * ====================================================================================================
 * Diese Funktion leitet den Benutzer zur nächsten Seite weiter.
 * ====================================================================================================
 */
const loadWindow = () => {
    window.location.href = './summary.html';
}