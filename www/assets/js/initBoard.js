import { retrievingData } from './module/dataResponse.js';
import { createTaskCard } from './module/board/createTaskCard.js';
import { enableDragAndDrop, restoreTaskPositions, updateEmptyState, updateTaskStatusInDatabase } from './module/board/draganddrop.js';
import { addEventToCloseTaskCard, addEventToLoadAddTask, addEventFromTaskCard, addEventToSearch } from './module/board/addEventsToBoard.js';


let taskStatus = [];


if (window.location.pathname === '/board.html') {
    document.addEventListener('DOMContentLoaded', async () => {
        delayedFadeIn();
        await loadTaskStatus();
        await initTaskBord();
        initBoard();
    });
};

/**
 * Fades in the main content of the board page after a short delay.
 * The main content is set to have 0 opacity initially, and then
 * after 250ms, its opacity is set to 1 and a transition to ease
 * in the opacity change over 0.7s is set.
 */
function delayedFadeIn() {
    const mainContent = document.querySelector('.boardmain');
    mainContent.style.opacity = 0;
    setTimeout(() => {
      mainContent.style.opacity = 1;
      mainContent.style.transition = 'opacity 0.7s ease-in-out';
    }, 250);
  }

/**
 * Initializes the task board by loading task statuses, setting up event listeners, 
 * enabling drag-and-drop functionality, restoring task positions, and updating the board state.
 * Additionally, it schedules an update to synchronize task statuses with the database.
 *
 * @async
 * @function initBoard
 * @returns {Promise<void>} A promise that resolves when the board initialization is complete.
 */
const initBoard = async () => {
    await loadTaskStatus();
    addEventToLoadAddTask();
    addEventToSearch();
    enableDragAndDrop();
    addTaskNotFoundContainers();
    restoreTaskPositions();
    updateEmptyState();
    setTimeout(async () => {
        await updateTaskStatusInDatabase();
    }, 1000);
    addEventToCloseTaskCard();
};


/**
 * Loads the task status data from the database.
 * The data is stored in the global variable `taskStatus`.
 * @returns {Promise<void>}
 */
async function loadTaskStatus() {
    try {
        const data = await retrievingData(`board/taskStatus/`);
        taskStatus = data;
        return taskStatus;
    } catch (err) {
        console.error(`A severe error occurred during rendering!! ${err}`);
    };
};


/**
 * Adds "No Tasks!" placeholders to specified task containers.
 * 
 * This function creates a placeholder element indicating that there are no tasks
 * and appends it to each task container specified by their IDs.
 * 
 * The placeholder consists of a div with an ID of 'tasktnotfounddrag' and a class
 * of 'tasktnotfound', containing a paragraph element with the text "No Tasks!".
 */
function addTaskNotFoundContainers() {
    const taskContainers = ['taskToDo', 'taskInProgress', 'taskAwaitFeedback', 'taskDone'];
    taskContainers.forEach((containerId) => {
        const container = document.getElementById(containerId);
        const taskNotFoundContainer = document.createElement('div');
        taskNotFoundContainer.id = 'tasktnotfounddrag';
        taskNotFoundContainer.className = 'tasktnotfound';
        const paragraph = document.createElement('p');
        paragraph.textContent = 'No Tasks!';
        taskNotFoundContainer.appendChild(paragraph);
        container.appendChild(taskNotFoundContainer);
    });
};


/**
 * Initializes the task board by retrieving all tasks from the server, filtering out non-title tasks, clearing the board, and rendering the filtered tasks.
 * @returns {Promise<void>}
 */
async function initTaskBord() {
    try {
        const tempTasks = await retrievingData(`board/`);
        const taskFilters = tempTasks.filter(task => task && task.title);
        clearBoard();
        taskFilters.forEach((task) => {
            let { id, title: headline, description, assigned: users, category, subtask, prio } = task;
            createTaskCard(id, headline, description, users, category, subtask, prio);
            addEventFromTaskCard(`taskCardID${id}`);
        });
    } catch (err) {
        console.error(`A severe error occurred during rendering!! ${err}`);
    };
};


/**
 * Clears all task containers on the board by setting their innerHTML to an empty string.
 * @function clearBoard
 * @returns {void} - The function doesn't return a value, it only clears the board.
 */
const clearBoard = () => {
    taskStatus.forEach(id => {
        const element = document.getElementById(id.value);
        element.innerHTML = '';
    });
};


export { initTaskBord, clearBoard, taskStatus, loadTaskStatus, initBoard };