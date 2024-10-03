import { retrievingData } from './dataResponse.js';

const elementIds = ['title', 'description', 'assigned', 'date', 'category'];

const loadEditTaskFromUrl = async () => {
    try {
        //⚠ In Bearbeitung!
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get("task");
        if (taskId === 'null') return;

        let boardData = await retrievingData('');
        if (!Array.isArray(boardData)) throw new Error(`Fehler bei Task-ID (${taskId}): Daten kein Array!`);

        boardData = Object.entries(boardData[0]);
        if(!Array.isArray(boardData)) throw new Error(`Fehler bei Task-ID (${taskId}): Task nicht gefunden!`);
        
        const taskData = boardData.find(task => task[0] === taskId);
        if(!Array.isArray(taskData)) throw new Error(`Fehler bei Task-ID (${taskId}): Task kein Array!`);
        
        const { assigned, category, date, description, id, prio, subtask, title } = taskData[1];
        console.log('Protokolleintrag:', assigned, category, date, description, id, prio, subtask, title);
    } catch (error) {
        console.error('Fehler beim Laden der zu bearbeitenden Aufgabe:', error);
    };
};

export { loadEditTaskFromUrl };