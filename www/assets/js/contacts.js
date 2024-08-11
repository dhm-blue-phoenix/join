


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

