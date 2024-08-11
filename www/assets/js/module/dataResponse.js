/**
 * Lädt die ID eines Kontakts basierend auf seiner E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion wird verwendet, um die ID eines Kontakts für weitere Verarbeitung zu laden.
 * ====================================================================================================
 * @async
 * @param {string} patch - Der Pfad zum Abrufen der Daten.
 * @param {string} email - Die E-Mail-Adresse des Kontakts.
 * @returns {string} Die ID des Kontakts.
 * ====================================================================================================
 */
export async function loadContactsId(patch, email) {
    const data = await retrievingData(patch);
    const contactId = await findContactId(data[0], email);
    return contactId;
}

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
    throw new Error(`Es ist ein Problem aufgetreten: ${err}`);
}

/**
 * Findet die ID eines Kontakts basierend auf seiner E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion wird verwendet, um die ID eines Kontakts in den Kontaktdaten zu suchen.
 * ====================================================================================================
 * @async
 * @param {object} contacts - Ein Objekt mit Kontaktdaten.
 * @param {string} findEmail - Die E-Mail-Adresse des Kontakts.
 * @returns {array} Ein Array mit der ID des Kontakts.
 * ====================================================================================================
 */
async function findContactId(contacts, findEmail) {
    return Object.entries(contacts).find(([id, contact]) => contact.email === findEmail);
}