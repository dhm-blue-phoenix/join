import { TASK_STATUS } from '../../initBoard.js';

/**
 * Aktiviert Drag-and-Drop-Funktionalität für die Container und Karten.
 */
export function enableDragAndDrop() {
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
export function restoreTaskPositions() {
    document.querySelectorAll('[id^=taskCardID]').forEach(card => {
        const savedContainerId = localStorage.getItem(card.id);
        if (savedContainerId) {
            const container = document.getElementById(savedContainerId);
            if (container) {
                container.appendChild(card);
            }
        }
    });
}

/**
 * Aktualisiert den Zustand der leeren Anzeige für alle Container.
 */
export function updateEmptyState() {
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

/**
 * Wechselt die Task-Karte zu einer anderen Kategorie.
 * ====================================================================================================
 * Diese Funktion wird durch den Klick auf den "Move"-Button auf der mobilen Task-Karte ausgelöst.
 * Sie liest den ausgewählten Kategorie-Wert aus dem `select`-Element mit der ID 'taskCategorySelect' und
 * verschiebt die Task-Karte in den Ziel-Kategorie-Container. Sie aktualisiert auch den Zustand der Kategorie
 * und speichert die neue Position der Task-Karte im LocalStorage.
 * ====================================================================================================
 * @function switchCategory
 * ====================================================================================================
 */
import { createMobileCategory } from './create_taskCard.js';

export const switchCategory = (cardId) => {
    const selectElement = document.getElementById('taskCategorySelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const taskCard = document.getElementById(`taskCardID${cardId}`);

    // Verwende den Code von createMobileCategory, um den richtigen Div-Container auszuwählen
    const category = TASK_STATUS.find(option => option.value === selectedOption.value).value;
    const mobileCategory = createMobileCategory(category);
    const targetContainer = document.getElementById(mobileCategory.id);

    // Finde den richtigen Container-Element
    const container = document.getElementById('taskToDo'); // oder 'taskInProgress', 'taskAwaitFeedback', 'taskDone'

    // Füge das taskCard-Element zum Container hinzu
    container.appendChild(taskCard);

    // Speichere die neue Position der Task-Karte
    localStorage.setItem(taskCard.id, selectedOption.value);

    // Aktualisiere den Zustand der Kategorie
    updateEmptyState();
};