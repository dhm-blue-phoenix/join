import { retrievingData } from '../dataResponse.js';
import { setBtnPrio } from './addEventsToAddTask.js';
import { addSubTaskToList, taskForm } from '../../initAddTask.js';


const items = {
    title: 'value',
    description: 'textContent',
    date: 'value',
    prio: 'btn',
    category: 'value',
    subtask: 'forEach',
    boardStatus: 'status',
    assigned: 'assigned'
};
const btnPrios = ['Urgent', 'Medium', 'Low'];


let editTaskId = null;


/**
 * Loads the task data to edit from the URL.
 * @returns {Promise<void>}
 */
async function insertTaskData(id) {
    try {
        const taskId = id;
        editTaskId = taskId;
        if (taskId === null) return;
        const boardData = await fetchBoardData();
        const taskData = extractTaskData(boardData[0], taskId);
        updateDomWithTaskData(taskData);
    } catch (error) {
        console.error('Error loading task for editing:', error);
    };
};


/**
 * Fetches board data from the data source.
 * @returns {Promise<Array>}
 */
async function fetchBoardData() {
    const boardData = await retrievingData('');
    if (!Array.isArray(boardData)) {
        throw new Error('Board data is not an array!');
    };
    return boardData;
};


/**
 * Extracts task data from board data using the task ID.
 * @param {Array} boardData - The board data array.
 * @param {string} taskId - The task ID to find.
 * @returns {Object}
 */
function extractTaskData(boardData, taskId) {
    const task = Object.entries(boardData).find(task => task[0] === taskId);
    if (!task) {
        throw new Error(`Error with task ID (${taskId}): Task not found!`);
    };
    return task[1];
};


/**
 * Updates the DOM with the provided task data.
 * @param {Object} taskData - The task data to update the DOM with.
 */
function updateDomWithTaskData(taskData) {
    updateItems(taskData);
};


/**
 * Updates the items in the DOM based on the provided task data.
 * @param {Object} taskData - The task data containing information for the items.
 */
function updateItems(taskData) {
    Object.entries(items).forEach(([id, type]) => {
        const item = document.getElementById(id);
        if (item) {
            updateItem(item, type, taskData[id]);
        } else {
            switch (type) {
                case 'btn':
                    updatePrioBtn(taskData, id);
                    break;
                case 'status':
                    updateStatus(taskData[id]);
                    break;
                default:
                    console.warn(`Element with ID "${id}" not found`);
            };
        };
    });
    updateAssignedPersons(taskData);
};

/**
 * Updates the assigned persons display in the DOM based on the provided task data.
 * @param {Object} taskData - The task data containing information for the assigned persons.
 */
const updateAssignedPersons = (taskData) => {
    const assignedPersons = taskData.assigned;
    const selectedPersonContainer = document.getElementById('selectedPerson');
    selectedPersonContainer.innerHTML = '';
    assignedPersons.slice(1).forEach((person) => {
        const nameShortcutDiv = createNameShortcutDiv(person);
        selectedPersonContainer.appendChild(nameShortcutDiv);
    });

    if (selectedPersonContainer.children.length > 0) {
        selectedPersonContainer.style.display = 'flex';
    } else {
        selectedPersonContainer.style.display = 'none';
    }
};

/**
 * Updates the board status in the task form with the provided task data.
 * @param {Object} taskData - The data used to update the board status.
 */
const updateStatus = (taskData) => {
    taskForm.boardStatus = taskData;
};


/**
 * Updates an individual item in the DOM based on its type.
 * @param {HTMLElement} item - The DOM element to update.
 * @param {string} type - The type of the update (e.g., 'value', 'textContent').
 * @param {any} data - The data to set in the item.
 */
function updateItem(item, type, data) {
    if (type !== 'forEach') {
        updateText(item, type, data);
    } else {
        data.forEach((sub) => {
            updateSubTask(sub.text);
        });
    };
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
    };
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
        };
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


export { insertTaskData, editTaskId };