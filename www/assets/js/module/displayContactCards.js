import { showContactDetails } from './showContactDetails.js';
import { loadUserIdFromStored } from './loadUserIdFromStored.js';

const CLASS_Contactcards = document.querySelector('.Contactcards');

let contacts;
let userID;


export async function displayContactCards() {
    await fetchAndPrepareContacts();
    renderContactCardsList();
}


async function fetchAndPrepareContacts() {
    try {
        contacts = {};
        userID = loadUserIdFromStored();
        const tempContacts = await lodeContactsCard(`users/${userID}/`);
        organizeContactsByLetter(tempContacts);
    } catch (err) {
        console.error(`Es ist ein Problem beim laden der Contakte aufgetreten: ${err}`);
    }
}


function organizeContactsByLetter(data) {
    const sortedContacts = data.sort((a, b) => a.name.localeCompare(b.name));
    sortedContacts.forEach((contact) => {
        const firstLetter = contact.name.charAt(0).toLowerCase();
        if (!contacts[firstLetter]) {
            contacts[firstLetter] = [];
        }
        contacts[firstLetter].push(contact);
    });
}


function renderContactCardsList() {
    const carts = CLASS_Contactcards;
    carts.innerHTML = '';
    Object.keys(contacts).forEach(key => {
        carts.innerHTML += generateCardHeadline(key);
        contacts[key].forEach((contact, cardId) => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('cardcontent');
            contactCard.innerHTML = createContactCard(key, cardId, contact.name, contact.email, contact.tel, contact.shortcutBackColor);
            carts.appendChild(contactCard);
        });
    });

    // Füge Event-Listener für jede Karte hinzu
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            const target = event.currentTarget; // `currentTarget` ist die Karte, auf die geklickt wurde
            const key = target.getAttribute('data-key');
            const name = target.getAttribute('data-name');
            const email = target.getAttribute('data-email');
            const tel = target.getAttribute('data-tel');
            const shortcutBackColor = target.getAttribute('data-shortcut-color');

            showContactDetails(key, name, email, tel, shortcutBackColor);
        });
    });
}

// FunktionsBeschreibungFehlt
const generateCardHeadline = (letter) => `
    <div class="letter">${letter.toUpperCase()}</div>
    <div class="ContactcardsTrennline"></div>
`;


const createContactCard = (key, id, name, email, tel, shortcutBackColor) => `
    <div class="card" id="${key.toLowerCase() + id}" data-key="${key.toLowerCase() + id}" data-name="${name}" data-email="${email}" data-tel="${tel}" data-shortcut-color="${shortcutBackColor}">
        <div id="nameShortcut" style="background-color: ${shortcutBackColor}">${name.split(' ').map(namePart => namePart[0]).join('').toUpperCase()}</div>
        <div class="namemail">
            <p>${name}</p>
            <a href="#Mail">${email}</a>
        </div>
    </div>
`;