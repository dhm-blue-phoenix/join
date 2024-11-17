let message = '';


/**
 * Validates the title input.
 *
 * Checks if the title consists only of letters, numbers, spaces, and hyphens (including German characters),
 * and if it is between 1 and 60 characters in length.
 *
 * @param {string} text - The title text to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateTitle = (text) => {
    if (!/^[a-zA-ZäöüÄÖÜß0-9\s-]+$/.test(text)) {
        return { status: false, msg: 'Title can only contain letters, numbers, German characters, spaces, and hyphens.' };
    };
    if (text.length < 1 || text.length > 60) {
        return { status: false, msg: 'Title must be between 1 and 60 characters long.' };
    };
    return { status: true };
};


/**
 * Validates general text input.
 *
 * Ensures the text only contains letters, spaces, and hyphens, and is between 5 and 60 characters long.
 *
 * @param {string} text - The text to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateText = (text) => {
    if (!/^[a-zA-ZäöüÄÖÜß0-9\s-]+$/.test(text)) {
        return { status: false, msg: 'Text can only contain letters, including German characters, spaces, and hyphens.' };
    };
    if (text.length < 0 || text.length > 60) {
        return { status: false, msg: 'Text must be between 5 and 60 characters long.' };
    };
    return { status: true };
};


/**
 * Validates a description input.
 *
 * Checks if the description is empty or meets the length requirement of up to 500 characters,
 * allowing letters, numbers, spaces, and certain punctuation.
 *
 * @param {string} description - The description to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateDescription = (description) => {
    if (description.length === 0) return { status: true };
    if (!/^[\w\s.,!?'"äöüÄÖÜß-]{1,500}$/.test(description)) {
        return { status: false, msg: 'Description must be between 500 characters and can include letters, numbers, spaces, and certain punctuation.' };
    };
    return { status: true };
};


/**
 * Validates a name input.
 *
 * Checks if the name field is not empty and only contains letters and spaces (including German characters).
 *
 * @param {string} name - The name to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateName = (name) => {
    if (name.length === 0) {
        return { status: false, msg: 'The field must not be empty!' };
    };
    if (!/^[a-zA-ZäöüÄÖÜß\s-]+$/.test(name)) {
        return { status: false, msg: 'Name can only contain letters, including German characters, spaces, and hyphens.' };
    };
    return { status: true };
};


/**
 * Validates an email address.
 *
 * Ensures the email is in a correct format (e.g., example@example.com) and is not empty.
 *
 * @param {string} email - The email to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateEmail = (email) => {
    if (email.length === 0) {
        return { status: false, msg: 'The field must not be empty!' };
    };
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|de|at|org)$/.test(email)) {
        return { status: false, msg: 'Email must be a valid format (e.g., example@example.com).' };
    };
    return { status: true };
};



/**
 * Validates a password.
 *
 * Ensures the password is at least 8 characters long, containing letters, numbers, and special characters.
 *
 * @param {string} password - The password to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validatePassword = (password) => {
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        return { status: false, msg: 'Password must be at least 8 characters long and include letters, numbers, and special characters.' };
    };
    return { status: true };
};


/**
 * Validates a telephone number.
 *
 * Checks if the telephone number is between 10 and 15 digits long and is not empty.
 *
 * @param {string} tel - The telephone number to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateTel = (tel) => {
    if (tel.length === 0) {
        return { status: false, msg: 'The field must not be empty!' };
    };
    if (!/^\d{10,15}$/.test(tel)) {
        return { status: false, msg: 'Telephone must be between 10 and 15 digits long.' };
    };
    return { status: true };
};


/**
 * Validates if the selected date is not in the past.
 *
 * @param {string} date - The date to validate in 'YYYY-MM-DD' format.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate < today) {
        return { status: false, msg: 'Date must not be in the past.' };
    };
    if (date.length === 0) {
        return { status: false, msg: 'Date must be specified.' };
    };
    return { status: true };
};



/**
 * Validates the selected category.
 *
 * Ensures the category is either 'User Story' or 'Technical Task'.
 *
 * @param {string} category - The category to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateCategory = (category) => {
    if (category === 'User Story' || category === 'Technical Task') {
        return { status: true };
    };
    return { status: false, msg: 'User Story or Technical Task must be selected.' };
};


/**
 * Validates a field based on its name and value.
 *
 * @param {string} fieldName - The name of the field to validate.
 * @param {string} value - The value of the field to validate.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
const validateField = (fieldName, value) => {
    const trimmedValue = value.trim();
    const validationMap = {
        text: validateText,
        title: validateTitle,
        description: validateDescription,
        name: validateName,
        email: validateEmail,
        pw: validatePassword,
        tel: validateTel,
        date: validateDate,
        category: validateCategory,
    };
    const validator = validationMap[fieldName];
    return validator ? validator(trimmedValue) : { status: true, msg: '' };
};


/**
 * Initializes the validation process for a specified field.
 *
 * @param {string} field - The name of the field to validate.
 * @param {string} string - The value to validate for the specified field.
 * @returns {{status: boolean, msg: string}} An object containing the validation status and message.
 */
function initValidation(field, string) {
    const { status, msg } = validateField(field, string);
    if (!status) {
        message = msg;
    };
    return {
        status,
        msg: message
    };
};


export { initValidation };