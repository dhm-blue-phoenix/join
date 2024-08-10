const ID_dnone = ['dnonePersonCard', 'dnoneInfoHeadline', 'dnoneInfo'];

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
    ID_dnone.forEach((elementID) => document.getElementById(elementID).classList.add('d-none'));
}