import { extractInitials } from '../modules.js';
import { deleteContact } from './delete_card.js';
import { showContactEditPopup } from './show_editPopup.js';

const ID_BTN_editDelet = document.getElementById('editdeletcontact');
const ID_contactCard = document.getElementById('showContactcard');
const ID_personShortcut = document.getElementById('personShortcut');
const ID_personName = document.getElementById('personName');
const ID_personEmail = document.getElementById('personEmail');
const ID_personTel = document.getElementById('personTel');
const BTN_ID = ['delContactBtn', 'editContactBtn', 'delContactBtnMobile', 'editContactBtnMobile'];
const BTN_FUNC = { delete: deleteContact, edit: showContactEditPopup };

const CLASS_BTN_hideCardArrow = document.querySelector('.hidecontactcardarrow');
const CLASS_dnone = document.querySelectorAll('.d-none');

const screenWidth = window.innerWidth;

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
    showMobileContactCard();
}

/**
 * Die Funktion blendet beim Laden der Contact-Seite die mobile Contactcard aus.
*/
window.addEventListener('load', () => {
    const contactCard = document.getElementById('showContactcard');
    contactCard.style.display = 'none';
});

/**
 * Zeigt die Kontaktkarte in der mobilen Ansicht an und startet die Einblende-Animation.
 * ====================================================================================================
 * Diese Funktion überprüft die Bildschirmbreite und blendet die Kontaktkarte ein,
 * falls die Ansicht auf einem mobilen Gerät (Bildschirmbreite ≤ 1300px) erfolgt. 
 * Zusätzlich wird eine Einblende-Animation für die Kontaktkarte und die Edit/Delete-Buttons gestartet.
 * ====================================================================================================
 * @returns {void}
 */
const showMobileContactCard = () => {
    if (screenWidth <= 1300) {
        ID_contactCard.style.display = 'block';
        ID_contactCard.style.animation = 'slideIn 0.3s forwards';
        ID_BTN_editDelet.style.animation = 'slideIn 0.3s forwards';
        addEventFromHideCardArrow();
    };
};

/**
 * Verbirgt die Kontaktkarte in der mobilen Ansicht und startet die Ausblende-Animation.
 * ====================================================================================================
 * Diese Funktion überprüft die Bildschirmbreite und blendet die Kontaktkarte aus,
 * falls die Ansicht auf einem mobilen Gerät (Bildschirmbreite ≤ 1300px) erfolgt.
 * Zusätzlich wird eine Ausblende-Animation für die Kontaktkarte und die Edit/Delete-Buttons gestartet.
 * Die tatsächliche Ausblendung der Kontaktkarte erfolgt nach der Animation.
 * ====================================================================================================
 * @returns {void}
 */
export const hideMobileContactCard = () => {
    if (screenWidth <= 1300) {
        ID_BTN_editDelet.style.animation = 'slideOut 0.3s forwards';
        ID_contactCard.style.animation = 'slideOut 0.3s forwards';
        deselectPreviousCard(lastCart);
    };
};

/**
 * Fügt einen Event-Listener zum Button hinzu, der die Kontaktkarte in der mobilen Ansicht ausblendet.
 * ====================================================================================================
 * Diese Funktion überprüft, ob der Button zum Ausblenden der Kontaktkarte (`CLASS_BTN_hideCardArrow`) existiert.
 * Falls vorhanden, wird der vorherige Event-Listener für das `click`-Ereignis entfernt und ein neuer Event-Listener
 * hinzugefügt. Dieser Event-Listener ruft die `hideMobileContactCard`-Funktion auf, wenn der Button angeklickt wird.
 * ====================================================================================================
 * @returns {void}
 */
const addEventFromHideCardArrow = () => {
    if (CLASS_BTN_hideCardArrow) {
        CLASS_BTN_hideCardArrow.removeEventListener('click', hideMobileContactCard);
        CLASS_BTN_hideCardArrow.addEventListener('click', hideMobileContactCard);
    };
};

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
};

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
};

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
};

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
        element.removeEventListener('click', handleButtonClick);
        element.addEventListener('click', handleButtonClick);
    });
};

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
    BTN_FUNC[action](email);
};

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
};