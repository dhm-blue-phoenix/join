import { retrievingData } from './module/dataResponse.js';

document.addEventListener('DOMContentLoaded', function () {
  showGreeting();
  init();
  loadTaskStatusData();
  loadTaskStatusPrio()
});


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
    console.log(data);
    const tasks = data;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.prio === 'urgent') {
        urgentTaskCount++;
      }
    }
    console.log(`Anzahl der Taskcards mit Prio 'urgent': ${urgentTaskCount}`);
    return urgentTaskCount;
  } catch (err) {
    console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
  };
}

/**
 * Läd die Task-Status-Daten von der Datenbank.
 * Die Daten werden in einer Array-Struktur gespeichert, die die folgenden Eigenschaften enthält:
 * - count: Die Anzahl der Tasks mit dem jeweiligen Status
 * - prio: Der Prio-Wert des Status (low, medium, urgent)
 * - text: Der Text des Status (z.B. "zu erledigen")
 * - value: Der Wert des Status (0, 1, 2 oder 3)
 * Die Funktion gibt ein Promise zur ck, das die gefundene Task-Status-Daten enth lt.
 * @returns {Promise<Object>} - Ein Promise mit den gefundenen Task-Status-Daten
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

async function init() {
  const urgentTaskCount = await loadTaskStatusPrio();
  const { taskStatusData, totalTaskCount } = await loadTaskStatusData();
  // Hier kannst du die Daten verwenden, wie du möchtest

  // Leere den Inhalt der DIV-Container
  document.getElementById('countTasksinToDo').innerHTML = '';
  document.getElementById('countTasksinDone').innerHTML = '';
  document.getElementById('countTasksinBoard').innerHTML = '';
  document.getElementById('countTasksinProgress').innerHTML = '';
  document.getElementById('countTasksinAwait').innerHTML = '';
  document.getElementById('countPrioUrgent').innerHTML = '';


  // Fülle die Container mit einer 1
  document.getElementById('countTasksinToDo').innerHTML = `<h2>${taskStatusData[0].count}</h2> To-do`;
  document.getElementById('countTasksinDone').innerHTML = `<h2>${taskStatusData[3].count}</h2> Done`;
  document.getElementById('countTasksinBoard').innerHTML = `<h2>${totalTaskCount}</h2> Tasks in Board`;
  document.getElementById('countTasksinProgress').innerHTML = `<h2>${taskStatusData[1].count}</h2> Tasks In Progress`;
  document.getElementById('countTasksinAwait').innerHTML = `<h2>${taskStatusData[2].count}</h2> Awaiting Feedback`;
  document.getElementById('countPrioUrgent').innerHTML = `<h2>${urgentTaskCount}</h2>Urgent`;
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

