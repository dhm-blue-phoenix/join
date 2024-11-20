import { retrievingData } from '../dataResponse.js';
import { loadEvents } from '../../initAddTask.js';


/**
 * Handles the task card editing process.
 *
 * Retrieves the task data based on the task ID from the event target and 
 * initiates the loading of the next page with the selected task data.
 *
 * @param {Event} event - The event triggered by the user interaction, containing the task ID.
 * @returns {Promise<void>} A promise that resolves after the task data is retrieved and the next page is loaded.
 */
export async function editTaskCard(event) {
  const taskId = event.currentTarget.getAttribute('task-id');
  const tasks = await retrievingData('');
  const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === taskId);
  loadNextPage(currentTask);
};


/**
* Loads the next page for editing a task card.
*
* Displays the editing popup and initializes the necessary events with the given task data.
*
* @param {[string, Object]} currentTask - A key-value pair where the key is the task ID and the value is the task data.
*/
const loadNextPage = (currentTask) => {
  showPopup('EditTaskcardPopupanimation', 'EdittaskCardpopup');
  const popupContainer = document.getElementById('EdittaskCardpopup');
  loadEvents(true, currentTask);
};