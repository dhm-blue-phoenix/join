import { fetchUserData } from './showUserCard.js';
import { showContactDetails } from '../showCardDetails.js';


/**
 * Fetches user data and displays user contact details.
 * @async
 * @function showUserDetails
 * @returns {Promise<void>} 
 * @throws {Error} If fetching user data fails.
 */
async function showUserDetails() {
    try {
        const [short, name, email] = await fetchUserData();
        showContactDetails('user', name, email, '', short);
    } catch (err) {
        console.error('An error occurred in showUserDetails:', err);
    };
};


export { showUserDetails };