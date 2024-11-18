import { taskStatus } from '../../initBoard.js';
import { retrievingData, updateData } from '../dataResponse.js';
import { loadTaskStatus } from '../../initBoard.js';

/**
 * Enables drag-and-drop functionality for containers and cards.
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
 * Allows dropping of elements into a container.
 * @param {DragEvent} event - The DragEvent object.
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Sets the data for drag-and-drop using the DataTransfer API.
 * @param {DragEvent} event - The DragEvent object.
 */
function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

/**
 * Handles the dropping of a card into a container.
 * @param {DragEvent} event - The DragEvent object.
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
 * Saves the new position of a task card by updating its board status in the data source.
 *
 * This asynchronous function retrieves the task ID associated with a card, loads the task data,
 * and updates the board status to reflect its new container. It also triggers an update to 
 * synchronize task statuses with the database.
 *
 * @param {string} cardId - The ID of the task card element.
 * @param {string} containerId - The ID of the container where the card is dropped.
 * @returns {Promise<void>} A promise that resolves when the task position is successfully saved.
 */
async function saveTaskPosition(cardId, containerId) {
    const taskId = document.getElementById(cardId).getAttribute('task-id');
    const id = await loadTasksToBoard(taskId);
    await updateData(`board/${id[0]}/boardStatus`, containerId);
    updateTaskStatusInDatabase();
};

/**
 * Updates the task status data in the database to reflect the current state of the board.
 *
 * This function loads the current task status data, counts the number of task cards in each
 * container, and updates the corresponding count in the database.
 *
 * @async
 * @function updateTaskStatusInDatabase
 * @returns {Promise<void>} A promise that resolves when the task status data has been successfully updated.
 */
async function updateTaskStatusInDatabase() {
    try {
        const taskStatusData = await loadTaskStatus();
        const categoryMapping = {
            taskToDo: 0,
            taskInProgress: 1,
            taskAwaitFeedback: 2,
            taskDone: 3
        };
        taskStatusData.forEach((category) => {
            const containerId = category.value;
            const container = document.getElementById(containerId);
            const currentCardCount = container.querySelectorAll('[id^=taskCardID]').length;

            const data = {
                count: currentCardCount,
                prio: category.prio,
                text: category.text,
                value: category.value
            };
            const path = `board/taskStatus/${categoryMapping[containerId]}`;
            updateData(path, data);
        });

    } catch (error) {
        console.error('Fehler beim Aktualisieren der Datenbank: ', error);
    }
}


/**
 * Restores the positions of all cards based on local storage.
 */
export function restoreTaskPositions() {
    document.querySelectorAll('[id^=taskCardID]').forEach(async (card) => {
        const taskId = document.getElementById(card.id).getAttribute('task-id');
        const taskData = await loadTasksToBoard(taskId);
        const savedContainerId = taskData[1].boardStatus;
        if (savedContainerId) {
            const container = document.getElementById(savedContainerId);
            if (container) {
                container.appendChild(card);
                updateEmptyState();
            };
        };
    });
};

/**
 * Loads tasks onto the board based on the task ID.
 * 
 * @async
 * @function loadTasksToBoard
 * @param {string} taskId - The ID of the task to be loaded.
 * @returns {Promise<Object>} - A promise that returns the found task object.
 */
async function loadTasksToBoard(taskId) {
    let taskData = await retrievingData('');
    taskData = Object.entries(taskData[0]).find(([id, findTask]) => findTask.id === taskId);
    return taskData;
};

/**
 * Updates the empty display state for all containers.
 */
/**
 * Updates the empty display state for all containers.
 */
export function updateEmptyState() {
    const containers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
  
    containers.forEach(containerId => {
      const container = document.getElementById(containerId);
      let emptyStateElement = container.querySelector('#tasktnotfounddrag');
  
      // Überprüfe, ob der Container mit der ID "tasktnotfounddrag" existiert
      if (!emptyStateElement) {
        // Wenn nicht, erstelle einen neuen Container
        emptyStateElement = document.createElement('div');
        emptyStateElement.id = 'tasktnotfounddrag';
        emptyStateElement.className = 'tasktnotfound';
        const paragraph = document.createElement('p');
        paragraph.textContent = 'No Tasks!';
        emptyStateElement.appendChild(paragraph);
        container.appendChild(emptyStateElement);
      }
  
      if (container.children.length === 1) {
        emptyStateElement.style.display = 'flex';
      } else {
        emptyStateElement.style.display = 'none';
      }
    });
  }

/**
 * Adds the hover effect when a valid container is entered.
 * @param {DragEvent} event - The DragEvent object.
 */
function handleDragEnter(event) {
    const validContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    if (validContainers.includes(event.target.id)) {
        event.target.classList.add('drop-hover');
    }
}

/**
 * Removes the hover effect when the element leaves the container.
 * @param {DragEvent} event - The DragEvent object.
 */
function handleDragLeave(event) {
    const validContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    if (validContainers.includes(event.target.id)) {
        event.target.classList.remove('drop-hover');
    }
}

/**
 * Removes the hover effect of a container after dropping.
 * @param {Element} target - The target element of the drop event.
 */
function removeHoverEffect(target) {
    const validContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    if (validContainers.includes(target.id)) {
        target.classList.remove('drop-hover');
    }
}

/**
 * Switches the task card to another category.
 * ====================================================================================================
 * This function is triggered by clicking the "Move" button on the mobile task card.
 * It reads the selected category value from the `select` element with the ID 'taskCategorySelect' and
 * moves the task card to the target category container. It also updates the category state and saves the
 * new position of the task card in LocalStorage.
 * ====================================================================================================
 * @function switchCategory
 * ====================================================================================================
 */
import { createMobileCategory } from './createTaskCard.js';

export const switchCategory = (cardId) => {
    const selectElement = document.getElementById(`taskCategorySelect${cardId}`);
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const taskCard = document.getElementById(`taskCardID${cardId}`);

    const category = taskStatus.find(option => option.value === selectedOption.value).value;
    const mobileCategory = createMobileCategory(category);
    const targetContainer = document.getElementById(mobileCategory.cardId);

    const containerId = selectedOption.value;
    const container = document.getElementById(containerId);

    container.appendChild(taskCard);

    saveTaskPosition(taskCard.id, selectedOption.value);

    updateEmptyState();
    updateTaskStatusInDatabase();
};

export { updateTaskStatusInDatabase };