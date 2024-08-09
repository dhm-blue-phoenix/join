/**
 * Volgende dinge soll das script können!
 * =======================================================================
 * [] - Tasks ihns Bord Rendern
 * [] - Tasks Positionen Speichern
 * [] - Rendern mit letzer Position
 * =======================================================================
 * [] - Öffnen
 * [] - Schliessen
 * [] - Löschen + aktuallisieren des Task auf den Server & Neu Rendern
 * [] - Bearbeiten + aktuallisieren des Task auf den Server & Neu Rendern
 * =======================================================================
 * [] - Alle Functionen ausfürlich mach JSdoc Standart Kommentiren
 * =======================================================================
*/

const ID_taskToDo = document.getElementById('taskToDo');
const HtmlCard = (title, description, assigned, date, prio, category) => `
<!-- Taskcard -->
<div id="taskcardtoDrop" class="taskcard" draggable="true" onclick="showTaskCardPopup()">
    <p class="taskcardtitle">${title}</p>
    <div class="teskdescription">
        <h3>Kochwelt Page & Recipe Recommender</h3>
        <p>Build start page with recipe recommendation...</p>
    </div>
    <div class="taskprogress">
        <img style="height: 8px" src="./resources/symbols/Progressbar.png" alt="" />
        1/2 Subtasks
    </div>
    <div class="taskPersons">
        <div class="nameShortcutContent">
            <div id="nameShortcut" style="background-color: #ff68dc">DE</div>
            <div id="nameShortcut" style="margin-left: -10px; background-color: #ff822f">AM</div>
            <div id="nameShortcut" style="margin-left: -10px; background-color: #19e030">BZ</div>
        </div>
    </div>
    <!-- New select and button elements -->
    <div class="taskbottommobilesmall">
    <select id="taskCategorySelect">
        <option value="taskToDo">To do</option>
        <option value="taskInProgress">In progress</option>
        <option value="taskAwaitFeedback">Await feedback</option>
        <option value="taskDone">Done</option>
    </select>
        <button id="moveTaskButton">Move</button>
    </div>
</div>
<!-- Taskcard Ende -->
`;const taskCard = {
    "assigned": "2",
    "category": "2",
    "date": "2024-08-22",
    "description": "[DESCRIPTION]",
    "prio": "urgent",
    "title": "[TITLE]"
};

async function initTaskBord() {
    try {
        ID_taskToDo.innerHTML += HtmlCard(taskCard.title, taskCard.description, taskCard.assigned, taskCard.date, taskCard.prio, taskCard.category);
    } catch (err) {
        console.log(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
    }
}

