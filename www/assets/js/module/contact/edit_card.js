import { loadUserIdFromStored } from '../modules.js';
import { editContactId } from './show_editPopup.js';
import { showContactCards } from './show_cards.js';
import { dnonePersionCard, resetEditContactForm } from '../dnone.js';
import { updateData } from '../dataResponse.js';
import { hideMobileContactCard } from './show_card_details.js';

/**
 * Bearbeitet einen bestehenden Kontakt mit den neuen Formulardaten.
 * ====================================================================================================
 * Diese Funktion wird ausgelöst, wenn das Bearbeitungsformular abgeschickt wird.
 * Sie lädt die neuen Formulardaten, aktualisiert den Kontakt in der Datenbank
 * und aktualisiert die Anzeige der Kontaktkarte.
 * ====================================================================================================
 * func updateData()            - zu finden in './dataResponse.js'
 * func loadUserIdFromStored()  - zu finden in './modules.js'
 * func editContactId()         - zu finden in './showContactEditPopup.js'
 * func showContactCards()      - zu finden in './showContactCards.js'
 * func dnonePersionCard()      - zu finden in './dnone.js'
 * func resetEditContactForm()  - zu finden in './dnone.js'
 * ====================================================================================================
 * @async
 * @param {Event} event Das Event-Objekt, das durch das Abschicken des Formulars ausgelöst wird.
 * ====================================================================================================
 */
export async function editContact(formData) {
    try {
        const userID = loadUserIdFromStored();
        if (formData.tel === '') {
            await updateData(`users/${userID}/name`, formData.name);
            await updateData(`users/${userID}/email`, formData.email);
            window.location.reload();
        } else {
            await updateData(`users/${userID}/contacts/${editContactId}`, formData);
        };
        await updateContactDisplay();
        hideMobileContactCard();
    } catch (err) {
        console.error(`Es ist ein Problem beim Bearbeiten des Kontakts aufgetreten! ${err}`);
    };
};

/**
 * Aktualisiert die Anzeige der Kontaktkarten.
 * ====================================================================================================
 * Diese Funktion aktualisiert die Anzeige, um die Änderungen bei den Kontakten zu reflektieren,
 * und versteckt die Kontaktkarte bei Bedarf.
 * ====================================================================================================
 * func showContactCards()      - zu finden in './showContactCards.js'
 * func resetEditContactForm()  - zu finden in './dnone.js'
 * func dnonePersionCard()      - zu finden in './dnone.js'
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Anzeige erfolgreich aktualisiert wurde.
 * @throws {Error} Wenn ein Fehler bei der Anzeigeaktualisierung auftritt.
 * ====================================================================================================
 */
async function updateContactDisplay() {
    await showContactCards();
    resetEditContactForm();
    dnonePersionCard();
};