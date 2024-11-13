import { dnonePersonCard } from '../dnone.js';
import { showContactCards } from './showCards.js';
import { loadUserIdFromStored, getContactId, deleteElementById } from '../modules.js';
import { hideMobileContactCard } from './showCardDetails.js';


/**
 * Deletes a contact by email.
 * @param {string} email - The email of the contact to delete.
 * @returns {Promise<void>}
 */
export async function deleteContact(email) {
    try {
        const userID = loadUserIdFromStored();
        const contactId = await getContactId(userID, email, 'contactCard');
        await removeContact(contactId);
        await updateContactDisplay();
        hideMobileContactCard();
    } catch (err) {
        console.error(`Error deleting contact: ${err}`);
    };
};


/**
 * Removes a contact using userID and contactId.
 * @param {string} contactId - The ID of the contact to remove.
 * @returns {Promise<void>}
 */
async function removeContact(contactId) {    
    await deleteElementById(`contacts/${contactId[0]}`);
};


/**
 * Updates the display of contacts.
 * @returns {Promise<void>}
 */
async function updateContactDisplay() {
    await showContactCards();
    dnonePersonCard();
};