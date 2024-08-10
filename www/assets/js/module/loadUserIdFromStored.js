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