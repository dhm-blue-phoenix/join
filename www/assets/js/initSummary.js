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
 * Lädt die Task-Status-Daten von der Datenbank und aktualisiert die Anzeige.
 * @returns {Promise<void>}
 */

async function init() {
  const urgentTaskCount = await loadTaskStatusPrio();
  const { taskStatusData, totalTaskCount } = await loadTaskStatusData();
  // Hier kannst du die Daten verwenden, wie du möchtest

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
 * Läd die Task-Status-Daten von der Datenbank.
 * Die Daten werden in der globalen Variable TASK_STATUS gespeichert.
 * @param {string} path - Der Pfad, von dem die Daten geladen werden sollen.
 * @returns {Promise<Array>} - Ein Promise, das die gefundene Task-Status-Daten zur ck gibt.
 * @throws {Error} Wenn ein Fehler bei der Daten bertragung auftritt.
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
 * Läd die Anzahl der Tasks mit Prio 'urgent' von der Datenbank.
 * Die Anzahl wird zurückgegeben.
 * @returns {Promise<number>} - Ein Promise, das die Anzahl der Tasks mit Prio 'urgent' zur ck gibt.
 * @throws {Error} Wenn ein Fehler bei der Daten bertragung auftritt.
 */

async function loadTaskStatusPrio() {
  try {
    let urgentTaskCount = 0;
    const data = await retrievingData(`board/`);
    // console.log(data);
    const tasks = data;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.prio === 'urgent') {
        urgentTaskCount++;
      }
    }
    // console.log(`Anzahl der Taskcards mit Prio 'urgent': ${urgentTaskCount}`);
    return urgentTaskCount;
  } catch (err) {
    console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
  };
}

/**
 * Läd die Anzahl der Tasks pro Kategorie von der Datenbank.
 * Die Anzahl wird in einem Array mit vier Elementen und der Gesamtanzahl
 * der Tasks in einer extra Property 'totalTaskCount' im zurückgegebenen
 * Objekt zurückgegeben.
 * @returns {Promise<{taskStatusData: {count: number}[], totalTaskCount: number}>} - Ein Promise, das die Anzahl der Tasks pro Kategorie und die Gesamtanzahl der Tasks zurück gibt.
 * @throws {Error} Wenn ein Fehler bei der Daten bertragung auftritt.
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
* Aktualisiert den Textinhalt des Elements mit der ID "massage",
* um einen Gruß basierend auf der aktuellen Tageszeit anzuzeigen.
*
* Diese Funktion überprüft die aktuelle Stunde und setzt den Gruß
* auf "Guten Morgen," für Stunden zwischen 0 und 11, "Guten Tag,"
* für Stunden zwischen 12 und 17 und "Guten Abend," für Stunden
* zwischen 18 und 23.
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

