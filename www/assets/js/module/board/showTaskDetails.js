import { deleteTaskCard } from './deleteTaskCard.js';
import { editTaskCard } from './editTaskCard.js';
import { updateData, retrievingData } from '../dataResponse.js';


const ids = ['TITLE', 'DESCRIPTION_HEADLINE', 'DESCRIPTION_CONTENT', 'DATE', 'BTN_PRIO', 'PERSONS', 'SUBTASKS', 'BTN_CONTAINER'];
const item = ['category', 'title', 'description', 'date', 'prio', 'assigned', 'subtask'];
let taskId;


/**
 * Initializes the details of a task with the given ID by retrieving its data from the server and updating the DOM accordingly.
 * @param {number|string} id - The ID of the task to initialize.
 * @returns {Promise<void>} - A promise that resolves when the task details have been loaded and the DOM has been updated.
 */
export async function initShowTaskDetails(id) {
    try {
        taskId = id;
        const dataResponse = await retrievingData('board');
        const taskData = dataResponse.find(task => task.id === taskId);
        ids.forEach((id, value) => {
            switch (id) {
                case 'TITLE':
                case 'DESCRIPTION_HEADLINE':
                case 'DESCRIPTION_CONTENT':
                case 'DATE':
                case 'BTN_PRIO':
                    updateTextContent(id, taskData[item[value]]);
                    break;
                case 'PERSONS':
                    let persons = taskData[item[value]].filter(item => item !== 'none');
                    if (persons.length > 0) {
                        updatePersons(id, persons);
                    }
                    break;
                case 'SUBTASKS':
                    let subtasks = taskData[item[value]].filter(item => item !== 'none');
                    if (subtasks.length > 0) {
                        updateSubtasks(id, subtasks, taskId, true);
                    } else {
                        updateSubtasks(id, '', taskId, false)
                    }
                    break;
                case 'BTN_CONTAINER':
                    updateButtonContainer(id);
                    break;
                default:
                    break;
            }
        });
        addEventFromDelTaskCard();
        addEventToEditTaskCard();
    } catch (err) {
        console.error(err);
    };
};


/**
 * Updates the content of an element with the given text.
 * If the element ID is 'BTN_PRIO', it creates a container with an image and a text span.
 * Otherwise, it simply sets the textContent of the element.
 * @param {string} id - The ID of the element to update.
 * @param {string} text - The text content to update the element with.
 * @returns {void} - The function returns no value.
 */
const updateTextContent = (id, text) => {
    const element = document.getElementById(id);
    if (id === 'BTN_PRIO') {
        const prioContainer = document.createElement('div');
        prioContainer.className = 'PrioContainer';
        const prioIcon = document.createElement('img');
        switch (text.toLowerCase()) {
            case 'low':
                prioIcon.src = '../../../resources/symbols/PrioLow.png';
                break;
            case 'medium':
                prioIcon.src = '../../../resources/symbols/boardmiddleprio.png';
                break;
            case 'urgent':
                prioIcon.src = '../../../resources/symbols/PrioUrgent.png';
                break;
            default:
                console.log('Unbekannte Priorität:', text);
        }
        prioIcon.alt = '';
        prioContainer.appendChild(prioIcon);
        const prioText = document.createElement('span');
        prioText.textContent = text;
        prioContainer.appendChild(prioText);
        element.innerHTML = '';
        element.appendChild(prioContainer);
    } else {
        element.textContent = text;
    }
};


/**
 * Updates the container with person cards.
 * 
 * This function clears the existing content of a container element and generates and appends
 * person card elements with associated data.
 * 
 * @param {string} id - The ID of the container element to update.
 * @param {Object[]} personsData - An array of person data objects containing color, shortname, and name.
 */
const updatePersons = (id, personsData) => {
    const element = document.getElementById(id);
    element.innerHTML = '';
    personsData.forEach(personData => createPersionCard(element, personData));
};

 
/**
 * Updates the subtask elements within a specified container.
 * 
 * This function clears the existing content of a container element and either displays a message
 * if no subtasks are found or generates and appends subtask elements with associated event listeners.
 * 
 * @param {string} id - The ID of the container element to update.
 * @param {Object[]} subtasks - An array of subtask data objects containing status and text.
 * @param {number|string} taskId - The ID of the task to which the subtasks belong.
 * @param {boolean} status - A flag indicating whether subtasks are present.
 */
const updateSubtasks = (id, subtasks, taskId, status) => {
    const element = document.getElementById(id);
    element.innerHTML = '';
    if (status === false) return element.textContent = 'Keine Subtask gefunden!';
    subtasks.forEach((subtask, index) => {
        createSubtask(element, subtask, taskId, index);
        createAddEventFromCheackbox(`CHEACKBOX_${taskId}${index}`);
    });
};

 
/**
 * Updates the container with the buttons for editing, separating, and deleting a task card.
 *
 * Retrieves the container element by ID, clears its content, and appends the three button
 * elements created by the functions createBtnEdit(), createBtnTrennline(), and createBtnDelete().
 *
 * @param {string} id - The ID of the container element to update.
 */
const updateButtonContainer = (id) => {
    const buttonFunctions = [createBtnEdit(), createBtnTrennline(), createBtnDelete()];
    const element = document.getElementById(id);
    element.innerHTML = '';
    buttonFunctions.forEach(button => element.appendChild(button));
};

 
/**
 * Creates and appends a person card element to a specified container.
 * 
 * This function generates a div element representing a person assigned
 * to a task, including elements for the person's shortname and full name.
 * It appends the created person card to the provided container.
 * 
 * @param {HTMLElement} container - The container to which the person card will be appended.
 * @param {Object} persionData - An object containing data for the person, including color, shortname, and name.
 */
const createPersionCard = (container, persionData) => {
    const persion = document.createElement('div');
    persion.className = 'taskcardbigassignedtoperson';
    persion.appendChild(createPersionShortname(persionData.color, persionData.short));
    persion.appendChild(createPersionName(persionData.name));
    container.appendChild(persion);
};

 
/**
 * Creates a div element displaying the short name for a person assigned to a task.
 * @param {string} color - The background color for the short name element.
 * @param {string} shortname - The short name of the person.
 * @returns {HTMLDivElement} The created div element.
 */
const createPersionShortname = (color, shortname) => {
    const short = document.createElement('div');
    short.id = 'nameShortcut';
    short.style.backgroundColor = color;
    short.textContent = shortname;
    return short;
};


/**
 * Creates a span element with the provided text content.
 * 
 * @param {string} text - The text content for the span element.
 * @returns {HTMLSpanElement} - The created span element containing the text.
 */
const createPersionName = (text) => {
    const name = document.createElement('span');
    name.textContent = text;
    return name;
};

 
/**
 * Creates a subtask element and appends it to the specified container.
 * 
 * This function generates a subtask element with a checkbox and text, assigns it
 * the appropriate class name, and appends it to the provided container element.
 * 
 * @param {HTMLElement} container - The container to which the subtask element will be appended.
 * @param {Object} data - An object containing the subtask data, including status and text.
 * @param {number|string} taskId - The ID of the task to which the subtask belongs.
 * @param {number} value - The index of the subtask within the task.
 */
const createSubtask = (container, data, taskId, value) => {
    const subtask = document.createElement('div');
    subtask.className = 'taskcardbigsubtaskscheckbox';
    subtask.appendChild(createSubtaskInputBox(data.status, taskId, value));
    subtask.appendChild(createSubtaskText(data.text));
    container.appendChild(subtask);
};


/**
 * Creates a checkbox element for a subtask and assigns it an ID and a status.
 * @param {boolean} status - The initial status of the checkbox (checked or unchecked).
 * @param {number|string} taskId - The ID of the task to which the subtask belongs.
 * @param {number} value - The index of the subtask in the task.
 * @returns {HTMLInputElement} - The created checkbox element.
 */
const createSubtaskInputBox = (status, taskId, value) => {
    const inputbox = document.createElement('input');
    inputbox.type = 'checkbox';
    inputbox.id = `CHEACKBOX_${taskId}${value}`;
    inputbox.checked = status;
    return inputbox;
};


/**
 * Creates a span element with the given text content.
 * @param {string} data - The text content for the span element.
 * @returns {HTMLSpanElement} - The created span element.
 */
const createSubtaskText = (data) => {
    const text = document.createElement('span');
    text.textContent = data;
    return text;
};


/**
 * Adds an event listener to a checkbox element to call handleChange when the checkbox is changed.
 * This function first removes any existing event listener, then adds a new one.
 * @param {string} id - The ID of the checkbox element to add the event listener to.
 */
const createAddEventFromCheackbox = (id) => {
    const element = document.getElementById(id);
    element.removeEventListener('change', handleChange);
    element.addEventListener('change', (event) => {
        const target = event.currentTarget;
        handleChange(target.checked, target.id);
    });
};


/**
 * Handles a change event from a subtask checkbox element.
 *
 * This function takes the new status of the checkbox and the ID of the checkbox element as arguments.
 * It then calls `updateSubtaskInputBox` to update the subtask's completion status in the DOM and data source.
 *
 * @param {boolean} change - The new status of the checkbox (checked or unchecked).
 * @param {string} id - The ID of the checkbox element, used to extract task and subtask indices.
 * @returns {void} - The function doesn't return a value, it only triggers the update process.
 */
const handleChange = (change, id) => {
    updateSubtaskInputBox(change, id);
};


/**
 * Updates the status of a subtask input box and persists the change to the data source.
 *
 * This asynchronous function modifies the status of a subtask checkbox in the DOM,
 * retrieves the corresponding task and subtask indices, toggles the subtask's completion status,
 * and updates the data source with the new status.
 *
 * @param {boolean} status - The new status to set for the checkbox (checked or unchecked).
 * @param {string} id - The ID of the checkbox element, used to extract task and subtask indices.
 * @returns {Promise<void>} - A promise that resolves when the status update is complete.
 */
const updateSubtaskInputBox = async (status, id) => {
    const inputBox = document.getElementById(id);
    inputBox.change = status;
    const { task, sub } = getCheckboxIndex(id);
    const tasks = await retrievingData('');
    const currentTask = Object.entries(tasks[0]).find(([id, findTask]) => findTask.id === task);
    const subtask = currentTask[1].subtask[sub + 1].status;
    currentTask[1].subtask[sub + 1].status = !subtask;
    updateData(`board/${currentTask[0]}`, currentTask[1]);
};


/**
 * Extracts the task and subtask index from a checkbox ID string.
 * The ID is expected to be in the format "CHEACKBOX_<taskId><subtaskIndex>".
 * 
 * @param {string} id - The ID string from which to extract task and subtask indices.
 * @returns {Object} An object containing the task and subtask indices.
 *                   Returns { task: null, sub: null } if extraction fails.
 */
const getCheckboxIndex = (id) => {
    const regex = /CHEACKBOX_(\d)(\d)/;
    const match = id.match(regex);
    if (match) {
        const task = String(parseInt(match[1], 10));
        const sub = parseInt(match[2], 10);
        return { task, sub };
    };
    return { task: null, sub: null };
};


/**
 * Creates an edit button element for a task card.
 * 
 * This function constructs a button element with a specific ID and task ID attribute,
 * appends an image to it, and returns the button. The button is intended to be used
 * for editing a task card.
 * 
 * @returns {HTMLButtonElement} - The created edit button element.
 */
const createBtnEdit = () => {
    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.id = `EDIT${taskId}`;
    btnEdit.setAttribute('task-id', taskId);
    btnEdit.appendChild(createBtnImg('./resources/symbols/edit.png'));
    return btnEdit;
};


/**
 * Creates a button element used as a separating line for the task card.
 * @returns {HTMLDivElement} The created div element.
 */
const createBtnTrennline = () => {
    const btnTrennline = document.createElement('div');
    btnTrennline.className = 'buttonstrennline';
    return btnTrennline;
};


/**
 * Creates a delete button element for a task card.
 * 
 * This function creates a button element with a specific ID and task ID attribute,
 * appends an image to it, and returns the button. The button is intended to be used
 * for deleting a task card.
 * 
 * @returns {HTMLButtonElement} - The created delete button element.
 */
const createBtnDelete = () => {
    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.id = `DEL${taskId}`;
    btnDel.setAttribute('task-id', taskId);
    btnDel.appendChild(createBtnImg('./resources/symbols/delete.svg'));
    return btnDel;
};


/**
 * Creates and returns an image element for a button.
 * @param {string} img - The source of the image.
 * @returns {HTMLImageElement} - The created image element.
 */
const createBtnImg = (img) => {
    const btnImg = document.createElement('img');
    btnImg.src = img;
    btnImg.alt = '';
    return btnImg;
};


/**
 * Adds a click event listener to the delete button of a task card.
 * 
 * This function selects the delete button using the task ID, removes any existing click event listeners,
 * and attaches a new click event listener that triggers the deleteTaskCard function with the event object.
 * This ensures that the correct handler is called when the button is clicked.
 */
const addEventFromDelTaskCard = () => {
    const element = document.getElementById(`DEL${taskId}`);
    element.removeEventListener('click', () => deleteTaskCard());
    element.addEventListener('click', (event) => deleteTaskCard(event));
};


/**
 * Adds a click event listener to the edit button of a task card.
 * 
 * This function selects the edit button using the task ID, removes any existing click event listeners, 
 * and attaches a new click event listener that triggers the editTaskCard function. This ensures that 
 * the correct handler is called when the button is clicked.
 */
const addEventToEditTaskCard = () => {
    const element = document.getElementById(`EDIT${taskId}`);
    element.removeEventListener('click', () => editTaskCard());
    element.addEventListener('click', (event) => editTaskCard(event));
};