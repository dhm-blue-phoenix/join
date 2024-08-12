import { showContactCards } from './module/showContactCards.js';
import { editContact } from './module/editContact.js';
import { addContact } from './module/addContact.js';

const ID_editPersionShortcut = document.getElementById('editPersionShortcut');
const ID_editPersionForm = document.getElementById('editContactForm');
const ID_editPersionName = document.getElementById('editPersionName');
const ID_editPersionEmail = document.getElementById('editPersionEmail');
const ID_editPersionTel = document.getElementById('editPersionTel');

const ID_addContactForm = document.getElementById('addContactForm');
const ID_addPersionName = document.getElementById('addPersionName');
const ID_addPersionEmail = document.getElementById('addPersionEmail');
const ID_addPersionTel = document.getElementById('addPersionTel');

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
 * Initialisiert die Kontaktkartenanzeige nach dem Laden des DOM-Inhalts.
 * ====================================================================================================
 * Diese Funktion wird ausgeführt, sobald der gesamte DOM-Inhalt geladen und analysiert wurde.
 * Sie ruft die Funktion `showContactCards` auf, um die Kontaktkarten im Benutzerinterface darzustellen.
 * Die Funktion sorgt dafür, dass alle notwendigen Daten geladen und die Kontaktkarten korrekt gerendert werden,
 * bevor der Benutzer mit ihnen interagieren kann.
 * Anschließend wird ein Event-Listener zum Formular hinzugefügt, der die `initEditForm`-Funktion
 * bei einem Formular-Submit auslöst.
 * ====================================================================================================
 * func showContactCards() - findet man in der './module/showContactCards.js'
 * ====================================================================================================
 */
document.removeEventListener('DOMContentLoaded');
document.addEventListener('DOMContentLoaded', async () => {
    showContactCards();
    ID_addContactForm && ID_addContactForm.addEventListener('submit', initAddForm);
    ID_editPersionForm && ID_editPersionForm.addEventListener('submit', initEditForm);
});

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
    const formData = loadDataAddForm(ID_addPersionName.value, ID_addPersionEmail.value, ID_addPersionTel.value);
    addContact(formData);
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
function loadDataAddForm(name, email, tel) {
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
    const formData = loadDataFromEditForm(ID_editPersionName.value, ID_editPersionEmail.value, ID_editPersionTel.value);
    editContact(formData);
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
function loadDataFromEditForm(name, email, tel) {
    const style = window.getComputedStyle(ID_editPersionShortcut);
    const formData = {
        'shortcutBackColor': style.backgroundColor,
        'name': name,
        'email': email,
        'tel': tel
    };
    return formData;
}