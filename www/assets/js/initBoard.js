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
    enableDragAndDrop();
    restoreTaskPositions();  // Positionen wiederherstellen
    updateEmptyState();  // Aktualisiert die Anzeige der leeren Zustände
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

/**
 * Aktiviert Drag-and-Drop-Funktionalität für die Container und Karten.
 */
function enableDragAndDrop() {
    const containers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        container.addEventListener('dragover', allowDrop);
        container.addEventListener('drop', drop);
        container.addEventListener('dragenter', handleDragEnter);
        container.addEventListener('dragleave', handleDragLeave);
    });

    document.querySelectorAll('[id^=taskCardID]').forEach(card => {
        card.setAttribute('draggable', true);
        card.addEventListener('dragstart', drag);
    });
}

/**
 * Erlaubt das Ablegen von Elementen in einem Container.
 * @param {DragEvent} event - Das DragEvent-Objekt.
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Setzt die Daten für das Drag-and-Drop über die DataTransfer-API.
 * @param {DragEvent} event - Das DragEvent-Objekt.
 */
function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

/**
 * Handhabt das Ablegen einer Karte in einem Container.
 * @param {DragEvent} event - Das DragEvent-Objekt.
 */
function drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text');
    const card = document.getElementById(cardId);

    const validContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    const targetContainerId = event.target.id;

    if (validContainers.includes(targetContainerId)) {
        event.target.appendChild(card);
        saveTaskPosition(cardId, targetContainerId);
        updateEmptyState();
    } else if (validContainers.includes(event.target.parentNode.id)) {
        event.target.parentNode.appendChild(card);
        saveTaskPosition(cardId, event.target.parentNode.id);
        updateEmptyState();
    }

    removeHoverEffect(event.target);
}

/**
 * Speichert die Position einer Karte im lokalen Speicher.
 * @param {string} cardId - Die ID der Karte.
 * @param {string} containerId - Die ID des Containers, in dem die Karte abgelegt wurde.
 */
function saveTaskPosition(cardId, containerId) {
    localStorage.setItem(cardId, containerId);
}

/**
 * Stellt die Positionen aller Karten basierend auf dem lokalen Speicher wieder her.
 */
function restoreTaskPositions() {
    document.querySelectorAll('[id^=taskCardID]').forEach(card => {
        const savedContainerId = localStorage.getItem(card.id);
        if (savedContainerId) {
            const container = document.getElementById(savedContainerId);
            if (container) {
                container.appendChild(card);
            }
        }
    });
    updateEmptyState();
}

/**
 * Aktualisiert den Zustand der leeren Anzeige für alle Container.
 */
function updateEmptyState() {
    const containers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        const emptyStateElement = container.querySelector('#tasktnotfounddrag');

        if (container.children.length === 1) {
            emptyStateElement.style.display = 'flex';
        } else {
            emptyStateElement.style.display = 'none';
        }
    });
}

/**
 * Fügt den Hover-Effekt hinzu, wenn ein gültiger Container betreten wird.
 * @param {DragEvent} event - Das DragEvent-Objekt.
 */
function handleDragEnter(event) {
    const validContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    if (validContainers.includes(event.target.id)) {
        event.target.classList.add('drop-hover');
    }
}

/**
 * Entfernt den Hover-Effekt, wenn das Element den Container verlässt.
 * @param {DragEvent} event - Das DragEvent-Objekt.
 */
function handleDragLeave(event) {
    const validContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    if (validContainers.includes(event.target.id)) {
        event.target.classList.remove('drop-hover');
    }
}

/**
 * Entfernt den Hover-Effekt eines Containers nach dem Ablegen.
 * @param {Element} target - Das Ziel-Element des Drop-Events.
 */
function removeHoverEffect(target) {
    const validContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    if (validContainers.includes(target.id)) {
        target.classList.remove('drop-hover');
    }
}
