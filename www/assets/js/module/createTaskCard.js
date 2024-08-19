const ID_taskToDo = document.getElementById('taskToDo');
const BETTA_KONTAKTE = [
    {
        'shortBackColor': '#ff68dc',
        'text': 'DE'
    },
    {
        'shortBackColor': '#ff822f',
        'text': 'AM'
    },
    {
        'shortBackColor': '#19e030',
        'text': 'BZ'
    }
];
const MOBILE_OPTION_VALUES = [
    {
        'value': 'taskToDo',
        'text': 'To do'
    },
    {
        'value': 'taskInProgress',
        'text': 'In progress'
    },
    {
        'value': 'taskAwaitFeedback',
        'text': 'Await feedback'
    }, 
    {
        'value': 'taskDone',
        'text': 'Done'
    }
];

export const createTaskCard = (cardId, title, description, assigned, date, prio, category, subtask) => {
    const TASK_CARD = document.createElement('div');
    TASK_CARD.id = `taskCardID${cardId}`;
    TASK_CARD.className = 'taskcard';
    TASK_CARD.draggable = true;
    TASK_CARD.appendChild(createTitle(title));
    TASK_CARD.appendChild(createDescription(description));
    TASK_CARD.appendChild(createProgress(subtask));
    TASK_CARD.appendChild(createPerson(assigned));
    TASK_CARD.appendChild(createMobile());
    ID_taskToDo.appendChild(TASK_CARD);
};

const createTitle = (title) => {
    const TITLE = document.createElement('p');
    TITLE.className = 'taskcardtitle';
    TITLE.textContent = title;
    return TITLE;
};

const createDescription = (description) => {
    // Beschreibung
    const DESCRIPTION = document.createElement('div');
    DESCRIPTION.className = 'teskdescription';
    DESCRIPTION.appendChild(createDescriptionHeadline());
    DESCRIPTION.appendChild(createDescriptionContent());
    return DESCRIPTION;
};

const createDescriptionHeadline = () => {
    const DESCRIPTION_HEADLINE = document.createElement('h3');
    DESCRIPTION_HEADLINE.textContent = 'Kochwelt Page & Recipe Recommender';
    return DESCRIPTION_HEADLINE;
};

const createDescriptionContent = () => {
    const DESCRIPTION_CONTENT = document.createElement('p');
    DESCRIPTION_CONTENT.textContent = 'Build start page with recipe recommendation...';
    return DESCRIPTION_CONTENT;
};

const createProgress = (subtask) => {
    // Subtask
    const PROGRESS = document.createElement('div');
    PROGRESS.className = 'taskprogress';
    PROGRESS.appendChild(createProgressImage());
    PROGRESS.appendChild(createProgressText());
    return PROGRESS
};

const createProgressImage = () => {
    const PROGRESS_IMG = document.createElement('img');
    PROGRESS_IMG.style.height = '8px';
    PROGRESS_IMG.src = './resources/symbols/Progressbar.png';
    PROGRESS_IMG.alt = '';
    return PROGRESS_IMG;
};

const createProgressText = () => {
    const PROGRESS_TEXT = document.createElement('span');
    PROGRESS_TEXT.textContent = '1/2 Subtasks';
    return PROGRESS_TEXT;
};

const createPerson = (assigned) => {
    // Kontakte
    const PERSON = document.createElement('div');
    PERSON.className = 'taskPersons';
    PERSON.appendChild(createPersonShortcut());
    return PERSON;
};

const createPersonShortcut = () => {
    const PERSON_SHORTCUT = document.createElement('div');
    PERSON_SHORTCUT.className = 'nameShortcutContent';
    BETTA_KONTAKTE.forEach(contact => PERSON_SHORTCUT.appendChild(createPersonShortcutContent(contact)));
    return PERSON_SHORTCUT;
};

const createPersonShortcutContent = (contact) => {
    const PERSON_SHORTCUT_CONTENT = document.createElement('div');
    PERSON_SHORTCUT_CONTENT.id = 'nameShortcut';
    PERSON_SHORTCUT_CONTENT.style.marginLeft = '-10px';
    PERSON_SHORTCUT_CONTENT.style.backgroundColor = contact.shortBackColor;
    PERSON_SHORTCUT_CONTENT.textContent = contact.text;
    return PERSON_SHORTCUT_CONTENT;
};

const createMobile = () => {
    const MOBILE = document.createElement('div');
    MOBILE.className = 'taskbottommobilesmall';
    MOBILE.appendChild(createMobileCategory());
    MOBILE.appendChild(createMobileButton());
    return MOBILE;
};

const createMobileCategory = () => {
    const MOBILE_CATEGORY = document.createElement('select');
    MOBILE_CATEGORY.id = 'taskCategorySelect';
    MOBILE_OPTION_VALUES.forEach(option => MOBILE_CATEGORY.appendChild(createMobileCategoryOptions(option)));
    return MOBILE_CATEGORY;
};

const createMobileCategoryOptions = (option) => {
    const MOBILE_CATEGORY_OPTIONS = document.createElement('option');
    MOBILE_CATEGORY_OPTIONS.value = option.value;
    MOBILE_CATEGORY_OPTIONS.textContent = option.text;
    return MOBILE_CATEGORY_OPTIONS;
};

const createMobileButton = () => {
    const MOBILE_BTN = document.createElement('button');
    MOBILE_BTN.id = 'moveTaskButton';
    MOBILE_BTN.textContent = 'Move';
    return MOBILE_BTN;
};