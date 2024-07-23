/**
 * Die Basis-URL für die Firebase Realtime Database.
 */
const baseURL = 'https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app/users.json';

/**
 * Überprüft, ob ein Benutzer bereits in der Datenbank existiert.
 * --------------------------------------------------------------
 * Diese Funktion ruft die Benutzerdaten aus der Datenbank ab und sucht nach einem
 * Benutzer, der mit den übergebenen Daten übereinstimmt.
 * --------------------------------------------------------------
 * @param {Object} find Ein Objekt mit den Benutzerdaten, nach denen gesucht werden soll.
 * @returns {Object} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 */
async function dataResponse(find) {
    const users = await retrievingData();
    const user = await findUser(users, find);
    return user;
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
    return users.find(user => user.email === find.email && user.password === find.pw);
}

/**
 * Holt die Benutzerdaten aus der Firebase Realtime Database.
 * ----------------------------------------------------------
 * Diese Funktion ruft die Benutzerdaten aus der Datenbank ab und gibt sie als Liste
 * zurück.
 * ----------------------------------------------------------
 * @returns {Array} Die Liste der Benutzer.
 */
async function retrievingData() {
    try {
        const response = await fetch(baseURL);
        await checkAnswer(response);
        const data = await response.json();
        return Object.values(data);
    } catch (err) {
        handleError(err);
    }
}

/**
 * Fügt einen neuen Benutzer zur Firebase Realtime Database hinzu.
 * ---------------------------------------------------------------
 * Diese Funktion sendet eine POST-Anfrage an die Datenbank, um einen neuen Benutzer
 * hinzuzufügen.
 * ---------------------------------------------------------------
 * @param {Object} data Ein Objekt mit den Benutzerdaten, die hinzugefügt werden sollen.
 */
async function dataUpload(data) {
    try {
        const patchResponse = await fetch(baseURL, {
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
    console.error('Es ist ein Problem bei der Funktion retrievingData() aufgetreten:\n', err);
}