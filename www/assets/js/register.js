import { loadUserData } from './module/modules.js';
import { uploadPatchData } from './module/dataResponse.js';

const ID_FORM_REGISTER = document.getElementById('signupFrom');

const ID_INPUT_NAME = document.getElementById('inputName');
const ID_INPUT_EMAIL = document.getElementById('inputEmail');
const ID_INPUT_PW = document.getElementById('inputPassword');
const ID_INPUT_CFPW = document.getElementById('inputConfirmPassword');

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
    ID_FORM_REGISTER && (
        ID_FORM_REGISTER.removeEventListener('submit', initRegister),
        ID_FORM_REGISTER.addEventListener('submit', initRegister)
    );
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
        if (formData.pw !== formData.cfpw) return validatePassword();
        const userData = await loadUserData(formData.email);
        if (userData) return validateUserData();
        await uploadData(formData);
    } catch (err) {
        console.error(`Fehler beim Initialisieren der Registrierung: ${err}`);
    };
};

/**
 * Aktualisiert die Benutzerdaten und leitet zur Hauptseite weiter.
 * ====================================================================================================
 * Diese Funktion sendet die Benutzerdaten an den Server und zeigt eine Erfolgsmeldung an. 
 * Nach einer kurzen Verzögerung (2 Sekunden) wird der Benutzer auf die Startseite weitergeleitet.
 * Die Funktion ruft `uploadPatchData` auf, um die Benutzerdaten zu speichern, und `signedUp`, 
 * um die Erfolgsmeldung anzuzeigen und die Weiterleitung vorzubereiten.
 * ====================================================================================================
 * func uploadPatchData() - findet man in der './module/modules.js'
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
};

/**
 * Zeigt eine Erfolgsmeldung an und leitet zur Startseite weiter.
 * ====================================================================================================
 * Diese Funktion entfernt eine CSS-Klasse, um eine Hintergrundanzeige für den erfolgreichen 
 * Abschluss der Registrierung anzuzeigen. Anschließend wird eine Erfolgsmeldung angezeigt und der 
 * Benutzer nach einer Verzögerung (2 Sekunden) auf die Startseite weitergeleitet.
 * ====================================================================================================
 *  @param {Object} formData Die Formulardaten des Benutzers, die für die Weiterleitung verwendet werden.
 * @param {string} formData.email Die E-Mail-Adresse des Benutzers.
 * @param {string} formData.pw Das Passwort des Benutzers.
 * ====================================================================================================
 */
const signedUp = (formData) => {
    ID_signedUpContainerBG.classList.remove('d-nonepopup');  
    ID_signedUpContainer.appendChild(createMessege());
    setTimeout(() => {
        window.location.href = `./index.html?formEmail=${encodeURIComponent(formData.email)}&formPw=${encodeURIComponent(formData.pw)}`;
    }, 2000);
};

/**
 * Überprüft, ob der Benutzer bereits vorhanden ist.
 * ====================================================================================================
 * Diese Funktion zeigt eine Fehlermeldung an, wenn der Benutzer bereits in der Datenbank vorhanden ist.
 * ====================================================================================================
 */
const validateUserData = () => {
    ID_ERR_EMAIL.textContent = 'Benutzer ist bereits in der Datenbank vorhanden!';
    ID_ERR_EMAIL.style.display = 'block';
};

/**
 * Überprüft, ob die Passwörter übereinstimmen.
 * ====================================================================================================
 * Diese Funktion zeigt eine Fehlermeldung an, wenn das Passwort und die Bestätigung nicht übereinstimmen.
 * ====================================================================================================
 */
const validatePassword = () => {
    ID_ERR_PW.textContent = 'Das Passwort stimmt nicht überein!';
    ID_ERR_PW.style.display = 'block';
};

/**
 * Setzt alle Fehlermeldungen zurück.
 * ====================================================================================================
 * Diese Funktion ruft `resetErrorMessages` auf und leert den Inhalt des `ID_signedUpContainer`.
 * ====================================================================================================
 */
const resetMessages = () => {
    resetErrorMessages();
    ID_signedUpContainer.innerHTML = '';
};

/**
 * Setzt die einzelnen Fehlermeldungen zurück.
 * ====================================================================================================
 * Diese Funktion setzt die Anzeige von Fehlermeldungen zurück, indem sie die `display`-Eigenschaft auf 'none' setzt.
 * ====================================================================================================
 */
const resetErrorMessages = () => {
    ID_ERR_PW.style.display = 'none';
    ID_ERR_EMAIL.style.display = 'none';
};

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
    name: ID_INPUT_NAME.value,
    email: ID_INPUT_EMAIL.value,
    pw: ID_INPUT_PW.value,
    cfpw: ID_INPUT_CFPW.value
});

/**
 * Erstellt eine Benachrichtigungsnachricht für eine erfolgreiche Anmeldung.
 * ====================================================================================================
 * Diese Funktion erstellt ein Paragraph-Element (`<p>`) und fügt den Textinhalt hinzu, der 
 * eine Erfolgsmeldung für die Anmeldung enthält. Das Paragraph-Element kann dann in das DOM
 * eingefügt werden, um die Nachricht an den Benutzer anzuzeigen.
 * ====================================================================================================
 * @returns {HTMLElement} Das erstellte Paragraph-Element mit der Erfolgsmeldung.
 * ====================================================================================================
 */
export const createMessege = () => {
    const MESSEGE = document.createElement('p');
    MESSEGE.textContent = 'Sie haben sich erfolgreich angemeldet';
    return MESSEGE;
};