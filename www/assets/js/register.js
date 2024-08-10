const ID_inputName = document.getElementById('inputName');
const ID_inputEmail = document.getElementById('inputEmail');
const ID_inputPW = document.getElementById('inputPassword');
const ID_inputCFPW = document.getElementById('inputConfirmPassword');

const signedUpContainerBG = document.getElementById('signedUpContainerBG');
const signedUpContainer = document.getElementById('signedUpContainer');

/**
 * Initialisiert den Registrierungsprozess.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer den Registrierungsbutton klickt.
 * Sie überprüft, ob die Checkbox für die AGBs akzeptiert wurde und ob das Passwort
 * mit der Bestätigung übereinstimmt. Wenn alles korrekt ist, wird die Registrierung
 * durchgeführt und der Benutzer wird auf die Startseite weitergeleitet.
 * ====================================================================================================
 * func loadUserData() - findet man in der dataResponse.js
 * func uploadData() - findet man in der dataResponse.js
 * ====================================================================================================
 * @param {Event} event Das Ereignis, das den Registrierungsprozess auslöst.
 * ====================================================================================================
 */
async function initRegister(event) {
    event.preventDefault();
    const formData = await loadFormData();
    signedUpContainer.innerHTML = '';
    if (formData.pw !== formData.cfpw) return console.warn('Das Passwort stimmt nicht überein!'); // [!] Ändern zu Benutzer-Feedback
    const userData = await loadUserData(formData);
    if (userData === undefined) {
        await uploadData({ 'email': formData.email, 'name': formData.name, 'password': formData.pw, 'contacts': 'none', 'tasks': 'none' });
        signedUpContainerBG.classList.remove('d-nonepopup');
        signedUpContainer.innerHTML = '<p>You Signed Up successfully</p>';
        setTimeout(function () {
            window.location.href = './index.html?formEmail=' + formData.email + '&formPw=' + formData.pw;
        }, 2000); // 2000 Millisekunden = 2 Sekunden
    } else console.warn('Benutzer ist in der Datenbank bereits vorhanden!'); // [!] Ändern zu Benutzer-Feedback
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ====================================================================================================
 * Diese Funktion liest die Werte aus den Eingabefeldern für Name, E-Mail, Passwort und
 * Passwort-Bestätigung und gibt sie als Objekt zurück.
 * ====================================================================================================
 * @returns {Object} Ein Objekt mit den Formulardaten.
 * ====================================================================================================
 */
function loadFormData() {
    const formData = {
        'name': ID_inputName.value,
        'email': ID_inputEmail.value,
        'pw': ID_inputPW.value,
        'cfpw': ID_inputCFPW.value
    };
    return formData;
}