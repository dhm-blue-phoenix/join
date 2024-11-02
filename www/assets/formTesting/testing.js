const testingPages = [
    { "page": "/index.html", "json": "login" },
    { "page": "/register.html", "json": "register" },
    { "page": "/addTask.html", "json": "addTask", "formId": "formAddTask" },
    { "page": "/contacts.html", "json": "contact", "formId": "addContactForm" }
];

let eventId = '';
let testingElements = {};


/**
 * Loads the testing configuration from a JSON file.
 *
 * This asynchronous function fetches the configuration data 
 * from a specified JSON file. If the fetch operation fails, 
 * an error is logged to the console.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the config is loaded.
 */
async function loadTestingConfig() {
    try {
        const response = await fetch('./assets/formTesting/config.json');
        if (!response.ok) {
            throw new Error('Could not load config');
        };
        testingElements = await response.json();
    } catch (err) {
        console.error('Error loading config:', err);
    };
};


/**
 * Loads testing data based on the current page.
 * Iterates through `testingPages` to update `testingElements` and `eventId`
 * with the corresponding values if `currentPage` matches.
 * 
 * @function loadTestingData
 */
const loadTestingData = () => {
    testingPages.forEach(({ page, json, formId }) => {
        if (currentPage === page) {
            testingElements = testingElements[json];
            eventId = formId;
        };
    });
};


/**
 * Updates form fields based on `testingElements`.
 * Iterates through `testingElements`, locates each element in the DOM,
 * and sets its value (`value`) or text content (`textContent`) accordingly.
 * 
 * @function updateForm
 */
const updateForm = () => {
    Object.entries(testingElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            ['INPUT', 'SELECT'].includes(element.tagName) ?
                element.value = value :
                element.textContent = value;
        };
    });
};


/**
 * Triggers a `submit` event for the form with the ID `eventId`.
 * The event is configured to bubble up and be cancelable.
 * 
 * @function triggerSubmitEvent
 */
const triggerSubmitEvent = () => {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    document.getElementById(eventId).dispatchEvent(event);
};


/**
 * Populates the form with testing data from the loaded configuration.
 *
 * This asynchronous function first loads the testing configuration
 * and then populates the form elements with the corresponding values
 * based on their IDs. It also logs a formatted message to the console 
 * indicating that form testing has started.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the form is populated.
 */
async function formTesting() {
    await loadTestingConfig();
    loadTestingData();
    updateForm();
    triggerSubmitEvent();
    console.log('%cForm Testing!', 'color: yellow; font-weight: bold; font-size: 16px');
};


export { formTesting };