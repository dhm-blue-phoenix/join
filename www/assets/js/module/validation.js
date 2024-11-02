import { initValidation } from '../../formTesting/inputValidation.js';


const msgErrIds = {
    'pw': 'msgErrPw',
    'title': 'msgErrTitle',
    'description': 'msgErrDes',
    'date': 'msgErrDate',
    'addPersonName': 'msgErrAddName',
    'addPersonEmail': 'msgErrAddEmail',
    'addPersonTel': 'msgErrAddTel',
    'editPersonName': 'msgErrEditName',
    'editPersonEmail': 'msgErrEditEmail',
    'editPersonTel': 'msgErrEditTel'
};


/**
 * Validates a list of form fields.
 *
 * This function checks whether all specified fields are valid
 * by calling the `validateField` function for each field.
 *
 * @param {Array<{ id: string, type: string, value: any }>} fieldsToValidate - 
 * An array of objects representing the fields to be validated.
 * Each object should have the following properties:
 *   - id: The ID of the HTML element.
 *   - type: The type of the field (e.g., 'text', 'email').
 *   - value: The current value of the field.
 *
 * @returns {boolean} Returns true if all fields are valid, otherwise false.
 */
const validateTaskForm = (fieldsToValidate) => {    
    resetValidateField(fieldsToValidate);
    const isValid = fieldsToValidate.every(({ id, type, value }) => {
        const valid = validateField(id, type, value);
        return valid;
    });
    return isValid;
};


/**
 * Resets the validation state of the specified fields.
 *
 * This function clears the border color and error messages for each
 * field specified in the `fields` array. It retrieves the corresponding
 * DOM elements by their IDs and resets their styles and text content.
 *
 * @param {Array<{id: string}>} fields - An array of objects representing fields to reset. 
 * Each object should contain an 'id' property, which corresponds to the ID of the DOM element.
 *
 * @returns {void} This function does not return a value.
 */
const resetValidateField = (fields) => {
    fields.forEach(({ id }) => {
        const element = document.getElementById(id);        
        const msg = document.getElementById(msgErrIds[id]);        
        if(!element || !msg) return;
        element.style.borderColor = '';
        msg.textContent = '';
    });
};


/**
 * Validates a single form field.
 *
 * This function checks the value of a field based on its type
 * and sets the border color of the field to red if the validation fails.
 *
 * @param {string} fieldId - The ID of the HTML element to be validated.
 * @param {string} type - The type of the field (e.g., 'text', 'email').
 * @param {any} value - The current value of the field to be validated.
 *
 * @returns {boolean} Returns true if the field is valid, otherwise false.
 */
const validateField = (fieldId, type, value) => {
    const result = initValidation(type, value);
    if (!result.status) {
        document.getElementById(fieldId).style.borderColor = 'red';
        document.getElementById(msgErrIds[fieldId]).style.display = 'block';
        document.getElementById(msgErrIds[fieldId]).textContent = result.msg;        
        return false;
    };
    return true;
};


export { validateTaskForm };