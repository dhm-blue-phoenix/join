import { loadUserIdFromStored, loadElementByPatch, extractInitials, loadUserData } from './module/modules.js';
import { uploadPatchData, retrievingData } from './module/dataResponse.js';
import { createListItem } from './addTask_createElements.js';
import {
    addEventFromAddTask,
    addEventFromBtnUrgent,
    addEventFromBtnMedium,
    addEventFromBtnLow,
    addEventFromAddAssigned,
    addEventFromAddSubTask,
    addEventFromDelListAssigned,
    addEventFromDelListSubTask
} from './addTask_addEvents.js';

const ID_SELECT_ASSIGNED = document.getElementById('assigned');
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
let userIds = [USER_ID];
let taskForm = RESET_TASK_FORM;
let lastBtnPrio = 'medium';
let taskId;
let users = ['', 'Select contacts to assign'];
let assignedActiv = [''];

document.addEventListener('DOMContentLoaded', () => {
    setBtnPrio('medium');
    addEventFromAddTask();
    addEventFromBtnUrgent();
    addEventFromBtnMedium();
    addEventFromBtnLow();
    addEventFromAddAssigned();
    addEventFromAddSubTask();
    renderUsers();
});

const renderUsers = async () => {
    try {
        const tempUsers = await retrievingData(`users`);
        await tempUsers.forEach(async (user) => {
            const find = {
                'email': user.email,
                'pw': user.password
            };
            // const id = await loadUserData(find);
            users.push([user.name, extractInitials(user.name), user.shortcutBackColor]);
            await createSortedUsers();
        });
    } catch (err) {
        console.error('Beim laden der Contacte ist ein Problem aufgetreten:', err);
    }
};

function createSortedUsers() {
    ID_SELECT_ASSIGNED.innerHTML = '';
    users.forEach(user => {
        const CONTACT_OPTION = document.createElement('option');
        if (typeof user === 'string') {
            CONTACT_OPTION.textContent = user;
            if (user === "Select contacts to assign") {
                CONTACT_OPTION.disabled = true;
            };
        } else if (typeof user === 'object' && user[0]) {
            CONTACT_OPTION.textContent = user[0];
            CONTACT_OPTION.value = user;
        };
        ID_SELECT_ASSIGNED.appendChild(CONTACT_OPTION);
    });
};

async function initAddTask(event) {
    event.preventDefault();
    try {
        const TASKS = await loadElementByPatch(`users/${USER_ID}`, 4);
        taskId = TASKS.length;
        loadFormData();
        // await uploadData();
        resetFrom();
        console.warn('Erstellen des Tasks abgeschlossen!'); // [!] Ändern zu Benutzer-Feedback
    } catch (err) {
        console.error(`Es ist ein Fehler beim erstellen des Tasks aufgetreten! ${err}`);
    };
};

const loadFormData = () => {
    ID_INPUT_TASK.forEach((key, i) => {
        ID_INPUT_TASK[i] && (taskForm[key] = document.getElementById(ID_INPUT_TASK[i]).value);
    });
    taskForm.id = userIds[0];
    console.log(taskForm)
};

async function uploadData() {
    userIds.forEach(async (user) => {
        await uploadPatchData(`users/${user}/tasks/`, taskForm);
    });
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

const addListElement = (type) => {
    const input = document.getElementById(type);
    const trimmedValue = input.value.trim();
    if (!trimmedValue) return;
    if (type === 'assigned') {
        const [name, short, color] = trimmedValue.split(',');
        if (!assignedActiv.includes(name)) {
            taskForm.assigned.push({ name, short, color });
            assignedActiv.push(name);
        };
    } else if (type === 'subtask') {
        taskForm.subtask.push({ status: false, text: trimmedValue });
    };
    input.value = '';
    renderList(type);
};

const renderList = (type) => {
    const listElement = document.getElementById(`${type}-list`);
    listElement.innerHTML = ''; 
    const typeMapping = {
        assigned: taskForm.assigned,
        subtask: taskForm.subtask,
    };
    const items = typeMapping[type];
    if (!items) return;
    let number = 1;
    items.forEach(item => {
        const text = item.name || item.text;
        if (text !== undefined) {
            createListItem(type, text, number++);
        };
    });
    setDelSubtask();
};

const setDelSubtask = () => {
    for (let i = 0; i < (taskForm.assigned.length - 1); i++) {
        let number = (i + 1);
        addEventFromDelListAssigned(number);
    };
    for (let i = 0; i < (taskForm.subtask.length - 1); i++) {
        let number = (i + 1);
        addEventFromDelListSubTask(number);
    };
};

const deleteItem = (event) => {
    const TARGET = event.currentTarget;
    const KEY = TARGET.getAttribute('key');
    const TYPE = TARGET.getAttribute('type');
    taskForm[TYPE].splice(KEY, 1);
    renderList(TYPE);
};

const resetFrom = () => {
    clearInput();
    resetFromTaskForm();
    setBtnPrio('medium');
};

const clearInput = () => {
    ID_INPUT_TASK.forEach((id) => document.getElementById(id).value = '');
};

const resetFromTaskForm = () => {
    taskForm = RESET_TASK_FORM;
};

export {
    initAddTask,
    setBtnPrio,
    addListElement,
    deleteItem
};