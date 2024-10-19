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
    addEventFromDelListSubTask,
    setBtnPrio
} from './module/addTask/addEvents.js';


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
    subtask: ['none']
};


let taskForm = resetTaskForm;
let taskId;


document.addEventListener('DOMContentLoaded', () => {
    setBtnPrio('medium');
    addEventFromAddTask();
    addEventFromBtnUrgent();
    addEventFromBtnMedium();
    addEventFromBtnLow();
    addEventFromAddSubTask();
    renderUsers();
    loadEditTaskFromUrl();
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
        await uploadData();
        resetForm();
        loadNextPage();
    } catch (err) {
        console.error(`Error occurred while creating the task! ${err}`);
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
        while (ids.includes(String(nextId))) { nextId++; }
        taskForm.id = String(nextId);
    } catch (err) {
        console.error('Error occurred while loading tasks:', err);
    };
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
    localStorage.setItem('activNavBtn', 'nav-btn1');
    window.location.href = './board.html';
};


export {
    initAddTask,
    addSubTaskToList,
    deleteItem,
    taskForm,
    loadNextPage
};