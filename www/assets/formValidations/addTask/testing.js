const form = document.getElementById('formAddTask');


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
        const response = await fetch('./assets/formValidations/addTask/config.json');
        if (!response.ok) {
            throw new Error('Could not load config');
        };
        testingElements = await response.json();
    } catch (err) {
        console.error('Error loading config:', err);
    };
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
    Object.entries(testingElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        element && (
            ['INPUT', 'SELECT'].includes(element.tagName) ?            
                element.value = value :
                element.textContent = value
        );
    });
    triggerSubmitEvent();
    console.log('%cForm Testing!', 'color: yellow; font-weight: bold; font-size: 16px');
};


const triggerSubmitEvent = () => {
    const event = new Event('submit', { bubbles: true, cancelable: true }); // Erstellen eines neuen Submit-Events
    form.dispatchEvent(event); // Auslösen des Submit-Events
};


export { formTesting };