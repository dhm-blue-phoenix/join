/**
 * Extrahiert die Initialen aus einem Benutzernamen.
 * ====================================================================================================
 * Diese Funktion teilt den Benutzernamen in einzelne Namensteile auf, extrahiert den
 * ersten Buchstaben jedes Namens und gibt diese als Initialen zurück.
 * ====================================================================================================
 * @param {String} username Der Benutzername.
 * @returns {String} Die Initialen des Benutzers.
 * ====================================================================================================
 */
export function extractInitials(username) {
    return username.split(' ').map(namePart => namePart[0]).join('').toUpperCase();
}