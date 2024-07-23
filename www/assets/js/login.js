/**
 * Holt die gespeicherten Daten aus dem lokalen Storage.
 */
const storedAutoLogin = localStorage.getItem('autoLogin');
const storedUserData = localStorage.getItem('userData');

/**
 * Holt die HTML-Elemente für die Eingabefelder.
 */
const ID_inputEmail = document.getElementById('userEmail');
const ID_inputPW = document.getElementById('userPassword');
const ID_inputCheckbox = document.getElementById('inputCheckbox');

/**
 * Wenn Auto-Login aktiviert ist, füllt die Eingabefelder mit den gespeicherten Daten.
 */
function autoLogin() {
    if (storedAutoLogin) {
        const user = JSON.parse(storedUserData);
        ID_inputEmail.value = user.email;
    }
}

/**
 * Initialisiert den Login-Prozess.
 * --------------------------------
 * Diese Funktion wird aufgerufen, wenn der Benutzer den Login-Button klickt.
 * Sie überprüft, ob die Checkbox für den Auto-Login aktiviert ist und führt den
 * Login-Prozess durch.
 * --------------------------------
 * @param {Event} event Das Ereignis, das den Login-Prozess auslöst.
 */
async function initLogin(event) {
    event.preventDefault();
    const statusCheckbox = ID_inputCheckbox.checked;
    const formData = await lodeFormData();
    const userData = await dataResponse(formData);
    if (userData === undefined) return console.warn('Benutzer nicht gefunden!'); // [!] Ändern zu Benutzer-Feedback
    if (statusCheckbox) {
        await saveUser({ 'email': userData.email, 'name': userData.name }, true);
    } else {
        await saveUserName(userData.name);
    };
    lodeWindow();
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ----------------------------------------------
 * Diese Funktion liest die Werte aus den Eingabefeldern für E-Mail und Passwort und
 * gibt sie als Objekt zurück.
 * ----------------------------------------------
 * @returns {Object} Ein Objekt mit den Formulardaten.
 */
function lodeFormData() {
    return {
        'email': ID_inputEmail.value,
        'pw': ID_inputPW.value
    };
}

/**
 * Speichert die Benutzerdaten im lokalen Storage.
 * -----------------------------------------------
 * Diese Funktion speichert die Benutzerdaten und den Auto-Login-Status im lokalen
 * Storage.
 * -----------------------------------------------
 * @param {Object} userData Ein Objekt mit den Benutzerdaten.
 * @param {Boolean} autoLogin Der Auto-Login-Status.
 */
function saveUser(userData, autoLogin) {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('autoLogin', autoLogin);
}

/**
 * Speichert den Benutzernamen im lokalen Storage.
 * -----------------------------------------------
 * Diese Funktion speichert den Benutzernamen und setzt den Auto-Login-Status auf false.
 * -----------------------------------------------
 * @param {String} userName Der Benutzername.
 */
function saveUserName(userName) {
    saveUser({ 'email': '', 'name': userName }, false);
}

/**
 * Lädt die nächste Seite.
 * -----------------------
 * Diese Funktion leitet den Benutzer zur nächsten Seite weiter.
 */
function lodeWindow() {
    window.location.href = './summary.html';
}