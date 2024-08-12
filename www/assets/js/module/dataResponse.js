const baseURL = "https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Überprüft, ob ein Benutzer bereits in der Datenbank existiert.
 * ====================================================================================================
 * Diese Funktion ruft die Benutzerdaten aus der Datenbank ab und sucht nach einem 
 * Benutzer, der mit den übergebenen Daten übereinstimmt.
 * ====================================================================================================
 * @async
 * @param {Object} find Ein Objekt mit den Benutzerdaten, nach denen gesucht werden soll.
 * @returns {Object} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 * ====================================================================================================
 */
export async function loadUserData(find) {
    try {
        const users = await retrievingData('');
        const user = await findUser(users[0], find);
        return user;
    } catch (err) { }
}

/**
 * Sucht nach einem Benutzer in der Liste der Benutzer.
 * ====================================================================================================
 * Diese Funktion durchsucht die Liste der Benutzer nach einem Benutzer, der mit den 
 * übergebenen Daten übereinstimmt.
 * ====================================================================================================
 * @async
 * @param {Array} users Die Liste der Benutzer.
 * @param {Object} find Ein Objekt mit den Benutzerdaten, nach denen gesucht werden soll.
 * @returns {Object} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 * ====================================================================================================
 */
async function findUser(users, find) {
    return Object.entries(users).find(([id, user]) => user.email === find.email && user.password === find.pw);
}

/**
 * Holt die Benutzerdaten eines bestimmten Benutzers aus der Firebase Realtime Database.
 * ====================================================================================================
 * Diese Funktion ruft die Benutzerdaten eines bestimmten Benutzers aus der Datenbank ab.
 * ====================================================================================================
 * @async 
 * @param {String} uid Die eindeutige Benutzer-ID.
 * @returns {Object} Die Benutzerdaten des bestimmten Benutzers.
 * ====================================================================================================
 */
export async function findUserById(uid) {
    return await retrievingData('users/' + uid);
}










// dataResponse neu 
// ||
// ||
// \/







/**
 * Holt die Benutzerdaten aus der Firebase Realtime Database.
 * ====================================================================================================
 * Diese Funktion ruft die Benutzerdaten aus der Datenbank ab und gibt sie als Liste 
 * zurück.
 * ====================================================================================================
 * @async
 * @returns {Array} Die Liste der Benutzer.
 * ====================================================================================================
 */
export async function retrievingData(patch) {
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
 * Löscht Daten aus der Firebase Realtime Database.
 * ====================================================================================================
 * Diese Funktion sendet eine DELETE-Anfrage an die Datenbank, um die Ressource
 * am angegebenen Pfad zu entfernen.
 * ====================================================================================================
 * @async
 * @param {string} patch Der Pfad zur Ressource, die gelöscht werden soll.
 * ====================================================================================================
 */
export async function deleteData(patch) {
    try {
        const deleteResponse = await fetch(baseURL + patch + '.json', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await checkAnswer(deleteResponse);
    } catch (err) {
        handleError(err);
    }
}

/**
 * Aktualisiert Daten in der Firebase Realtime Database.
 * ====================================================================================================
 * Diese Funktion sendet eine PUT-Anfrage an die Datenbank, um vorhandene Daten
 * zu aktualisieren. Der angegebene Pfad und die Daten werden verwendet, um die
 * Zielressource zu bestimmen und deren Inhalte zu überschreiben.
 * ====================================================================================================
 * @async
 * @param {string} patch Der Pfad zur Ressource, die aktualisiert werden soll.
 * @param {Object} data Ein Objekt mit den Daten, die die vorhandenen Inhalte überschreiben sollen.
 * ====================================================================================================
 */
export async function updateData(patch, data) {
    try {
        const updateResponse = await fetch(baseURL + patch + '.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        await checkAnswer(updateResponse);
    } catch (err) {
        handleError(err);
    }
}

/**
 * Lädt Patch-Daten auf den Server hoch.
 * ====================================================================================================
 * Diese Funktion sendet die übergebenen Daten an den Server und speichert sie 
 * unter dem angegebenen Patch.
 * ====================================================================================================
 * @async
 * @param {String} patch Der Pfad, unter dem die Daten gespeichert werden sollen.
 * @param {Object} data Die zu speichernden Daten.
 * ====================================================================================================
 */
export async function uploadPatchData(patch, data) {
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
 * ====================================================================================================
 * Diese Funktion wirft einen Fehler, wenn die Antwort nicht erfolgreich war.
 * ====================================================================================================
 * @async
 * @param {Response} response Die Antwort auf die Anfrage.
 * ====================================================================================================
 */
async function checkAnswer(response) {
    if (!response.ok) {
        throw new Error(`[HTTP] Status: ${response.status} - ${response.statusText}`);
    }
}

/**
 * Behandelt einen Fehler, der bei der Ausführung einer Funktion aufgetreten ist.
 * ====================================================================================================
 * Diese Funktion gibt den Fehler auf der Konsole aus.
 * ====================================================================================================
 * @param {Error} err Der aufgetretene Fehler.
 * ====================================================================================================
 */
function handleError(err) {
    throw err;
}