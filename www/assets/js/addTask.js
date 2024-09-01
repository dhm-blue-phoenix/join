import { loadUserIdFromStored, loadElementByPatch } from './module/modules.js';
import { uploadPatchData } from './module/dataResponse.js';

const ID_FORM_ADD_TASK = document.getElementById('formAddTask');
const ID_BTN_ADD_SUBTASK = document.getElementById('addSubTask');
const ID_BTN_URGENT = document.getElementById('urgent');
const ID_BTN_MEDIUM = document.getElementById('medium');
const ID_BTN_LOW = document.getElementById('low');
const ID_INPUT_SUBTASK = document.getElementById('subtask');
const ID_LIST_SUBTASK = document.getElementById('subtask-list');
const ID_INPUT_TASK = ['title', 'description', 'date', 'category'];
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

/**
 * Initialisiert den Event-Listener.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, sobald der DOM vollständig geladen ist. Sie richtet
 * die notwendigen Event-Listener für Formular- und Button-Elemente ein und stellt sicher,
 * dass die Button Priorität auf den Standardwert "medium" gesetzt wird. Dies sorgt dafür, dass
 * die Benutzeroberfläche sofort einsatzbereit ist und die entsprechenden Funktionen
 * korrekt aktiviert werden.
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    setBtnPrio('medium');
    addEventFromAddTask();
    addEventFromBtnUrgent();
    addEventFromBtnMedium();
    addEventFromBtnLow();
    addEventFromAddSubTask();
});

/**
 * Fügt ein Event-Listener für das Task-Hinzufügungsformular hinzu.
 * ====================================================================================================
 * Diese Funktion entfernt zuerst vorhandene Event-Listener für das Absenden des Formulars
 * und fügt dann einen neuen hinzu, um sicherzustellen, dass nur ein Listener aktiv ist.
 * ====================================================================================================
 */
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

/**
 * Setzt die Priorität der Aufgabe auf "Urgent".
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Urgent"-Button klickt.
 * Sie setzt die Priorität der Aufgabe auf "Urgent" und aktualisiert die UI entsprechend.
 * ====================================================================================================
 */
const handleUrgentClick = () => {
    setBtnPrio('urgent');
};

const handleMediumClick = () => {
    setBtnPrio('medium');
};

const handleLowClick = () => {
    setBtnPrio('low');
};

/**
 * Initialisiert das Hinzufügen einer neuen Aufgabe.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn das Formular zum Hinzufügen einer neuen Aufgabe
 * gesendet wird. Sie verhindert das Standard-Absendeverhalten des Formulars,
 * lädt die eingegebenen Formulardaten in ein globales `taskForm`-Objekt,
 * lädt diese Daten auf den Server hoch und leert die Eingabefelder.
 * ====================================================================================================
 * @param {Event} event - Das Ereignis, das beim Absenden des Formulars ausgelöst wird.
 *                        Es wird verwendet, um das Standard-Absendeverhalten des Browsers zu verhindern.
 * ====================================================================================================
 */
async function initAddTask(event) {
    event.preventDefault();
    try {
        const USER_ID = await loadUserIdFromStored();
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

/**
 * Lädt die Formulardaten in ein globales `taskForm`-Objekt.
 * ====================================================================================================
 * Diese Funktion liest die aktuellen Werte der Formulareingaben für Titel,
 * Beschreibung, Zuweisung, Datum und Kategorie und speichert sie in einem
 * globalen `taskForm`-Objekt. Dadurch werden die eingegebenen Daten für die
 * weitere Verarbeitung oder Speicherung verfügbar gemacht.
 * ====================================================================================================
 */
const loadFormData = () => {
    ID_INPUT_TASK.forEach((key, i) => {
        ID_INPUT_TASK[i] && (taskForm[key] = document.getElementById(ID_INPUT_TASK[i]).value);
    });
    taskForm.id = taskId;
};

/**
 * Lädt die aktuellen Formulardaten auf den Server hoch.
 * ====================================================================================================
 * Diese Funktion lädt das `taskForm`-Objekt auf den Server hoch,
 * indem sie die Daten unter dem Pfad des Benutzers speichert.
 * ====================================================================================================
 * func loadUserIdFromStored() - findet man in der './module/modules.js'
 * func uploadPatchData() - findet man in der './module/dataResponse.js'
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Daten erfolgreich hochgeladen wurden.
 * ====================================================================================================
 */
async function uploadData() {
    const userID = loadUserIdFromStored();
    await uploadPatchData(`users/${userID}/tasks/`, taskForm);
};

/**
 * Setzt die Priorität der Aufgabe und aktualisiert die UI entsprechend.
 * ====================================================================================================
 * Diese Funktion setzt einen Button, der eine bestimmte Priorität darstellt,
 * auf aktiv, deaktiviert ihn und speichert die Priorität im globalen
 * `taskForm`-Objekt. Wenn zuvor ein anderer Prioritäts-Button aktiv war,
 * wird dessen Status zurückgesetzt.
 * ====================================================================================================
 * @param {string} prio - Die Priorität, die für die Aufgabe gesetzt wird.
 *                        Dies entspricht der ID des Buttons, der die Priorität darstellt.
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
 * Setzt den Status des zuletzt aktiven Prioritäts-Buttons zurück.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, um den Zustand des Buttons, der zuvor
 * als aktiv markiert wurde, zurückzusetzen. Der Button wird wieder
 * klickbar gemacht und die aktive CSS-Klasse wird entfernt.
 * ====================================================================================================
 */
const lastBtn = () => {
    document.getElementById(lastBtnPrio).classList.remove('activBtnPrio');
    document.getElementById(lastBtnPrio).disabled = false;
};

/**
 * Fügt einen neuen SubTask zur Aufgabe hinzu.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer einen neuen SubTask eingibt und
 * auf den entsprechenden Button klickt. Der SubTask wird zur Liste der SubTasks
 * im `taskForm`-Objekt hinzugefügt und das Eingabefeld wird geleert.
 * ====================================================================================================
 */
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

/**
 * Setzt das Formular nach dem Hinzufügen einer Aufgabe zurück.
 * ====================================================================================================
 * Diese Funktion setzt alle Eingabefelder des Formulars zurück, leert das `taskForm`-Objekt
 * und stellt die Standard-Priorität auf "Medium" zurück.
 * ====================================================================================================
 */
const resetFrom = () => {
    clearInput();
    resetFromTaskForm();
    setBtnPrio('medium');
};

/**
 * Setzt die Eingabefelder des Formulars zurück.
 * ====================================================================================================
 * Diese Funktion leert alle Eingabefelder des Formulars, indem sie die Werte
 * auf leere Zeichenfolgen zurücksetzt, um die Benutzeroberfläche nach dem Absenden
 * des Formulars zu bereinigen.
 * ====================================================================================================
 */
const clearInput = () => {
    ID_INPUT_TASK.forEach((id) => document.getElementById(id).value = '');
};

/**
 * Setzt das globale `taskForm`-Objekt zurück.
 * ====================================================================================================
 * Diese Funktion stellt sicher, dass das `taskForm`-Objekt nach dem Hinzufügen einer Aufgabe
 * wieder auf seine Standardwerte zurückgesetzt wird. Dadurch wird sichergestellt, dass
 * das Formular für den nächsten Einsatz in einem sauberen Zustand ist.
 * ====================================================================================================
 */
const resetFromTaskForm = () => {
    taskForm = RESET_TASK_FORM;
};