import {
    initAddTask,
    addSubTaskToList,
    editItem,
    deleteItem,
    taskForm,
    loadNextPage
} from '../../initAddTask.js';
import { validateTaskForm, msgErrIds } from '../validation.js';


const idFormAddTask = document.getElementById('formAddTask');
const idBtnAddSubtask = document.getElementById('addSubTask');
const idBtnUrgent = document.getElementById('urgent');
const idBtnMedium = document.getElementById('medium');
const idBtnLow = document.getElementById('low');
const idBtnCancel = document.getElementById('taskbuttonCancel');
const validFieldIds = ['title', 'description', 'date', 'category'];


let lastBtnPrio = 'medium';


/**
 * Initializes event listener for form submission.
 */
const addEventFromAddTask = () => {
    idFormAddTask.removeEventListener('submit', initAddTask);
    idFormAddTask.addEventListener('submit', initAddTask);
};


/**
 * Initializes event listener for urgent button click.
 */
const addEventFromBtnUrgent = () => {
    idBtnUrgent.removeEventListener('click', handleUrgentClick);
    idBtnUrgent.addEventListener('click', handleUrgentClick);
};


/**
 * Initializes event listener for medium button click.
 */
const addEventFromBtnMedium = () => {
    idBtnMedium.removeEventListener('click', handleMediumClick);
    idBtnMedium.addEventListener('click', handleMediumClick);
};


/**
 * Initializes event listener for low button click.
 */
const addEventFromBtnLow = () => {
    idBtnLow.removeEventListener('click', handleLowClick);
    idBtnLow.addEventListener('click', handleLowClick);
};


/**
 * Initializes event listener for add subtask button click.
 */
const addEventFromAddSubTask = () => {
    idBtnAddSubtask.removeEventListener('click', addSubTaskToList);
    idBtnAddSubtask.addEventListener('click', addSubTaskToList);
};


/**
 * Initializes event listener for deleting an item from assigned list.
 * @param {number} number - The index number of the item.
 */
const addEventFromDelListAssigned = (number) => {
    const idBtmAssignedListDel = document.getElementById('list_assigned_btn_delete' + number);
    idBtmAssignedListDel.removeEventListener('click', deleteItem);
    idBtmAssignedListDel.addEventListener('click', deleteItem);
};


const clearAddTaskForms = () => {
    let selectedPersonContainer = document.getElementById('selectedPerson');
    let subtaskListContainer = document.getElementById('subtask-list');
    console.log(subtaskListContainer);
};


/**
 * Initializes event listener for editing a subtask from list.
 * @param {number} number - The index number of the subtask.
 */
const addEventFromEditListSubTask = (number) => {
    const idBtmSubtaskListEdit = document.getElementById('list_subtask_btn_edit' + number);
    idBtmSubtaskListEdit.removeEventListener('click', editItem);
    idBtmSubtaskListEdit.addEventListener('click', editItem);
};


/**
 * Initializes event listener for deleting a subtask from list.
 * @param {number} number - The index number of the subtask.
 */
const addEventFromDelListSubTask = (number) => {
    const idBtmSubtaskListDel = document.getElementById('list_subtask_btn_delete' + number);
    idBtmSubtaskListDel.removeEventListener('click', deleteItem);
    idBtmSubtaskListDel.addEventListener('click', deleteItem);
};


/**
 * Initializes event listener for cancel button click.
 */
const addEventFromCancelBtn = () => {
    idBtnCancel.removeEventListener('click', loadNextPage);
    idBtnCancel.addEventListener('click', loadNextPage);
};


/**
 * Handles click event on urgent button.
 */
const handleUrgentClick = () => {
    setBtnPrio('urgent');
};


/**
 * Handles click event on medium button.
 */
const handleMediumClick = () => {
    setBtnPrio('medium');
};


/**
 * Handles click event on low button.
 */
const handleLowClick = () => {
    setBtnPrio('low');
};


/**
 * Sets priority button styling and task form priority.
 * @param {string} prio - Priority value ('urgent', 'medium', 'low').
 */
const setBtnPrio = (prio) => {
    lastBtn(prio);
    const prioButton = document.getElementById(prio);
    const imgElement = prioButton.querySelector('img');
    if (imgElement) {
        imgElement.remove();
    };
    const newImgElement = document.createElement('img');
    newImgElement.src = `./resources/symbols/Prio${prio}Activ.png`;
    prioButton.appendChild(newImgElement);
    prioButton.classList.add(prio);
    prioButton.disabled = true;
    taskForm.prio = prio;
    lastBtnPrio = prio;
};
// newImgElement.src = `./resources/symbols/Prio${prio}Activ.png`;


/**
 * Resets styling and enables the last used priority button.
 */
const lastBtn = (prio) => {
    const lastButton = document.getElementById(lastBtnPrio);
    if (lastButton) {
        const imgElement = lastButton.querySelector('img');
        if (imgElement) {
            imgElement.remove();
        };
        const newImgElement = document.createElement('img');
        newImgElement.src = `./resources/symbols/Prio${lastBtnPrio}.png`;
        newImgElement.alt = '';
        lastButton.appendChild(newImgElement);
        lastButton.classList.remove(lastBtnPrio);
        lastButton.disabled = false;
    };
};


/**
 * Adds event listeners to the specified elements for validation.
 *
 * @param {string[]} validFieldIds - An array of element IDs to validate.
 */
const addEventToValidateFields = () => {
    validFieldIds.forEach((field) => {
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
        'text': validFieldIds[0],
        'textarea': validFieldIds[1],
        'date': validFieldIds[2],
        'select-one': validFieldIds[3]
    };
    const currentField = typeMapping[inputType];
    return { id: currentField, type: currentField, value: text };
};


export {
    addEventFromAddTask,
    addEventFromBtnUrgent,
    addEventFromBtnMedium,
    addEventFromBtnLow,
    addEventFromAddSubTask,
    addEventFromDelListAssigned,
    addEventFromEditListSubTask,
    addEventFromDelListSubTask,
    addEventFromCancelBtn,
    setBtnPrio,
    addEventToValidateFields
};