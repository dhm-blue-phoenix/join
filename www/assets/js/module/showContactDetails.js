import { extractInitials } from './modules.js';
import { deleteContact } from './deleteContact.js';
import { showContactEditPopup } from './showContactEditPopup.js';

const ID_personShortcut = document.getElementById('personShortcut');
const ID_personName = document.getElementById('personName');
const ID_personEmail = document.getElementById('personEmail');
const ID_personTel = document.getElementById('personTel');
const BTN_ID = ['delContactBtn', 'editContactBtn'];
const FUNC = { delete: deleteContact, edit: showContactEditPopup };

const CLASS_dnone = document.querySelectorAll('.d-none');

let lastCart;

/**
 * Zeigt die Details eines Kontakts an und aktiviert die Kontaktkarte.
 * ====================================================================================================
 * Diese Funktion zeigt die Kontaktkarte mit der angegebenen ID an, entfernt die "d-none" Klasse von 
 * Elementen, rendert die Kontaktdaten und entfernt die letzte aktive Kontaktkarte. Zusätzlich werden 
 * die Attribute der Bearbeiten- und Löschen-Buttons gesetzt und Event-Listener für diese Buttons hinzugefügt.
 * ====================================================================================================
 * @param {string} cardId Die ID der Kontakt-Karte, die angezeigt werden soll.
 * @param {string} personName Der Name des Kontakts.
 * @param {string} personEmail Die E-Mail-Adresse des Kontakts.
 * @param {string} personTel Die Telefonnummer des Kontakts.
 * @param {string} persionShortBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * @returns {void}
 * ====================================================================================================
 */
export function showContactDetails(cardId, personName, personEmail, personTel, persionShortBackColor) {
    const card = document.getElementById(cardId);
    if (!card) throw new Error('Element with ID', cardId, 'not found.');
    setCardActive(CLASS_dnone, card);
    updateContactDetails(personName, personEmail, personTel, persionShortBackColor);
    setBtnAttribute(personEmail);
    addEventFromBtn();
    deselectPreviousCard(card);
    showContactCardMobile();
}

/**
 * Funktion für die Mobileansicht von der Contactcard
 * ====================================================================================================
 */

function showContactCardMobile() {
    const editdeletcontact = document.getElementById('editdeletcontact');
    const contactCard = document.getElementById('showContactcard');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1300) {
        contactCard.style.display = 'block'; // Den Container einblenden
        contactCard.style.animation = 'slideIn 0.3s forwards'; // Animation starten
        editdeletcontact.style.animation = 'slideIn 0.3s forwards'; // Animation starten
    }
}

window.addEventListener('load', function() {
    const contactCard = document.getElementById('showContactcard');
    contactCard.style.display = 'none';
  });

  function hideContactCardMobile() {
    const editdeletcontact = document.getElementById('editdeletcontact');
    const contactCard = document.getElementById('showContactcard');
    const screenWidth = window.innerWidth;

    // Nur in der mobilen Ansicht ausblenden
    if (screenWidth <= 1300) {
        editdeletcontact.style.animation = 'slideOut 0.3s forwards'; // Ausblende-Animation starten
        contactCard.style.animation = 'slideOut 0.3s forwards'; // Ausblende-Animation starten
        // setTimeout(() => {
        //     contactCard.style.display = 'none'; // Nach der Animation ausblenden
        // }, 300); // Timeout entspricht der Dauer der Animation
    }
}

document.querySelector('.hidecontactcardarrow').addEventListener('click', hideContactCardMobile);


/**
 * Setzt das Styling und die Sichtbarkeit für die angegebene Kontaktkarte.
 * ====================================================================================================
 * Diese Funktion entfernt die Klasse "d-none" von allen angegebenen Elementen, 
 * fügt der angegebenen Karte die Klasse "cardactive" hinzu und entfernt die Klasse "card".
 * ====================================================================================================
 * @param {NodeListOf<Element>} dnone Eine Liste von Elementen, deren "d-none" Klasse entfernt werden soll.
 * @param {HTMLElement} card Das HTML-Element der Kontaktkarte, das aktiviert werden soll.
 * @returns {void}
 * ====================================================================================================
 */
const setCardActive = (dnone, card) => {
    dnone.forEach(element => { element.classList.remove('d-none'); });
    card.classList.add('cardactive');
    card.classList.remove('card');
    card.style.pointerEvents = "none";
}

/**
 * Aktualisiert die detaillierten Kontaktdaten im Benutzerinterface.
 * ====================================================================================================
 * Diese Funktion zeigt die Kontaktdaten des angegebenen Kontakts in den entsprechenden HTML-Elementen an.
 * Es werden keine Event-Listener hinzugefügt; dies geschieht in den nachfolgenden Funktionen.
 * ====================================================================================================
 * func extractInitials() - findet man in der './extractInitials.js'
 * ====================================================================================================
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @param {string} tel Die Telefonnummer des Kontakts.
 * @param {string} shortcutBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * @returns {void}
 * ====================================================================================================
 */
const updateContactDetails = (name, email, tel, shortcutBackColor) => {
    const initials = extractInitials(name);
    ID_personShortcut.textContent = initials;
    ID_personShortcut.style.backgroundColor = shortcutBackColor;
    ID_personName.textContent = name;
    ID_personEmail.textContent = email;
    ID_personTel.textContent = tel;
}

/**
 * Setzt die Attribute für die Bearbeiten- und Löschen-Buttons.
 * ====================================================================================================
 * Diese Funktion fügt den Bearbeiten- und Löschen-Buttons das Attribut "data-email" mit der angegebenen 
 * E-Mail-Adresse hinzu. Dies wird benötigt, um die E-Mail-Adresse beim Klicken auf die Buttons zu übergeben.
 * ====================================================================================================
 * @param {string} email Die E-Mail-Adresse des Kontakts, die den Buttons zugewiesen wird.
 * @returns {void}
 * ====================================================================================================
 */
const setBtnAttribute = (email) => {
    BTN_ID.forEach((id) => document.getElementById(id).setAttribute('data-email', email));
}

/**
 * Fügt Event-Listener zu den Bearbeiten- und Löschen-Schaltflächen hinzu.
 * ====================================================================================================
 * Diese Funktion durchsucht eine Liste von Button-IDs und fügt jedem Button einen Event-Listener hinzu.
 * Beim Klicken auf einen Button wird basierend auf der ID des Buttons entweder die Bearbeiten- oder
 * die Löschen-Funktion aufgerufen, indem die E-Mail-Adresse des zu bearbeitenden oder zu löschenden Kontakts
 * als Parameter übergeben wird.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
const addEventFromBtn = () => {
    BTN_ID.forEach((id) => {
        const element = document.getElementById(id);
        element && (
            element.removeEventListener('click', handleButtonClick),
            element.addEventListener('click', handleButtonClick)
        );
    });
}

/**
 * Handler für die Klick-Ereignisse der Buttons.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn ein Button geklickt wird. Sie bestimmt, welche Aktion ausgeführt
 * werden soll (bearbeiten oder löschen), und ruft die entsprechende Funktion mit der E-Mail-Adresse auf.
 * ====================================================================================================
 * @param {Event} event - Das Klick-Ereignis.
 * ====================================================================================================
 */
const handleButtonClick = (event) => {
    const target = event.currentTarget;
    const email = target.getAttribute('data-email');
    const action = target.id.includes('del') ? 'delete' : 'edit';
    FUNC[action](email);
}

/**
 * Entfernt die Klasse der zuletzt aktiven Kontaktkarte und setzt den Zustand zurück.
 * ====================================================================================================
 * Diese Funktion entfernt die "cardactive"-Klasse von der zuletzt aktiven Kontaktkarte und fügt 
 * die "card"-Klasse wieder hinzu. Sie setzt auch den Zeiger-Events-Stil zurück.
 * ====================================================================================================
 * @param {HTMLElement} card Die aktuell aktive Kontakt-Karte.
 * @returns {void}
 * ====================================================================================================
 */
const deselectPreviousCard = (card) => {
    lastCart !== undefined && (
        lastCart.classList.remove('cardactive'),
        lastCart.classList.add('card'),
        lastCart.style.pointerEvents = ""
    );
    lastCart = card;
}