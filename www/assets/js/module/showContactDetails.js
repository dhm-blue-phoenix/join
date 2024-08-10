import { extractInitials } from "./extractInitials.js";

const ID_personShortcut = document.getElementById('personShortcut');
const ID_personName = document.getElementById('personName');
const ID_personEmail = document.getElementById('personEmail');
const ID_personTel = document.getElementById('personTel');
const ID_personOptions = document.getElementById('personOptions');

const CLASS_dnone = document.querySelectorAll('.d-none');

let lastCart;

/**
 * Zeigt die Details eines Kontakts an und aktiviert die Kontaktkarte.
 * ====================================================================================================
 * Diese Funktion zeigt die Kontaktkarte mit der angegebenen ID an, entfernt die "d-none" Klasse von 
 * Elementen, rendert die Kontaktdaten und entfernt die letzte aktive Kontaktkarte.
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
    if (!card) return console.error('Element with ID', cardId, 'not found.');
    setCardActive(CLASS_dnone, card);
    updateContactDetails(personName, personEmail, personTel, persionShortBackColor);
    deselectPreviousCard(card);
}

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
function setCardActive(dnone, card) {
    dnone.forEach(element => { element.classList.remove('d-none'); });
    card.classList.add('cardactive');
    card.classList.remove('card');
    card.style.pointerEvents = "none";
}

/**
 * Aktualisiert die detaillierten Kontaktdaten im Benutzerinterface.
 * ====================================================================================================
 * Diese Funktion zeigt die Kontaktdaten des angegebenen Kontakts in den entsprechenden HTML-Elementen an
 * und fügt die Event-Listener für die Bearbeiten- und Löschen-Schaltflächen hinzu.
 * ====================================================================================================
 * func extractInitials() - findet man in der ./extractInitials.js
 * ====================================================================================================
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @param {string} tel Die Telefonnummer des Kontakts.
 * @param {string} persionShortBackColor Die Hintergrundfahrbe des shortcuts
 * @returns {void}
 * ====================================================================================================
 */
function updateContactDetails(name, email, tel, shortcutBackColor) {
    const initials = extractInitials(name);
    ID_personShortcut.textContent = initials;
    ID_personShortcut.style.backgroundColor = shortcutBackColor;
    ID_personName.textContent = name;
    ID_personEmail.textContent = email;
    ID_personTel.textContent = tel;
    ID_personOptions.innerHTML = generateContactOptions(email);
    
    // Event-Listener hinzufügen, nachdem die Optionen gerendert wurden
    addContactOptionEventListeners(email);
}

/**
 * Generiert die HTML-Optionen für Bearbeiten- und Löschen-Schaltflächen eines Kontakts.
 * ====================================================================================================
 * Diese Funktion erstellt HTML-Code für zwei Schaltflächen: eine zum Bearbeiten und eine zum Löschen 
 * des Kontakts. Der Code wird als String zurückgegeben.
 * ====================================================================================================
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {string} Die HTML-Optionen als String.
 * ====================================================================================================
 */
const generateContactOptions = (email) => `
    <button id="edit-${email}">
      <img src="./resources/symbols/edit.png" alt=""/> Edit
    </button>
    <button id="delete-${email}">
      <img src="./resources/symbols/delete.svg" alt=""/> Delete
    </button>
`;

/**
 * Fügt Event-Listener für die Bearbeiten- und Löschen-Schaltflächen hinzu.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, nachdem die Kontaktdaten gerendert wurden, um die Event-Listener
 * für die generierten Schaltflächen hinzuzufügen.
 * ====================================================================================================
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {void}
 */
function addContactOptionEventListeners(email) {
    const editButton = document.getElementById(`edit-${email}`);
    const deleteButton = document.getElementById(`delete-${email}`);
    console.log('deleteButton', deleteButton);
    if (editButton) editButton.addEventListener('click', () => openEditPopup(email));
    if (deleteButton) deleteButton.addEventListener('click', () => delContact());
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
function deselectPreviousCard(card) {
    if (lastCart !== undefined) {
        lastCart.classList.remove('cardactive');
        lastCart.classList.add('card');
        lastCart.style.pointerEvents = "";
    }
    lastCart = card;
}