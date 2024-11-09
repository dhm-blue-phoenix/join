import { validateTaskForm, msgErrIds } from './validate.js';
const validFieldIds = {
    'addTask': ['title', 'description', 'date', 'category'],
    'contactsAdd': ['addPersonName', 'addPersonEmail', 'addPersonTel'],
    'contactsEdit': ['editPersonName', 'editPersonEmail', 'editPersonTel']
};
let validPage;

/**
 * Adds event listeners to the specified elements for validation.
 *
 * @param {string[]} validFieldIds - An array of element IDs to validate.
 */
const addEventToValidateFields = (page) => {
    validPage = page;
    validFieldIds[page].forEach((field) => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener("input", validateFieldsFromInput);
        };
    });
};


/**
 * Validates a field based on its input type and value.
 *
 * @param {Event} event - The input event.
 */
const validateFieldsFromInput = (event) => {
    const inputType = event.target.type;
    const text = event.target.value;
    const validField = checkFieldsToType(inputType, text);
    if (validField) {
        const isValid = validateTaskForm([validField]);
        if (isValid && msgErrIds[validField.type]) {
            document.getElementById(msgErrIds[validField.type]).style.borderColor = "";
        };
    };
};


/**
 * Maps input types to corresponding valid field IDs.
 *
 * @param {string} inputType - The input type.
 * @param {string} text - The input value.
 * @returns {{ id: string, type: string, value: string } | null} - The corresponding valid field object or null if not found.
 */
const checkFieldsToType = (inputType, text) => {
    const typeMapping = {
        '/addTask.html': {
            'text': [validFieldIds[validPage][0], 'title'],
            'textarea': [validFieldIds[validPage][1], 'description'],
            'date': [validFieldIds[validPage][2], 'date'],
            'select-one': [validFieldIds[validPage][3], 'category']
        },
        '/contacts.html': {
            'text': [validFieldIds[validPage][0], 'name'],
            'email': [validFieldIds[validPage][1], 'email'],
            'number': [validFieldIds[validPage][2], 'tel'],
        }
    };
    const currentField = typeMapping[currentPage][inputType];
    return { id: currentField[0], type: currentField[1], value: text };
};


export {
    addEventToValidateFields
};