import { showUserCard } from './module/contact/user/show_user_card.js';
import { showContactCards } from './module/contact/show_cards.js';
import { editContact } from './module/contact/edit_card.js';
import { addContact } from './module/contact/add_card.js';


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


document.addEventListener('DOMContentLoaded', async () => {
    showUserCard();
    showContactCards();
    addEventFromAddContact();
    addEventFromEditContact();
});


/**
 * Adds event listeners for the add contact form.
 */
const addEventFromAddContact = () => {
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
    addContact(formData);
};


/**
 * Loads data from the add contact form.
 * @param {string} name - The name of the person.
 * @param {string} email - The email of the person.
 * @param {string} tel - The telephone number of the person.
 * @returns {Object} The contact data.
 */
function loadDataAddForm(name, email, tel) {
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
function initEditForm(event) {
    event.preventDefault();
    const formData = loadDataFromEditForm(
        idInputEditPersonName.value,
        idInputEditPersonEmail.value,
        idInputEditPersonTel.value
    );
    editContact(formData);
};


/**
 * Loads data from the edit contact form.
 * @param {string} name - The name of the person.
 * @param {string} email - The email of the person.
 * @param {string} tel - The telephone number of the person.
 * @returns {Object} The form data.
 */
function loadDataFromEditForm(name, email, tel) {
    const style = window.getComputedStyle(idEditPersonShortcut);
    const formData = {
        shortcutBackColor: style.backgroundColor,
        name: name,
        email: email,
        tel: tel
    };
    return formData;
};