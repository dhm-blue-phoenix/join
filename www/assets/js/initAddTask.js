import { loadUserIdFromStored, loadElementByPatch, loadTaskData } from './module/modules.js';
import { uploadPatchData, updateData, retrievingData } from './module/dataResponse.js';
import { createListItem } from './module/addTask/createSubList.js';
import { loadEditTaskFromUrl, editTaskId } from './module/addTask/loadEditTaskFromUrl.js';
import { renderUsers } from './module/addTask/createSortedUsers.js';
import {
    addEventFromAddTask,
    addEventFromBtnUrgent,
    addEventFromBtnMedium,
    addEventFromBtnLow,
    addEventFromAddSubTask,
    addEventFromEditListSubTask,
    addEventFromDelListSubTask,
    setBtnPrio
} from './module/addTask/addEventsToAddTask.js';
import { formTesting } from '../formTesting/testing.js';
import { validateTaskForm } from './module/validation.js';

const idInputTask = ['title', 'description', 'date', 'category'];
const userId = loadUserIdFromStored();
const resetTaskForm = {
    id: '',
    title: '',
    description: '',
    assigned: ['none'],
    date: '',
    prio: '',
    category: '',
    subtask: ['none'],
    boardStatus: 'taskToDo'
};
const fieldsToValidate = [
    { id: 'title', type: 'title', value: '' },
    { id: 'description', type: 'des', value: '' },
    { id: 'date', type: 'date', value: '' },
    { id: 'category', type: 'category', value: '' }
];
const testing = false;


let taskForm = resetTaskForm;
let taskId;


document.addEventListener('DOMContentLoaded', async () => {
    setBtnPrio('medium');
    addEventFromAddTask();
    addEventFromBtnUrgent();
    addEventFromBtnMedium();
    addEventFromBtnLow();
    addEventFromAddSubTask();
    renderUsers();
    loadEditTaskFromUrl();
    testing && formTesting();
});


/**
 * Initializes the add task process.
 * @param {Event} event - The event triggered by form submission.
 */
async function initAddTask(event) {
    event.preventDefault();
    try {
        const tasks = await loadElementByPatch(`users/${userId}`, 4);
        taskId = tasks.length;
        await loadDataToForm();
        loadDataToValidateFields();        
        if (validateTaskForm(fieldsToValidate)) {
            if (testing) return console.warn('Task wurde erfolgreich erstellt!');
            await uploadData();
            resetForm();
            loadNextPage();
        };
    } catch (err) {
        console.error(`Error occurred while creating the task: ${err}`);
    };
};


/**
 * Loads data into the task form.
 * @returns {Promise<void>}
 */
const loadDataToForm = async () => {
    try {
        idInputTask.forEach((key) => {
            taskForm[key] = document.getElementById(key).value;
        });
        const taskIds = await loadTaskData();
        const ids = Array.from(taskIds).sort((a, b) => a - b);
        let nextId = 0;
        while (ids.includes(String(nextId))) { nextId++; };
        taskForm.id = String(nextId);
    } catch (err) {
        console.error('Error occurred while loading tasks:', err);
    };
};


/**
 * Loads data from the `taskForm` object into the `fieldsToValidate` array.
 *
 * This function iterates over each field in the `fieldsToValidate` array and assigns
 * the corresponding value from the `taskForm` based on the field's ID.
 * The `value` property of each field in `fieldsToValidate` is updated accordingly.
 *
 * @returns {void} This function does not return a value.
 */
const loadDataToValidateFields = () => {
    fieldsToValidate.forEach(field => {
        field.value = taskForm[field.id];
    });
};


/**
 * Uploads task data to the server.
 * @returns {Promise<void>}
 */
async function uploadData() {
    try {
        await checkedId();
        if (editTaskId !== null) {
            await updateData(`board/${editTaskId}`, taskForm);
            return;
        };
        await uploadPatchData('board/', taskForm);
    } catch (error) {
        console.error('Error occurred while synchronizing data:', error);
    };
};


/**
 * Checks if task IDs exist.
 * @returns {Promise<void>}
 */
const checkedId = async () => {
    const data = await retrievingData('');
    const ids = Object.keys(data[0]);
    if (ids.length === 0) {
        throw new Error('No IDs found.');
    };
};


/**
 * Adds a subtask to the list.
 */
const addSubTaskToList = () => {
    const type = 'subtask';
    const input = document.getElementById(type);
    const trimmedValue = input.value.trim();
    if (!trimmedValue) return;
    taskForm.subtask.push({ status: false, text: trimmedValue });
    input.value = '';
    renderList(type);
};


/**
 * Renders the list of subtasks.
 * @param {string} type - The type of list to render (subtask).
 */
const renderList = (type) => {
    const listElement = document.getElementById(`${type}-list`);
    listElement.innerHTML = '';
    const items = taskForm[type];
    if (!items) return;
    createNewListItem(type, items);
    setEditSubtask();
    setDelSubtask();
};


/**
 * Creates new list items.
 * @param {string} type - The type of items to create (subtask).
 * @param {Array} items - The items to create in the list.
 */
const createNewListItem = (type, items) => {
    let number = 1;
    items.forEach(item => {
        const text = item.name || item.text;
        if (text !== undefined) {
            createListItem(type, text, number++);
        };
    });
};


/**
 * Sets the edit functionality for subtasks.
 */
const setEditSubtask = () => {
    for (let i = 0; i < (taskForm.subtask.length - 1); i++) {
        let number = (i + 1);
        addEventFromEditListSubTask(number);
    };
};


/**
 * Sets the delete functionality for subtasks.
 */
const setDelSubtask = () => {
    for (let i = 0; i < (taskForm.subtask.length - 1); i++) {
        let number = (i + 1);
        addEventFromDelListSubTask(number);
    };
};


/**
 * Deletes a task item.
 * @param {Event} event - The event triggered by clicking the delete button.
 */
const deleteItem = (event) => {
    const target = event.currentTarget;
    const key = target.getAttribute('key');
    const type = target.getAttribute('type');
    taskForm[type].splice(key, 1);
    renderList(type);
};




/**
 * Aktiviert den Bearbeitungsmodus für eine Unteraufgabe, so dass der Text geändert werden kann.
 *
 * Diese Funktion wird durch ein Klick-Ereignis auf den Bearbeiten-Button einer Unteraufgabe ausgelöst.
 * Sie macht den Text der Unteraufgabe bearbeitbar, versteckt die Bearbeiten- und Löschen-Buttons
 * und erstellt einen Speichern-Button zum Speichern der Änderungen.
 * Der Speichern-Button ermöglicht es dem Benutzer, den bearbeiteten Text zu speichern,
 * das Aufgabenformular zu aktualisieren und die aktualisierte Liste anzuzeigen.
 * Die Funktion behandelt auch das "Blur"-Ereignis, um Änderungen zu speichern und die Benutzeroberfläche
 * in ihren ursprünglichen Zustand zurückzusetzen, wenn das Eingabefeld den Fokus verliert.
 *
 * @param {Event} event - Das Ereignis, das durch das Klicken des Bearbeiten-Buttons ausgelöst wird.
 */

const editItem = (event) => {
    const target = event.currentTarget;
    const key = target.getAttribute('key');
    const type = target.getAttribute('type');
    const subtaskInput = document.getElementById(`list_edit${key}`);
    subtaskInput.classList.add('editsubtask');

    // Mach das Inputfeld editierbar
    subtaskInput.readOnly = false;
    subtaskInput.focus();

    const subEditButton = document.getElementById(`edit_${key}`);
    const subDeleteButton = document.getElementById(`delete_${key}`);

    // Ausblenden der Edit- und Delete-Buttons
    subEditButton.style.display = 'none';
    subDeleteButton.style.display = 'none';

    // Erstelle einen "Save"-Button
    const saveButton = document.createElement('button');
    saveButton.textContent = '✔';

    // Füge den Save-Button dem Container hinzu
    const saveButtonContainer = document.createElement('div');
    saveButtonContainer.appendChild(saveButton);

    // Füge den Save-Button-Container an die richtige Stelle im DOM ein
    subtaskInput.parentNode.appendChild(saveButtonContainer);

    // Zeige den Save-Button an
    saveButton.style.display = 'flex';

    saveButton.onclick = () => {
        // Speichere den bearbeiteten Text
        const newSubtaskText = subtaskInput.value;
        taskForm.subtask[key].text = newSubtaskText;
        renderList(type);

        // Mach das Inputfeld wieder nicht editierbar
        subtaskInput.readOnly = true;

        // Entferne den Save-Button-Container
        saveButtonContainer.remove();

        // Zeige die Edit- und Delete-Buttons wieder an
        subEditButton.style.display = 'flex';
        subDeleteButton.style.display = 'flex';
    };

    // Füge einen Event-Listener für das blur-Ereignis hinzu
    subtaskInput.addEventListener('blur', (event) => {
        if (event.relatedTarget === saveButton) {
            return;
        }

        // Speichere den bearbeiteten Text
        const newSubtaskText = subtaskInput.value;
        taskForm.subtask[key].text = newSubtaskText;
        renderList(type);

        // Mach das Inputfeld wieder nicht editierbar
        subtaskInput.readOnly = true;

        // Entferne den Save-Button-Container
        saveButtonContainer.remove();

        // Zeige die Edit- und Delete-Buttons wieder an
        subEditButton.style.display = 'block';
        subDeleteButton.style.display = 'block';
    });
};


/**
 * Resets the task form.
 */
const resetForm = () => {
    clearInput();
    resetFromTaskForm();
    setBtnPrio('medium');
};


/**
 * Clears the input fields.
 */
const clearInput = () => {
    idInputTask.forEach((id) => document.getElementById(id).value = '');
};


/**
 * Resets the task form to the initial state.
 */
const resetFromTaskForm = () => {
    taskForm = resetTaskForm;
};


/**
 * Loads the next page in the application.
 */
const loadNextPage = () => {
    window.location.href = './board.html';
};


export {
    initAddTask,
    addSubTaskToList,
    editItem,
    deleteItem,
    taskForm,
    loadNextPage
};