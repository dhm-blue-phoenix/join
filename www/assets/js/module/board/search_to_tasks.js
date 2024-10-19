import { retrievingData } from '../dataResponse.js';
import { createTaskCard } from './create_taskCard.js';
import { addEventFromTaskCard } from './addEvents.js';
import { initTaskBord, clearBoard } from '../../initBoard.js';

const ID_INPUT_SEARCH = document.getElementById('boardSearch');
const ID_taskNotFound = document.getElementById('taskNotFound');

async function searchToTasks() {
    try {
        const searchToTitle = ID_INPUT_SEARCH?.value?.toLowerCase() || ' ';
        if (searchToTitle === ' ') return initTaskBord();
        const taskResponseData = await retrievingData('board/');
        const searchELements = searchTaskElements(taskResponseData, searchToTitle);
        renderSearchTasks(searchELements);
    } catch (err) {
        console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
    };
};

const searchTaskElements = (tasks, search) => {
    const filteredTasks = tasks.filter(task => {
        if (typeof task !== 'object' || !task.title) return false;
        const title = task.title.toLowerCase().includes(search);
        const description = task.description.toLowerCase().includes(search);
        return title || description;
    });
    return filteredTasks;
};


const renderSearchTasks = (tasks) => {
    clearBoard();
    if(tasks.length === 0) return ID_taskNotFound.textContent = 'Keine Ergebnisse gefunden';
    tasks.forEach((task) => {
        let { id, title: headline, description, assigned: users, category, subtask } = task;
        createTaskCard(id, headline, description, users, category, subtask);
        addEventFromTaskCard(`taskCardID${id}`);
    });
    ID_taskNotFound.textContent = '';
};

export { searchToTasks };