
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
export async function editContact(event) {
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