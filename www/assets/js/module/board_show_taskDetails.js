const IDS = ['TASK_ID', 'TITLE', 'DESCRIPTION_HEADLINE', 'DESCRIPTION_CONTENT', 'DATE', 'BTN_PRIO', 'PERSONS', 'SUBTASKS'];
let taskId;

export function initShowTaskDetails(taskData) {
    try {
        IDS.forEach((id, value) => {
            if (id === 'TASK_ID') taskId = taskData[value];
            if (id === 'TITLE' || id === 'DESCRIPTION_HEADLINE' || id === 'DESCRIPTION_CONTENT' || id === 'DATE' || id === 'BTN_PRIO') {
                document.getElementById(id).textContent = taskData[value];
            }
            if (id === 'PERSONS') {
                document.getElementById(id).innerHTML = '';
                JSON.parse(taskData[value]).forEach(persionData => createPersionCard(document.getElementById(id), persionData));
            };
            if (id === 'SUBTASKS') {
                const ELEMENT = document.getElementById(id);
                const SUBTASKS = JSON.parse(taskData[value]);
                ELEMENT.innerHTML = '';
                SUBTASKS.shift();
                if (SUBTASKS[0] === undefined) ELEMENT.textContent = 'Keine Subtask gefunden!';
                SUBTASKS.forEach((subtask, value) => {
                    createSubtask(ELEMENT, subtask, taskId, value);
                    createAddEventFromCheackbox(`CHEACKBOX_${taskId}${value}`);
                });
            };
        });
    } catch (err) {
        console.error(err);
    }
};

const createPersionCard = (container, persionData) => {
    const PERSION = document.createElement('div');
    PERSION.className = 'taskcardbigassignedtoperson';
    PERSION.appendChild(createPersionShortname(persionData.shortBackColor, persionData.shortname));
    PERSION.appendChild(createPersionName(persionData.name));
    container.appendChild(PERSION);
};

const createPersionShortname = (color, shortname) => {
    const SHORTNAME = document.createElement('div');
    SHORTNAME.id = 'nameShortcut';
    SHORTNAME.style.backgroundColor = color;
    SHORTNAME.textContent = shortname;
    return SHORTNAME;
};

const createPersionName = (name) => {
    const NAME = document.createElement('span');
    NAME.textContent = name;
    return NAME;
};

const createSubtask = (container, subtask, taskId, value) => {
    console.log(taskId);
    const SUBTASKS = document.createElement('div');
    SUBTASKS.className = 'taskcardbigsubtaskscheckbox';
    SUBTASKS.appendChild(createSubtaskInputBox(subtask.status, taskId, value));
    SUBTASKS.appendChild(createSubtaskText(subtask.text));
    container.appendChild(SUBTASKS);
};

const createSubtaskInputBox = (status, taskId, value) => {
    const INPUTBOX = document.createElement('input');
    INPUTBOX.type = 'checkbox';
    INPUTBOX.id = `CHEACKBOX_${taskId}${value}`;
    INPUTBOX.checked = status;
    return INPUTBOX;
};

const createSubtaskText = (text) => {
    const TEXT = document.createElement('span');
    TEXT.textContent = text;
    return TEXT;
};

const createAddEventFromCheackbox = (id) => {
    const ELEMENT = document.getElementById(id);
    ELEMENT.removeEventListener('change', handleChange);
    ELEMENT.addEventListener('change', (event) => {
        const TARGET = event.currentTarget;
        handleChange(TARGET.checked, TARGET.id);
    });
};

const handleChange = (change, id) => {
    updateSubtaskInputBox(change, id);
};

// Aktuell in Arbeit
const updateSubtaskInputBox = (status, id) => {
    // debugger
    const INPUTBOX = document.getElementById(id);
    INPUTBOX.change = status; // Endert CHECKBOX Status

    const LAST_DIGIT = id[id.length - 1];
    const ID_CHECKBOX = parseInt(LAST_DIGIT, 10); // Extrahirt CHECKBOX ID

    const TASK_SUBTASKS = document.getElementById(`taskCardID${taskId}`);
    const SUBTASKS = JSON.parse(TASK_SUBTASKS.getAttribute('task-subtask')); // ladet subtask
    console.log('JSON', SUBTASKS);
    
    SUBTASKS[ID_CHECKBOX + 1].status = status; // aktuallisirt subtusk

    console.log(SUBTASKS[ID_CHECKBOX + 1].status);

    TASK_SUBTASKS.removeAttribute('task-subtask');
    TASK_SUBTASKS.setAttribute('task-subtask', JSON.stringify(SUBTASKS)); // endert subtusk
};