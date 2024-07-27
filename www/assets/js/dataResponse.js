const baseURL = "https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Überprüft, ob ein Benutzer bereits in der Datenbank existiert.
 * --------------------------------------------------------------
 * Diese Funktion ruft die Benutzerdaten aus der Datenbank ab und sucht nach einem 
 * Benutzer, der mit den übergebenen Daten übereinstimmt.
 * --------------------------------------------------------------
 * @param {Object} find Ein Objekt mit den Benutzerdaten, nach denen gesucht werden soll.
 * @returns {Object} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
async function loadUserData(find) {
    try {
        const users = await retrievingData('');
        const user = await findUser(users[0], find);
        return user;
    } catch (err) { }
}

/**
 * Sucht nach einem Benutzer in der Liste der Benutzer.
 * ----------------------------------------------------
 * Diese Funktion durchsucht die Liste der Benutzer nach einem Benutzer, der mit den 
 * übergebenen Daten übereinstimmt.
 * ----------------------------------------------------
 * @param {Array} users Die Liste der Benutzer.
 * @param {Object} find Ein Objekt mit den Benutzerdaten, nach denen gesucht werden soll.
 * @returns {Object} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
async function findUser(users, find) {
    return Object.entries(users).find(([id, user]) => user.email === find.email && user.password === find.pw);
}

/**
 * Holt die Benutzerdaten aus der Firebase Realtime Database.
 * ----------------------------------------------------------
 * Diese Funktion ruft die Benutzerdaten aus der Datenbank ab und gibt sie als Liste 
 * zurück.
 * ----------------------------------------------------------
 * @returns {Array} Die Liste der Benutzer.
 */
async function retrievingData(patch) {
    try {
        const response = await fetch(baseURL + patch + '.json');
        await checkAnswer(response);
        const data = await response.json();
        return Object.values(data);
    } catch (err) {
        handleError(err);
    }
}

/**
 * Lädt die Kontakte.
 * ------------------
 * Diese Funktion lädt die Kontakte aus der Datenbank und gibt sie zurück.
 * ------------------
 * @param {Object} patch Ein Patch-Objekt, das die zu ladenden Kontakte spezifiziert.
 * @returns {Promise} Ein Promise, das die geladenen Kontakte zurückgibt.
 */
async function loadContactsData(patch) {
    return await retrievingData(patch);
}

/**
 * Fügt einen neuen Benutzer zur Firebase Realtime Database hinzu.
 * ---------------------------------------------------------------
 * Diese Funktion sendet eine POST-Anfrage an die Datenbank, um einen neuen Benutzer 
 * hinzuzufügen.
 * ---------------------------------------------------------------
 * @param {Object} data Ein Objekt mit den Benutzerdaten, die hinzugefügt werden sollen.
 */
async function uploadData(data) {
    try {
        const patchResponse = await fetch(baseURL + 'users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        await checkAnswer(patchResponse);
    } catch (err) {
        handleError(err);
    }
}

/**
 * Lädt Patch-Daten auf den Server hoch.
 * -------------------------------------
 * Diese Funktion sendet die übergebenen Daten an den Server und speichert sie 
 * unter dem angegebenen Patch.
 * -------------------------------------
 * @param {String} patch Der Pfad, unter dem die Daten gespeichert werden sollen.
 * @param {Object} data Die zu speichernden Daten.
 */
async function uploadPatchData(patch, data) {
    try {
        const patchResponse = await fetch(baseURL + patch + '.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        await checkAnswer(patchResponse);
    } catch (err) {
        handleError(err);
    }
}

/**
 * Überprüft, ob die Antwort auf eine Anfrage erfolgreich war.
 * -----------------------------------------------------------
 * Diese Funktion wirft einen Fehler, wenn die Antwort nicht erfolgreich war.
 * -----------------------------------------------------------
 * @param {Response} response Die Antwort auf die Anfrage.
 */
async function checkAnswer(response) {
    if (!response.ok) {
        throw new Error(`[HTTP] Status: ${response.status} - ${response.statusText}`);
    }
}

/**
 * Behandelt einen Fehler, der bei der Ausführung einer Funktion aufgetreten ist.
 * ------------------------------------------------------------------------------
 * Diese Funktion gibt den Fehler auf der Konsole aus.
 * ------------------------------------------------------------------------------
 * @param {Error} err Der aufgetretene Fehler.
 */
function handleError(err) {
    console.error('Es ist ein Problem aufgetreten:\n', err);
}

/**
 * Holt die Benutzerdaten eines bestimmten Benutzers aus der Firebase Realtime Database.
 * -------------------------------------------------------------------------------------
 * Diese Funktion ruft die Benutzerdaten eines bestimmten Benutzers aus der Datenbank ab.
 * -------------------------------------------------------------------------------------
 * @param {String} uid Die eindeutige Benutzer-ID.
 * @returns {Object} Die Benutzerdaten des bestimmten Benutzers.
 */
async function findUserById(uid) {
    return await retrievingData('users/' + uid);
}