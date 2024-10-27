import { retrievingData } from '../dataResponse.js';


/**
 * Edits a task card by loading its details on a new page.
 * 
 * @param {Event} event - The event object triggered by a user interaction on a task card.
 * @returns {Promise<void>} - A promise that resolves when the task details have been loaded.
 */
export async function editTaskCard(event) {
    const taskId = event.currentTarget.getAttribute('task-id');
    const tasks = await retrievingData('');
    const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === taskId);
    loadNextPage(currentTask);
};


/**
 * Loads the add task page with the details of the task card that was edited.
 * 
 * @param {object} currentTask - The object containing the details of the task card.
 * @returns {void} - Nothing is returned.
 */
const loadNextPage = (currentTask) => {
    window.location.href = `./addTask.html?task=${currentTask[0]}`;
};