import { initShowTaskDetails } from './show_taskDetails.js';
import { reloadWindow } from '../modules.js';
import { searchToTasks } from './search_to_tasks.js';


const idInputSearch = document.getElementById('boardSearch');


/**
 * Initializes the event listener for the close button in the task card popup.
 * @function addEventToCloseTaskCard
 * @description If the close button in the task card popup is found, it removes any previous event listeners and adds a new one.
 * The event listener is set to call the `reloadWindow` function whenever the `click` event is fired.
 * If the close button is not found, it logs a warning message to the console.
 */
const addEventToCloseTaskCard = () => {
        const element = document.getElementById('CLOSE_TASK_CARD_POPUP');
};


/**
 * Initializes event listeners for all elements with the class `loadNextPage`.
 * @function addEventToLoadAddTask
 * @description If any elements with the class `loadNextPage` are found, it removes any previous event listeners and adds a new one.
 * The event listener is set to redirect to the add task page whenever the `click` event is fired.
 * If no elements with the class `loadNextPage` are found, it logs a warning message to the console.
 */
const addEventToLoadAddTask = () => {
    document.querySelectorAll('.loadNextPage').forEach(element => {
        element.removeEventListener('click', () => { });
        element.addEventListener('click', () => {
            localStorage.setItem('activNavBtn', 'nav-btn2');
            window.location.href = './addTask.html';
        });
    });
};


/**
 * Initializes event listener for a task card.
 * @function addEventFromTaskCard
 * @param {string} id - The id of the task card element.
 * @description If the task card element is found, it removes any previous event listeners and adds a new one.
 * The event listener is set to call the `handleClick` function whenever the `click` event is fired.
 * If the task card element is not found, it logs a warning message to the console.
 */
const addEventFromTaskCard = (id) => {
    let element = document.getElementById(id);
    element.removeEventListener('click', handleClick);
    element.addEventListener('click', handleClick);
};


/**
 * Initializes event listener for the search input field.
 * @function addEventToSearch
 * @description If the search input field is found, it removes any previous event listeners and adds a new one.
 * The event listener is set to call the `searchToTasks` function whenever the `input` event is fired.
 * If the search input field is not found, it logs a warning message to the console.
 */
const addEventToSearch = () => {
    if (!idInputSearch) return;
    idInputSearch.removeEventListener('input', searchToTasks);
    idInputSearch.addEventListener('input', searchToTasks);
};


/**
 * Handles a click event on a task card.
 * @function handleClick
 * @param {MouseEvent} event - The click event object.
 * @description Retrieves the task ID from the clicked element and initializes the display of the task details popup.
 */
const handleClick = (event) => {
    const target = event.currentTarget;
    const taskId = target.getAttribute('task-id');
    showPopup('TaskcardPopupanimation', 'taskCardpopup');
    initShowTaskDetails(taskId);
};


export { addEventToCloseTaskCard, addEventToLoadAddTask, addEventFromTaskCard, addEventToSearch };