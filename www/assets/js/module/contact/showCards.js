import { showContactDetails } from './showCardDetails.js';
import { loadUserIdFromStored, loadElementByPatch } from '../modules.js';
import { generateCardHeadline, createContactCard } from './createCard.js';
import { showUserDetails } from './user/showUserDetails.js';


const classContactCard = document.querySelector('.Contactcards');


export let contacts;
let userID;


/**
 * Fetches contacts data asynchronously.
 */
export async function showContactCards() {
    await fetchContacts();
    createSortedContacts();
};


/**
 * Fetches contacts data from the server.
 */
export async function fetchContacts() {
    try {
        contacts = {};
        userID = loadUserIdFromStored();
        const tempContacts = await loadElementByPatch(`users/${userID}/`, 0);
        organizeContacts(tempContacts);
    } catch (err) {
        console.error(`An error occurred while loading contacts: ${err}`);
    };
};


/**
 * Organizes fetched contacts into an alphabetical dictionary.
 * @param {Array} data - The array of contacts to organize.
 */
function organizeContacts(data) {
    const validContacts = data.filter(contact => contact && contact.name);
    const sortedContacts = validContacts.sort((a, b) => a.name.localeCompare(b.name));
    sortedContacts.forEach((contact) => {
        const firstLetter = contact.name.charAt(0).toLowerCase();
        if (!contacts[firstLetter]) {
            contacts[firstLetter] = [];
        }
        contacts[firstLetter].push(contact);
    });
};


/**
 * Creates sorted contact cards and appends them to the DOM.
 */
function createSortedContacts() {
    const cardsContainer = classContactCard;
    cardsContainer.innerHTML = '';
    Object.keys(contacts).forEach(key => {
        generateCardHeadline(cardsContainer, key);
        contacts[key].forEach((contact, cardId) => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('cardcontent');
            createContactCard(cardsContainer, key, cardId, contact.name, contact.email, contact.tel, contact.shortcutBackColor);
            cardsContainer.appendChild(contactCard);
        });
    });
    attachCardEvents();
};


/**
 * Attaches click event listeners to each contact card.
 */
const attachCardEvents = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeEventListener('click', handleCardClick);
        card.addEventListener('click', handleCardClick);
    });
};


/**
 * Handles click events on contact cards.
 * @param {Event} event - The click event object.
 */
const handleCardClick = (event) => {
    const target = event.currentTarget;
    const key = target.getAttribute('data-key');
    if (key === 'user') return showUserDetails();
    const name = target.getAttribute('data-name');
    const email = target.getAttribute('data-email');
    const tel = target.getAttribute('data-tel');
    const shortcutBackColor = target.getAttribute('data-shortcut-color');
    showContactDetails(key, name, email, tel, shortcutBackColor);
};