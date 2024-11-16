import { retrievingData } from '../dataResponse.js';


export async function editTaskCard(event) {
    const taskId = event.currentTarget.getAttribute('task-id');
    const tasks = await retrievingData('');
    const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === taskId);
    loadNextPage(currentTask);
  };


const loadNextPage = (currentTask) => {
    
    showPopup('EditTaskcardPopupanimation', 'EdittaskCardpopup');
    const popupContainer = document.getElementById('EdittaskCardpopup');  
  };