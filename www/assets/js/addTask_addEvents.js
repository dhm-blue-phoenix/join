import {
    initAddTask,
    addListElement,
    deleteItem,
    taskForm
} from './addTask.js';

let lastBtnPrio = 'medium';

const ID_FORM_ADD_TASK = document.getElementById('formAddTask');
const ID_BTN_ADD_SUBTASK = document.getElementById('addSubTask');
const ID_BTN_URGENT = document.getElementById('urgent');
const ID_BTN_MEDIUM = document.getElementById('medium');
const ID_BTN_LOW = document.getElementById('low');

const addEventFromAddTask = () => {
    ID_FORM_ADD_TASK.removeEventListener('submit', initAddTask);
    ID_FORM_ADD_TASK.addEventListener('submit', initAddTask);
};

const addEventFromBtnUrgent = () => {
    ID_BTN_URGENT.removeEventListener('click', handleUrgentClick);
    ID_BTN_URGENT.addEventListener('click', handleUrgentClick);
};

const addEventFromBtnMedium = () => {
    ID_BTN_MEDIUM.removeEventListener('click', handleMediumClick);
    ID_BTN_MEDIUM.addEventListener('click', handleMediumClick);
};

const addEventFromBtnLow = () => {
    ID_BTN_LOW.removeEventListener('click', handleLowClick);
    ID_BTN_LOW.addEventListener('click', handleLowClick);
};

const addEventFromAddSubTask = () => {
    ID_BTN_ADD_SUBTASK.removeEventListener('click', () => { addListElement() });
    ID_BTN_ADD_SUBTASK.addEventListener('click', () => { addListElement('subtask') });
};

const addEventFromDelListAssigned = (number) => {
    const ID_BTN_ASSIGNED_LIST_DEL = document.getElementById('list_assigned_btn_delete' + number);
    ID_BTN_ASSIGNED_LIST_DEL.removeEventListener('click', deleteItem);
    ID_BTN_ASSIGNED_LIST_DEL.addEventListener('click', deleteItem);
};

const addEventFromDelListSubTask = (number) => {
    const ID_BTN_SUBTASK_LIST_DEL = document.getElementById('list_subtask_btn_delete' + number);
    ID_BTN_SUBTASK_LIST_DEL.removeEventListener('click', deleteItem);
    ID_BTN_SUBTASK_LIST_DEL.addEventListener('click', deleteItem);
};

const handleUrgentClick = () => {
    setBtnPrio('urgent');
};

const handleMediumClick = () => {
    setBtnPrio('medium');
};

const handleLowClick = () => {
    setBtnPrio('low');
};

const setBtnPrio = (prio) => {
    lastBtn();
    document.getElementById(prio).classList.add('activBtnPrio');
    document.getElementById(prio).disabled = true;
    taskForm.prio = prio;
    lastBtnPrio = prio;
};

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
    setBtnPrio
};