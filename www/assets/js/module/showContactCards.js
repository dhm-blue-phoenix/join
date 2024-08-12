import { showContactDetails } from './showContactDetails.js';
import { loadUserIdFromStored, loadElementByPatch } from './modules.js';

const CLASS_Contactcards = document.querySelector('.Contactcards');

let contacts;
let userID;

/**
 * Zeigt die Kontaktkarten im Benutzerinterface an.
 * ====================================================================================================
 * Diese Funktion lädt die Kontaktdaten des Benutzers, organisiert sie nach dem Anfangsbuchstaben und 
 * zeigt sie in einer Liste von Kontaktkarten an.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
export async function showContactCards() {
    await fetchContacts();
    displaySortedContacts();
    console.log('Contacts:', contacts);
}

/**
 * Lädt die Kontaktdaten des Benutzers und organisiert sie.
 * ====================================================================================================
 * Diese Funktion ruft die Kontaktdaten von einem Remote-Server ab und organisiert sie 
 * nach Anfangsbuchstaben. Bei einem Fehler wird eine Fehlermeldung in die Konsole ausgegeben.
 * ====================================================================================================
 * func loadUserIdFromStored() - findet man in der './modules.js'
 * func loadElementByPatch() - findet man in der './modules.js'
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
async function fetchContacts() {
    try {
        contacts = {};        
        userID = loadUserIdFromStored();
        const tempContacts = await loadElementByPatch(`users/${userID}/`);
        organizeContacts(tempContacts);
    } catch (err) {
        console.error(`Es ist ein Problem beim Laden der Kontakte aufgetreten: ${err}`);
    }
}

/**
 * Organisiert die Kontaktdaten nach dem Anfangsbuchstaben des Namens.
 * ====================================================================================================
 * Diese Funktion sortiert die Kontaktdaten alphabetisch nach dem Namen und speichert sie in einem 
 * Objekt, das nach dem Anfangsbuchstaben des Namens strukturiert ist.
 * ====================================================================================================
 * @param {Array<Object>} data Eine Liste von Kontaktdatenobjekten.
 * @param {string} data[].name Der Name des Kontakts.
 * @param {string} data[].email Die E-Mail-Adresse des Kontakts.
 * @param {string} data[].tel Die Telefonnummer des Kontakts.
 * @param {string} data[].shortcutBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * @returns {void}
 * ====================================================================================================
 */
function organizeContacts(data) {
    const sortedContacts = data.sort((a, b) => a.name.localeCompare(b.name));
    sortedContacts.forEach((contact) => {
        const firstLetter = contact.name.charAt(0).toLowerCase();
        if (!contacts[firstLetter]) {
            contacts[firstLetter] = [];
        }
        contacts[firstLetter].push(contact);
    });
}

/**
 * Zeigt die sortierten Kontaktkarten an.
 * ====================================================================================================
 * Diese Funktion erstellt HTML-Elemente für die Kontaktkarten und fügt sie in das DOM ein. 
 * Sie fügt außerdem Event-Listener hinzu, um auf Klickereignisse zu reagieren.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
function displaySortedContacts() {
    const cardsContainer = CLASS_Contactcards;
    cardsContainer.innerHTML = '';
    Object.keys(contacts).forEach(key => {
        cardsContainer.innerHTML += generateCardHeadline(key);
        contacts[key].forEach((contact, cardId) => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('cardcontent');
            contactCard.innerHTML = createContactCard(key, cardId, contact.name, contact.email, contact.tel, contact.shortcutBackColor);
            cardsContainer.appendChild(contactCard);
        });
    });
    attachCardEvents();
}

/**
 * Fügt Klick-Ereignislistener zu den Kontaktkarten hinzu.
 * ====================================================================================================
 * Diese Funktion fügt Event-Listener zu den Kontaktkarten hinzu, um auf Klickereignisse zu reagieren
 * und die Kontaktdetails anzuzeigen.
 * ====================================================================================================
 * func showContactDetails() - findet man in der './showContactDetails.js'
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
function attachCardEvents() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            const target = event.currentTarget;
            const key = target.getAttribute('data-key');
            const name = target.getAttribute('data-name');
            const email = target.getAttribute('data-email');
            const tel = target.getAttribute('data-tel');
            const shortcutBackColor = target.getAttribute('data-shortcut-color');
            showContactDetails(key, name, email, tel, shortcutBackColor);
        });
    });
}

/**
 * Generiert die Überschrift für eine Gruppe von Kontaktkarten.
 * ====================================================================================================
 * Diese Funktion erstellt einen HTML-String, der als Überschrift für eine Gruppe von 
 * Kontaktkarten verwendet wird, basierend auf dem Anfangsbuchstaben der Kontaktnamen.
 * ====================================================================================================
 * @param {string} letter Der Anfangsbuchstabe der Kontaktgruppe.
 * @returns {string} Der HTML-Code für die Überschrift der Kontaktgruppe.
 * ====================================================================================================
 */
const generateCardHeadline = (letter) => `
    <div class="letter">${letter.toUpperCase()}</div>
    <div class="ContactcardsTrennline"></div>
`;

/**
 * Erstellt den HTML-Code für eine einzelne Kontaktkarte.
 * ====================================================================================================
 * Diese Funktion erstellt einen HTML-String, der eine einzelne Kontaktkarte repräsentiert,
 * inklusive aller relevanten Kontaktdaten und des visuellen Layouts.
 * ====================================================================================================
 * @param {string} key Ein eindeutiger Schlüssel, der die Kontaktkarte identifiziert.
 * @param {number} id Eine eindeutige ID für die Kontaktkarte.
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @param {string} tel Die Telefonnummer des Kontakts.
 * @param {string} shortcutBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * @returns {string} Der HTML-Code für die Kontaktkarte.
 * ====================================================================================================
 */
const createContactCard = (key, id, name, email, tel, shortcutBackColor) => `
    <div class="card" id="${key.toLowerCase() + id}" data-key="${key.toLowerCase() + id}" data-name="${name}" data-email="${email}" data-tel="${tel}" data-shortcut-color="${shortcutBackColor}">
        <div id="nameShortcut" style="background-color: ${shortcutBackColor}">${name.split(' ').map(namePart => namePart[0]).join('').toUpperCase()}</div>
        <div class="namemail">
            <p>${name}</p>
            <a href="#Mail">${email}</a>
        </div>
    </div>
`;