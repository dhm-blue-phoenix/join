import { deletElementById, reloadWindow } from './modules.js';
import { retrievingData } from './dataResponse.js';


/**
 * Löscht eine bestimmte Task-Karte und lädt das Board neu.
 * ====================================================================================================
 * Diese Funktion wird bei einem Event (z. B. einem Klick) ausgelöst und löscht die zugehörige 
 * Task-Karte aus der Datenbank. Nach dem erfolgreichen Löschen der Karte wird das Board neu geladen, 
 * um die Änderungen anzuzeigen.
 * ====================================================================================================
 * @async
 * @function deleteTaskCard
 * @param {Event} event Das Event-Objekt, das das geklickte Element repräsentiert und die relevante Aufgabe angibt.
 * @returns {void} Die Funktion gibt keinen Wert zurück, sondern löscht die Task-Karte und lädt die Seite neu.
 * ====================================================================================================
 */
export async function deleteTaskCard(event) {
    const taskId = event.currentTarget.getAttribute('task-id');
    const tasks = await retrievingData('');
    const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === taskId);
    await await deletElementById(`board/${currentTask[0]}`);
    reloadWindow();
};