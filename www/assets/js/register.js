import { loadUserData, uploadPatchData } from './module/dataResponse.js'

const ID_inputName = document.getElementById('inputName');
const ID_inputEmail = document.getElementById('inputEmail');
const ID_inputPW = document.getElementById('inputPassword');
const ID_inputCFPW = document.getElementById('inputConfirmPassword');

const ID_ERR_PW = document.getElementById('passwordError');
const ID_ERR_EMAIL = document.getElementById('emailError');

const ID_signedUpContainerBG = document.getElementById('signedUpContainerBG');
const ID_signedUpContainer = document.getElementById('signedUpContainer');

/**
 * Fügt einen Event-Listener hinzu, der die `initRegister`-Funktion bei der Formularübermittlung ausführt.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn das DOM vollständig geladen ist. Sie registriert einen Event-Listener
 * für das Formular mit der ID `signupFrom`, der die Funktion `initRegister` auslöst, wenn das Formular abgeschickt wird.
 * ====================================================================================================
 * @listens document#DOMContentLoaded Das Event, das ausgelöst wird, wenn das gesamte DOM geladen und analysiert wurde.
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('signupFrom').addEventListener('submit', initRegister);
});

/**
 * Initialisiert den Registrierungsprozess.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer den Registrierungsbutton klickt. Sie verhindert das
 * Standard-Formular-Submit-Verhalten, setzt die Fehlermeldungen zurück, lädt die Formulardaten, validiert diese
 * und ruft schließlich die Funktion `uploadData` auf, um die Daten zu speichern. Bei Fehlern wird eine Fehlermeldung
 * in der Konsole protokolliert.
 * ====================================================================================================
 * @async
 * @param {Event} event Das Ereignis, das die Registrierung auslöst.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn der Registrierungsprozess abgeschlossen ist.
 * @throws {Error} Wenn ein Fehler beim Registrierungsprozess auftritt.
 * ====================================================================================================
 */
async function initRegister(event) {
    try {
        event.preventDefault();
        resetMessages();
        const formData = await loadFormData();
        validateData(formData);
        await uploadData(formData);
    } catch (err) {
        console.error(`Fehler beim Initialisieren der Registrierung: ${err}`);
    }
}

/**
 * Aktualisiert die Benutzerdaten und leitet zur Hauptseite weiter.
 * ====================================================================================================
 * Diese Funktion sendet die Benutzerdaten an den Server und zeigt eine Erfolgsmeldung an. 
 * Nach einer kurzen Verzögerung (2 Sekunden) wird der Benutzer auf die Startseite weitergeleitet.
 * Die Funktion ruft `uploadPatchData` auf, um die Benutzerdaten zu speichern, und `signedUp`, 
 * um die Erfolgsmeldung anzuzeigen und die Weiterleitung vorzubereiten.
 * ====================================================================================================
 * func uploadPatchData() - findet man in der './module/dataResponse.js'
 * ====================================================================================================
 * @async
 * @param {Object} formData Die Formulardaten des Benutzers, die aktualisiert werden sollen.
 * @param {string} formData.email Die E-Mail-Adresse des Benutzers.
 * @param {string} formData.name Der Name des Benutzers.
 * @param {string} formData.pw Das Passwort des Benutzers.
 * @param {string} formData.cfpw Die Bestätigung des Passworts.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Daten erfolgreich aktualisiert und die Weiterleitung erfolgt ist.
 * @throws {Error} Wenn ein Fehler beim Hochladen der Daten auftritt.
 * ====================================================================================================
 */
async function uploadData(formData) {
    await uploadPatchData('users', {
        email: formData.email,
        name: formData.name,
        password: formData.pw,
        contacts: { none: '' },
        tasks: { none: '' }
    });
    signedUp(formData);
}

/**
 * Zeigt eine Erfolgsmeldung an und leitet zur Startseite weiter.
 * ====================================================================================================
 * Diese Funktion entfernt eine CSS-Klasse, um eine Hintergrundanzeige für den erfolgreichen 
 * Abschluss der Registrierung anzuzeigen. Anschließend wird eine Erfolgsmeldung angezeigt und der 
 * Benutzer nach einer Verzögerung (2 Sekunden) auf die Startseite weitergeleitet.
 * ====================================================================================================
 * @param {Object} formData Die Formulardaten des Benutzers, die für die Weiterleitung verwendet werden.
 * @param {string} formData.email Die E-Mail-Adresse des Benutzers.
 * @param {string} formData.pw Das Passwort des Benutzers.
 * ====================================================================================================
 */
const signedUp = (formData) => {
    ID_signedUpContainerBG.classList.remove('d-nonepopup');
    ID_signedUpContainer.innerHTML = '<p>Sie haben sich erfolgreich angemeldet</p>';
    setTimeout(() => {
        window.location.href = `./index.html?formEmail=${formData.email}&formPw=${formData.pw}`;
    }, 2000);
}

/**
 * Validiert die Formulardaten.
 * ====================================================================================================
 * Diese Funktion überprüft die Formulardaten auf Passwortübereinstimmung und ob der Benutzer bereits existiert.
 * ====================================================================================================
 * func loadUserData() - findet man in der './module/dataResponse.js' 
 * ====================================================================================================
 * @async
 * @param {Object} formData Die Formulardaten des Benutzers.
 * @param {string} formData.email Die E-Mail-Adresse des Benutzers.
 * @param {string} formData.pw Das Passwort des Benutzers.
 * @param {string} formData.cfpw Die Bestätigung des Passworts.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Validierung abgeschlossen ist.
 * @throws {Error} Wenn ein Fehler beim Validieren der Daten auftritt.
 * ====================================================================================================
 */
const validateData = async (formData) => {
    validatePassword(formData);
    const userData = await loadUserData(formData.email); // Lädt die Benutzerdaten
    validateUserData(userData); // Überprüft, ob der Benutzer bereits existiert
}

/**
 * Überprüft, ob der Benutzer bereits vorhanden ist.
 * ====================================================================================================
 * Diese Funktion zeigt eine Fehlermeldung an, wenn der Benutzer bereits in der Datenbank vorhanden ist.
 * ====================================================================================================
 * @param {Object} userData Die Benutzerdaten, die von der `loadUserData`-Funktion zurückgegeben werden.
 * @param {Object} userData Das Benutzerdatenobjekt.
 * ====================================================================================================
 */
const validateUserData = (userData) => {
    if (userData) {
        ID_ERR_EMAIL.textContent = 'Benutzer ist bereits in der Datenbank vorhanden!';
        ID_ERR_EMAIL.style.display = 'block';
    }
}

/**
 * Überprüft, ob die Passwörter übereinstimmen.
 * ====================================================================================================
 * Diese Funktion zeigt eine Fehlermeldung an, wenn das Passwort und die Bestätigung nicht übereinstimmen.
 * ====================================================================================================
 * @param {Object} formData Die Formulardaten des Benutzers.
 * @param {string} formData.pw Das Passwort des Benutzers.
 * @param {string} formData.cfpw Die Bestätigung des Passworts.
 * ====================================================================================================
 */
const validatePassword = (formData) => {
    if (formData.pw !== formData.cfpw) {
        ID_ERR_PW.textContent = 'Das Passwort stimmt nicht überein!';
        ID_ERR_PW.style.display = 'block';
    }
}

/**
 * Setzt alle Fehlermeldungen zurück.
 * ====================================================================================================
 * Diese Funktion ruft `resetErrorMessages` auf und leert den Inhalt des `ID_signedUpContainer`.
 * ====================================================================================================
 */
const resetMessages = () => {
    resetErrorMessages();
    ID_signedUpContainer.innerHTML = '';
}

/**
 * Setzt die einzelnen Fehlermeldungen zurück.
 * ====================================================================================================
 * Diese Funktion setzt die Anzeige von Fehlermeldungen zurück, indem sie die `display`-Eigenschaft auf 'none' setzt.
 * ====================================================================================================
 */
const resetErrorMessages = () => {
    ID_ERR_PW.style.display = 'none';
    ID_ERR_EMAIL.style.display = 'none';
}

/**
 * Lädt die Daten aus den Formularfeldern.
 * ====================================================================================================
 * Diese Funktion extrahiert die Werte aus den Eingabefeldern und gibt sie als Objekt zurück.
 * ====================================================================================================
 * @returns {Object} Ein Objekt mit den Formulardaten.
 * @returns {string} name Der Name des Benutzers.
 * @returns {string} email Die E-Mail-Adresse des Benutzers.
 * @returns {string} pw Das Passwort des Benutzers.
 * @returns {string} cfpw Die Bestätigung des Passworts.
 * ====================================================================================================
 */
const loadFormData = () => ({
    name: ID_inputName.value,
    email: ID_inputEmail.value,
    pw: ID_inputPW.value,
    cfpw: ID_inputCFPW.value
});