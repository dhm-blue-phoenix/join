import { retrievingData } from './dataResponse.js';
import { setBtnPrio } from './addTask_addEvents.js';
import { addSubTaskToList } from '../addTask.js';

const ID_SUBMIT_BTN = document.querySelector('.taskbuttoncreat');
const items = {
    title: 'value',
    description: 'textContent',
    date: 'value',
    prio: 'btn',
    category: 'value',
    subtask: 'forEach'
};
const btnPrios = ['urgent', 'medium', 'low'];
let editTaskId;

/**
 * Lädt die Bearbeitungsdaten für eine Aufgabe aus der URL und aktualisiert die DOM-Elemente.
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Aufgabe erfolgreich geladen und aktualisiert wurde.
 * ====================================================================================================
 */
async function loadEditTaskFromUrl() {
    try {
        const taskId = getTaskIdFromUrl();
        editTaskId = taskId;
        if (taskId === null) return;
        const boardData = await fetchBoardData();
        const taskData = extractTaskData(boardData, taskId);
        updateDomWithTaskData(taskData);
    } catch (error) {
        console.error('Fehler beim Laden der zu bearbeitenden Aufgabe:', error);
    };
};

/**
 * Extrahiert die Aufgaben-ID aus den URL-Parametern.
 * ====================================================================================================
 * @returns {string|null} Die Aufgaben-ID als String, falls vorhanden, oder null, falls keine gefunden wurde.
 * ====================================================================================================
 */
const getTaskIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("task");
    if (!taskId) return null;
    return taskId;
};

/**
 * Holt die Board-Daten asynchron.
 * ====================================================================================================
 * @async
 * @returns {Promise<Array>} Ein Promise, das ein Array von Aufgabenobjekten auflöst.
 * ====================================================================================================
 */
const fetchBoardData = async () => {
    const boardData = await retrievingData('');
    if (!Array.isArray(boardData)) {
        throw new Error('Board-Daten sind kein Array!');
    };
    return boardData;
};

/**
 * Findet die Aufgabe mit der angegebenen ID in den Board-Daten.
 * ====================================================================================================
 * @param {Array} boardData Ein Array von Aufgabenobjekten.
 * @param {string} taskId Die ID der zu suchenden Aufgabe.
 * @returns {Object|undefined} Das gefundene Aufgabenobjekt, oder undefined, falls keine Aufgabe gefunden wurde.
 * ====================================================================================================
 */
const extractTaskData = (boardData, taskId) => {
    const task = boardData.find(task => task.hasOwnProperty(taskId));
    if (!task) {
        throw new Error(`Fehler bei Task-ID (${taskId}): Task nicht gefunden!`);
    };
    return task[taskId];
}

/**
 * Aktualisiert die DOM-Elemente mit den Daten einer Aufgabe.
 * ====================================================================================================
 * @param {Object} taskData - Ein Objekt, das die Daten der Aufgabe enthält. Die Keys sollten den IDs der DOM-Elemente entsprechen.
 * ====================================================================================================
 */
const updateDomWithTaskData = (taskData) => {
    /**
     * Übersicht der Aufgabenfelder:
     * =======================
     * [X] - title: Titel der Aufgabe
     * [X] - description: Beschreibung der Aufgabe
     * [!] - assigned: Zugewiesene Personen (noch in Bearbeitung)
     * [X] - date: Fälligkeitsdatum der Aufgabe
     * [X] - btn-prio: Prioritätsbutton (dringend, mittel, niedrig)
     * [X] - category: Kategorie der Aufgabe
     * [X] - subtask: Unteraufgaben der Aufgabe
     * ========================
     * [X] Aufgabe erfolgreich aktualisieren!
     */
    ID_SUBMIT_BTN.textContent = 'Save!';
    Object.entries(items).forEach(([id, type]) => {
        const item = document.getElementById(id);
        if (item) {
            if (type !== 'forEach') {
                updateText(item, type, taskData[id]);
                return;
            };
            item[type] = taskData[id].forEach((sub) => {
                updateSubTask(sub.text);
            });
        } else if (type === 'btn') {
            updatePrioBtn(taskData, id);
        } else {
            console.warn(`Element mit ID "${id}" nicht gefunden`);
        }
    });
};

/**
 * Aktualisiert den Text oder die Eingabewerte eines DOM-Elements.
 * ====================================================================================================
 * @param {HTMLElement} element - Das zu aktualisierende DOM-Element.
 * @param {string} type - Der Typ des Elements (z.B. "value", "innerText").
 * @param {string} text - Der Text oder Wert, der dem Element zugewiesen wird.
 * ====================================================================================================
 */
const updateText = (element, type, text) => {
    element[type] = text;
};

/**
 * Fügt eine Unteraufgabe hinzu, wenn der Text der Unteraufgabe nicht undefiniert ist.
 * ====================================================================================================
 * @param {string} text - Der Text der Unteraufgabe.
 * ====================================================================================================
 */
const updateSubTask = (text) => {
    if (text !== undefined) {
        document.getElementById('subtask').value = text;
        addSubTaskToList();
    }
};

/**
 * Aktualisiert den Prioritätsbutton basierend auf den übergebenen Aufgabendaten.
 * ====================================================================================================
 * @param {Object} taskData - Ein Objekt, das die Daten der Aufgabe enthält, einschließlich der Priorität.
 * @param {string} id - Die ID des Buttons, der aktualisiert werden soll.
 * ====================================================================================================
 */
const updatePrioBtn = (taskData, id) => {
    const btn = taskData[id];
    btnPrios.forEach(prio => {
        if (prio === btn) {
            setBtnPrio(prio);
        }
    });
};

export { loadEditTaskFromUrl, editTaskId };