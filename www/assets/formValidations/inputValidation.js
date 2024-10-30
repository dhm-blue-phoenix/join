let message = '';


const validateText = (text) => /^[a-zA-Z0-9\s]+$/.test(text);
const validateDescription = (description) => /^[\w\s.,!?'"-]{10,500}$/.test(description);
const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|de)$/.test(email);
const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
const validateTel = (tel) => /^\d{10,15}$/.test(tel);


/**
 * Validates the value of a given field based on its name.
 *
 * This function determines the appropriate validation function to call
 * based on the field name provided. It returns the result of the validation.
 *
 * @param {string} fieldName - The name of the field to validate. 
 * Possible values include 'text', 'des', 'name', 'email', 'pw', and 'tel'.
 * @param {any} value - The value of the field that needs to be validated.
 *
 * @returns {boolean} Returns true if the value is valid; otherwise, false.
 */
const validateField = (fieldName, value) => {
    value = value.trim();
    switch (fieldName) {
        case 'text':
            return validateText(value);
        case 'des':
            if(value === '') return true;
            return validateDescription(value);
        case 'name':
            return validateName(value);
        case 'email':
            return validateEmail(value);
        case 'pw':
            return validatePassword(value);
        case 'tel':
            return validateTel(value);
        default:
            return true;
    };
};


/**
 * Initializes the validation process for a given field.
 *
 * This function calls the `validateField` function to check the validity
 * of the field's value and sets an error message if the validation fails.
 *
 * @param {string} field - The name of the field to validate.
 * @param {string} string - The value to validate for the specified field.
 *
 * @returns {{status: boolean, msg: string}} An object containing the validation
 * status and a message. The `status` is true if the value is valid, 
 * and `msg` contains an error message if it is invalid.
 */
function initValidation(field, string) {
    message = '';
    const status = validateField(field, string);
    status || (message = 'Ungültige Eingabe!');
    return {
        'status': status,
        'msg': message
    };
};


export { initValidation };