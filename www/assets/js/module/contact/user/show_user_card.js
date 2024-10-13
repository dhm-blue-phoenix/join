import { loadUserIdFromStored, extractInitials } from '../../modules.js';
import { retrievingData } from '../../dataResponse.js';

const ID_USER_CARD = document.getElementById('userCard');
const ID_USER_SHORT = document.getElementById('userShort');
const ID_USER_NAME = document.getElementById('userName');
const ID_USER_EMAIL = document.getElementById('userEmail');

async function showUserCard() {
    try {
        const [short, name, email] = await fetchUserData();
        const shortname = extractInitials(name);
        renderUserToHtml(short, shortname, name, email);
    } catch (err) {
        console.error('Bei showUserCard ist ein fehler aufgetrethen!');
    };
};

async function fetchUserData() {
    const userId = await loadUserIdFromStored();
    const user = await retrievingData(`users/${userId}/`);
    const userData = [user[4], user[2], user[1]];
    return userData;
};

const renderUserToHtml = (short, shortname, name, email) => {
    userShort(short, shortname);
    ID_USER_NAME.textContent = name;
    ID_USER_EMAIL.textContent = email;
    setAttributeForUserCart();  
};

const userShort = (short, shortname) => {
    ID_USER_SHORT.style.backgroundColor = short;
    ID_USER_SHORT.style.borderRadius = '100%';
    ID_USER_SHORT.style.padding = '10px';
    ID_USER_SHORT.textContent = shortname;
};

const setAttributeForUserCart = () => {
    ID_USER_CARD.setAttribute('data-key', 'user');
};

export { showUserCard };