import { loadContactsId } from './dataResponse.js';

/**
 * Lädt die Kontakt-ID basierend auf der E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion ruft die Kontakt-ID für den angegebenen Benutzer ab, indem sie die E-Mail-Adresse nutzt.
 * ====================================================================================================
 * func loadContactsId() - findet man in der './dataResponse.js'
 * ====================================================================================================
 * @async
 * @param {string} userID Die ID des Benutzers, zu dem der Kontakt gehört.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {Promise<string>} Die ID des Kontakts.
 * @throws {Error} Wenn ein Fehler beim Laden der Kontakt-ID auftritt.
 * ====================================================================================================
 */
export async function getContactId(userID, email) {
    return await loadContactsId(`users/${userID}/`, email);
}