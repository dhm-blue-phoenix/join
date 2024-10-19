import { loadUserData } from './module/modules.js';
import { autoForm } from './module/login_autoForm.js';


const idFormLogin = document.getElementById('loginForm');
const idBtnGuestLogin = document.getElementById('guestloginbtn');
const idInputEmail = document.getElementById('userEmail');
const idInputPW = document.getElementById('userPassword');
const idInputCheckbox = document.getElementById('inputCheckbox');
const idErrEmail = document.getElementById('emailError');


/**
 * Initializes the event listeners once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', async () => {
    addEventFromLogin();
    addEventFromGuestLogin();
    await autoForm();
});


/**
 * Adds event listener for the login form.
 */
const addEventFromLogin = () => {
    idFormLogin.removeEventListener('submit', initLogin);
    idFormLogin.addEventListener('submit', initLogin);
};


/**
 * Adds event listener for the guest login button.
 */
const addEventFromGuestLogin = () => {
    idBtnGuestLogin.removeEventListener('click', initGuestLogin);
    idBtnGuestLogin.addEventListener('click', initGuestLogin);
};


/**
 * Initializes the guest login process.
 * @returns {Promise<void>}
 */
async function initGuestLogin() {
    await saveSessionUserID('-O0wPZV3YT41s7Ja0eKd', false);
    loadWindow();
};


/**
 * Initializes the login process.
 * @param {Event} event - The event triggered by the form submission.
 * @returns {Promise<void>}
 */
async function initLogin(event) {
    try {
        event.preventDefault();
        resetErrMessages();
        const statusCheckbox = idInputCheckbox.checked;
        const formData = await loadFormData();
        const user = await loadUserData(formData);
        if (user === undefined) return checkUser();
        checkStatusFromCheckbox(statusCheckbox, user);
        loadWindow();
    } catch (err) {
        console.error(`Error during login initialization: ${err}`);
    };
};


/**
 * Resets the error messages displayed to the user.
 */
const resetErrMessages = () => {
    idErrEmail.style.display = 'none';
};


/**
 * Displays an error message when the user is not found.
 */
const checkUser = () => {
    idErrEmail.textContent = 'User not found!';
    idErrEmail.style.display = 'block';
};


/**
 * Checks the status of the checkbox and saves the user ID accordingly.
 * @param {boolean} statusCheckbox - The checkbox status.
 * @param {Object} user - The user data.
 * @returns {Promise<void>}
 */
const checkStatusFromCheckbox = async (statusCheckbox, user) => {
    if (statusCheckbox) {
        await saveLocalUserID(user[0], true);
    } else {
        await saveSessionUserID(user[0], false);
    };
};


/**
 * Loads form data from the input fields.
 * @returns {{email: string, pw: string}} - The form data.
 */
const loadFormData = () => {
    return {
        email: idInputEmail.value,
        pw: idInputPW.value
    };
};


/**
 * Saves the user ID and auto-login status to local storage.
 * @param {string} userID - The user ID to save.
 * @param {boolean} autoLogin - The auto-login status.
 */
const saveLocalUserID = (userID, autoLogin) => {
    sessionStorage.removeItem('userID');
    localStorage.setItem('userID', userID);
    localStorage.setItem('autoLogin', autoLogin);
};


/**
 * Saves the user ID and auto-login status to session storage.
 * @param {string} userID - The user ID to save.
 * @param {boolean} autoLogin - The auto-login status.
 */
const saveSessionUserID = (userID, autoLogin) => {
    localStorage.removeItem('userID');
    sessionStorage.setItem('userID', userID);
    localStorage.setItem('autoLogin', autoLogin);
};


/**
 * Redirects the user to the summary page.
 */
const loadWindow = () => {
    localStorage.setItem('activNavBtn', 'nav-btn0');
    window.location.href = './summary.html';
};