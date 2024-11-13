import { loadUserIdFromStored } from '../modules.js';
import { editContactId } from './showEditPopup.js';
import { showContactCards } from './showCards.js';
import { dnonePersonCard, resetEditContactForm } from '../dnone.js';
import { updateData } from '../dataResponse.js';
import { hideMobileContactCard } from './showCardDetails.js';


/**
 * Edits a contact using the provided form data.
 * @param {Object} formData - The data to update the contact with.
 * @returns {Promise<void>}
 */
export async function editContact(formData) {
    try {
        const userId = loadUserIdFromStored();
        if (formData.tel === '') {
            await updateUserDetails(userId, formData);
        } else {
            await updateContactDetails(formData);
        };
        await updateContactDisplay();
        hideMobileContactCard();
    } catch (err) {
        console.error(`An error occurred while editing the contact: ${err}`);
    };
};


/**
 * Updates the user details (name and email).
 * @param {string} userId - The ID of the user.
 * @param {Object} formData - The data to update the user with.
 * @returns {Promise<void>}
 */
async function updateUserDetails(userId, formData) {
    await updateData(`users/${userId}/name`, formData.name);
    await updateData(`users/${userId}/email`, formData.email);
    window.location.reload();
};


/**
 * Updates the contact details.
 * @param {Object} formData - The data to update the contact with.
 * @returns {Promise<void>}
 */
async function updateContactDetails(formData) {
    await updateData(`contacts/${editContactId}`, formData);
};


/**
 * Updates the display of contacts after editing.
 * @returns {Promise<void>}
 */
async function updateContactDisplay() {
    await showContactCards();
    resetEditContactForm();
    dnonePersonCard();
};