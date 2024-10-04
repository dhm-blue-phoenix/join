import { retrievingData } from './dataResponse.js';

const elementMap = {
    title: 'value',
    description: 'textContent',
    date: 'value',
    category: 'value',
};

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
    if(!taskId) return null;
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
 * @param {Object} taskData Ein Objekt, das die Daten der Aufgabe enthält.
 * ====================================================================================================
 */
const updateDomWithTaskData = (taskData) => {
    //⚠ In Bearbeitung!
    /**
     * [X] - title
     * [X] - description
     * [] - assigned
     * [X] - date
     * [] - btn-prio
     * [X] - category
     * [] - subtask
     * 
     * Statt einen neuen Task zu erstellen, muss der mit der ID aktualisiert werden!
    */
    Object.entries(elementMap).forEach(([id, type]) => {
        const element = document.getElementById(id);
        if (element) {
            element[type] = taskData[id];
            // console.log('Protokolleintrag', taskData);
        } else console.warn(`Element mit ID "${id}" nicht gefunden`);
    });
};

export { loadEditTaskFromUrl };