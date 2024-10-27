import { deleteElementById, reloadWindow } from '../modules.js';
import { retrievingData } from '../dataResponse.js';
import { updateTaskStatusInDatabase } from './draganddrop.js';


/**
 * Deletes a task card and reloads the page.
 * @param {Event} event - The event object of the element that triggered the deletion.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 */
export async function deleteTaskCard(event) {
    const taskId = event.currentTarget.getAttribute('task-id');
    const tasks = await retrievingData('');
    const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === taskId);
    await await deleteElementById(`board/${currentTask[0]}`);
    await updateTaskStatusInDatabase();
    reloadWindow();
};