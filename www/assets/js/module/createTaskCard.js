const ID_taskToDo = document.getElementById('taskToDo');
const CATEGORY_OPTION_VALUES = [
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

export const createTaskCard = (cardId, headline, description, contacts, date, BTNprio, category, subtask) => {
    const TASK_CARD = document.createElement('div');
    TASK_CARD.id = `taskCardID${cardId}`;
    TASK_CARD.className = 'taskcard';
    TASK_CARD.draggable = true;
    TASK_CARD.appendChild(createCategory(category));
    TASK_CARD.appendChild(createDescription(headline, description));
    TASK_CARD.appendChild(createProgress(subtask));
    TASK_CARD.appendChild(createPerson(contacts));
    TASK_CARD.appendChild(createMobile(category));
    ID_taskToDo.appendChild(TASK_CARD);
};

const createCategory = (category) => {
    const CATEGORY = document.createElement('p');
    CATEGORY.className = 'taskcardtitle';
    CATEGORY.textContent = CATEGORY_OPTION_VALUES[category].text;
    return CATEGORY;
};

const createDescription = (headline, description) => {
    const DESCRIPTION = document.createElement('div');
    DESCRIPTION.className = 'teskdescription';
    DESCRIPTION.appendChild(createDescriptionHeadline(headline));
    DESCRIPTION.appendChild(createDescriptionContent(description));
    return DESCRIPTION;
};

const createDescriptionHeadline = (headline) => {
    const DESCRIPTION_HEADLINE = document.createElement('h3');
    DESCRIPTION_HEADLINE.textContent = headline;
    return DESCRIPTION_HEADLINE;
};

const createDescriptionContent = (description) => {
    const DESCRIPTION_CONTENT = document.createElement('p');
    DESCRIPTION_CONTENT.textContent = description;
    return DESCRIPTION_CONTENT;
};

const createProgress = (subtask) => {
    // Subtask    
    subtask.length > 1 ? (subtask = `0/${subtask.length - 1} Subtasks`) : (subtask = '');
    const PROGRESS = document.createElement('div');
    PROGRESS.className = 'taskprogress';
    PROGRESS.appendChild(createProgressImage());
    PROGRESS.appendChild(createProgressText(subtask));
    return PROGRESS
};

const createProgressImage = () => {
    // [!]
    const PROGRESS_IMG = document.createElement('img');
    PROGRESS_IMG.style.height = '8px';
    PROGRESS_IMG.src = './resources/symbols/Progressbar.png';
    PROGRESS_IMG.alt = '';
    return PROGRESS_IMG;
};

const createProgressText = (subtask) => {
    const PROGRESS_TEXT = document.createElement('span');
    PROGRESS_TEXT.textContent = subtask;
    return PROGRESS_TEXT;
};

const createPerson = (contacts) => {
    const PERSON = document.createElement('div');
    PERSON.className = 'taskPersons';
    PERSON.appendChild(createPersonShortcut(contacts));
    return PERSON;
};

const createPersonShortcut = (contacts) => {
    const PERSON_SHORTCUT = document.createElement('div');
    PERSON_SHORTCUT.className = 'nameShortcutContent';
    contacts.forEach(contact => PERSON_SHORTCUT.appendChild(createPersonShortcutContent(contact)));
    return PERSON_SHORTCUT;
};

const createPersonShortcutContent = (contact) => {
    const PERSON_SHORTCUT_CONTENT = document.createElement('div');
    PERSON_SHORTCUT_CONTENT.id = 'nameShortcut';
    PERSON_SHORTCUT_CONTENT.style.marginLeft = '-10px';
    PERSON_SHORTCUT_CONTENT.style.backgroundColor = contact.shortBackColor;
    PERSON_SHORTCUT_CONTENT.textContent = contact.shortname;
    return PERSON_SHORTCUT_CONTENT;
};

const createMobile = (category) => {
    const MOBILE = document.createElement('div');
    MOBILE.className = 'taskbottommobilesmall';
    MOBILE.appendChild(createMobileCategory(category));
    MOBILE.appendChild(createMobileButton());
    return MOBILE;
};

const createMobileCategory = (category) => {
    const MOBILE_CATEGORY = document.createElement('select');
    MOBILE_CATEGORY.id = 'taskCategorySelect';
    MOBILE_CATEGORY.appendChild(createMobileCategoryOptions(CATEGORY_OPTION_VALUES[category]));
    CATEGORY_OPTION_VALUES.forEach(option => MOBILE_CATEGORY.appendChild(createMobileCategoryOptions(option)));
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