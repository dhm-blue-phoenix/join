import {
    initAddTask,
    addSubTaskToList,
    deleteItem,
    taskForm,
    loadNextPage
} from '../../initAddTask.js';


const idFormAddTask = document.getElementById('formAddTask');
const idBtnAddSubtask = document.getElementById('addSubTask');
const idBtnUrgent = document.getElementById('urgent');
const idBtnMedium = document.getElementById('medium');
const idBtnLow = document.getElementById('low');
const idBtnCancel = document.getElementById('taskbuttonCancel');


let lastBtnPrio = 'medium';


/**
 * Initializes event listener for form submission.
 */
const addEventFromAddTask = () => {
    idFormAddTask.removeEventListener('submit', initAddTask);
    idFormAddTask.addEventListener('submit', initAddTask);
};


/**
 * Initializes event listener for urgent button click.
 */
const addEventFromBtnUrgent = () => {
    idBtnUrgent.removeEventListener('click', handleUrgentClick);
    idBtnUrgent.addEventListener('click', handleUrgentClick);
};


/**
 * Initializes event listener for medium button click.
 */
const addEventFromBtnMedium = () => {
    idBtnMedium.removeEventListener('click', handleMediumClick);
    idBtnMedium.addEventListener('click', handleMediumClick);
};


/**
 * Initializes event listener for low button click.
 */
const addEventFromBtnLow = () => {
    idBtnLow.removeEventListener('click', handleLowClick);
    idBtnLow.addEventListener('click', handleLowClick);
};


/**
 * Initializes event listener for add subtask button click.
 */
const addEventFromAddSubTask = () => {
    idBtnAddSubtask.removeEventListener('click', addSubTaskToList);
    idBtnAddSubtask.addEventListener('click', addSubTaskToList);
};


/**
 * Initializes event listener for deleting an item from assigned list.
 * @param {number} number - The index number of the item.
 */
const addEventFromDelListAssigned = (number) => {
    const idBtmAssignedListDel = document.getElementById('list_assigned_btn_delete' + number);
    idBtmAssignedListDel.removeEventListener('click', deleteItem);
    idBtmAssignedListDel.addEventListener('click', deleteItem);
};


/**
 * Initializes event listener for deleting a subtask from list.
 * @param {number} number - The index number of the subtask.
 */
const addEventFromDelListSubTask = (number) => {
    const idBtmSubtaskListDel = document.getElementById('list_subtask_btn_delete' + number);
    idBtmSubtaskListDel.removeEventListener('click', deleteItem);
    idBtmSubtaskListDel.addEventListener('click', deleteItem);
};


/**
 * Initializes event listener for cancel button click.
 */
const addEventFromCancelBtn = () => {
    idBtnCancel.removeEventListener('click', loadNextPage);
    idBtnCancel.addEventListener('click', loadNextPage);
};


/**
 * Handles click event on urgent button.
 */
const handleUrgentClick = () => {
    setBtnPrio('urgent');
};


/**
 * Handles click event on medium button.
 */
const handleMediumClick = () => {
    setBtnPrio('medium');
};


/**
 * Handles click event on low button.
 */
const handleLowClick = () => {
    setBtnPrio('low');
};


/**
 * Sets priority button styling and task form priority.
 * @param {string} prio - Priority value ('urgent', 'medium', 'low').
 */
const setBtnPrio = (prio) => {
    lastBtn();
    document.getElementById(prio).classList.add('activBtnPrio');
    document.getElementById(prio).disabled = true;
    taskForm.prio = prio;
    lastBtnPrio = prio;
};


/**
 * Resets styling and enables the last used priority button.
 */
const lastBtn = () => {
    document.getElementById(lastBtnPrio).classList.remove('activBtnPrio');
    document.getElementById(lastBtnPrio).disabled = false;
};


export {
    addEventFromAddTask,
    addEventFromBtnUrgent,
    addEventFromBtnMedium,
    addEventFromBtnLow,
    addEventFromAddSubTask,
    addEventFromDelListAssigned,
    addEventFromDelListSubTask,
    addEventFromCancelBtn,
    setBtnPrio
};