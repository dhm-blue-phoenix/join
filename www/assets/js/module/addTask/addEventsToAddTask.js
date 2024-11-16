import {
    initAddTask,
    addSubTaskToList,
    editItem,
    deleteItem,
    taskForm,
    loadNextPage
} from '../../initAddTask.js';


let idFormAddTask;
let idBtnAddSubtask;
let idBtnUrgent;
let idBtnMedium;
let idBtnLow;
let idBtnCancel;
setTimeout(() => {
    idFormAddTask = document.getElementById('formAddTask');
    idBtnAddSubtask = document.getElementById('addSubTask');
    idBtnUrgent = document.getElementById('urgent');
    idBtnMedium = document.getElementById('medium');
    idBtnLow = document.getElementById('low');
    idBtnCancel = document.getElementById('taskbuttonCancel');
}, 100);
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


const clearAddTaskForms = () => {
    let selectedPersonContainer = document.getElementById('selectedPerson');
    let subtaskListContainer = document.getElementById('subtask-list');
    console.log(subtaskListContainer);
};


/**
 * Initializes event listener for editing a subtask from list.
 * @param {number} number - The index number of the subtask.
 */
const addEventFromEditListSubTask = (number) => {
    const idBtmSubtaskListEdit = document.getElementById('list_subtask_btn_edit' + number);
    idBtmSubtaskListEdit.removeEventListener('click', editItem);
    idBtmSubtaskListEdit.addEventListener('click', editItem);
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
    setTimeout(() => {
        lastBtn(prio);
        const prioButton = document.getElementById(prio);
        const imgElement = prioButton.querySelector('img');
        if (imgElement) {
            imgElement.remove();
        };
        const newImgElement = document.createElement('img');
        newImgElement.src = `./resources/symbols/Prio${prio}Activ.png`;
        prioButton.appendChild(newImgElement);
        prioButton.classList.add(prio);
        prioButton.disabled = true;
        taskForm.prio = prio;
        lastBtnPrio = prio;
    }, 100);
};
// newImgElement.src = `./resources/symbols/Prio${prio}Activ.png`;

/**
 * Resets styling and enables the last used priority button.
 */
const lastBtn = (prio) => {
    const lastButton = document.getElementById(lastBtnPrio);
    if (lastButton) {
        const imgElement = lastButton.querySelector('img');
        if (imgElement) {
            imgElement.remove();
        };
        const newImgElement = document.createElement('img');
        newImgElement.src = `./resources/symbols/Prio${lastBtnPrio}.png`;
        newImgElement.alt = '';
        lastButton.appendChild(newImgElement);
        lastButton.classList.remove(lastBtnPrio);
        lastButton.disabled = false;
    };
};


export {
    addEventFromAddTask,
    addEventFromBtnUrgent,
    addEventFromBtnMedium,
    addEventFromBtnLow,
    addEventFromAddSubTask,
    addEventFromDelListAssigned,
    addEventFromEditListSubTask,
    addEventFromDelListSubTask,
    addEventFromCancelBtn,
    setBtnPrio
};