import { taskStatus } from '../../initBoard.js';


/**
 * Creates a task card element with the given information and appends it to the DOM.
 * @param {number|string} cardId The ID of the task card.
 * @param {string} headline The headline of the task card.
 * @param {string} description The description of the task card.
 * @param {array} users The users assigned to the task card.
 * @param {string} category The category of the task card.
 * @param {array} subtask The subtasks of the task card.
 * @returns {undefined}
 */
export const createTaskCard = async (cardId, headline, description, users, category, subtask, prio) => {
    const taskCard = document.createElement('div');
    taskCard.id = `taskCardID${cardId}`;
    taskCard.className = 'taskcard';
    taskCard.draggable = true;
    taskCard.setAttribute('task-id', cardId);
    taskCard.appendChild(createCategory(category));
    taskCard.appendChild(createDescription(headline, description));
    taskCard.appendChild(createProgress(subtask));
    taskCard.appendChild(createPerson(users, prio, cardId));
    taskCard.appendChild(createMobile(cardId));
    if(taskStatus.length <= 0) document.getElementById(taskStatus[0].value).appendChild(taskCard);
    console.log('%c' + '[DEBUG-createTaskCard] taskstatus:', 'color: #48f40e;', taskStatus)
};


/**
 * Creates a task card category element with the given category name and appends it to the task card.
 * @param {string} category The category name of the task card.
 * @returns {HTMLParagraphElement} The task card category element.
 */
const createCategory = (category) => {
    const cardCategory = document.createElement('p');
    cardCategory.className = 'taskcardtitle';
    cardCategory.textContent = category;
    return cardCategory;
};


/**
 * Creates a description element for a task card.
 * @param {string} headline - The headline of the task description.
 * @param {string} description - The detailed description content of the task.
 * @returns {HTMLDivElement} The task card description element containing the headline and content.
 */
const createDescription = (headline, description) => {
    const cardDescription = document.createElement('div');
    cardDescription.className = 'teskdescription';
    cardDescription.appendChild(createDescriptionHeadline(headline));
    cardDescription.appendChild(createDescriptionContent(description));
    return cardDescription;
};


/**
 * Creates an h3 element for the headline of a task card description.
 * @param {string} headline - The headline of the task description.
 * @returns {HTMLHeadingElement} The task card description headline element.
 */
const createDescriptionHeadline = (headline) => {
    const cardDescriptionHeadline = document.createElement('h3');
    cardDescriptionHeadline.textContent = headline;
    return cardDescriptionHeadline;
};


/**
 * Creates a paragraph element for the description content of a task card.
 * @param {string} description - The detailed description content of the task.
 * @returns {HTMLParagraphElement} The task card description content element.
 */
const createDescriptionContent = (description) => {
    const cardDescriptionContent = document.createElement('p');
    cardDescriptionContent.textContent = description;
    return cardDescriptionContent;
};

/**
 * Creates a task card progress element with a progress bar and a text element.
 * @param {Object[]} subtask - Array of subtasks with properties `status` and `text`.
 * @returns {HTMLDivElement} The task card progress element.
 */

const createProgress = (subtask) => {
    const taskStatus = progressStatus(subtask);
    const progressPercentage = taskStatus[0];
    const taskText = progressText(taskStatus[1], subtask);
    const progress = document.createElement('div');
    progress.className = 'taskprogress';
    progress.appendChild(createProgressImage(progressPercentage, subtask.length));
    progress.appendChild(createProgressText(taskText));
    return progress;
};


/**
 * Calculates the progress status of subtasks.
 * @param {Object[]} subtask - Array of subtasks with a `status` property indicating completion.
 * @returns {number[]} - An array containing the progress percentage and the count of finished subtasks.
 */
const progressStatus = (subtask) => {
    let progressFinished = 0;
    let progressMultiplier = Math.floor(100 / (subtask.length - 1));
    subtask.forEach(task => task.status === true && (progressFinished += 1));
    progressMultiplier === Infinity && (progressMultiplier = 0);
    return [progressMultiplier * progressFinished, progressFinished];
};


/**
 * Generates a progress text indicating the number of finished subtasks out of the total.
 * @param {number} taskFinished - The number of subtasks that are completed.
 * @param {Object[]} subtask - Array of subtasks with a `status` property.
 * @returns {string|undefined} - A string in the format "finished/total" if there are multiple subtasks, otherwise undefined.
 */
const progressText = (taskFinished, subtask) => {
    if (subtask.length > 1) {
        return `${taskFinished}/${subtask.length - 1}`;
    };
};


/**
 * Generates a progress bar element with a width indicating the progress percentage of the subtask.
 * @param {number} progressPercentage - The percentage of the subtask that is completed.
 * @param {number} subtaskLength - The total number of subtasks.
 * @returns {HTMLElement} A `div` element with a child `div` element representing the progress bar.
 */
const createProgressImage = (progressPercentage, subtaskLength) => {
    if (subtaskLength <= 1) {
        const noSubtasksMessage = document.createElement('div');
        if (!noSubtasksMessage) return;
        noSubtasksMessage.textContent = 'Keine Subtasks';
        noSubtasksMessage.style.color = '#5ab824';
        noSubtasksMessage.style.fontWeight = 'bold';
        return noSubtasksMessage;
    };
    const progressContainer = document.createElement('div');
    if (!progressContainer) return;
    progressContainer.style.width = '128px';
    progressContainer.style.height = '8px';
    progressContainer.style.backgroundColor = '#e0e0e0';
    progressContainer.style.borderRadius = '4px';
    const progressBar = document.createElement('div');
    if (!progressBar && !progressPercentage) return;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#007CEE';
    progressBar.style.borderRadius = '4px';
    progressContainer.appendChild(progressBar);
    return progressContainer;
};


/**
 * Creates a span element with the given text content.
 * @param {string} progressText - The text content for the span element.
 * @returns {HTMLSpanElement} - The created span element.
 */
const createProgressText = (progressText) => {
    const progressTextContent = document.createElement('span');
    progressTextContent.textContent = progressText;
    return progressTextContent;
};


/**
 * Creates a container element for the person assigned to a task and appends it to the task card.
 * @param {string[]} contacts - An array of contact names assigned to the task.
 * @returns {HTMLDivElement} - The created container element.
 */
const createPerson = (contacts, prio, cardId) => {
    const persion = document.createElement('div');
    persion.id = 'taskPersons';
    persion.className = 'taskPersons';
    persion.appendChild(createPersonShortcut(contacts));
    const prioIcon = createPrioShortcut(cardId, prio);
    persion.appendChild(prioIcon);
    return persion;
};


/**
 * Creates a shortcut element for a person assigned to a task and appends it to the task card.
 * @param {string[]} contacts - An array of contact names assigned to the task.
 * @returns {HTMLDivElement} - The created shortcut element.
 */
const createPersonShortcut = (contacts) => {
    const persionShortcut = document.createElement('div');
    persionShortcut.className = 'nameShortcutContent';
    contacts = contacts.filter(item => item !== 'none');
    contacts.forEach(contact => persionShortcut.appendChild(createPersonShortcutContent(contact)));
    return persionShortcut;
};


/**
 * Creates a shortcut element for a person assigned to a task and appends it to the task card.
 * @param {Object} contact - An object containing the contact name, shortcut and color.
 * @returns {HTMLDivElement} - The created shortcut element.
 */
const createPersonShortcutContent = (contact) => {
    const persionShortcutContent = document.createElement('div');
    if (!persionShortcutContent && !contact.color && !contact.short) return;
    persionShortcutContent.id = 'nameShortcut';
    persionShortcutContent.style.marginLeft = '-10px';
    persionShortcutContent.style.backgroundColor = contact.color;
    persionShortcutContent.textContent = contact.short;
    return persionShortcutContent;
};

/**
 * Creates an image element representing a priority icon for a task card.
 * 
 * This function generates an image element based on the priority level provided.
 * The image source is set according to the priority level ('low', 'medium', 'urgent').
 * 
 * @param {number|string} cardId - The ID of the task card.
 * @param {string} prio - The priority level of the task ('low', 'medium', 'urgent').
 * @returns {HTMLImageElement} - The created image element for the priority icon.
 */
const createPrioShortcut = (cardId, prio) => {
    const prioIcon = document.createElement('img');    
    switch (prio) {
        case 'low':
            prioIcon.src = './resources/symbols/PrioLow.png';
            break;
        case 'medium':
            prioIcon.src = './resources/symbols/PrioMedium.png';
            break;
        case 'urgent':
            prioIcon.src = './resources/symbols/PrioUrgent.png';
            break;
        default:
            break;
    };
    prioIcon.alt = '';
    prioIcon.className = 'taskcardbigprioshortcut'; // Optional: Füge die Klasse hinzu, wenn du sie benötigst
    return prioIcon;
};


/**
 * Creates a mobile-friendly container for task card actions.
 * @param {number|string} cardId - The ID of the task card.
 * @returns {HTMLDivElement} - The mobile container element with category and button components.
 */
const createMobile = (cardId) => {
    const mobile = document.createElement('div');
    mobile.className = 'taskbottommobilesmall';
    mobile.appendChild(createMobileCategory(cardId));
    mobile.appendChild(createMobileButton(cardId));
    return mobile;
};


/**
 * Creates a select element for the mobile category component of a task card.
 * 
 * @param {number|string} cardId - The ID of the task card.
 * @param {string} category - The initial category of the task card.
 * @returns {HTMLSelectElement} - The created select element.
 */
export function createMobileCategory(cardId, category) {
    const mobileCateGory = document.createElement('select');
    mobileCateGory.className = 'taskCategorySelect';
    mobileCateGory.id = `taskCategorySelect${cardId}`;
    mobileCateGory.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    taskStatus.slice(0, 4).forEach(option => mobileCateGory.appendChild(createMobileCategoryOptions(option)));
    const selectedOption = mobileCateGory.querySelector(`option[value="${category}"]`);
    if (selectedOption) {
        selectedOption.selected = true;
    }
    return mobileCateGory;
};


/**
 * Creates an option element for the mobile category component of a task card.
 * @param {{value: string, text: string}} option - An object containing the value and text of the option.
 * @returns {HTMLOptionElement} - The created option element.
 */
const createMobileCategoryOptions = (option) => {
    const mobileCategoryOptions = document.createElement('option');
    mobileCategoryOptions.value = option.value;
    mobileCategoryOptions.textContent = option.text;
    return mobileCategoryOptions;
};


/**
 * Creates a mobile button for task cards that triggers the switchCategory function in draganddrop.js when clicked.
 * @param {number|string} cardId - The ID of the task card.
 * @returns {HTMLButtonElement} - The created button element.
 */
const createMobileButton = (cardId) => {
    const mobileBtn = document.createElement('button');
    mobileBtn.id = 'moveTaskButton';
    mobileBtn.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    mobileBtn.textContent = 'Move';
    mobileBtn.addEventListener('click', () => {
        import('./draganddrop.js').then(module => {
            module.switchCategory(cardId);
        });
    });
    return mobileBtn;
};