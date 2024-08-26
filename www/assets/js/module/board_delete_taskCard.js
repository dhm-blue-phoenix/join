import { loadUserIdFromStored, loadElementById, deletElementById } from './modules.js';

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
    const USER_ID = await loadUserIdFromStored();
    const DATA = await fetchData(event);
    await await deletElementById(`users/${USER_ID}/tasks/${DATA[0]}`);
    reloadBoard();
};

/**
 * Holt Daten einer bestimmten Aufgabe aus der Datenbank basierend auf einem Klick-Event.
 * ====================================================================================================
 * Diese Funktion extrahiert die `task-id` aus dem geklickten Element, inkrementiert diese um 1,
 * lädt die Benutzer-ID aus dem Speicher und ruft dann die Aufgabe mit der neuen ID aus der 
 * Datenquelle ab.
 * ====================================================================================================
 * @async
 * @function fetchData
 * @param {Event} event Das Event-Objekt, das das geklickte Element repräsentiert.
 * @returns {Promise<Object>} Ein Promise, das das geladene Aufgabenobjekt zurückgibt.
 * ====================================================================================================
 */
const fetchData = async (event) => {
    const TARGET = event.currentTarget;
    let TASK_ID = Number(TARGET.getAttribute('task-id'));                
    TASK_ID += 1;
    const USER_ID = await loadUserIdFromStored();
    return await loadElementById(`users/${USER_ID}`, TASK_ID, 'taskCard');
};

/**
 * Lädt das aktuelle Fenster neu.
 * ====================================================================================================
 * Diese Funktion lädt die aktuelle Seite neu, wodurch alle derzeit angezeigten Inhalte und 
 * Zustände zurückgesetzt werden. Dies kann verwendet werden, um das Taskboard oder andere 
 * Inhalte auf der Seite vollständig zu aktualisieren.
 * ====================================================================================================
 * @function reloadBoard
 * @returns {void} Die Funktion gibt keinen Wert zurück, sondern sorgt dafür, dass die Seite neu geladen wird.
 * ====================================================================================================
 */
const reloadBoard = () => {
    window.location.reload();
};