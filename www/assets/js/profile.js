import { extractInitials, loadUserIdFromStored, findUserById } from './module/modules.js';


const idUsername = document.getElementById('username');
const idUsernamenote = document.getElementById('usernamenote');
const idAccount = document.getElementById('account');


/**
 * Initializes the user profile after the DOM content is fully loaded.
 * Adds an event listener to the document to call the loadUserName() function when the DOM content is fully loaded.
 * @listens document#DOMContentLoaded - The event that is triggered when the DOM content is fully loaded.
 * @async
 * @throws {Error} If no user ID is found, username cannot be loaded, or an error occurs during processing.
 * @returns {void}
*/
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const username = await loadUserName();
        const usernamenote = await loadUserName();
        const initials = extractInitials(username);
        if (idAccount) idAccount.textContent = initials;
        if (idUsername) idUsername.textContent = username;
        if (idUsernamenote) idUsernamenote.textContent = usernamenote;
    } catch (err) {
        console.error(`An error occurred while loading the user profile! ${err}`);
    };
});


/**
 * Loads the username based on the stored user ID.
 * Retrieves the user ID from the loadUserIdFromStored() function and searches for the username using the user ID.
 * @async
 * @returns {string} The username of the found user.
 * @throws {Error} If the user is not found.
 */
async function loadUserName() {
    const userID = loadUserIdFromStored();
    const userData = await findUserById(userID);
    return userData[2];
};