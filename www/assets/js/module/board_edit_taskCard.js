import { retrievingData } from './dataResponse.js';

/**
 * Bearbeitet eine Task-Karte und lädt die entsprechende Task auf eine neue Seite.
 * ====================================================================================================
 * @param {Event} event - Das Event-Objekt, das beim Klick auf die Task-Karte ausgelöst wird.
 * ====================================================================================================
 */
export async function editTaskCard(event) {
    const taskId = event.currentTarget.getAttribute('task-id');
    const tasks = await retrievingData('');
    const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === taskId);
    loadNextPage(currentTask);
};

/**
 * Lädt die nächste Seite und speichert die aktuelle Navigationsoption im localStorage.
 * ====================================================================================================
 * @param {Array} currentTask - Das Array, das die Task-Daten enthält, die geladen werden sollen.
 * ====================================================================================================
 */
const loadNextPage = (currentTask) => {
    localStorage.setItem('activNavBtn', 'nav-btn2');
    window.location.href = `./addTask.html?task=${currentTask[0]}`;
};