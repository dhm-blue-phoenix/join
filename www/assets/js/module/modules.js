import { loadContactsId } from './dataResponse.js';

const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

/**
 * Lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * ====================================================================================================
 * Diese Funktion versucht, die Benutzer-ID zuerst aus dem lokalen Speicher (`localStorage`) und 
 * anschließend aus der Session (`sessionStorage`) zu laden. Wenn keine Benutzer-ID gefunden wird, 
 * wird ein Fehler ausgelöst.
 * ====================================================================================================
 * @returns {string} Die Benutzer-ID, wenn sie im lokalen Speicher oder in der Session gefunden wurde.
 * @throws {Error} Wenn keine Benutzer-ID gefunden wird.
 * ====================================================================================================
 */
export function loadUserIdFromStored() {
    if (storedLocalUserID) return storedLocalUserID;
    if (storedSessionUserID) return storedSessionUserID;
    throw new Error('User ID wurde nicht gefunden!');
}

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