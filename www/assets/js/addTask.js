import { loadUserIdFromStored, loadElementByPatch } from './module/modules.js';
import { uploadPatchData } from './module/dataResponse.js';

const ID_FORM_ADD_TASK = document.getElementById('formAddTask');
const ID_BTN_ADD_SUBTASK = document.getElementById('addSubTask');
const ID_BTN_URGENT = document.getElementById('urgent');
const ID_BTN_MEDIUM = document.getElementById('medium');
const ID_BTN_LOW = document.getElementById('low');
const ID_SELECT_ASSIGNED = document.getElementById('assigned');
const ID_INPUT_SUBTASK = document.getElementById('subtask');
const ID_LIST_SUBTASK = document.getElementById('subtask-list');
const ID_INPUT_TASK = ['title', 'description', 'date', 'category'];
const USER_ID = loadUserIdFromStored();
const RESET_TASK_FORM = {
    'id': '',
    'title': '',
    'description': '',
    'assigned': [
        {
            'name': 'Benedikt Ziegler',
            'shortname': 'BZ',
            'shortBackColor': '#ff68dc'
        },
        {
            'name': 'Anton Mayer',
            'shortname': 'AM',
            'shortBackColor': '#ff68dc'
        },
        {
            'name': 'David Eisenberg',
            'shortname': 'DE',
            'shortBackColor': '#ff68dc'
        },
    ],
    'date': '',
    'prio': '',
    'category': '',
    'subtask': ['none']
};
let taskForm = RESET_TASK_FORM;
let lastBtnPrio = 'medium';
let taskId;
let contactOptions = ['', 'Select contacts to assign'];

document.addEventListener('DOMContentLoaded', () => {
    setBtnPrio('medium');
    addEventFromAddTask();
    addEventFromBtnUrgent();
    addEventFromBtnMedium();
    addEventFromBtnLow();
    addEventFromAddSubTask();
    renderContacts();
});

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
    ID_BTN_ADD_SUBTASK.removeEventListener('click', addSubtask);
    ID_BTN_ADD_SUBTASK.addEventListener('click', addSubtask);
};

const addEventFromDelListSubTask = (number) => {
    const ID_BTN_SUBTASK_LIST_DEL = document.getElementById('subtask_list_btn_delete' + number);
    ID_BTN_SUBTASK_LIST_DEL.removeEventListener('click', subtaskDeleteItem);
    ID_BTN_SUBTASK_LIST_DEL.addEventListener('click', subtaskDeleteItem);
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

const renderContacts = async () => {
    try {
        const tempContacts = await loadElementByPatch(`users/${USER_ID}/`, 0);
        tempContacts.forEach(contact => {
            if (contact !== '') {
                contactOptions.push(contact);
            };
        });
        console.log('renderContact', contactOptions);
        createSortedContacts();
    } catch (err) {
        console.error('Beim laden der Contacte ist ein Problem aufgetreten:', err);
    }
};

function createSortedContacts() {
    ID_SELECT_ASSIGNED.innerHTML = '';
    contactOptions.forEach(option => {
        const CONTACT_OPTION = document.createElement('option');
        if (typeof option === 'string') {
            console.info('a');
            CONTACT_OPTION.textContent = option;
            if (option === "Select contacts to assign") {
                console.info('b');
                CONTACT_OPTION.disabled = true;
            };
        } else if (typeof option === 'object' && option.name) {
            console.info('c');
            CONTACT_OPTION.textContent = option.name;
            CONTACT_OPTION.value = option.email;
        };
        ID_SELECT_ASSIGNED.appendChild(CONTACT_OPTION); //Ist ein ID fehler!    
    });
    // attachCardEvents();
};

/**
 * else if (typeof key === 'string') {
            CONTACT_OPTION.textContent = key;
            CONTACT_OPTION.disabled = true;
        } else {
            CONTACT_OPTION.textContent = key.name;
        };
 * 
*/

// createContactOption(key, cardId, contact.name, contact.shortcutBackColor);


async function initAddTask(event) {
    event.preventDefault();
    try {
        const TASKS = await loadElementByPatch(`users/${USER_ID}`, 4);
        taskId = TASKS.length;
        loadFormData();
        await uploadData();
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
    taskForm.id = taskId;
};

async function uploadData() {
    await uploadPatchData(`users/${USER_ID}/tasks/`, taskForm);
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

const addSubtask = () => {
    const input = ID_INPUT_SUBTASK;
    if (input.value !== '') {
        taskForm.subtask.push({ 'status': false, 'text': input.value });
        input.value = '';
        renderSubtaskList();
    };
};

const renderSubtaskList = () => {
    ID_LIST_SUBTASK.innerHTML = '';
    let number = 1;
    taskForm.subtask.forEach(subtask => {
        if (subtask.text !== undefined) {
            createSubtaskListItem(subtask.text, number);
            number++;
        }
    });
    setDelSubtask();
};

const setDelSubtask = () => {
    for (let i = 0; i < (taskForm.subtask.length - 1); i++) {
        let number = (i + 1);
        addEventFromDelListSubTask(number);
    }
};

const createSubtaskListItem = (text, number) => {
    const LIST_ITEM = document.createElement('li');
    LIST_ITEM.className = 'subtask-list-item';
    LIST_ITEM.appendChild(createSubtaskListText(text, number));
    LIST_ITEM.appendChild(createSubtuskListOptions(number));
    ID_LIST_SUBTASK.appendChild(LIST_ITEM);
};

const createSubtaskListText = (text, number) => {
    const LIST_TEXT = document.createElement('input');
    LIST_TEXT.value = text;
    LIST_TEXT.className = 'subtask-list-item-text';
    LIST_TEXT.id = 'list_edit' + number;
    return LIST_TEXT;
};

const createSubtuskListOptions = (number) => {
    const LIST_OPTIONS = document.createElement('div');
    LIST_OPTIONS.className = 'subtask-list-item-option';
    LIST_OPTIONS.appendChild(createSubtaskListBtn('delete.svg', number));
    return LIST_OPTIONS;
};

const createSubtaskListBtn = (btnImg, number) => {
    const LIST_BTN = document.createElement('button');
    LIST_BTN.type = 'button';
    LIST_BTN.appendChild(createSubtaskListBtnImg(btnImg, number));
    return LIST_BTN;
};

const createSubtaskListBtnImg = (btnImg, number) => {
    const LIST_BTN_IMG = document.createElement('img');
    LIST_BTN_IMG.src = '../../../www/resources/symbols/' + btnImg;
    LIST_BTN_IMG.alt = 'btn_img_' + btnImg;
    LIST_BTN_IMG.id = 'subtask_list_btn_' + (btnImg.substring(0, btnImg.indexOf('.')) + number);
    LIST_BTN_IMG.setAttribute('subtask-key', number);
    LIST_BTN_IMG.setAttribute('subtask-edit-id', `list_edit${number}`);
    return LIST_BTN_IMG;
};

const subtaskDeleteItem = (event) => {
    const TARGET = event.currentTarget;
    const KEY = TARGET.getAttribute('subtask-key');
    taskForm.subtask.splice(KEY, 1);
    renderSubtaskList();
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