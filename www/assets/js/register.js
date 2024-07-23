/**
 * Holt die HTML-Elemente für die Eingabefelder.
 */
const ID_inputName = document.getElementById('inputName');
const ID_inputEmail = document.getElementById('inputEmail');
const ID_inputPW = document.getElementById('inputPassword');
const ID_inputCFPW = document.getElementById('inputConfirmPassword');
const ID_inputCheckbox = document.getElementById('inputCheckbox');

/**
 * Initialisiert den Registrierungsprozess.
 * ----------------------------------------
 * Diese Funktion wird aufgerufen, wenn der Benutzer den Registrierungsbutton klickt.
 * Sie überprüft, ob die Checkbox für die AGBs akzeptiert wurde und ob das Passwort
 * mit der Bestätigung übereinstimmt. Wenn alles korrekt ist, wird die Registrierung
 * durchgeführt und der Benutzer wird auf die Startseite weitergeleitet.
 * ----------------------------------------
 * @param {Event} event Das Ereignis, das den Registrierungsprozess auslöst.
 */
async function initRegister(event) {
    event.preventDefault();
    const statusCheckbox = ID_inputCheckbox.checked;
    if (!statusCheckbox) return console.warn('Checkbox muss true sein!'); // [!] Ändern zu Benutzer-Feedback
    const formData = await lodeFormData();
    if (formData.pw !== formData.cfpw) return console.warn('Das Passwort stimmt nicht überein!'); // [!] Ändern zu Benutzer-Feedback
    const userData = await dataResponse(formData);
    if (userData === undefined) {
        await dataUpload({ 'email': formData.email, 'name': formData.name, 'password': formData.pw });
        console.warn('Benutzer wurde erfolgreich registriert!'); // [!] Ändern zu Benutzer-Feedback
        setTimeout(() => window.location.href = './index.html', 3000);
    }
    console.warn('Benutzer wurde in der Datenbank gefunden!'); // [!] Ändern zu Benutzer-Feedback
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ----------------------------------------------
 * Diese Funktion liest die Werte aus den Eingabefeldern für Name, E-Mail, Passwort und
 * Passwort-Bestätigung und gibt sie als Objekt zurück.
 * ----------------------------------------------
 * @returns {Object} Ein Objekt mit den Formulardaten.
 */
function lodeFormData() {
    const formData = {
        'name': ID_inputName.value,
        'email': ID_inputEmail.value,
        'pw': ID_inputPW.value,
        'cfpw': ID_inputCFPW.value
    };
    return formData;
}