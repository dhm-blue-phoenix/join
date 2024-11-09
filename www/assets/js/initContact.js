import { showUserCard } from './module/contact/user/showUserCard.js';
import { showUser } from './module/contact/user/showUserDetails.js';
import { showContactCards } from './module/contact/showCards.js';
import { editContact } from './module/contact/editCard.js';
import { addContact } from './module/contact/addCard.js';
import { formTesting } from '../formTesting/testing.js';
import { validateTaskForm } from './module/validate.js';
import { addEventToValidateFields } from './module/validateFields.js';


const idEditPersonShortcut = document.getElementById('editPersonShortcut');
const idFormEditPerson = document.getElementById('editContactForm');
const idInputEditPersonName = document.getElementById('editPersonName');
const idInputEditPersonEmail = document.getElementById('editPersonEmail');
const idInputEditPersonTel = document.getElementById('editPersonTel');
const idFormAddContact = document.getElementById('addContactForm');
const idInputAddPersonName = document.getElementById('addPersonName');
const idInputAddPersonEmail = document.getElementById('addPersonEmail');
const idInputAddPersonTel = document.getElementById('addPersonTel');
const shortcutColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF0",
    "#FFB833",
    "#8E33FF"
];
const fieldsToValidateAdd = [
    { id: 'addPersonName', type: 'name', value: '' },
    { id: 'addPersonEmail', type: 'email', value: '' },
    { id: 'addPersonTel', type: 'tel', value: '' },
];
let fieldsToValidateEdit = [
    { id: 'editPersonName', type: 'name', value: '' },
    { id: 'editPersonEmail', type: 'email', value: '' },
    { id: 'editPersonTel', type: 'tel', value: '' }
];
const testing = false;


document.addEventListener('DOMContentLoaded', async () => {
    showUserCard();
    showContactCards();
    addEventFromAddContact();
    addEventFromEditContact();
    testing && formTesting();
});


/**
 * Adds event listeners for the add contact form.
 */
const addEventFromAddContact = () => {
    addEventToValidateFields('contactsAdd');
    idFormAddContact.removeEventListener('submit', initAddForm);
    idFormAddContact.addEventListener('submit', initAddForm);
};


/**
 * Adds event listeners for the edit contact form.
 */
const addEventFromEditContact = () => {
    idFormEditPerson.removeEventListener('submit', initEditForm);
    idFormEditPerson.addEventListener('submit', initEditForm);
};


/**
 * Initializes the add contact form submission.
 * @param {Event} event - The form submission event.
 */
function initAddForm(event) {
    event.preventDefault();
    const formData = loadDataAddForm(
        idInputAddPersonName.value,
        idInputAddPersonEmail.value,
        idInputAddPersonTel.value
    );
    loadDataToValidateFields('add', formData);
    if (validateTaskForm(fieldsToValidateAdd)) {
        if (testing) return console.warn('Contact wurde erfolgreich erstellt!');
        addContact(formData);
    };
};


/**
 * Loads data from the add contact form.
 * @param {string} name - The name of the person.
 * @param {string} email - The email of the person.
 * @param {string} tel - The telephone number of the person.
 * @returns {Object} The contact data.
 */
const loadDataAddForm = (name, email, tel) => {
    const randomNumber = Math.floor(Math.random() * shortcutColors.length);
    const contactData = {
        shortcutBackColor: shortcutColors[randomNumber],
        name: name,
        email: email,
        tel: tel
    };
    return contactData;
};


/**
 * Initializes the edit contact form submission.
 * @param {Event} event - The form submission event.
 */
const initEditForm = (event) => {
    event.preventDefault();
    addEventToValidateFields('contactsAdd');
    const formData = loadDataFromEditForm(
        idInputEditPersonName.value,
        idInputEditPersonEmail.value,
        idInputEditPersonTel.value
    );
    isUser();
    loadDataToValidateFields('edit', formData);
    if (validateTaskForm(fieldsToValidateEdit)) {
        if (testing) return console.warn('Contact wurde erfolgreich geendert!');
        editContact(formData);
    };
};


/**
 * Modifies `fieldsToValidateEdit` based on the `showUser` flag.
 * If `showUser` is true, it removes two fields starting from index 2 in `fieldsToValidateEdit`.
 * If `showUser` is false and the third field is missing, it adds a field with `id`, `type`, and `value` properties.
 * 
 * @function isUser
 */
const isUser = () => {
    if (!fieldsToValidateEdit[2]) fieldsToValidateEdit.push({ id: 'editPersonTel', type: 'tel', value: '' });
    if (showUser) fieldsToValidateEdit.splice(2, 2);
};


/**
 * Loads data into specific fields for validation based on the popup type.
 * Selects the fields to validate (either "add" or "edit") and assigns values 
 * from `formData` to each field based on its type.
 * 
 * @function loadDataToValidateFields
 * @param {string} popup - The type of popup, either "add" or "edit".
 * @param {Object} formData - An object containing field values, with keys matching field types.
 */
const loadDataToValidateFields = (popup, formData) => {
    const fieldVars = { "add": fieldsToValidateAdd, "edit": fieldsToValidateEdit };
    fieldVars[popup].forEach(field => {
        field.value = formData[field.type];
    });
};


/**
 * Loads data from the edit contact form.
 * @param {string} name - The name of the person.
 * @param {string} email - The email of the person.
 * @param {string} tel - The telephone number of the person.
 * @returns {Object} The form data.
 */
const loadDataFromEditForm = (name, email, tel) => {
    const style = window.getComputedStyle(idEditPersonShortcut);
    const formData = {
        shortcutBackColor: style.backgroundColor,
        name: name,
        email: email,
        tel: tel
    };
    return formData;
};

export { fieldsToValidateEdit };