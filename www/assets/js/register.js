import {loadUserData,uploadPatchData } from './module/dataResponse.js'

const ID_inputName = document.getElementById('inputName');
const ID_inputEmail = document.getElementById('inputEmail');
const ID_inputPW = document.getElementById('inputPassword');
const ID_inputCFPW = document.getElementById('inputConfirmPassword');

const signedUpContainerBG = document.getElementById('signedUpContainerBG');
const signedUpContainer = document.getElementById('signedUpContainer');

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('.signupcontainer').addEventListener('submit', initRegister);
});


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
    
    // Fehlerfelder leeren
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    
    const formData = await loadFormData();
    signedUpContainer.innerHTML = '';

    if (formData.pw !== formData.cfpw) {
        document.getElementById('passwordError').textContent = 'Das Passwort stimmt nicht überein!';
        document.getElementById('passwordError').style.display = 'block';
        return;
    }

    const userData = await loadUserData(formData);
    
    if (userData !== undefined) {
        document.getElementById('emailError').textContent = 'Benutzer ist in der Datenbank bereits vorhanden!';
        document.getElementById('emailError').style.display = 'block';
        return;
    }
    
    await uploadPatchData('users', { 'email': formData.email, 'name': formData.name, 'password': formData.pw, 'contacts': { 'none': '' }, 'tasks': { 'none': '' } });
    signedUpContainerBG.classList.remove('d-nonepopup');
    signedUpContainer.innerHTML = '<p>You Signed Up successfully</p>';
    setTimeout(function () {
        window.location.href = './index.html?formEmail=' + formData.email + '&formPw=' + formData.pw;
    }, 2000); // 2000 Millisekunden = 2 Sekunden
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