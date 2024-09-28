/**
 * Volgende dinge soll das script können!
 * =======================================================================
 * [X] - Tasks ihns Bord Rendern
 * [X] - Tasks Positionen Speichern
 * [X] - Rendern mit letzer Position
 * =======================================================================
 * [X] - Öffnen
 * [X] - Schliessen
 * [X] - Löschen + aktuallisieren des Task auf den Server & Neu Rendern
 * [] - Bearbeiten + aktuallisieren des Task auf den Server & Neu Rendern
 * =======================================================================
 * [] - Alle Functionen ausfürlich nach JSdoc Standart Kommentiren
 * =======================================================================
 * Sonstige Anmerkungen:
 *      [] Subtusk Status bar
 * =======================================================================
*/

import { loadUserIdFromStored, loadElementByPatch, reloadWindow, loadTaskData } from './module/modules.js';
import { createTaskCard } from './module/board_create_taskCard.js';
import { initShowTaskDetails } from './module/board_show_taskDetails.js';
import { enableDragAndDrop, restoreTaskPositions, updateEmptyState } from './module/board_draganddrop.js';

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
    addEventFromCloseTaskCard();
    enableDragAndDrop();
    restoreTaskPositions();  // Positionen wiederherstellen
    updateEmptyState();  // Aktualisiert die Anzeige der leeren Zustände
});

/**
 * Fügt ein Klick-Event für das Schließen des Task-Karten-Popups hinzu.
 * ====================================================================================================
 * Diese Funktion stellt sicher, dass das Fenster neu geladen wird, wenn auf das Element 
 * zum Schließen des Task-Karten-Popups geklickt wird.
 * ====================================================================================================
 */
const addEventFromCloseTaskCard = () => {
    setTimeout(() => {
        const ELEMENT = document.getElementById('CLOSE_TASK_CARD_POPUP');
        ELEMENT.removeEventListener('click', reloadWindow);
        ELEMENT.addEventListener('click', reloadWindow);
    }, 1000);
};

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
        const userID = await loadUserIdFromStored();
        const tempTasks = await loadElementByPatch(`users/${userID}/`, 5);
        const taskFilters = tempTasks.filter(task => task && task.title);
        taskFilters.forEach((task) => {
            let { id, title: headline, description, assigned: users, category, subtask } = task;
            createTaskCard(id, headline, description, users, category, subtask);
            addEventFromTaskCard(`taskCardID${id}`);
        });
    } catch (err) {
        console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
    }
}

/**
 * Fügt ein Klick-Event-Listener zu einer Task-Karte hinzu.
 * ====================================================================================================
 * Diese Funktion sucht ein Element mit der angegebenen ID, entfernt einen eventuell vorhandenen
 * 'click'-Event-Listener, und fügt dann einen neuen 'click'-Event-Listener hinzu, der die 
 * Funktion `handleClick` auslöst.
 * ====================================================================================================
 * @param {string} id Die ID des DOM-Elements, zu dem der Event-Listener hinzugefügt werden soll.
 * ====================================================================================================
 */
const addEventFromTaskCard = (id) => {
    let element = document.getElementById(id);
    element.removeEventListener('click', handleClick);
    element.addEventListener('click', handleClick);
};

/**
 * Behandelt den Klick auf ein Element und zeigt Details zu einer Aufgabe an.
 * ====================================================================================================
 * Diese Funktion wird bei einem Klick auf ein spezifisches Element ausgelöst. Sie lädt die 
 * zugehörigen Attributdaten des geklickten Elements, zeigt ein Popup an und initialisiert die 
 * Anzeige der Aufgaben-Details.
 * ====================================================================================================
 * @param {Event} event Das Event-Objekt, das den Klick repräsentiert. Es enthält Informationen über das geklickte Element und den Kontext des Events.
 * ====================================================================================================
 */
const handleClick = (event) => {
    const TARGET = event.currentTarget;
    const TASK_ID = TARGET.getAttribute('task-id');
    showPopup('TaskcardPopupanimation', 'taskCardpopup');
    initShowTaskDetails(TASK_ID);
};