import { loadUserIdFromStored } from '../modules.js';
import { getContactId } from '../modules.js';
import { extractInitials } from '../modules.js';

const ID_editPersionShortcut = document.getElementById('editPersionShortcut');
const ID_INPUT_editPersionName = document.getElementById('editPersionName');
const ID_INPUT_editPersionEmail = document.getElementById('editPersionEmail');
const ID_INPUT_editPersionTel = document.getElementById('editPersionTel');
const ID_editPopupAnimation = document.getElementById('editcontactpopupanimation');

export let editContactId;

/**
 * Zeigt das Bearbeitungs-Popup für einen Kontakt an.
 * ====================================================================================================
 * Diese asynchrone Funktion entfernt eine CSS-Klasse, die das Bearbeitungs-Popup versteckt.
 * Sie lädt die Benutzer-ID aus dem Speicher und ruft dann die Kontakt-ID basierend auf der
 * E-Mail des Kontakts ab. Schließlich werden die Kontaktdaten in das Bearbeitungsformular importiert.
 * ====================================================================================================
 * func loadUserIdFromStored() - findet man in der './loadUserIdFromStored.js'
 * func getContactId() - findet man in der './getContactId.js'
 * ====================================================================================================
 * @param {string} email Die E-Mail-Adresse des Kontakts, der bearbeitet werden soll.
 * ====================================================================================================
*/
export async function showContactEditPopup(email) {
    try {
        showPopup();
        const userID = loadUserIdFromStored();
        const contactId = await getContactId(userID, email, 'contactCard');
        importFromEditFormData(contactId[1]);
        editContactId = contactId[0];
    } catch (err) {
        console.error(`Es ist ein Problem beim Öffnen des Edid Popups aufgetreten! ${err}`);
    };
};

/**
 * Zeigt das Bearbeitungs-Popup an und startet die Anzeigeanimation.
 * ====================================================================================================
 * Diese Funktion macht das Bearbeitungs-Popup sichtbar, indem sie eine Klasse entfernt, 
 * die das Popup normalerweise ausblendet. Gleichzeitig wird durch das Hinzufügen und 
 * Entfernen von CSS-Klassen eine Animation aktiviert, die das sanfte Einblenden des 
 * Popups ermöglicht.
 * ====================================================================================================
 */
const showPopup = () => {
    removeClass('editcontactpopup');
    ID_editPopupAnimation.classList.remove('hide');
    ID_editPopupAnimation.classList.add('show');
};

/**
 * Entfernt eine spezifische CSS-Klasse von einem Element.
 * ====================================================================================================
 * Diese Funktion sucht ein HTML-Element anhand seiner ID und entfernt die angegebene
 * CSS-Klasse, um Änderungen im DOM sichtbar zu machen.
 * ====================================================================================================
 * @param {string} id Die ID des Elements, von dem die Klasse entfernt werden soll.
 * ====================================================================================================
 */
const removeClass = (id) => {
    document.getElementById(id).classList.remove('d-nonepopup');
};

/**
 * Importiert die Kontaktdaten in das Bearbeitungsformular.
 * ====================================================================================================
 * Diese Funktion aktualisiert die Felder des Bearbeitungsformulars
 * mit den übergebenen Kontaktdaten.
 * ====================================================================================================
 * func extractInitials() - findet man in der './extractInitials.js'
 * ====================================================================================================
 * @param {Object} contactData Ein Objekt mit den Kontaktdaten.
 * @param {string} contactData.name Der Name des Kontakts.
 * @param {string} contactData.email Die E-Mail-Adresse des Kontakts.
 * @param {string} contactData.tel Die Telefonnummer des Kontakts.
 * ====================================================================================================
 */
const importFromEditFormData = (contactData) => {
    ID_editPersionShortcut.textContent = extractInitials(contactData.name);
    ID_editPersionShortcut.style.backgroundColor = contactData.shortcutBackColor;
    ID_INPUT_editPersionName.value = contactData.name;
    ID_INPUT_editPersionEmail.value = contactData.email;
    ID_INPUT_editPersionTel.value = contactData.tel;
};