import { validateTaskForm, msgErrIds } from './validate.js';


const validFieldIds = {
    'addTask': ['title', 'description', 'date', 'category'],
    'contactsAdd': ['addPersonName', 'addPersonEmail', 'addPersonTel'],
    'contactsEdit': ['editPersonName', 'editPersonEmail', 'editPersonTel']
};


let validPage;


/**
 * Adds input event listeners to elements that require validation on the current page.
 *
 * @param {string} page - The identifier of the page type to validate (e.g., 'addTask', 'contactsAdd', 'contactsEdit').
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
 * Handles input events and triggers validation for the modified field.
 *
 * @param {Event} event - The input event containing information about the changed field.
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
 * Maps input types to their respective valid field identifiers based on the current page.
 *
 * @param {string} inputType - The type of input field (e.g., 'text', 'textarea', 'date', etc.).
 * @param {string} text - The value of the input field.
 * @returns {{ id: string, type: string, value: string } | null} - An object representing the validated field or null if no mapping exists.
 */
const checkFieldsToType = (inputType, text) => {
    const typeMapping = {
        '/board.html': {
            'text': [validFieldIds[validPage][0], 'title'],
            'textarea': [validFieldIds[validPage][1], 'description'],
            'date': [validFieldIds[validPage][2], 'date'],
            'select-one': [validFieldIds[validPage][3], 'category']
        },
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
    console.log('%c' + '[DEBUG]', 'color: #f40ec2;', currentPage, typeMapping)
    const currentField = typeMapping[currentPage][inputType];
    return { id: currentField[0], type: currentField[1], value: text };
};


export {
    addEventToValidateFields
};