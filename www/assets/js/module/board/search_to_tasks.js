import { retrievingData } from '../dataResponse.js';
import { createTaskCard } from './create_taskCard.js';
import { addEventFromTaskCard } from './addEvents.js';
import { initTaskBord, clearBoard } from '../../initBoard.js';

const ID_INPUT_SEARCH = document.getElementById('boardSearch');

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
        return task.title.toLowerCase().includes(search);
    });
    return filteredTasks;
};


const renderSearchTasks = (tasks) => {
    clearBoard();
    tasks.forEach((task) => {
        let { id, title: headline, description, assigned: users, category, subtask } = task;
        createTaskCard(id, headline, description, users, category, subtask);
        addEventFromTaskCard(`taskCardID${id}`);
    });
};

export { searchToTasks };