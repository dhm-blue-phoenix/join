import { retrievingData } from '../dataResponse.js';
import { createTaskCard } from './create_taskCard.js';
import { addEventFromTaskCard } from './addEvents.js';
import { initTaskBord, clearBoard } from '../../initBoard.js';


const idInputSearch = document.getElementById('boardSearch');
const idTaskNotFound = document.getElementById('taskNotFound');


/**
 * Renders the tasks found by the search function to the board.
 * @async
 * @function searchToTasks
 * @description This function is called when the user enters a search query. It retrieves the tasks from the server, filters the tasks based on the search query, and renders the filtered tasks to the board.
 * @returns {void} The function doesn't return a value, it only renders the tasks to the board.
 */
async function searchToTasks() {
    try {
        const searchToTitle = idInputSearch?.value?.toLowerCase() || ' ';
        if (searchToTitle === ' ') return initTaskBord();
        const taskResponseData = await retrievingData('board/');
        const searchELements = searchTaskElements(taskResponseData, searchToTitle);
        renderSearchTasks(searchELements);
    } catch (err) {
        console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
    };
};


/**
 * Filtern von Aufgaben nach Titel und Beschreibung.
 * @param {object[]} tasks - Ein Array von Aufgaben-Objekten.
 * @param {string} search - Der Suchbegriff.
 * @returns {object[]} Ein Array von Aufgaben-Objekten, die den Suchbegriff enthalten.
 */
const searchTaskElements = (tasks, search) => {
    const filteredTasks = tasks.filter(task => {
        if (typeof task !== 'object' || !task.title) return false;
        const title = task.title.toLowerCase().includes(search);
        const description = task.description.toLowerCase().includes(search);
        return title || description;
    });
    return filteredTasks;
};


/**
 * Renders the tasks found by the search function to the board.
 * @param {object[]} tasks - An array of objects containing the task data.
 * @returns {void} The function doesn't return a value, it only renders the tasks to the board.
 */
const renderSearchTasks = (tasks) => {
    clearBoard();
    if(tasks.length === 0) return idTaskNotFound.textContent = 'Keine Ergebnisse gefunden';
    tasks.forEach((task) => {
        let { id, title: headline, description, assigned: users, category, subtask } = task;
        createTaskCard(id, headline, description, users, category, subtask);
        addEventFromTaskCard(`taskCardID${id}`);
    });
    idTaskNotFound.textContent = '';
};


export { searchToTasks };