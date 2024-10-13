import { retrievingData } from './module/dataResponse.js';
import { createTaskCard } from './module/board/create_taskCard.js';
import { enableDragAndDrop, restoreTaskPositions, updateEmptyState } from './module/board/draganddrop.js';
import { addEventToCloseTaskCard, addEventToLoadAddTask, addEventFromTaskCard, addEventToSearch } from './module/board/addEvents.js';

const TASK_STATUS = [
    {
        'value': 'taskToDo',
        'text': 'To do'
    },
    {
        'value': 'taskInProgress',
        'text': 'In progress'
    },
    {
        'value': 'taskAwaitFeedback',
        'text': 'Await feedback'
    },
    {
        'value': 'taskDone',
        'text': 'Done'
    }
];

/**
 * Führt Initialisierungsfunktionen aus, sobald das DOM vollständig geladen ist.
 * ====================================================================================================
 * Diese Funktion wird ausgeführt, wenn das gesamte HTML-Dokument geladen und geparst wurde. 
 * Sie ruft mehrere asynchrone Funktionen auf, um das Taskboard zu initialisieren, das Drag-and-Drop 
 * zu aktivieren, gespeicherte Positionen der Aufgaben wiederherzustellen und den Status des 
 * Taskboards zu aktualisieren.
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    await initTaskBord();
    addEventToCloseTaskCard();
    addEventToLoadAddTask();
    addEventToSearch();
    enableDragAndDrop();
    restoreTaskPositions();  // Positionen wiederherstellen
    updateEmptyState();  // Aktualisiert die Anzeige der leeren Zustände
});

/**
 * Initialisiert das Taskboard, indem es Aufgaben aus einer Datenquelle lädt und Task-Karten erstellt.
 * ====================================================================================================
 * Diese Funktion lädt den Benutzer-ID und die zugehörigen Aufgaben aus einer Datenquelle. Anschließend
 * werden die Aufgaben gefiltert, um nur diejenigen zu berücksichtigen, die eine gültige Titelinformation 
 * besitzen. Für jede gefilterte Aufgabe wird eine Task-Karte erstellt und ein Event-Listener für die 
 * Interaktion hinzugefügt.
 * ====================================================================================================
 * @async
 * @function initTaskBord
 * @returns {void} Die Funktion gibt keinen Wert zurück, sondern sorgt dafür, dass das Taskboard mit den geladenen Aufgaben befüllt und interaktiv wird.
 * ====================================================================================================
 */
async function initTaskBord() {
    try {
        const tempTasks = await retrievingData(`board/`);
        const taskFilters = tempTasks.filter(task => task && task.title);
        clearBoard();
        taskFilters.forEach((task) => {
            let { id, title: headline, description, assigned: users, category, subtask } = task;
            createTaskCard(id, headline, description, users, category, subtask);
            addEventFromTaskCard(`taskCardID${id}`);
        });
    } catch (err) {
        console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
    };
};

const clearBoard = () => {
    TASK_STATUS.forEach(id => document.getElementById(id.value).innerHTML = '');
};

export { initTaskBord, clearBoard, TASK_STATUS };