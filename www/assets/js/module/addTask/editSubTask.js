import { renderList, taskForm } from '../../initAddTask.js';
import { validateTaskForm } from '../validation.js';


let itemId = '';


/**
 * Activates edit mode for a subtask.
 *
 * @param {Event} event - The event triggered by clicking the edit button.
 */
const editItem = (event) => {
    const target = event.currentTarget;
    const key = target.getAttribute('key');
    const type = target.getAttribute('type');
    const subtaskInput = document.getElementById(`list_edit${key}`);
    itemId = `list_item${key}`;
    makeInputEditable(subtaskInput);
    hideEditAndDeleteButtons(key);
    const saveButton = createSaveButton(key, type, subtaskInput);
    appendSaveButtonToDOM(subtaskInput, saveButton);
    addBlurEventListener(subtaskInput, saveButton, key, type);
};


/**
 * Enables editing for a subtask input field.
 *
 * @param {HTMLInputElement} input - The subtask input field.
 */
const makeInputEditable = (input) => {
    input.classList.add('editsubtask');
    input.readOnly = false;
    input.focus();
};


/**
 * Hides edit and delete buttons for the subtask.
 *
 * @param {string} key - The subtask key.
 */
const hideEditAndDeleteButtons = (key) => {
    document.getElementById(`edit_${key}`).style.display = 'none';
    document.getElementById(`delete_${key}`).style.display = 'none';
};


/**
 * Creates a save button for the edited subtask.
 *
 * @param {string} key - The subtask key.
 * @param {string} type - The task type.
 * @param {HTMLInputElement} subtaskInput - The subtask input field.
 * @returns {HTMLButtonElement} The created save button.
 */
const createSaveButton = (key, type, subtaskInput) => {
    const saveButton = document.createElement('button');
    saveButton.textContent = '✔';
    saveButton.onclick = () => saveChanges(subtaskInput, key, type, saveButton);
    return saveButton;
};


/**
 * Appends the save button to the DOM.
 *
 * @param {HTMLInputElement} subtaskInput - The subtask input field.
 * @param {HTMLButtonElement} saveButton - The save button.
 */
const appendSaveButtonToDOM = (subtaskInput, saveButton) => {
    const existingButtonContainer = subtaskInput.parentNode.querySelector('.save-button-container');
    if (existingButtonContainer) {
        existingButtonContainer.appendChild(saveButton);
    } else {
        const saveButtonContainer = document.createElement('div');
        saveButtonContainer.classList.add('save-button-container');
        saveButtonContainer.appendChild(saveButton);
        subtaskInput.parentNode.appendChild(saveButtonContainer);
    }
    saveButton.style.display = 'flex';
};


/**
 * Adds a blur event listener to save changes if focus is lost.
 *
 * @param {HTMLInputElement} subtaskInput - The subtask input field.
 * @param {HTMLButtonElement} saveButton - The save button.
 * @param {string} key - The subtask key.
 * @param {string} type - The task type.
 */
const addBlurEventListener = (subtaskInput, saveButton, key, type) => {
    subtaskInput.addEventListener('blur', (event) => {
        console.log('btn');
        if (event.relatedTarget === saveButton) return;
        saveChanges(subtaskInput, key, type, saveButton);
    });
};


/**
 * Saves changes and updates the UI.
 *
 * @param {HTMLInputElement} subtaskInput - The subtask input field.
 * @param {string} key - The subtask key.
 * @param {string} type - The task type.
 * @param {HTMLButtonElement} saveButton - The save button.
 */
const saveChanges = (subtaskInput, key, type, saveButton) => {
    const newSubtaskText = subtaskInput.value.trim();
    const validateSubTaskItem = [{ id: itemId, type: 'text', value: newSubtaskText }];
    subtaskInput.readOnly = true;
    saveButton.parentNode.remove();
    showEditAndDeleteButtons(key);
    if (validateTaskForm(validateSubTaskItem)) {
        taskForm.subtask[key].text = newSubtaskText;
        renderList(type);
    } else {
        const event = new Event('click', { bubbles: true, cancelable: true });
        document.getElementById('list_subtask_btn_edit' + key).dispatchEvent(event);
    };
};


/**
 * Shows edit and delete buttons for the subtask.
 *
 * @param {string} key - The subtask key.
 */
const showEditAndDeleteButtons = (key) => {
    document.getElementById(`edit_${key}`).style.display = 'flex';
    document.getElementById(`delete_${key}`).style.display = 'flex';
};


export { editItem };