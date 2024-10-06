import {
    initAddTask,
    addSubTaskToList,
    deleteItem,
    taskForm
} from '../addTask.js';

let lastBtnPrio = 'medium';

const ID_FORM_ADD_TASK = document.getElementById('formAddTask');
const ID_BTN_ADD_SUBTASK = document.getElementById('addSubTask');
const ID_BTN_URGENT = document.getElementById('urgent');
const ID_BTN_MEDIUM = document.getElementById('medium');
const ID_BTN_LOW = document.getElementById('low');

/**
 * Entfernt den bisherigen 'submit'-EventListener vom Task-Formular und fügt ihn erneut hinzu.
 * ====================================================================================================
 */
const addEventFromAddTask = () => {
    ID_FORM_ADD_TASK.removeEventListener('submit', initAddTask);
    ID_FORM_ADD_TASK.addEventListener('submit', initAddTask);
};

/**
 * Entfernt den bisherigen 'click'-EventListener vom Dringlichkeitsbutton und fügt ihn erneut hinzu.
 * ====================================================================================================
 */
const addEventFromBtnUrgent = () => {
    ID_BTN_URGENT.removeEventListener('click', handleUrgentClick);
    ID_BTN_URGENT.addEventListener('click', handleUrgentClick);
};

/**
 * Entfernt den bisherigen 'click'-EventListener vom Mittlerer-Prioritäts-Button und fügt ihn erneut hinzu.
 * ====================================================================================================
 */
const addEventFromBtnMedium = () => {
    ID_BTN_MEDIUM.removeEventListener('click', handleMediumClick);
    ID_BTN_MEDIUM.addEventListener('click', handleMediumClick);
};

/**
 * Entfernt den bisherigen 'click'-EventListener vom Niedriger-Prioritäts-Button und fügt ihn erneut hinzu.
 * ====================================================================================================
 */
const addEventFromBtnLow = () => {
    ID_BTN_LOW.removeEventListener('click', handleLowClick);
    ID_BTN_LOW.addEventListener('click', handleLowClick);
};

/**
 * Entfernt den bisherigen 'click'-EventListener vom Subtask-Hinzufügen-Button und fügt ihn erneut hinzu.
 * ====================================================================================================
 */
const addEventFromAddSubTask = () => {
    ID_BTN_ADD_SUBTASK.removeEventListener('click', addSubTaskToList);
    ID_BTN_ADD_SUBTASK.addEventListener('click', addSubTaskToList);
};

/**
 * Entfernt den bisherigen 'click'-EventListener vom Zuweisungs-Listen-Löschbutton mit der angegebenen Nummer
 * und fügt ihn erneut hinzu.
 * ====================================================================================================
 * @param {number} number - Die Nummer des Zuweisungs-Listen-Löschbuttons.
 * ====================================================================================================
 */
const addEventFromDelListAssigned = (number) => {
    const ID_BTN_ASSIGNED_LIST_DEL = document.getElementById('list_assigned_btn_delete' + number);
    ID_BTN_ASSIGNED_LIST_DEL.removeEventListener('click', deleteItem);
    ID_BTN_ASSIGNED_LIST_DEL.addEventListener('click', deleteItem);
};

/**
 * Entfernt den bisherigen 'click'-EventListener vom Subtask-Listen-Löschbutton mit der angegebenen Nummer
 * und fügt ihn erneut hinzu.
 * ====================================================================================================
 * @param {number} number - Die Nummer des Subtask-Listen-Löschbuttons.
 * ====================================================================================================
 */
const addEventFromDelListSubTask = (number) => {
    const ID_BTN_SUBTASK_LIST_DEL = document.getElementById('list_subtask_btn_delete' + number);
    ID_BTN_SUBTASK_LIST_DEL.removeEventListener('click', deleteItem);
    ID_BTN_SUBTASK_LIST_DEL.addEventListener('click', deleteItem);
};

/**
 * Setzt die Priorität des Tasks auf "urgent" und aktualisiert den Button-Status.
 * ====================================================================================================
 */
const handleUrgentClick = () => {
    setBtnPrio('urgent');
};

/**
 * Setzt die Priorität des Tasks auf "medium" und aktualisiert den Button-Status.
 * ====================================================================================================
 */
const handleMediumClick = () => {
    setBtnPrio('medium');
};

/**
 * Setzt die Priorität des Tasks auf "low" und aktualisiert den Button-Status.
 * ====================================================================================================
 */
const handleLowClick = () => {
    setBtnPrio('low');
};

/**
 * Setzt die angeklickte Priorität und aktualisiert den Button-Status.
 * ====================================================================================================
 * @param {string} prio - Die Priorität, die gesetzt werden soll ("urgent", "medium", "low").
 * ====================================================================================================
 */
const setBtnPrio = (prio) => {
    lastBtn();
    document.getElementById(prio).classList.add('activBtnPrio');
    document.getElementById(prio).disabled = true;
    taskForm.prio = prio;
    lastBtnPrio = prio;
};

/**
 * Setzt den letzten Prioritätsbutton zurück, indem der "active"-Status entfernt und der Button wieder aktiviert wird.
 * ====================================================================================================
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
    setBtnPrio
};