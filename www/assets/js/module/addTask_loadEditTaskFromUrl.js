import { retrievingData } from './dataResponse.js';

const elementIds = ['title', 'description', 'assigned', 'date', 'category'];

const loadEditTaskFromUrl = async () => {
    try {
        //⚠ In Bearbeitung!
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get("task");
        if (taskId === 'null') return;

        if (typeof taskId !== 'string') throw new Error('Die Task-ID muss ein String sein.');

        const boardData = await retrievingData('');
        if (!Array.isArray(boardData)) throw new Error(`Fehler bei Task-ID (${taskId}): Daten sind kein Array oder leer!`);

        const taskData = Object.entries(boardData[0]).find(([key]) => key === taskId);
        if (!taskData) throw new Error(`Fehler bei Task-ID (${taskId}): Task nicht gefunden!`);

        const { assigned, category, date, description, id, prio, subtask, title } = taskData[1];
        console.log('Protokolleintrag:', assigned, category, date, description, id, prio, subtask, title);
    } catch (error) {
        console.error('Fehler beim Laden der zu bearbeitenden Aufgabe:', error);
    };
};

export { loadEditTaskFromUrl };