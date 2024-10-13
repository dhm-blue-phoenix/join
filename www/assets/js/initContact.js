import { showUserCard } from './module/contact/user/show_user_card.js';
import { showContactCards } from './module/contact/show_cards.js';
import { editContact } from './module/contact/edit_card.js';
import { addContact } from './module/contact/add_card.js';

const ID_editPersionShortcut = document.getElementById('editPersionShortcut');
const ID_FORM_editPersion = document.getElementById('editContactForm');
const ID_INPUT_editPersionName = document.getElementById('editPersionName');
const ID_INPUT_editPersionEmail = document.getElementById('editPersionEmail');
const ID_INPUT_editPersionTel = document.getElementById('editPersionTel');

const ID_FORM_addContact = document.getElementById('addContactForm');
const ID_INPUT_addPersionName = document.getElementById('addPersionName');
const ID_INPUT_addPersionEmail = document.getElementById('addPersionEmail');
const ID_INPUT_addPersionTel = document.getElementById('addPersionTel');

let shortcutColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF0",
    "#FFB833",
    "#8E33FF"
];

/**
 * Initialisiert die Kontaktkartenanzeige und fügt Event-Listener zu den Formularen hinzu.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, sobald der gesamte DOM-Inhalt geladen und analysiert wurde. 
 * Sie ruft die Funktion `showContactCards` auf, um die Kontaktkarten im Benutzerinterface darzustellen.
 * Anschließend werden Event-Listener für das Formular zum Hinzufügen von Kontakten und das Formular zum 
 * Bearbeiten von Kontakten hinzugefügt. Diese Listener rufen die Funktionen `initAddForm` und `initEditForm` 
 * auf, wenn die jeweiligen Formulare abgeschickt werden.
 * ====================================================================================================
 * func showContactCards() - findet man in der './module/showContactCards.js'
 * @returns {void}
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    showUserCard()
    showContactCards();
    addEventFromAddContact();
    addEventFromEditContact();
});

/**
 * Fügt einen Event-Listener zum Formular zum Hinzufügen eines Kontakts hinzu.
 * ====================================================================================================
 * Diese Funktion überprüft, ob das Formular für das Hinzufügen eines Kontakts (`ID_FORM_addContact`) existiert.
 * Falls vorhanden, wird der vorherige Event-Listener für das `submit`-Ereignis entfernt und ein neuer Event-Listener
 * hinzugefügt. Dieser Event-Listener ruft die `initAddForm`-Funktion auf, wenn das Formular abgeschickt wird.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
const addEventFromAddContact = () => {
    ID_FORM_addContact.removeEventListener('submit', initAddForm);
    ID_FORM_addContact.addEventListener('submit', initAddForm);
};

/**
 * Fügt einen Event-Listener zum Formular zum Bearbeiten eines Kontakts hinzu.
 * ====================================================================================================
 * Diese Funktion überprüft, ob das Formular für das Bearbeiten eines Kontakts (`ID_FORM_editPersion`) existiert.
 * Falls vorhanden, wird der vorherige Event-Listener für das `submit`-Ereignis entfernt und ein neuer Event-Listener
 * hinzugefügt. Dieser Event-Listener ruft die `initEditForm`-Funktion auf, wenn das Formular abgeschickt wird.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
const addEventFromEditContact = () => {
    ID_FORM_editPersion.removeEventListener('submit', initEditForm);
    ID_FORM_editPersion.addEventListener('submit', initEditForm);
};

/**
 * Initialisiert das Hinzufügen eines neuen Kontakts.
 * ====================================================================================================
 * Diese Funktion wird ausgelöst, wenn das Formular zum Hinzufügen eines neuen Kontakts abgeschickt wird.
 * Sie sammelt die eingegebenen Formulardaten und übergibt diese an die Funktion `addContact`,
 * um den neuen Kontakt zur Kontaktliste hinzuzufügen.
 * ====================================================================================================
 * func addContact() - findet man in der './module/addContact.js'
 * ====================================================================================================
 * @async
 * @param {Event} event - Das Ereignis, das durch das Absenden des Formulars ausgelöst wird.
 * ====================================================================================================
 */
function initAddForm(event) {
    event.preventDefault();
    const formData = loadDataAddForm(ID_INPUT_addPersionName.value, ID_INPUT_addPersionEmail.value, ID_INPUT_addPersionTel.value);
    addContact(formData);
};

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
function loadDataAddForm(name, email, tel) {
    const randomNumber = Math.floor(Math.random() * shortcutColors.length);
    const contactData = {
        'shortcutBackColor': shortcutColors[randomNumber],
        'name': name,
        'email': email,
        'tel': tel
    };
    return contactData;
};

/**
 * Initialisiert das Bearbeitungsformular.
 * ====================================================================================================
 * Diese Funktion verhindert das Standardverhalten des Formular-Submit-Events und sammelt die
 * Formulardaten. Die gesammelten Daten werden dann an die Funktion `editContact` übergeben,
 * um die Änderungen zu speichern.
 * ====================================================================================================
 * func editContact() - findet man in der './module/editContact.js'
 * ====================================================================================================
 * @param {Event} event - Das Submit-Event des Formulars.
 * @returns {void}
 * ====================================================================================================
 */
function initEditForm(event) {
    event.preventDefault();
    const formData = loadDataFromEditForm(ID_INPUT_editPersionName.value, ID_INPUT_editPersionEmail.value, ID_INPUT_editPersionTel.value);
    editContact(formData);
};

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ====================================================================================================
 * @param {string} name - Der Wert des Namens-Eingabefelds.
 * @param {string} email - Der Wert des E-Mail-Eingabefelds.
 * @param {string} tel - Der Wert des Telefon-Eingabefelds.
 * @returns {Object} Das Formulardaten-Objekt.
 * ====================================================================================================
 */
function loadDataFromEditForm(name, email, tel) {
    const style = window.getComputedStyle(ID_editPersionShortcut);
    const formData = {
        'shortcutBackColor': style.backgroundColor,
        'name': name,
        'email': email,
        'tel': tel
    };
    return formData;
};