import { dnonePersionCard } from './dnonePersionCard.js';
import { loadUserIdFromStored } from './loadUserIdFromStored.js';
import { displayContactCards } from './displayContactCards.js';

/**
 * Löscht den Kontakt anhand der angegebenen E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion lädt die ID des Kontakts basierend auf der E-Mail-Adresse, löscht dann den Kontakt und 
 * aktualisiert die Ansicht, um die Änderungen widerzuspiegeln.
 * ====================================================================================================
 * func loadUserIdFromStored() - findet man in der './loadUserIdFromStored.js'
 * ====================================================================================================
 * @async
 * @param {string} email Die E-Mail-Adresse des Kontakts, der gelöscht werden soll.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn der Kontakt erfolgreich gelöscht wurde.
 * @throws {Error} Wenn ein Fehler beim Löschen des Kontakts auftritt.
 * ====================================================================================================
 */
export async function deleteContact(email) {
    try {
        const userID = loadUserIdFromStored();
        const contactId = await getContactId(userID, email);
        await removeContact(userID, contactId);
        await updateContactDisplay();
    } catch (err) {
        console.error(`Fehler beim Löschen des Kontakts: ${err}`);
    }
}

/**
 * Lädt die Kontakt-ID basierend auf der E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion ruft die Kontakt-ID für den angegebenen Benutzer ab, indem sie die E-Mail-Adresse nutzt.
 * ====================================================================================================
 * func loadContactsId() - findet man in der './dataResponse.js'
 * ====================================================================================================
 * @async
 * @param {string} userID Die ID des Benutzers, zu dem der Kontakt gehört.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {Promise<string>} Die ID des Kontakts.
 * @throws {Error} Wenn ein Fehler beim Laden der Kontakt-ID auftritt.
 * ====================================================================================================
 */
async function getContactId(userID, email) {
    return loadContactsId(`users/${userID}/`, email);
}

/**
 * Entfernt den Kontakt aus der Datenbank.
 * ====================================================================================================
 * Diese Funktion löscht den Kontakt anhand der angegebenen Benutzer- und Kontakt-ID aus der Datenbank.
 * ====================================================================================================
 * func deletContactById() - findet man in der './dataResponse.js'
 * ====================================================================================================
 * @async
 * @param {string} userID Die ID des Benutzers.
 * @param {string} contactId Die ID des zu löschenden Kontakts.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn der Kontakt erfolgreich gelöscht wurde.
 * @throws {Error} Wenn ein Fehler beim Löschen des Kontakts auftritt.
 * ====================================================================================================
 */
async function removeContact(userID, contactId) {
    await deletContactById(`users/${userID}/contacts/${contactId[0]}`);
}

/**
 * Aktualisiert die Anzeige der Kontaktkarten.
 * ====================================================================================================
 * Diese Funktion aktualisiert die Anzeige, um die gelöschten Kontakte zu reflektieren,
 * und versteckt die Kontaktkarte bei Bedarf.
 * ====================================================================================================
 * func displayContactCards() - findet man in der './displayContactCards.js'
 * func dnonePersionCard() - findet man in der './dnonePersionCard.js'
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Anzeige erfolgreich aktualisiert wurde.
 * @throws {Error} Wenn ein Fehler bei der Anzeigeaktualisierung auftritt.
 * ====================================================================================================
 */
async function updateContactDisplay() {
    await displayContactCards();
    dnonePersionCard();
}