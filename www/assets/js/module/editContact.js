import { loadUserIdFromStored } from './loadUserIdFromStored.js';
import { editContactId } from './showContactEditPopup.js';
import { showContactCards } from './showContactCards.js';
import { dnonePersionCard, resetEditContactForm } from './dnone.js';

/**
 * Bearbeitet einen bestehenden Kontakt mit den neuen Formulardaten.
 * ====================================================================================================
 * Diese Funktion wird ausgelöst, wenn das Bearbeitungsformular abgeschickt wird.
 * Sie lädt die neuen Formulardaten, aktualisiert den Kontakt in der Datenbank
 * und initialisiert die Kontaktkarte neu.
 * ====================================================================================================
 * func updateData()            - findet man in der 'dataResponse.js'
 * func loadUserIdFromStored()  - findet man in der './loadUserIdFromStored.js'
 * func editContactId()         - findet man in der './showContactEditPopup.js'
 * func showContactCards()      - findet man in der './showContactCards.js'
 * func dnonePersionCard()      - findet man in der './dnone.js'
 * func resetEditContactForm()  - findet man in der './dnone.js'
 * ====================================================================================================
 * @async
 * @param {Event} event Das Event-Objekt, das durch das Abschicken des Formulars ausgelöst wird.
 * ====================================================================================================
 */
export async function editContact(formData) {
    try {
        const userID = loadUserIdFromStored();
        await updateData(`users/${userID}/contacts/${editContactId}`, formData);
        showContactCards();
        resetEditContactForm();
        dnonePersionCard();
    } catch (err) {
        console.error(`Es ist ein Problem beim Bearbeiten des Kontakts aufgetreten! ${err}`);
    }
}

