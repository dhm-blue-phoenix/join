let message = '';


/**
 * Validates a text input.
 *
 * This function checks if the text contains only letters and spaces,
 * and whether it meets the length requirements of 5 to 20 characters.
 *
 * @param {string} text - The text to validate.
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and message.
 */
const validateTitle = (text) => {
    if (!/^[a-zA-ZäöüÄÖÜß\s-]+$/.test(text)) {
        return { status: false, msg: 'Title can only contain letters, including German characters, spaces, and hyphens.' };
    };
    if (text.length < 5 || text.length > 60) {
        return { status: false, msg: 'Title must be between 5 and 60 characters long.' };
    };
    return { status: true };
};



/**
 * Validates a description input.
 *
 * This function checks if the description is empty and,
 * if not, verifies that it is between 10 and 500 characters long
 * and contains only valid characters.
 *
 * @param {string} description - The description to validate.
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and message.
 */
const validateDescription = (description) => {
    if (description.length === 0) return { status: true };
    if (!/^[\w\s.,!?'"äöüÄÖÜß-]{1,500}$/.test(description)) {
        return { status: false, msg: 'Description must be between 1 and 500 characters and can include letters, numbers, spaces, and certain punctuation.' };
    };
    return { status: true };
};


/**
 * Validates a name input.
 *
 * This function checks if the name contains only letters and spaces.
 *
 * @param {string} name - The name to validate.
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and message.
 */
const validateName = (name) => {
    if (!/^[a-zA-ZäöüÄÖÜß\s-]+$/.test(name)) {
        return { status: false, msg: 'Name can only contain letters, including German characters, spaces, and hyphens.' };
    };
    return { status: true };
};


/**
 * Validates an email address.
 *
 * This function checks if the email is in a valid format
 * (e.g., example@example.com).
 *
 * @param {string} email - The email to validate.
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and message.
 */
const validateEmail = (email) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|de|at|org)$/.test(email)) {
        return { status: false, msg: 'Email must be a valid format (e.g., example@example.com).' };
    };
    return { status: true };
};


/**
 * Validates a password.
 *
 * This function checks if the password meets the required criteria:
 * at least 8 characters long, includes letters, numbers, and special characters.
 *
 * @param {string} password - The password to validate.
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and message.
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
 * This function checks if the telephone number is between 10 and 15 digits long.
 *
 * @param {string} tel - The telephone number to validate.
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and message.
 */
const validateTel = (tel) => {
    if (!/^\d{10,15}$/.test(tel)) {
        return { status: false, msg: 'Telephone must be between 10 and 15 digits long.' };
    };
    return { status: true };
};


/**
 * Validates that the selected date is not in the past.
 *
 * @param {string} date - The date to validate in 'YYYY-MM-DD' format.
 * @returns {{status: boolean, msg: string}} Returns an object containing the status and message.
 */
const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate < today) {
        return { status: false, msg: 'Date must not be in the past.' };
    };
    return { status: true };
};


/**
 * Validates the selected category.
 *
 * This function checks if the provided category is either 'User Story'
 * or 'Technical Task'. If the category is valid, it returns a success status.
 *
 * @param {string} category - The category to validate.
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and message.
 */
const validateCategory = (category) => {
    if (category === 'User Story' || category === 'Technical Task') {
        return { status: true };
    };
    return { status: false, msg: 'User Story or Technical Task must be selected.' };
};


/**
 * Validates the value of a given field based on its name.
 *
 * @param {string} fieldName - The name of the field to validate. 
 * Possible values include 'text', 'des', 'name', 'email', 'pw', 'tel', and 'date'.
 * @param {any} value - The value of the field that needs to be validated.
 *
 * @returns {{status: boolean, msg: string}} Returns an object containing the validation status and a message.
 */
const validateField = (fieldName, value) => {
    value = value.trim();
    switch (fieldName) {
        case 'title':
            return validateTitle(value);
        case 'des':
            return validateDescription(value);
        case 'name':
            return validateName(value);
        case 'email':
            return validateEmail(value);
        case 'pw':
            return validatePassword(value);
        case 'tel':
            return validateTel(value);
        case 'date':
            return validateDate(value);
        case 'category':
            return validateCategory(value);
        default:
            return { status: true, msg: '' };
    };
};


/**
 * Initializes the validation process for a given field.
 *
 * @param {string} field - The name of the field to validate.
 * @param {string} string - The value to validate for the specified field.
 *
 * @returns {{status: boolean, msg: string}} An object containing the validation status and a message.
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