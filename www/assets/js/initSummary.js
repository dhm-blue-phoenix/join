import { retrievingData } from './module/dataResponse.js';
import { initEvents } from './module/summary/addEventsToSummary.js';

document.addEventListener('DOMContentLoaded', function () {
  initEvents();
  showGreeting();
  init();
  loadTaskStatusData();
  loadTaskStatusPrio()
});

/**
 * Initialisiert die Summary-Seite.
 * Loads the task status data from the database and updates the display.
 * @returns {Promise<void>}
 */

async function init() {
  const urgentTaskCount = await loadTaskStatusPrio();
  const { taskStatusData, totalTaskCount } = await loadTaskStatusData();

  const containers = [
    { id: 'countTasksinToDo', text: 'To-do', data: taskStatusData[0].count },
    { id: 'countTasksinDone', text: 'Done', data: taskStatusData[3].count },
    { id: 'countTasksinBoard', text: 'Tasks in Board', data: totalTaskCount },
    { id: 'countTasksinProgress', text: 'Tasks In Progress', data: taskStatusData[1].count },
    { id: 'countTasksinAwait', text: 'Awaiting Feedback', data: taskStatusData[2].count },
    { id: 'countPrioUrgent', text: 'Urgent', data: urgentTaskCount },
  ];

  containers.forEach(container => {
    const element = document.getElementById(container.id);
    element.innerHTML = '';
    const h2Element = document.createElement('h2');
    h2Element.textContent = container.data;
    element.appendChild(h2Element);
    const pElement = document.createElement('p');
    pElement.textContent = container.text;
    element.appendChild(pElement);
  });
}

/**
 * Loads task status data from the database.
 * The data is stored in the global variable TASK_STATUS.
 * @param {string} path - The path from which to load the data.
 * @returns {Promise} - A promise that returns the found task status data.
 * @throws {Error} If an error occurs during data transmission.
 */

async function loadTaskStatusFromServer(path) {
  try {
    const data = await retrievingData(path);
    return data;
  } catch (err) {
    console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
  };
}

/**
 * Loads the number of tasks with priority 'urgent' from the database.
 * The count is returned.
 * @returns {Promise} - A promise that returns the number of tasks with priority 'urgent'.
 * @throws {Error} If an error occurs during data transmission.
 */

async function loadTaskStatusPrio() {
  try {
    let urgentTaskCount = 0;
    const data = await retrievingData(`board/`);

    const tasks = data;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.prio === 'urgent') {
        urgentTaskCount++;
      }
    }

    return urgentTaskCount;
  } catch (err) {
    console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
  };
}

/**
 * Loads the number of tasks per category from the database.
 * The count is returned in an array with four elements and the total number
 * of tasks in an extra property 'totalTaskCount' in the returned object.
 * @returns {Promise<{taskStatusData: {count: number}[], totalTaskCount: number}>} 
 *   A promise that returns the number of tasks per category and the total number of tasks.
 * @throws {Error} If an error occurs during data transmission.
 */

async function loadTaskStatusData() {
  try {
    let totalTaskCount = 0;
    const taskStatusData = [];
    for (let i = 0; i <= 3; i++) {
      const data = await loadTaskStatusFromServer(`board/taskStatus/${i}`);
      const formattedData = {
        count: data[0],
      };
      taskStatusData.push(formattedData);
      totalTaskCount += formattedData.count;
    }
    return { taskStatusData, totalTaskCount };
  } catch (err) {
    console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
  };
}

/**
 * Updates the text content of the element with the ID "massage" to display a greeting based on the current time of day.
 *
 * This function checks the current hour and sets the greeting to:
 * - "Guten Morgen" for hours between 0 and 11
 * - "Guten Tag" for hours between 12 and 17
 * - "Guten Abend" for hours between 18 and 23
 */
function showGreeting() {
  const currentHour = new Date().getHours();
  const massage = document.getElementById("massage");

  if (currentHour >= 0 && currentHour < 12) {
    massage.textContent = "Good morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    massage.textContent = "Good afternoon,";
  } else {
    massage.textContent = "Good evening,";
  }
}

