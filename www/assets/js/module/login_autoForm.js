import { findUserById } from './modules.js';


const storedAutoLogin = localStorage.getItem('autoLogin');
const storedUserID = localStorage.getItem('userID');
const ID_inputEmail = document.getElementById('userEmail');
const ID_inputPW = document.getElementById('userPassword');
const ID_inputCheckbox = document.getElementById('inputCheckbox');


/**
 * Fills the login form with user data retrieved from various sources.
 * @async
 */
export async function autoForm() {
    const encodedUserData = loadUserDataFromURL();
    let userData;
    userData = getDataFromUrl(encodedUserData, userData);
    if (storedAutoLogin === 'true') userData = await getDataFromAutoLogin();
    fillForm(userData);
};


/**
 * Retrieves user data from the URL parameters.
 * @param {Array} encode - Array containing encoded email and password.
 * @returns {Array} - Array containing decoded email and password.
 */
function getDataFromUrl(encode) {
    ID_inputCheckbox.checked = false;
    return [decodeURIComponent(encode[0]), decodeURIComponent(encode[1])];
};


/**
 * Retrieves user data from auto-login storage.
 * @returns {Array} - Array containing user email and password.
 */
async function getDataFromAutoLogin() {
    const user = await findUserById(storedUserID);
    ID_inputCheckbox.checked = true;
    return [user[1], user[3]];
};


/**
 * Fills the login form fields with provided user data.
 * @param {Array} userData - Array containing user email and password.
 */
const fillForm = (userData) => {
    if (userData[0] === 'null' || userData[1] === 'null') userData = ['', ''];
    ID_inputEmail.value = userData[0];
    ID_inputPW.value = userData[1];
};


/**
 * Loads user email and password from URL parameters.
 * @returns {Array} - Array containing encoded email and password.
 */
const loadUserDataFromURL = () => {
    const encodeEmail = new URLSearchParams(window.location.search).get("formEmail");
    const encodePw = new URLSearchParams(window.location.search).get("formPw");
    return [encodeEmail, encodePw];
};