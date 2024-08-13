import { loadUserData } from './module/modules.js';
import { autoForm } from './module/autoFormFromLogin.js';

const ID_FORM_LOGIN = document.getElementById('loginForm');
const ID_BTN_guestLogin = document.getElementById('guestloginbtn');

const ID_INPUT_EMAIL = document.getElementById('userEmail');
const ID_INPUT_PW = document.getElementById('userPassword');
const ID_INPUT_CHECKBOX = document.getElementById('inputCheckbox');

const ID_ERR_EMAIL = document.getElementById('emailError');

/**
 * Wird ausgeführt, wenn das DOM vollständig geladen ist.
 * ====================================================================================================
 * Diese Funktion wird automatisch aufgerufen, wenn das DOM vollständig geladen und bereit ist. 
 * Sie überprüft, ob das `ID_FORM_LOGIN`-Element vorhanden ist, entfernt einen eventuell 
 * vorhandenen `submit`-Event-Listener und fügt einen neuen hinzu, der die Funktion `initLogin` 
 * auslöst. Darüber hinaus wird überprüft, ob das `ID_BTN_guestLogin`-Element existiert, 
 * der `click`-Event-Listener wird entfernt, wenn vorhanden, und ein neuer Listener wird hinzugefügt, 
 * der die Funktion `initGuestLogin` aufruft. Abschließend wird die Funktion `autoForm` aufgerufen, 
 * um das Formular mit vorab gespeicherten Daten auszufüllen.
 * ====================================================================================================
 * @listens document#DOMContentLoaded - Das Ereignis, das ausgelöst wird, wenn das DOM vollständig geladen ist.
 * @returns {void}
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    ID_FORM_LOGIN && (
        ID_FORM_LOGIN.removeEventListener('submit', initLogin),
        ID_FORM_LOGIN.addEventListener('submit', initLogin)
    );
    ID_BTN_guestLogin && (
        ID_BTN_guestLogin.removeEventListener('click', initGuestLogin),
        ID_BTN_guestLogin.addEventListener('click', initGuestLogin)
    );
    await autoForm();
});

/**
 * Führt den Gast-Login durch und leitet zur Hauptseite weiter.
 * ====================================================================================================
 * Diese Funktion speichert eine vordefinierte Benutzer-ID in der Sitzung und leitet den Benutzer
 * anschließend zur Hauptseite weiter. Die Benutzer-ID wird dabei nicht lokal gespeichert.
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn der Gast-Login abgeschlossen ist
 * und die Weiterleitung erfolgt.
 * ====================================================================================================
 */
async function initGuestLogin() {
    await saveSessionUserID('-O0wPZV3YT41s7Ja0eKd', false);
    loadWindow();
}

/**
 * Initialisiert den Anmeldevorgang.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer das Anmeldeformular absendet. Sie prüft, ob
 * die Checkbox für den automatischen Login aktiviert ist, und führt die Anmelde- und 
 * Authentifizierungslogik durch. Bei erfolgreicher Authentifizierung wird je nach Status
 * der Checkbox die Benutzer-ID lokal oder in der Sitzung gespeichert.
 * ====================================================================================================
 * func loadUserData() = findet man in der './module/modules.js'
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
        const statusCheckbox = ID_INPUT_CHECKBOX.checked;
        const formData = await loadFormData();
        const user = await loadUserData(formData);
        if (user === undefined) return checkUser(user);
        checkStatusFromCheckbox(statusCheckbox, user);
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
const checkStatusFromCheckbox = async (statusCheckbox, user) => {
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
        'email': ID_INPUT_EMAIL.value,
        'pw': ID_INPUT_PW.value
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