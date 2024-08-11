
const ID_addPersion = ['addPersionName', 'addPersionEmail', 'addPersionTel'];

/**
 * Schließt das Popup-Fenster zum Hinzufügen eines neuen Kontakts und leert die Eingabefelder.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer den Kontakt erfolgreich hinzugefügt hat.
 * Sie versteckt das Popup-Fenster und setzt die Werte der Eingabefelder zurück.
 * ====================================================================================================
 */
export function reset() {
    addClass('addcontactpopup');
    ID_addPersion.forEach((id) => document.getElementById(id).value = '');
}