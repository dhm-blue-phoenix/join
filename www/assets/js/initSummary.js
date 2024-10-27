import { retrievingData } from './module/dataResponse.js';

document.addEventListener('DOMContentLoaded', function () {
  showGreeting();
  init();
  loadTaskStatusData();
  loadTaskStatusPrio()
});

async function loadTaskStatusFromServer(path) {
  try {
    const data = await retrievingData(path);
    return data;
  } catch (err) {
    console.error(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
  };
}

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

async function loadTaskStatusData() {
  try {
    let totalTaskCount = 0;
    const taskStatusData = [];
    for (let i = 0; i <= 3; i++) {
      const data = await loadTaskStatusFromServer(`board/taskStatus/${i}`);
      const formattedData = {
        count: data[0],
        prio: data[1],
        text: data[2],
        value: data[3]
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

