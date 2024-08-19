/**
 * Volgende dinge soll das script können!
 * =======================================================================
 * [] - Tasks ihns Bord Rendern
 * [] - Tasks Positionen Speichern
 * [] - Rendern mit letzer Position
 * =======================================================================
 * [] - Öffnen
 * [] - Schliessen
 * [] - Löschen + aktuallisieren des Task auf den Server & Neu Rendern
 * [] - Bearbeiten + aktuallisieren des Task auf den Server & Neu Rendern
 * =======================================================================
 * [] - Alle Functionen ausfürlich mach JSdoc Standart Kommentiren
 * =======================================================================
*/

import { loadUserIdFromStored, loadElementByPatch } from './module/modules.js';
import { createTaskCard } from './module/createTaskCard.js';

document.addEventListener('DOMContentLoaded', async () => {
    await initTaskBord();
});

async function initTaskBord() {
    try {
        const userID = loadUserIdFromStored();
        const tempTasks = await loadElementByPatch(`users/${userID}/`, 4);
        const taskFilters = tempTasks.filter(task => task && task.title);
        taskFilters.forEach((data, id) => {
            createTaskCard(id, data.title, data.description, data.assigned, data.date, data.prio, data.category, data.subtask);
            addEventFromTaskCard(`taskCardID${id}`);
        });
    } catch (err) {
        console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
    }
}

const addEventFromTaskCard = (id) => {
    let element = document.getElementById(id);   
    element && (
        element.removeEventListener('click', handleClick),
        element.addEventListener('click', handleClick)
    );
};

const handleClick = () => {
    showPopup('TaskcardPopupanimation', 'taskCardpopup');
};