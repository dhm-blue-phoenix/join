import { dnonePersionCard } from './dnone.js';
import { showContactCards } from './showContactCards.js';
import { loadUserIdFromStored, getContactId, deletElementById } from './modules.js';
import { hideMobileContactCard } from './showContactDetails.js';

/**
 * Löscht den Kontakt anhand der angegebenen E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion lädt die ID des Kontakts basierend auf der E-Mail-Adresse, löscht dann den Kontakt und 
 * aktualisiert die Ansicht, um die Änderungen widerzuspiegeln.
 * ====================================================================================================
 * func loadUserIdFromStored() - findet man in der './modules.js'
 * func getContactId() - findet man in der './modules.js'
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
        hideMobileContactCard();
    } catch (err) {
        console.error(`Fehler beim Löschen des Kontakts: ${err}`);
    };
};

/**
 * Entfernt den Kontakt aus der Datenbank.
 * ====================================================================================================
 * Diese Funktion löscht den Kontakt anhand der angegebenen Benutzer- und Kontakt-ID aus der Datenbank.
 * ====================================================================================================
 * func deletElementById() - findet man in der './modules.js'
 * ====================================================================================================
 * @async
 * @param {string} userID Die ID des Benutzers.
 * @param {string} contactId Die ID des zu löschenden Kontakts.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn der Kontakt erfolgreich gelöscht wurde.
 * @throws {Error} Wenn ein Fehler beim Löschen des Kontakts auftritt.
 * ====================================================================================================
 */
async function removeContact(userID, contactId) {
    await deletElementById(`users/${userID}/contacts/${contactId[0]}`);
};

/**
 * Aktualisiert die Anzeige der Kontaktkarten.
 * ====================================================================================================
 * Diese Funktion aktualisiert die Anzeige, um die gelöschten Kontakte zu reflektieren,
 * und versteckt die Kontaktkarte bei Bedarf.
 * ====================================================================================================
 * func showContactCards() - findet man in der './showContactCards.js'
 * func dnonePersionCard() - findet man in der './dnone.js'
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Anzeige erfolgreich aktualisiert wurde.
 * @throws {Error} Wenn ein Fehler bei der Anzeigeaktualisierung auftritt.
 * ====================================================================================================
 */
async function updateContactDisplay() {
    await showContactCards();
    dnonePersionCard();
};