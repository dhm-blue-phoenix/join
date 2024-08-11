import { showContactCards } from './module/showContactCards.js';
import { editContact } from './module/editContact.js';

const ID_editPersionForm = document.getElementById('editContactForm');
const ID_editPersionName = document.getElementById('editPersionName');
const ID_editPersionEmail = document.getElementById('editPersionEmail');
const ID_editPersionTel = document.getElementById('editPersionTel');

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
document.addEventListener('DOMContentLoaded', async () => {
    showContactCards();
    
    if (ID_editPersionForm) {
        ID_editPersionForm.addEventListener('submit', initEditForm);
    }
});

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
    const formData = loadFormData(ID_editPersionName.value, ID_editPersionEmail.value, ID_editPersionTel.value);
    editContact(formData);
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ====================================================================================================
 * Diese Funktion sammelt die Werte aus den Eingabefeldern für Name, E-Mail und Telefonnummer und
 * erstellt ein Objekt, das diese Daten enthält. Dieses Objekt wird zurückgegeben und kann für
 * weitere Verarbeitung, wie das Bearbeiten eines Kontakts, verwendet werden.
 * ====================================================================================================
 * @param {string} name - Der Name des Kontakts.
 * @param {string} email - Die E-Mail-Adresse des Kontakts.
 * @param {string} tel - Die Telefonnummer des Kontakts.
 * @returns {Object} Ein Objekt mit den gesammelten Formulardaten.
 * ====================================================================================================
 */
function loadFormData(name, email, tel) {
    return { name, email, tel };
}