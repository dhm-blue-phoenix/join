import { extractInitials } from "./module/extractInitials.js";
import { showContactDetails } from './module/showContactDetails.js';
import { delContact } from './module/delContact.js';

const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const CLASS_Contactcards = document.querySelector('.Contactcards');

const ID_addPersionName = document.getElementById('addPersionName');
const ID_addPersionEmail = document.getElementById('addPersionEmail');
const ID_addPersionTel = document.getElementById('addPersionTel');

const ID_editPersionShortcut = document.getElementById('editPersionShortcut');
const ID_editPersionName = document.getElementById('editPersionName');
const ID_editPersionEmail = document.getElementById('editPersionEmail');
const ID_editPersionTel = document.getElementById('editPersionTel');

const ID_dnonePersonCard = document.getElementById('dnonePersonCard');
const ID_dnoneInfoHeadline = document.getElementById('dnoneInfoHeadline');
const ID_dnoneInfo = document.getElementById('dnoneInfo');

let shortcutColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF0",
    "#FFB833",
    "#8E33FF"
];
let userID;
let editContactId;
let contacts;

/**
 * Initialisiert die Kontakt-Karten, nachdem das DOM vollständig geladen ist.
 * ====================================================================================================
 * Diese Funktion wird beim `DOMContentLoaded`-Event aufgerufen und führt die folgenden Schritte durch:
 * 1. Lädt die Kontakte des aktuellen Benutzers mithilfe der `loadContacts`-Funktion.
 * 2. Rendert die Kontakt-Karten mithilfe der `renderCards`-Funktion.
 * ====================================================================================================
 * @async
 * @function
 * @returns {Promise<void>} Ein Promise, das keinen Wert zurückgibt und bei erfolgreicher Ausführung resolved.
 */
document.addEventListener('DOMContentLoaded', async () => {
    await loadContacts();
    renderCards();
});

/**
 * Lädt die Kontakte des aktuellen Benutzers.
 * ====================================================================================================
 * Diese Funktion lädt die Kontakte des aktuellen Benutzers aus der Datenbank,
 * sortiert sie alphabetisch und gruppiert sie nach Anfangsbuchstaben.
 * ====================================================================================================
 * func loadContactsData() - findet man in der dataResponse.js
 * ====================================================================================================
 * @async
 * @returns {Promise<void>}
 * ====================================================================================================
 */
async function loadContacts() {
    try {
        contacts = {};
        lodeUserId();
        const tempContacts = await lodeContactsCard(`users/${userID}/`);
        sortContacts(tempContacts);
    } catch (err) {
        console.error(`[ERROR] loadContacts: ${err}`);
    }
}

/**
 * Lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * ====================================================================================================
 * Diese Funktion lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * Wenn keine ID gefunden wird, wird ein Fehler geworfen.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
function lodeUserId() {
    if (storedLocalUserID) return userID = storedLocalUserID;
    if (storedSessionUserID) return userID = storedSessionUserID;
    throw new Error('User ID wurde nicht gefunden!');
}

/**
 * Sortiert Kontakte alphabetisch und gruppiert sie nach Anfangsbuchstaben.
 * ====================================================================================================
 * Diese Funktion sortiert die übergebenen Kontakte alphabetisch nach Namen 
 * und gruppiert sie nach Anfangsbuchstaben.
 * ====================================================================================================
 * @param {Array} data Die zu sortierenden Kontakte.
 * @returns {void}
 * ====================================================================================================
 */
function sortContacts(data) {
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
 * Rendert die Kontakt-Karten mit eindeutigen IDs.
 * ====================================================================================================
 * Diese Funktion rendert die Kontakt-Karten basierend 
 * auf den geladenen Kontakten und weist jeder Karte 
 * eine eindeutige ID zu.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
function renderCards() {
    const carts = CLASS_Contactcards;
    carts.innerHTML = '';
    Object.keys(contacts).forEach(key => {
        carts.innerHTML += `
            <div class="letter">${key.toUpperCase()}</div>
            <div class="ContactcardsTrennline"></div>
        `;
        contacts[key].forEach((contact, cardId) => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('cardcontent');
            contactCard.innerHTML = htmlCard(key, cardId, contact.name, contact.email, contact.tel, contact.shortcutBackColor);
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

    const deleteButton = document.getElementById(`delete-test`);
    if (deleteButton) {
        deleteButton.addEventListener('click', () => delContact());
        console.log('Finis');
    }
}

/**
 * Erzeugt eine HTML-Karte für einen Kontakt.
 * ====================================================================================================
 * Diese Funktion erstellt eine HTML-Karte, die die Kontaktdaten anzeigt.
 * ====================================================================================================
 * @param {number} id Die ID des Kontakts.
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @param {string} tel Die Telefonnummer des Kontakts.
 * @param {string} shortcutBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * @returns {string} Die HTML-Karte als String.
 * ====================================================================================================
 */
function htmlCard(key, id, name, email, tel, shortcutBackColor) {
    return `
        <div class="card" id="${key.toLowerCase() + id}" data-key="${key.toLowerCase() + id}" data-name="${name}" data-email="${email}" data-tel="${tel}" data-shortcut-color="${shortcutBackColor}">
            <div id="nameShortcut" style="background-color: ${shortcutBackColor}">${name.split(' ').map(namePart => namePart[0]).join('').toUpperCase()}</div>
            <div class="namemail">
                <p>${name}</p>
                <a href="#Mail">${email}</a>
            </div>
        </div>
    `;
}






/**
 * Fügt den Klassen "d-none" hinzu, um die Personenkarte
 * und die zugehörigen Infos zu verbergen.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
function dnonePersionCard() {
    ID_dnonePersonCard.classList.add('d-none');
    ID_dnoneInfoHeadline.classList.add('d-none');
    ID_dnoneInfo.classList.add('d-none');
}

/**
 * Fügt einen neuen Kontakt hinzu.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen,
 * wenn das Formular zum Hinzufügen eines neuen Kontakts abgeschickt wird.
 * Sie überprüft, ob der Kontakt bereits in der Kontaktliste existiert,
 * und fügt ihn hinzu, wenn er nicht existiert.
 * ====================================================================================================
 * func lodeContactsCard() - findet man in der dataResponse.js
 * ====================================================================================================
 * @async
 * @param {Event} event - Das Ereignis, das durch das Absenden des Formulars ausgelöst wird.
 * ====================================================================================================
 */
async function addContact(event) {
    event.preventDefault();
    try {
        const contactData = createFormData(ID_addPersionName.value, ID_addPersionEmail.value, ID_addPersionTel.value);
        const contactCards = await lodeContactsCard(`users/${userID}`);
        const findContact = contactCards.find(contact => contact.email === contactData.email);
        if (findContact === undefined) {
            await uploadPatchData(`users/${userID}/contacts/`, contactData);
            console.warn('Benutzer erfolgreich Hinzugefügt!'); // [!] Ändern zu Benutzer-Feedback
        } else return console.warn('Benutzer existiert Bereits!'); // [!] Ändern zu Benutzer-Feedback
        initCard();
        dnoneAddContact();
        dnonePersionCard();
    } catch (err) {
        console.error(`Es ist ein Schwerwigender Fehler aufgetreten! ${err}`);
    }
}

/**
 * Erstellt ein Formulardaten-Objekt aus den Eingabefeldern.
 * ====================================================================================================
 * Diese Funktion nimmt die Werte aus den Namens-, E-Mail- und Telefon-Eingabefeldern und erstellt
 * ein Objekt, das diese Informationen zusammen mit einer zufälligen Hintergrundfarbe für das Kürzel enthält.
 * Die Hintergrundfarbe wird zufällig aus einem vordefinierten Array von Farben ausgewählt.
 * ====================================================================================================
 * @param {string} name - Der Wert des Namens-Eingabefelds.
 * @param {string} email - Der Wert des E-Mail-Eingabefelds.
 * @param {string} tel - Der Wert des Telefon-Eingabefelds.
 * @returns {Object} Das Formulardaten-Objekt mit den Feldern 'shortcutBackColor', 'name', 'email', und 'tel'.
 * ====================================================================================================
 */
function createFormData(name, email, tel) {
    const randomNumber = Math.floor(Math.random() * shortcutColors.length);
    const contactData = {
        'shortcutBackColor': shortcutColors[randomNumber],
        'name': name,
        'email': email,
        'tel': tel
    };
    return contactData;
}

/**
 * Schließt das Popup-Fenster zum Hinzufügen eines neuen Kontakts und leert die Eingabefelder.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer den Kontakt erfolgreich hinzugefügt hat.
 * Sie versteckt das Popup-Fenster und setzt die Werte der Eingabefelder zurück.
 * ====================================================================================================
 */
function dnoneAddContact() {
    addClass('addcontactpopup');
    ID_addPersionName.value = '';
    ID_addPersionEmail.value = '';
    ID_addPersionTel.value = ''
}

/**
 * Öffnet ein Bearbeitungspopup für einen Kontakt basierend auf der E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion entfernt die CSS-Klasse, die das Bearbeitungspopup versteckt,
 * lädt die Kontakt-ID basierend auf der E-Mail-Adresse und füllt das Formular
 * mit den vorhandenen Kontaktdaten.
 * ====================================================================================================
 * @async
 * @param {string} email Die E-Mail-Adresse des Kontakts, der bearbeitet werden soll.
 * ====================================================================================================
 */
async function openEditPopup(email) {
    try {
        removeClass('editcontactpopup');
        const contactId = await loadContactsId(`users/${userID}/`, email);
        importFromEditFormData(contactId[1]);
        editContactId = contactId[0];
    } catch (err) {
        console.error(`Es ist ein Schwerwigender Fehler aufgetreten! ${err}`);
    }
}

/**
 * Importiert die Kontaktdaten in das Bearbeitungsformular.
 * ====================================================================================================
 * Diese Funktion aktualisiert die Felder des Bearbeitungsformulars
 * mit den übergebenen Kontaktdaten.
 * ====================================================================================================
 * func extractInitials() - findet man in der extractInitials.js
 * ====================================================================================================
 * @param {Object} contactData Ein Objekt mit den Kontaktdaten.
 * @param {string} contactData.name Der Name des Kontakts.
 * @param {string} contactData.email Die E-Mail-Adresse des Kontakts.
 * @param {string} contactData.tel Die Telefonnummer des Kontakts.
 * ====================================================================================================
 */
function importFromEditFormData(contactData) {
    ID_editPersionShortcut.textContent = extractInitials(contactData.name);
    ID_editPersionShortcut.style.backgroundColor = contactData.shortcutBackColor;
    ID_editPersionName.value = contactData.name;
    ID_editPersionEmail.value = contactData.email;
    ID_editPersionTel.value = contactData.tel
}

/**
 * Bearbeitet einen bestehenden Kontakt mit den neuen Formulardaten.
 * ====================================================================================================
 * Diese Funktion wird ausgelöst, wenn das Bearbeitungsformular abgeschickt wird.
 * Sie lädt die neuen Formulardaten, aktualisiert den Kontakt in der Datenbank
 * und initialisiert die Kontaktkarte neu.
 * ====================================================================================================
 * func updateData() - findet man in der dataResponse.js
 * ====================================================================================================
 * @async
 * @param {Event} event Das Event-Objekt, das durch das Abschicken des Formulars ausgelöst wird.
 * ====================================================================================================
 */
async function editContact(event) {
    event.preventDefault();
    try {
        const formData = lodeFormData(ID_editPersionName.value, ID_editPersionEmail.value, ID_editPersionTel.value);
        await updateData(`users/${userID}/contacts/${editContactId}`, formData);
        initCard();
        dnoneEditContact();
        dnonePersionCard();
    } catch (err) {
        console.error(`Es ist ein Schwerwigender Fehler aufgetreten! ${err}`);
    }
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ====================================================================================================
 * @param {string} name - Der Wert des Namens-Eingabefelds.
 * @param {string} email - Der Wert des E-Mail-Eingabefelds.
 * @param {string} tel - Der Wert des Telefon-Eingabefelds.
 * @returns {Object} Das Formulardaten-Objekt.
 * ====================================================================================================
 */
function lodeFormData(name, email, tel) {
    const style = window.getComputedStyle(ID_editPersionShortcut);
    const formData = {
        'shortcutBackColor': style.backgroundColor,
        'name': name,
        'email': email,
        'tel': tel
    };
    return formData;
}

/**
 * Schließt das Bearbeitungspopup für einen Kontakt und leert die Eingabefelder.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, um das Bearbeitungspopup zu verstecken, nachdem
 * der Benutzer die Bearbeitung eines Kontakts abgeschlossen hat oder abbricht.
 * Sie setzt alle Eingabefelder im Popup zurück.
 * ====================================================================================================
 */
function dnoneEditContact() {
    addClass('editcontactpopup');
    ID_editPersionShortcut.value = '';
    ID_editPersionName.value = '';
    ID_editPersionEmail.value = '';
    ID_editPersionTel.value = ''
}

function hidecontact() {
    let showContactcard = document.getElementById('showContactcard');
    showContactcard.classList.add('d-none');
}