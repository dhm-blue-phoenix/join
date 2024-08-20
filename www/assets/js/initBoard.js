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
import { createTaskCard } from './module/board_create_taskCard.js';
import { initShowTaskDetails } from './module/board_show_taskDetails.js';

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

const handleClick = (event) => {
    const TARGET = event.currentTarget;
    const TASK_DATA = loadDataFromAttribute(TARGET);
    showPopup('TaskcardPopupanimation', 'taskCardpopup');
    initShowTaskDetails(TASK_DATA);
};

const loadDataFromAttribute = (TARGET) => {
    const TASK_CATEGORY = TARGET.getAttribute('task-category');
    const TASK_HEADLINE = TARGET.getAttribute('task-headline');
    const TASK_DESCRIPTION = TARGET.getAttribute('task-description');
    const TASK_DATE = TARGET.getAttribute('task-date');
    const TASK_BTN_PRIO = TARGET.getAttribute('task-btnprio');

    const TASK_ID = TARGET.getAttribute('task-id');
    const TASK_CONTACT = TARGET.getAttribute('task-contacts');
    const TASK_SUBTASK = TARGET.getAttribute('task-subtask');
    return [TASK_CATEGORY, TASK_HEADLINE, TASK_DESCRIPTION, TASK_DATE, TASK_BTN_PRIO];
};