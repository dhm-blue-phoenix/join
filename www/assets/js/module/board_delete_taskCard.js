import { loadUserIdFromStored, loadElementById, deletElementById } from './modules.js';

const ELEMENT = document.getElementById('TaskcardPopupanimation');

export async function deleteTaskCard(event) {
  const DATA = fetchData(event);
  await deletElementById(`users/${USER_ID}/tasks/${DATA[0]}`);
  reloadBoard();
};

const fetchData = async (event) => {
  const TARGET = event.currentTarget;
  let TASK_ID = Number(TARGET.getAttribute('task-id'));                
  TASK_ID += 1;
  const USER_ID = await loadUserIdFromStored();
  return await loadElementById(`users/${USER_ID}`, TASK_ID, 'taskCard');
};

const reloadBoard = () => {
  window.location.reload();
  hideTaskPopup();
};

const hideTaskPopup = () => {
  ELEMENT.classList.remove('show');
  ELEMENT.classList.add('hide');
  setTimeout(() => {
    document.getElementById('taskCardpopup').classList.add('d-nonepopup');
  }, 200);
};