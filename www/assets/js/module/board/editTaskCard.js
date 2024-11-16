import { retrievingData } from '../dataResponse.js';
import { loadEvents } from '../../initAddTask.js';


// !!! NO COMMENT
export async function editTaskCard(event) {
  const taskId = event.currentTarget.getAttribute('task-id');
  const tasks = await retrievingData('');
  const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === taskId);
  loadNextPage(currentTask);
};


// !!! NO COMMENT
const loadNextPage = (currentTask) => {
  showPopup('EditTaskcardPopupanimation', 'EdittaskCardpopup');
  const popupContainer = document.getElementById('EdittaskCardpopup');
  loadEvents(true, currentTask[0]);
};