export const HtmlCard = (value, title, description, assigned, date, prio, category) => `
<!-- Taskcard -->
<div id="taskcardtoDrop" class="taskcard" draggable="true" onclick="showPopup('TaskcardPopupanimation', 'taskCardpopup')">
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
`;