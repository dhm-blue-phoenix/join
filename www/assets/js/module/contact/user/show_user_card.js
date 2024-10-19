import { loadUserIdFromStored, extractInitials } from '../../modules.js';
import { retrievingData } from '../../dataResponse.js';

const ID_USER_CARD = document.getElementById('userCard');
const ID_USER_SHORT = document.getElementById('userShort');
const ID_USER_NAME = document.getElementById('userName');
const ID_USER_EMAIL = document.getElementById('userEmail');

/**
 * Zeigt die Benutzerkarte an, indem Benutzerdaten abgerufen und angezeigt werden.
 * ====================================================================================================
 * @async
 * @function
 * @returns {Promise<void>} - Führt die Anzeige der Benutzerkarte aus.
 * ====================================================================================================
 */
async function showUserCard() {
    try {
        const [short, name, email] = await fetchUserData();
        if (name === 'Guest') return;
        const shortname = extractInitials(name);
        renderUserToHtml(short, shortname, name, email);
    } catch (err) {
        console.error('Bei showUserCard ist ein fehler aufgetrethen!');
    };
};

/**
 * Ruft die Benutzerdaten ab, basierend auf der gespeicherten Benutzer-ID.
 * ====================================================================================================
 * @async
 * @function
 * @returns {Promise<Array>} - Ein Array, das Kurzinfo, Name und E-Mail des Benutzers enthält.
 * ====================================================================================================
 */
async function fetchUserData() {
    const userId = await loadUserIdFromStored();
    const user = await retrievingData(`users/${userId}/`);
    const userData = [user[4], user[2], user[1]];
    return userData;
};

/**
 * Rendert die Benutzerdaten im HTML-Dokument.
 * ====================================================================================================
 * @function
 * @param {string} short - Kurzbeschreibung des Benutzers (Farbe o.ä.).
 * @param {string} shortname - Initialen des Benutzernamens.
 * @param {string} name - Der volle Name des Benutzers.
 * @param {string} email - Die E-Mail-Adresse des Benutzers.
 * ====================================================================================================
 */
const renderUserToHtml = (short, shortname, name, email) => {
    userShort(short, shortname);
    ID_USER_NAME.textContent = name;
    ID_USER_EMAIL.textContent = email;
    setAttributeForUserCart();  
};

/**
 * Aktualisiert das HTML-Element zur Anzeige der Benutzerinitialen.
 * ====================================================================================================
 * @function
 * @param {string} short - Kurzbeschreibung (meist Farbe) für den Benutzer.
 * @param {string} shortname - Initialen des Benutzernamens.
 * ====================================================================================================
 */
const userShort = (short, shortname) => {
    ID_USER_SHORT.style.backgroundColor = short;
    ID_USER_SHORT.id = 'nameShortcut';
    ID_USER_SHORT.textContent = shortname;
};


/**
 * Setzt spezielle Attribute für das HTML-Element der Benutzerkarte.
 * ====================================================================================================
 * @function
 * ====================================================================================================
 */
const setAttributeForUserCart = () => {
    ID_USER_CARD.setAttribute('data-key', 'user');
    ID_USER_CARD.setAttribute('id', 'user');
};

export { showUserCard, fetchUserData };