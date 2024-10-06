import { showContactDetails } from './contact_show_details.js';
import { loadUserIdFromStored, loadElementByPatch } from './modules.js';
import { generateCardHeadline, createContactCard } from './contact_create_card.js';

const CLASS_Contactcards = document.querySelector('.Contactcards');

export let contacts;
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
    createSortedContacts();
};

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
export async function fetchContacts() {
    try {
        contacts = {};
        userID = loadUserIdFromStored();
        const tempContacts = await loadElementByPatch(`users/${userID}/`, 0);
        console.log('debug-fetchContacts/contact-data', tempContacts)
        organizeContacts(tempContacts);
    } catch (err) {
        console.error(`Es ist ein Problem beim Laden der Kontakte aufgetreten: ${err}`);
    };
};

/**
 * Organisiert die Kontaktdaten nach dem Anfangsbuchstaben des Namens.
 * ====================================================================================================
 * Diese Funktion filtert den ungültigen Eintrag aus den Kontaktdaten heraus, sortiert die 
 * verbleibenden Kontakte alphabetisch nach ihrem Namen und organisiert sie in einem Objekt, 
 * das nach dem Anfangsbuchstaben des Namens strukturiert ist.
 * ====================================================================================================
 * @param {Array<Object>} data Eine Liste von Kontaktdatenobjekten.
 * @param {string} data[].name Der Name des Kontakts.
 * @param {string} data[].email Die E-Mail-Adresse des Kontakts.
 * @param {string} data[].tel Die Telefonnummer des Kontakts.
 * @param {string} data[].shortcutBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * @returns {Object} Ein Objekt, in dem die Kontakte nach dem Anfangsbuchstaben ihres Namens gruppiert sind.
 * ====================================================================================================
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
 * Zeigt die sortierten Kontaktkarten an.
 * ====================================================================================================
 * Diese Funktion erstellt HTML-Elemente für die Kontaktkarten und fügt sie in das DOM ein. 
 * Sie fügt außerdem Event-Listener hinzu, um auf Klickereignisse zu reagieren.
 * ====================================================================================================
 * func generateCardHeadline() - findet man in der './createHtmlElements.js'
 * func createContactCard() - findet man in der './createHtmlElements.js'
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
function createSortedContacts() {
    const cardsContainer = CLASS_Contactcards;
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
 * Fügt Klick-Ereignislistener zu den Kontaktkarten hinzu.
 * ====================================================================================================
 * Diese Funktion fügt Event-Listener zu allen Kontaktkarten hinzu, um auf Klickereignisse zu reagieren
 * und die Kontaktdetails anzuzeigen. Die Funktion entfernt zuvor vorhandene Event-Listener, um sicherzustellen,
 * dass keine doppelten Listener vorhanden sind, bevor neue hinzugefügt werden.
 * ====================================================================================================
 * @function handleCardClick - Funktion zum Umgang mit Klick-Ereignissen auf Kontaktkarten.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
const attachCardEvents = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeEventListener('click', handleCardClick);
        card.addEventListener('click', handleCardClick);
    });
};

/**
 * Behandelt das Klick-Ereignis auf einer Kontaktkarte.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn eine Kontaktkarte angeklickt wird. Sie extrahiert die relevanten
 * Datenattribute von der angeklickten Karte und ruft die Funktion `showContactDetails` auf, um die
 * Kontaktdetails anzuzeigen.
 * ====================================================================================================
 * func showContactDetails() - findet man in der './showContactDetails.js'
 * ====================================================================================================
 * @param {Event} event - Das Klick-Ereignisobjekt, das die Details der angeklickten Karte enthält.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
const handleCardClick = (event) => {
    const target = event.currentTarget;
    const key = target.getAttribute('data-key');
    const name = target.getAttribute('data-name');
    const email = target.getAttribute('data-email');
    const tel = target.getAttribute('data-tel');
    const shortcutBackColor = target.getAttribute('data-shortcut-color');
    showContactDetails(key, name, email, tel, shortcutBackColor);
};