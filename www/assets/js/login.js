const storedAutoLogin = localStorage.getItem('autoLogin');
const storedUserID = localStorage.getItem('userID');

const ID_inputEmail = document.getElementById('userEmail');
const ID_inputPW = document.getElementById('userPassword');
const ID_inputCheckbox = document.getElementById('inputCheckbox');

/**
 * Wenn Auto-Login aktiviert ist, füllt die Eingabefelder mit den gespeicherten Daten.
 * -----------------------------------------------------------------------------------
 * Diese Funktion wird aufgerufen, wenn die Seite geladen wird und der Auto-Login 
 * aktiviert ist. Sie füllt die Eingabefelder mit den gespeicherten Benutzerdaten.
 */
async function autoLogin() {
    if (storedAutoLogin === 'true') {
        const uid = storedUserID;
        const user = await findUserById(uid);
        console.table(user);
        ID_inputEmail.value = user[1];
        ID_inputPW.value = user[3];
        ID_inputCheckbox.checked = true;
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
    const formData = await loadFormData();
    const user = await loadUserData(formData);
    if (user === undefined) return console.warn('Benutzer nicht gefunden!'); // [!] Ändern zu Benutzer-Feedback
    if (statusCheckbox) {
        await saveLocalUserID(user[0], true);
    } else {
        await saveSessionUserID(user[0], false);
    };
    loadWindow(user[1].name);
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
function loadWindow(username) {
    window.location.href = `./summary.html?username=` + username;
}