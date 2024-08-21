const IDS = ['TITLE', 'DESCRIPTION_HEADLINE', 'DESCRIPTION_CONTENT', 'DATE', 'BTN_PRIO', 'PERSONS', 'SUBTASKS'];

export function initShowTaskDetails(taskData) {
    try {
        IDS.forEach((id, value) => {
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
                SUBTASKS.forEach(subtask => createSubtask(ELEMENT, subtask));
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

const createSubtask = (container, subtask) => {
    const SUBTASKS = document.createElement('div');
    SUBTASKS.className = 'taskcardbigsubtaskscheckbox';
    SUBTASKS.appendChild(createSubtaskInputBox(subtask.status));
    SUBTASKS.appendChild(createSubtaskText(subtask.text));
    container.appendChild(SUBTASKS);
};

const createSubtaskInputBox = (status) => {
    const INPUTBOX = document.createElement('input');
    INPUTBOX.type = 'checkbox';
    INPUTBOX.checked = status;
    return INPUTBOX;
};

const createSubtaskText = (text) => {
    const TEXT = document.createElement('span');
    TEXT.textContent = text;
    return TEXT;
};