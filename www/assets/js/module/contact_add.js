import { loadUserIdFromStored, loadElementByPatch } from './modules.js';
import { showContactCards } from './contact_show_cards.js';
import { dnonePersionCard, resetAddContactForm } from './dnone.js';
import { uploadPatchData } from './dataResponse.js';

/**
 * Fügt einen neuen Kontakt zur Kontaktliste hinzu.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, um einen neuen Kontakt hinzuzufügen. Sie überprüft zunächst,
 * ob der Kontakt bereits in der Kontaktliste existiert. Falls der Kontakt nicht vorhanden ist,
 * wird er zur Liste hinzugefügt. Andernfalls wird eine Warnung ausgegeben, dass der Kontakt bereits existiert.
 * ==================================================================================================== 
 * Die Funktion verwendet die Hilfsfunktion `loadElementByPatch()` zum Abrufen der bestehenden Kontakte
 * und `uploadPatchData()` zum Hinzufügen des neuen Kontakts zur Datenbank.
 * ====================================================================================================
 * func loadElementByPatch() - findet man in der './modules.js'
 * ====================================================================================================
 * @async
 * @param {Object} contactData - Die Daten des hinzuzufügenden Kontakts.
 * @param {string} contactData.name - Der Name des neuen Kontakts.
 * @param {string} contactData.email - Die E-Mail-Adresse des neuen Kontakts.
 * @param {string} contactData.tel - Die Telefonnummer des neuen Kontakts.
 * @returns {Promise<void>}
 * ====================================================================================================
 */
export async function addContact(contactData) {
    try {
        const userID = loadUserIdFromStored();
        const contactCards = await loadElementByPatch(`users/${userID}`);
        if (isContactExists(contactCards, contactData.email)) return console.warn('Benutzer existiert bereits!'); // [!] Ändern zu Benutzer-Feedback
        await uploadPatchData(`users/${userID}/contacts/`, contactData);
        await updateContactDisplay();
    } catch (err) {
        console.error(`Es ist ein schwerwiegender Fehler aufgetreten! ${err}`);
    };
};

/**
 * Überprüft, ob ein Kontakt mit der angegebenen E-Mail bereits existiert.
 * ====================================================================================================
 * Diese Funktion durchsucht die Liste der bestehenden Kontakte und prüft,
 * ob ein Kontakt mit der angegebenen E-Mail-Adresse bereits vorhanden ist.
 * ====================================================================================================
 * @param {Array} contactCards - Die Liste der bestehenden Kontakte.
 * @param {string} email - Die E-Mail-Adresse des zu überprüfenden Kontakts.
 * @returns {boolean} - Gibt `true` zurück, wenn der Kontakt existiert, andernfalls `false`.
 * ====================================================================================================
 */
function isContactExists(contactCards, email) {
    return contactCards.some(contact => contact.email === email);
};

/**
 * Aktualisiert die Anzeige der Kontaktkarten.
 * ====================================================================================================
 * Diese Funktion aktualisiert die Anzeige, um die Änderungen bei den Kontakten widerzuspiegeln 
 * und versteckt bei Bedarf die Kontaktkarte.
 * ====================================================================================================
 * func showContactCards()      - zu finden in './showContactCards.js'
 * func resetAddContactForm()   - zu finden in './dnone.js'
 * func dnonePersionCard()      - zu finden in './dnone.js'
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Anzeige erfolgreich aktualisiert wurde.
 * @throws {Error} Wenn ein Fehler bei der Aktualisierung der Anzeige auftritt.
 * ====================================================================================================
 */
async function updateContactDisplay() {
    await showContactCards();
    resetAddContactForm();
    dnonePersionCard();
    console.warn('Benutzer erfolgreich hinzugefügt!'); // [!] Ändern zu Benutzer-Feedback
};