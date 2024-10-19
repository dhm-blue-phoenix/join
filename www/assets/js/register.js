import { loadUserData } from './module/modules.js';
import { uploadPatchData } from './module/dataResponse.js';


const idFormRegister = document.getElementById('signupFrom');
const idInputName = document.getElementById('inputName');
const idInputEmail = document.getElementById('inputEmail');
const idInputPw = document.getElementById('inputPassword');
const idInputCfpw = document.getElementById('inputConfirmPassword');
const idErrPw = document.getElementById('passwordError');
const idErrEmail = document.getElementById('emailError');
const idSignedUpContainerBG = document.getElementById('signedUpContainerBG');
const idSignedUpContainer = document.getElementById('signedUpContainer');


/**
 * Initializes the registration process by adding an event listener to the form.
 */
document.addEventListener('DOMContentLoaded', async () => {
  idFormRegister.removeEventListener('submit', initRegister);
  idFormRegister.addEventListener('submit', initRegister);
});


/**
 * Handles the registration process by validating and submitting the form data.
 * @param {Event} event The event triggered on form submission.
 */
async function initRegister(event) {
  try {
    event.preventDefault();
    resetMessages();
    const formData = loadFormData();
    if (formData.pw !== formData.cfpw) return validatePassword();
    const userData = await loadUserData(formData.email);
    if (userData) return validateUserData();
    await uploadData(formData);
  } catch (err) {
    console.error(`Error during registration initialization: ${err}`);
  };
};


/**
 * Uploads user data and shows a success message.
 * @param {Object} formData The form data to upload.
 * @param {string} formData.email The user's email.
 * @param {string} formData.name The user's name.
 * @param {string} formData.pw The user's password.
 */
async function uploadData(formData) {
  await uploadPatchData('users', {
    email: formData.email,
    name: formData.name,
    password: formData.pw,
    contacts: { none: '' },
    shortcutBackColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
  });
  signedUp(formData);
};


/**
 * Shows success message and redirects to homepage.
 * @param {Object} formData The form data for redirection.
 * @param {string} formData.email The user's email.
 * @param {string} formData.pw The user's password.
 */
const signedUp = (formData) => {
  idSignedUpContainerBG.classList.remove('d-nonepopup');
  idSignedUpContainer.appendChild(createMessage());
  setTimeout(() => {
    window.location.href = `./index.html?formEmail=${encodeURIComponent(formData.email)}&formPw=${encodeURIComponent(formData.pw)}`;
  }, 2000);
};


/**
 * Displays an error if the user already exists.
 */
const validateUserData = () => {
  idErrEmail.textContent = 'User already exists!';
  idErrEmail.style.display = 'block';
};


/**
 * Displays an error if passwords don't match.
 */
const validatePassword = () => {
  idErrPw.textContent = 'Passwords do not match!';
  idErrPw.style.display = 'block';
};


/**
 * Resets all error and success messages.
 */
const resetMessages = () => {
  resetErrorMessages();
  idSignedUpContainer.innerHTML = '';
};


/**
 * Resets individual error messages.
 */
const resetErrorMessages = () => {
  idErrPw.style.display = 'none';
  idErrEmail.style.display = 'none';
};


/**
 * Loads data from the form fields.
 * @returns {Object} The form data.
 */
const loadFormData = () => ({
  name: idInputName.value,
  email: idInputEmail.value,
  pw: idInputPw.value,
  cfpw: idInputCfpw.value,
});


/**
 * Creates a message indicating successful registration.
 * @returns {HTMLElement} The message element.
 */
export const createMessage = () => {
  const message = document.createElement('p');
  message.textContent = 'You have successfully registered.';
  return message;
};