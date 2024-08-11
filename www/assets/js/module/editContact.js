import { loadUserIdFromStored } from './loadUserIdFromStored.js';
import { editContactId } from './showContactEditPopup.js';
import { showContactCards } from './showContactCards.js';
import { dnonePersionCard, resetEditContactForm } from './dnone.js';

const ID_editPersionShortcut = document.getElementById('editPersionShortcut');
const ID_editPersionName = document.getElementById('editPersionName');
const ID_editPersionEmail = document.getElementById('editPersionEmail');
const ID_editPersionTel = document.getElementById('editPersionTel');

/**
 * Bearbeitet einen bestehenden Kontakt mit den neuen Formulardaten.
 * ====================================================================================================
 * Diese Funktion wird ausgelöst, wenn das Bearbeitungsformular abgeschickt wird.
 * Sie lädt die neuen Formulardaten, aktualisiert den Kontakt in der Datenbank
 * und initialisiert die Kontaktkarte neu.
 * ====================================================================================================
 * func updateData() - findet man in der dataResponse.js
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

