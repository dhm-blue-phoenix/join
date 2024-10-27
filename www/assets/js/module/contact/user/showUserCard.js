import { loadUserIdFromStored, extractInitials } from '../../modules.js';
import { retrievingData } from '../../dataResponse.js';


const idUserCard = document.getElementById('userCard');
const idUserShort = document.getElementById('userShort');
const idUserName = document.getElementById('userName');
const idUserEmail = document.getElementById('userEmail');


/**
 * Displays the user card with fetched user data.
 * Hides the user card if the user is a guest.
 * @returns {Promise<void>}
 */
async function showUserCard() {
    try {
        const [short, name, email] = await fetchUserData();
        if (name === 'Guest') {
            idUserCard.style.display = 'none';
            return;
        };
        const shortname = extractInitials(name);
        renderUserToHtml(short, shortname, name, email);
    } catch (err) {
        console.error('An error occurred in showUserCard!', err);
    };
};


/**
 * Fetches user data from the server.
 * @returns {Promise<Array<string>>} An array containing short name, full name, and email.
 */
async function fetchUserData() {
    const userId = await loadUserIdFromStored();
    const user = await retrievingData(`users/${userId}/`);
    const userData = [user[4], user[2], user[1]];
    return userData;
};


/**
 * Renders the user information to the HTML elements.
 * @param {string} short - The short name of the user.
 * @param {string} shortname - The initials of the user.
 * @param {string} name - The full name of the user.
 * @param {string} email - The email address of the user.
 */
const renderUserToHtml = (short, shortname, name, email) => {
    setUserShort(short, shortname);
    idUserName.textContent = name;
    idUserEmail.textContent = email;
    setAttributeForUserCard();
};


/**
 * Sets the user's short name and background color.
 * @param {string} short - The short name of the user.
 * @param {string} shortname - The initials of the user.
 */
const setUserShort = (short, shortname) => {
    idUserShort.style.backgroundColor = short;
    idUserShort.id = 'nameShortcut';
    idUserShort.textContent = shortname;
};


/**
 * Sets the attributes for the user card.
 */
const setAttributeForUserCard = () => {
    idUserCard.setAttribute('data-key', 'user');
    idUserCard.setAttribute('id', 'user');
};


export { showUserCard, fetchUserData };