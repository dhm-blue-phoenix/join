


const ID_addPersionName = document.getElementById('addPersionName');
const ID_addPersionEmail = document.getElementById('addPersionEmail');
const ID_addPersionTel = document.getElementById('addPersionTel');

const ID_editPersionShortcut = document.getElementById('editPersionShortcut');
const ID_editPersionName = document.getElementById('editPersionName');
const ID_editPersionEmail = document.getElementById('editPersionEmail');
const ID_editPersionTel = document.getElementById('editPersionTel');


let shortcutColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF0",
    "#FFB833",
    "#8E33FF"
];
let editContactId;















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