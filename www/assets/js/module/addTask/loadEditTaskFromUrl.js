import { retrievingData } from '../dataResponse.js';
import { setBtnPrio, addEventFromCancelBtn } from './addEvents.js';
import { addSubTaskToList, taskForm } from '../../initAddTask.js';


const idSubmitBtn = document.querySelector('.taskbuttoncreat');
const idBtnCancel = document.getElementById('taskbuttonCancel');
const items = {
    title: 'value',
    description: 'textContent',
    date: 'value',
    prio: 'btn',
    category: 'value',
    subtask: 'forEach',
};
const btnPrios = ['urgent', 'medium', 'low'];


let editTaskId;


/**
 * Loads the task data to edit from the URL.
 * @returns {Promise<void>}
 */
async function loadEditTaskFromUrl() {
    try {
        const taskId = getTaskIdFromUrl();
        editTaskId = taskId;
        if (taskId === null) return;

        const boardData = await fetchBoardData();
        const taskData = extractTaskData(boardData, taskId);
        updateDomWithTaskData(taskData);
    } catch (error) {
        console.error('Error loading task for editing:', error);
    };
};


/**
 * Retrieves the task ID from the URL parameters.
 * @returns {string|null}
 */
const getTaskIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("task");
    return taskId ? taskId : null;
};


/**
 * Fetches board data from the data source.
 * @returns {Promise<Array>}
 */
const fetchBoardData = async () => {
    const boardData = await retrievingData('');
    if (!Array.isArray(boardData)) {
        throw new Error('Board data is not an array!');
    }
    return boardData;
};


/**
 * Extracts task data from board data using the task ID.
 * @param {Array} boardData - The board data array.
 * @param {string} taskId - The task ID to find.
 * @returns {Object}
 */
const extractTaskData = (boardData, taskId) => {
    const task = boardData.find(task => task.hasOwnProperty(taskId));
    if (!task) {
        throw new Error(`Error with task ID (${taskId}): Task not found!`);
    }
    return task[taskId];
};


/**
 * Updates the DOM with the provided task data.
 * @param {Object} taskData - The task data to update the DOM with.
 */
const updateDomWithTaskData = (taskData) => {
    updateAssignedTo(taskData);
    idSubmitBtn.textContent = 'Save!';
    updateItems(taskData);
    updateCancelBtn();
};


/**
 * Updates the items in the DOM based on the provided task data.
 * @param {Object} taskData - The task data containing information for the items.
 */
const updateItems = (taskData) => {
    Object.entries(items).forEach(([id, type]) => {
        const item = document.getElementById(id);
        if (item) {
            updateItem(item, type, taskData[id]);
        } else if (type === 'btn') {
            updatePrioBtn(taskData, id);
        } else {
            console.warn(`Element with ID "${id}" not found`);
        }
    });
};


/**
 * Updates an individual item in the DOM based on its type.
 * @param {HTMLElement} item - The DOM element to update.
 * @param {string} type - The type of the update (e.g., 'value', 'textContent').
 * @param {any} data - The data to set in the item.
 */
const updateItem = (item, type, data) => {
    if (type !== 'forEach') {
        updateText(item, type, data);
    } else {
        data.forEach((sub) => {
            updateSubTask(sub.text);
        });
    }
};


/**
 * Updates the cancel button and sets its event listeners.
 */
const updateCancelBtn = () => {
    addEventFromCancelBtn();
    idBtnCancel.style.display = 'inline-block';
};


/**
 * Updates the specified element's text or value based on the type.
 * @param {HTMLElement} element - The element to update.
 * @param {string} type - The type of the update (e.g., 'value', 'textContent').
 * @param {string} text - The text or value to set.
 */
const updateText = (element, type, text) => {
    element[type] = text;
};


/**
 * Updates the subtask field with the given text.
 * @param {string} text - The text for the subtask.
 */
const updateSubTask = (text) => {
    if (text !== undefined) {
        document.getElementById('subtask').value = text;
        addSubTaskToList();
    }
};


/**
 * Updates the priority button based on task data.
 * @param {Object} taskData - The task data containing priority info.
 * @param {string} id - The ID of the priority button.
 */
const updatePrioBtn = (taskData, id) => {
    const btn = taskData[id];
    btnPrios.forEach(prio => {
        if (prio === btn) {
            setBtnPrio(prio);
        }
    });
};


/**
 * Updates the assigned persons display in the DOM.
 * @param {Object} taskData - The task data containing assigned persons.
 */
const updateAssignedTo = (taskData) => {
    const selectedPersonContainer = document.getElementById('selectedPerson');
    selectedPersonContainer.style.display = 'flex';
    selectedPersonContainer.innerHTML = '';

    const assignedPersons = taskData.assigned;
    taskForm.assigned = assignedPersons;

    assignedPersons.slice(1).forEach((person) => {
        const nameShortcutDiv = createNameShortcutDiv(person);
        selectedPersonContainer.appendChild(nameShortcutDiv);
    });
};


/**
 * Creates a name shortcut div for a person.
 * @param {Object} person - The person object containing name and color.
 * @returns {HTMLDivElement} - The created name shortcut div element.
 */
const createNameShortcutDiv = (person) => {
    const nameShortcutDiv = document.createElement('div');
    nameShortcutDiv.id = 'nameShortcut';
    nameShortcutDiv.style.backgroundColor = person.color;

    const fullName = person.name;
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[1] || '';

    nameShortcutDiv.textContent = getInitials(firstName, lastName);
    return nameShortcutDiv;
};


/**
 * Gets the initials from first name and last name.
 * @param {string} firstName - The first name of the person.
 * @param {string} lastName - The optional last name of the person.
 * @returns {string} - The initials derived from first and last name.
 */
const getInitials = (firstName, lastName) => {
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return (firstInitial + lastInitial).toUpperCase();
};


export { loadEditTaskFromUrl, editTaskId };