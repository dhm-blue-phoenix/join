import { loadUserIdFromStored, loadElementByPatch, loadTaskData } from './module/modules.js';
import { uploadPatchData, retrievingData, updateData } from './module/dataResponse.js';
import { createListItem } from './module/addTask_createSubList.js';
import { loadEditTaskFromUrl, editTaskId } from './module/addTask_loadEditTaskFromUrl.js';
import { renderUsers } from './module/addTask_createSortedUsers.js';
import {
    addEventFromAddTask,
    addEventFromBtnUrgent,
    addEventFromBtnMedium,
    addEventFromBtnLow,
    addEventFromAddSubTask,
    addEventFromDelListSubTask,
    setBtnPrio
} from './module/addTask_addEvents.js';

const ID_INPUT_TASK = ['title', 'description', 'date', 'category'];
const USER_ID = loadUserIdFromStored();
const RESET_TASK_FORM = {
    'id': '',
    'title': '',
    'description': '',
    'assigned': ['none'],
    'date': '',
    'prio': '',
    'category': '',
    'subtask': ['none']
};
let taskForm = RESET_TASK_FORM;
let taskId;

/**
 * Lädt und initialisiert die Seite nach dem vollständigen Laden des DOM.
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    loadEditTaskFromUrl();
    setBtnPrio('medium');
    addEventFromAddTask();
    addEventFromBtnUrgent();
    addEventFromBtnMedium();
    addEventFromBtnLow();
    addEventFromAddSubTask();
    renderUsers();
});

/**
 * Startet den Prozess des Hinzufügens eines neuen Tasks.
 * ====================================================================================================
 * @param {Event} event - Das 'submit'-Ereignis des Formulars.
 * ====================================================================================================
 */
async function initAddTask(event) {
    event.preventDefault();
    try {
        const TASKS = await loadElementByPatch(`users/${USER_ID}`, 4);
        taskId = TASKS.length;
        loadDataToForm();
        await uploadData();
        resetFrom();
        loadNextPage();
    } catch (err) {
        console.error(`Es ist ein Fehler beim Erstellen des Tasks aufgetreten! ${err}`);
    }
};

/**
 * Lädt die Formulardaten in das Task-Objekt und weist eine neue ID zu.
 * ====================================================================================================
 */
const loadDataToForm = async () => {
    try {
        ID_INPUT_TASK.forEach((key, i) => {
            if (ID_INPUT_TASK[i]) {
                taskForm[key] = document.getElementById(ID_INPUT_TASK[i]).value;
            };
        });
        const taskIds = await loadTaskData();
        const ids = Array.from(taskIds).sort((a, b) => a - b);
        let nextId = 0;
        while (ids.includes(String(nextId))) { nextId++; }
        taskForm.id = String(nextId);
    } catch (err) {
        console.error('Beim Laden der Tasks ist ein Problem aufgetreten:', err);
    };
};

/**
 * Synchronisiert die Daten mit dem Server, entweder durch Hochladen oder Aktualisieren.
 * ====================================================================================================
 */
async function uploadData() {
    try {
        const userData = await retrievingData('');
        const userIds = Object.keys(userData[0]);
        if (userIds.length === 0) {
            throw new Error('Keine Benutzer-IDs gefunden.');
        };
        if (editTaskId !== null) {
            await updateData(`board/${editTaskId}`, taskForm);
            return;
        };
        await uploadPatchData('board/', taskForm);
    } catch (error) {
        console.error('Fehler beim Synchronisieren der Daten:', error);
    }
}

/**
 * Fügt einen Subtask zur Liste hinzu und aktualisiert die Anzeige.
 * ====================================================================================================
 */
const addSubTaskToList = () => {
    const type = 'subtask';
    const input = document.getElementById(type);
    const trimmedValue = input.value.trim();
    if (!trimmedValue) return;
    taskForm.subtask.push({ status: false, text: trimmedValue });
    input.value = '';
    renderList(type);
};

/**
 * Rendert die Liste für den angegebenen Typ (Subtasks).
 * ====================================================================================================
 * @param {string} type - Der Typ der Liste ('subtask').
 * ====================================================================================================
 */
const renderList = (type) => {
    const listElement = document.getElementById(`${type}-list`);
    listElement.innerHTML = '';
    const items = taskForm[type];
    if (!items) return;
    let number = 1;
    items.forEach(item => {
        const text = item.name || item.text;
        if (text !== undefined) {
            createListItem(type, text, number++);
        }
    });
    setDelSubtask();
};

/**
 * Setzt die EventListener für das Löschen von Subtasks.
 * ====================================================================================================
 */
const setDelSubtask = () => {
    for (let i = 0; i < (taskForm.subtask.length - 1); i++) {
        let number = (i + 1);
        addEventFromDelListSubTask(number);
    }
};

/**
 * Löscht ein Item aus der Liste, basierend auf dem Event und aktualisiert die Anzeige.
 * ====================================================================================================
 * @param {Event} event - Das Event, das das Löschen auslöst.
 * ====================================================================================================
 */
const deleteItem = (event) => {
    const TARGET = event.currentTarget;
    const KEY = TARGET.getAttribute('key');
    const TYPE = TARGET.getAttribute('type');
    taskForm[TYPE].splice(KEY, 1);
    renderList(TYPE);
};

/**
 * Setzt das Formular auf den Ausgangszustand zurück.
 * ====================================================================================================
 */
const resetFrom = () => {
    clearInput();
    resetFromTaskForm();
    setBtnPrio('medium');
};

/**
 * Leert alle Eingabefelder im Formular.
 * ====================================================================================================
 */
const clearInput = () => {
    ID_INPUT_TASK.forEach((id) => document.getElementById(id).value = '');
};

/**
 * Setzt die Daten im Task-Formular zurück auf den Ausgangszustand.
 * ====================================================================================================
 */
const resetFromTaskForm = () => {
    taskForm = RESET_TASK_FORM;
};

/**
 * Lädt die nächste Seite und speichert den aktiven Navigation-Button.
 * ====================================================================================================
 */
const loadNextPage = () => {
    localStorage.setItem('activNavBtn', 'nav-btn1');
    window.location.href = './board.html';
};

export {
    initAddTask,
    addSubTaskToList,
    deleteItem,
    taskForm
};