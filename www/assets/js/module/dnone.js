const ID_INPUT_addPersion = ['addPersionName', 'addPersionEmail', 'addPersionTel'];
const ID_dnonePersionCard = ['dnonePersonCard', 'dnoneInfoHeadline', 'dnoneInfo'];
const ID_editPersion = ['editPersionShortcut', 'editPersionName', 'editPersionEmail', 'editPersionTel'];

/**
 * Schließt das Popup-Fenster zum Hinzufügen eines neuen Kontakts und leert die Eingabefelder.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer den Kontakt erfolgreich hinzugefügt hat.
 * Sie versteckt das Popup-Fenster und setzt die Werte der Eingabefelder zurück.
 * ====================================================================================================
 */
export function resetAddContactForm() {
    addClass('addcontactpopup');
    ID_INPUT_addPersion.forEach((id) => document.getElementById(id).value = '');
};

/**
 * Verbirgt die Kontaktkarte und zugehörige Informationen,
 * indem die Klasse "d-none" zu den angegebenen Elementen hinzugefügt wird.
 * ====================================================================================================
 * Diese Funktion fügt der Liste von Elementen, die in `ID_dnone` angegeben sind,
 * die CSS-Klasse "d-none" hinzu. Dadurch werden diese Elemente im Layout ausgeblendet,
 * um sie vorübergehend nicht anzuzeigen.
 * ====================================================================================================
 * @returns {void}
 * ====================================================================================================
 */
export function dnonePersionCard() {
    ID_dnonePersionCard.forEach((elementID) => document.getElementById(elementID).classList.add('d-none'));
};

/**
 * Schließt das Bearbeitungspopup für einen Kontakt und leert die Eingabefelder.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, um das Bearbeitungspopup zu verstecken, nachdem
 * der Benutzer die Bearbeitung eines Kontakts abgeschlossen hat oder abbricht.
 * Sie setzt alle Eingabefelder im Popup zurück.
 * ====================================================================================================
 */
export function resetEditContactForm() {
    addClass('editcontactpopup');
    ID_editPersion.forEach((id) => document.getElementById(id).value = '');
};

/**
 * Fügt eine spezifische CSS-Klasse einem Element Hinzu.
 * ====================================================================================================
 * Diese Funktion sucht ein HTML-Element anhand seiner ID und fügt die angegebene
 * CSS-Klasse hinzu.
 * ====================================================================================================
 * @param {string} id Die ID des Elements, dem die Klasse hinzugefügt werden soll.
 * ====================================================================================================
 */
function addClass(id) {
    document.getElementById(id).classList.add('d-nonepopup');
};