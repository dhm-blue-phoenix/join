import { loadUserIdFromStored, loadElementById, deletElementById } from './modules.js';
import { initTaskBord } from '../initBoard.js';

const ELEMENT = document.getElementById('TaskcardPopupanimation');

export async function deleteTaskCard(event) {
    const TARGET = event.currentTarget;
    let TASK_ID = Number(TARGET.getAttribute('task-id'));                
    TASK_ID += 1;
    const USER_ID = await loadUserIdFromStored();
    const DATA = await loadElementById(`users/${USER_ID}`, TASK_ID, 'taskCard');
    await deletElementById(`users/${USER_ID}/tasks/${DATA[0]}`);
    window.location.reload();
    hideTaskPopup();
};

function hideTaskPopup() {
    ELEMENT.classList.remove('show');
    ELEMENT.classList.add('hide');
    setTimeout(() => {
      document.getElementById('taskCardpopup').classList.add('d-nonepopup');
    }, 200);
};