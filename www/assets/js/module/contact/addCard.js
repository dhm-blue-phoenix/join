import { loadUserIdFromStored, loadElementByPatch } from '../modules.js';
import { showContactCards } from './showCards.js';
import { dnonePersonCard, resetAddContactForm } from '../dnone.js';
import { uploadPatchData } from '../dataResponse.js';


/**
 * Adds a new contact.
 * @param {Object} contactData - The contact data to add.
 * @returns {Promise<void>}
 */
export async function addContact(contactData) {
    try {
        const userId = loadUserIdFromStored();
        const contactCards = await loadElementByPatch(`users/${userId}`, 0);
        if (isContactExists(contactCards, contactData.email)) return console.warn('Benutzer existiert bereits!'); // [!] Ändern zu Benutzer-Feedback
        await uploadPatchData(`users/${userId}/contacts/`, contactData);
        await updateContactDisplay();
    } catch (err) {
        console.error(`Es ist ein schwerwiegender Fehler aufgetreten! ${err}`);
    };
};


/**
 * Checks if a contact exists by email.
 * @param {Array} contactCards - The list of existing contact cards.
 * @param {string} email - The email to check.
 * @returns {boolean}
 */
function isContactExists(contactCards, email) {
    return contactCards.some(contact => contact.email === email);
};


/**
 * Updates the display of contacts after adding a new one.
 * @returns {Promise<void>}
 */
async function updateContactDisplay() {
    await showContactCards();
    resetAddContactForm();
    dnonePersonCard();
};