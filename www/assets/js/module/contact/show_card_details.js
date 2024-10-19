import { extractInitials } from '../modules.js';
import { deleteContact } from './delete_card.js';
import { showContactEditPopup } from './show_editPopup.js';


const idBtnEditDelete = document.getElementById('editdeletcontact');
const idContactCard = document.getElementById('showContactcard');
const idPersonShortcut = document.getElementById('personShortcut');
const idPersonName = document.getElementById('personName');
const idPersonEmail = document.getElementById('personEmail');
const idPersonTel = document.getElementById('personTel');
const idDelContactBtn = document.getElementById('delContactBtn');
const idDnoneInfoHeadline = document.getElementById('dnoneInfoHeadline');
const idPhone = document.getElementById('phone');
const btnId = [
    'delContactBtn',
    'editContactBtn',
    'delContactBtnMobile',
    'editContactBtnMobile'
];
const btnFunc = { delete: deleteContact, edit: showContactEditPopup };
const classBtnHideCardArrow = document.querySelector('.hidecontactcardarrow');
const classDnone = document.querySelectorAll('.d-none');
const screenWidth = window.innerWidth;


let userDetails = false;
let lastCard;


/**
 * Shows the contact details in the UI.
 *
 * @param {string} cardId - The ID of the card to show.
 * @param {string} personName - The name of the person.
 * @param {string} personEmail - The email of the person.
 * @param {string} personTel - The phone number of the person.
 * @param {string} shortcutBackColor - The background color for the initials shortcut.
 */
export function showContactDetails(cardId, personName, personEmail, personTel, shortcutBackColor) {
    cardId === 'user' ? userConfig() : contactConfig();
    const card = document.getElementById(cardId);
    if (!card) throw new Error('Element with ID ' + cardId + ' not found.');
    setCardActive(classDnone, card);
    updateContactDetails(personName, personEmail, personTel, shortcutBackColor);
    setBtnAttribute(personEmail);
    addEventFromBtn();
    deselectPreviousCard(card);
    showMobileContactCard();
}


/**
 * Configures the UI for user details.
 */
const userConfig = () => {
    userDetails = true;
    idDelContactBtn.style.display = 'none';
    idDnoneInfoHeadline.textContent = 'User Information';
    idPhone.style.display = 'none';
    idPersonTel.style.display = 'none';
};


/**
 * Configures the UI for contact details.
 */
const contactConfig = () => {
    userDetails = false;
    idDelContactBtn.style.display = 'flex';
    idDnoneInfoHeadline.textContent = 'Contact Information';
    idPhone.style.display = 'block';
    idPersonTel.style.display = 'block';
};


/**
 * Hides the contact card on page load.
 */
window.addEventListener('load', () => {
    const contactCard = document.getElementById('showContactcard');
    contactCard.style.display = 'none';
});


/**
 * Shows the mobile contact card if the screen width is small.
 */
const showMobileContactCard = () => {
    if (screenWidth <= 1300) {
        idContactCard.style.display = 'block';
        idContactCard.style.animation = 'slideIn 0.3s forwards';
        idBtnEditDelete.style.animation = 'slideIn 0.3s forwards';
        addEventFromHideCardArrow();
    }
};


/**
 * Hides the mobile contact card.
 */
export const hideMobileContactCard = () => {
    if (screenWidth <= 1300) {
        idBtnEditDelete.style.animation = 'slideOut 0.3s forwards';
        idContactCard.style.animation = 'slideOut 0.3s forwards';
        deselectPreviousCard(lastCard);
    };
};


/**
 * Adds click event listeners to the hide card arrow button.
 */
const addEventFromHideCardArrow = () => {
    if (classBtnHideCardArrow) {
        classBtnHideCardArrow.removeEventListener('click', hideMobileContactCard);
        classBtnHideCardArrow.addEventListener('click', hideMobileContactCard);
    };
};


/**
 * Activates the specified card and removes the hidden class from elements.
 *
 * @param {NodeList} dnone - The elements with the d-none class.
 * @param {HTMLElement} card - The card element to activate.
 */
const setCardActive = (dnone, card) => {
    dnone.forEach(element => { element.classList.remove('d-none'); });
    card.classList.add('cardactive');
    card.classList.remove('card');
    card.style.pointerEvents = "none";
};


/**
 * Updates the contact details displayed in the UI.
 *
 * @param {string} name - The name of the person.
 * @param {string} email - The email of the person.
 * @param {string} tel - The phone number of the person.
 * @param {string} shortcutBackColor - The background color for the initials shortcut.
 */
const updateContactDetails = (name, email, tel, shortcutBackColor) => {
    const initials = extractInitials(name);
    idPersonShortcut.textContent = initials;
    idPersonShortcut.style.backgroundColor = shortcutBackColor;
    idPersonName.textContent = name;
    idPersonEmail.textContent = email;
    idPersonTel.textContent = tel;
};


/**
 * Sets the data-email attribute for buttons.
 *
 * @param {string} email - The email to set as the data-email attribute.
 */
const setBtnAttribute = (email) => {
    btnId.forEach((id) => document.getElementById(id).setAttribute('data-email', email));
};


/**
 * Adds click event listeners to buttons.
 */
const addEventFromBtn = () => {
    btnId.forEach((id) => {
        const element = document.getElementById(id);
        element.removeEventListener('click', handleButtonClick);
        element.addEventListener('click', handleButtonClick);
    });
};


/**
 * Handles button click events.
 *
 * @param {MouseEvent} event - The click event.
 */
const handleButtonClick = (event) => {
    const target = event.currentTarget;
    if (userDetails) return btnFunc['edit']('user');
    const email = target.getAttribute('data-email');
    const action = target.id.includes('del') ? 'delete' : 'edit';
    btnFunc[action](email);
};


/**
 * Deselects the previously selected card.
 *
 * @param {HTMLElement} card - The card element to deselect.
 */
const deselectPreviousCard = (card) => {
    if (lastCard !== undefined) {
        lastCard.classList.remove('cardactive');
        lastCard.classList.add('card');
        lastCard.style.pointerEvents = "";
    }
    lastCard = card;
};