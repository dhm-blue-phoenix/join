import { loadUserIdFromStored } from '../modules.js';
import { getContactId } from '../modules.js';
import { extractInitials } from '../modules.js';
import { retrievingData } from '../dataResponse.js';


const idEditPersonShortcut = document.getElementById('editPersonShortcut');
const idInputEditPersonName = document.getElementById('editPersonName');
const idInputEditPersonEmail = document.getElementById('editPersonEmail');
const idInputEditPersonTel = document.getElementById('editPersonTel');
const idEditPopupAnimation = document.getElementById('editcontactpopupanimation');


export let editContactId;
let editUser = false;


/**
 * Displays the contact edit popup and loads user data if applicable.
 *
 * @param {string} email - The email of the contact to edit or 'user' for the current user.
 * @returns {Promise<void>}
 */
export async function showContactEditPopup(email) {
    try {
        showPopup();
        const userID = loadUserIdFromStored();
        if (email === 'user') {
            editUser = true;
            const user = await retrievingData(`users/${userID}/`);
            const userData = {
                shortcutBackColor: user[4],
                name: user[2],
                email: user[1]
            };
            importFromEditFormData(userData);
        } else {
            const contactId = await getContactId(userID, email, 'contactCard');
            importFromEditFormData(contactId[1]);
            editContactId = contactId[0];
        }
    } catch (err) {
        console.error(`Es ist ein Problem beim Öffnen des Edit Popups aufgetreten! ${err}`);
    };
};


/**
 * Shows the edit contact popup.
 */
const showPopup = () => {
    removeClass('editcontactpopup');
    idEditPopupAnimation.classList.remove('hide');
    idEditPopupAnimation.classList.add('show');
};


/**
 * Removes a class from the element with the specified ID.
 *
 * @param {string} id - The ID of the element.
 */
const removeClass = (id) => {
    document.getElementById(id).classList.remove('d-nonepopup');
};


/**
 * Imports data into the edit form fields.
 *
 * @param {Object} data - The data object containing contact information.
 * @param {string} data.shortcutBackColor - The background color for the shortcut.
 * @param {string} data.name - The name of the contact.
 * @param {string} data.email - The email of the contact.
 * @param {string} [data.tel] - The phone number of the contact (optional).
 */
const importFromEditFormData = (data) => {
    idEditPersonShortcut.textContent = extractInitials(data.name);
    idEditPersonShortcut.style.backgroundColor = data.shortcutBackColor;
    idInputEditPersonName.value = data.name;
    idInputEditPersonEmail.value = data.email;
    if (editUser) {
        idInputEditPersonTel.disabled = true;
        idInputEditPersonTel.style.display = 'none';
        idInputEditPersonTel.value = null;
        editUser = false;
        return;
    };
    idInputEditPersonTel.disabled = false;
    idInputEditPersonTel.style.display = 'block';
    idInputEditPersonTel.value = data.tel;
};