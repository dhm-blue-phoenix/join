import { fetchUserData } from './show_user_card.js';
import {showContactDetails } from '../show_card_details.js';

/**
 * Zeigt die Benutzerdetails an, indem die Daten asynchron abgerufen werden.
 * ====================================================================================================
 * Diese Funktion ruft die Benutzerdaten asynchron ab und zeigt die 
 * Kontaktinformationen des Benutzers an. Bei einem Fehler wird eine Nachricht 
 * in der Konsole ausgegeben.
 * ====================================================================================================
 * @async
 * @function showUserDetails
 * @returns {Promise<void>} Gibt nichts zurück, zeigt jedoch die Benutzerinformationen an.
 * @throws {Error} Wenn ein Fehler beim Abrufen der Benutzerdaten oder beim Anzeigen der Details auftritt.
 * ====================================================================================================
 */
async function showUserDetails() {
    try {
        const [short, name, email] = await fetchUserData();
        showContactDetails('user', name, email, '', short);
    } catch (err) {
        console.error('Bei showUserDetails ist ein Problem aufgetreten:', err);
    };
};

export { showUserDetails };