const storedAutoLogin = localStorage.getItem('autoLogin');
const storedUserID = localStorage.getItem('userID');

const ID_inputEmail = document.getElementById('userEmail');
const ID_inputPW = document.getElementById('userPassword');
const ID_inputCheckbox = document.getElementById('inputCheckbox');

/**
 * Holt die Benutzerdaten aus der URL.
 * -----------------------------------
 * @returns {Array<string|null>} - Ein Array mit der E-Mail-Adresse und dem Passwort aus der URL, 
 *                                 oder null, wenn keine Daten in der URL vorhanden sind.
 */
function lodeUsernameFromURL() {
    const encodeEmail = new URLSearchParams(window.location.search).get("formEmail");
    const encodePw = new URLSearchParams(window.location.search).get("formPw");
    return [encodeEmail, encodePw];
}

/**
 * Wenn Auto-Login aktiviert ist, füllt die Eingabefelder mit den gespeicherten Daten.
 * -----------------------------------------------------------------------------------
 * Diese Funktion wird aufgerufen, wenn die Seite geladen wird und der Auto-Login 
 * aktiviert ist. Sie füllt die Eingabefelder mit den gespeicherten Benutzerdaten.
 * Wenn Auto-Login nicht aktiviert ist, aber Benutzerdaten in der URL vorhanden sind, 
 * werden diese verwendet, um die Eingabefelder zu füllen.
 */
async function autoLogin() {
    const encode = lodeUsernameFromURL();
    let userData;
    if (userData !== null) {
        userData = [encode[0], encode[1]];
        ID_inputCheckbox.checked = false;
    } else if (storedAutoLogin === 'true') {
        const user = await findUserById(storedUserID);
        userData = [user[1], user[3]];
        ID_inputCheckbox.checked = true;
    }
    ID_inputEmail.value = userData[0];
    ID_inputPW.value = userData[1];
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
    const formData = await loadFormData();
    const user = await loadUserData(formData);
    if (user === undefined) return console.warn('Benutzer nicht gefunden!'); // [!] Ändern zu Benutzer-Feedback
    if (statusCheckbox) {
        await saveLocalUserID(user[0], true);
    } else {
        await saveSessionUserID(user[0], false);
    };
    loadWindow();
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ----------------------------------------------
 * Diese Funktion liest die Werte aus den Eingabefeldern für E-Mail und Passwort und
 * gibt sie als Objekt zurück.
 * ----------------------------------------------
 * @returns {Object} Ein Objekt mit den Formulardaten.
 */
function loadFormData() {
    return {
        'email': ID_inputEmail.value,
        'pw': ID_inputPW.value
    };
}

/**
 * Speichert die Benutzer-ID und den Auto-Login-Status im lokalen Storage.
 * -----------------------------------------------------------------------
 * Diese Funktion speichert die Benutzer-ID und den Auto-Login-Status im lokalen 
 * Storage. Zuvor wird der Benutzer-ID- Eintrag im Session-Storage gelöscht.
 * -----------------------------------------------------------------------
 * @param {String} userID Die eindeutige Benutzer-ID.
 * @param {Boolean} autoLogin Der Auto-Login-Status.
 */
function saveLocalUserID(userID, autoLogin) {
    sessionStorage.removeItem('userID');
    localStorage.setItem('userID', userID);
    localStorage.setItem('autoLogin', autoLogin);
}

/**
 * Speichert die Benutzer-ID im Session-Storage und den Auto-Login-Status im lokalen Storage.
 * ------------------------------------------------------------------------------------------
 * Diese Funktion speichert die Benutzer-ID im Session-Storage und den Auto-Login-Status 
 * im lokalen Storage. Zuvor wird der Benutzer-ID-Eintrag im lokalen Storage gelöscht.
 * ------------------------------------------------------------------------------------------
 * @param {String} userID Die eindeutige Benutzer-ID.
 * @param {Boolean} autoLogin Der Auto-Login-Status.
 */
function saveSessionUserID(userID, autoLogin) {
    localStorage.removeItem('userID');
    sessionStorage.setItem('userID', userID);
    localStorage.setItem('autoLogin', autoLogin);
}

/**
 * Lädt die nächste Seite.
 * -----------------------
 * Diese Funktion leitet den Benutzer zur nächsten Seite weiter.
 */
function loadWindow() {
    window.location.href = './summary.html';
}