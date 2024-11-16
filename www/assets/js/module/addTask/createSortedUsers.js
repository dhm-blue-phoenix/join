import { taskForm } from '../../initAddTask.js';
import { extractInitials } from '../modules.js';
import { retrievingData } from '../dataResponse.js';


const ID_SELECT_ASSIGNED = document.getElementById('assigned');
const USER_CARDS_CONTAINER = document.getElementById('userCardsContainerID');


let assignedActiv = [''];
let users = ['', 'Select contacts to assign'];

/**
 * Retrieves all contacts from the server and renders them as user cards.
 * The data is modified to match the structure used by the createSortedUsers function.
 * If an error occurs, it is logged to the console.
 * @returns {Promise<void>}
 */
const renderUsers = async () => {
    try {
        const tempUsers = await retrievingData(`contacts`);
        const usersCopy = tempUsers.slice(0, -1).map((user) => {
            return [user.name, extractInitials(user.name), user.shortcutBackColor];
        });
        users.push(...usersCopy);
        await createSortedUsers();
    } catch (err) {
        console.error('Beim laden der User ist ein Problem aufgetreten:', err);
    }
};

// Toggle visibility of the userCardsContainer when the <select> is clicked
ID_SELECT_ASSIGNED.addEventListener('click', (event) => {
    // Check if the container is currently visible
    if (USER_CARDS_CONTAINER.style.display === 'flex') {
        USER_CARDS_CONTAINER.style.display = 'none'; // Hide if visible
    } else {
        USER_CARDS_CONTAINER.style.display = 'flex'; // Show if hidden
    }
});

// Hide the userCardsContainer when clicking outside of it
document.addEventListener('click', (event) => {
    // Check if the click was outside the container and the select element
    if (!USER_CARDS_CONTAINER.contains(event.target) && event.target !== ID_SELECT_ASSIGNED) {
        USER_CARDS_CONTAINER.style.display = 'none';
    }
});

/**
 * Creates sorted user cards and appends them to the DOM.
 * It also handles the visibility of the container for selected persons based on its content.
 * @returns {void}
 */

function createSortedUsers() {
    USER_CARDS_CONTAINER.innerHTML = '';  // Clear the container
    const selectedPersonContainer = document.getElementById('selectedPerson');  // Container for selected persons
    let counter = 1;

    // Show or hide selectedPersonContainer based on its content
    toggleSelectedPersonContainer(selectedPersonContainer);

    users.forEach((user) => {
        if (shouldSkipUser(user)) return;  // Skip invalid users

        const userDiv = createUserDiv(user, counter);  // Create user div
        const checkbox = createCheckbox(userDiv, selectedPersonContainer);  // Create and handle checkbox logic

        USER_CARDS_CONTAINER.appendChild(userDiv);  // Append user div
        counter++;
    });

    toggleSelectedPersonContainer(selectedPersonContainer);  // Initially hide the container
}


/**
 * Determines whether a user should be skipped based on its value.
 * Skips if the user is an empty string or is labeled as "Select contacts to assign".
 * @param {string} user - The user value to evaluate.
 * @returns {boolean} - True if the user should be skipped, otherwise false.
 */
function shouldSkipUser(user) {
    return typeof user === 'string' && (user === '' || user === 'Select contacts to assign');
}

/**
 * Creates a div element for a user, containing its initials and name.
 * It also applies some CSS styles to make the div look like a user card.
 * @param {Array} user - The user data array, containing name, initials, and background color.
 * @param {number} counter - A counter to generate a unique id for the div element.
 * @returns {HTMLElement} - The created div element for the user.
 */
function createUserDiv(user, counter) {
    const userDiv = document.createElement('div');
    userDiv.id = `person${counter}`;
    userDiv.classList.add('personCardsmall');
    userDiv.style.display = 'flex';
    userDiv.style.alignItems = 'center';
    userDiv.style.justifyContent = 'space-between';

    const initialsDiv = createInitialsDiv(user);
    const nameDiv = document.createElement('div');
    nameDiv.textContent = user[0];  // Assuming user[0] is the full name

    userDiv.appendChild(initialsDiv);
    userDiv.appendChild(nameDiv);
    return userDiv;
}

/**
 * Creates a div element displaying the initials of a user.
 * It takes the user data array and generates a div element with the initials,
 * styled with a background color from the user data.
 * @param {Array} user - The user data array, containing name, initials, and background color.
 * @returns {HTMLElement} - The created div element for the user's initials.
 */
function createInitialsDiv(user) {
    const initialsDiv = document.createElement('div');
    initialsDiv.classList.add('Initialenperson');
    initialsDiv.style.backgroundColor = user[2];  // Background color for initials
    const nameParts = user[0].split(' ');
    initialsDiv.textContent = (nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : '')).toUpperCase();
    return initialsDiv;
}

/**
 * Creates a checkbox input element, appends it to the given userDiv, and adds event listeners
 * to handle its checked state. The checkbox state toggles on userDiv click and updates the
 * selectedPersonContainer accordingly. It also stops event propagation on checkbox click.
 * 
 * @param {HTMLElement} userDiv - The div element representing a user card to append the checkbox to.
 * @param {HTMLElement} selectedPersonContainer - The container for displaying selected persons,
 * which gets updated when the checkbox state changes.
 * @returns {HTMLInputElement} - The created checkbox element.
 */
function createCheckbox(userDiv, selectedPersonContainer) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('Personcardcheckbox');
    userDiv.appendChild(checkbox);

    userDiv.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        updateSelectedPersonContainer(selectedPersonContainer);
    });

    checkbox.addEventListener('click', (event) => {
        event.stopPropagation();
        updateSelectedPersonContainer(selectedPersonContainer);
    });

    return checkbox;
}

/**
 * Toggles the display state of the given container based on its content.
 * If the container has children, it sets the display to 'flex', otherwise it sets it to 'none'.
 * @param {HTMLElement} container - The container element to toggle the display of.
 */
function toggleSelectedPersonContainer(container) {
    container.style.display = container.children.length > 0 ? 'flex' : 'none';
}

/**
 * Updates the selected person container based on the current state of user card checkboxes.
 *
 * This function clears the existing content of the selectedPersonContainer and iterates
 * through each user card to determine if the associated checkbox is checked. For each
 * checked user, it adds the user to the assigned list if not already present, and removes
 * the user if unchecked. It then clones and appends the initials div of each active user
 * to the selectedPersonContainer. Finally, it toggles the display state of the container
 * based on its updated content.
 *
 * @param {HTMLElement} selectedPersonContainer - The container element to update with selected users.
 */
function updateSelectedPersonContainer(selectedPersonContainer) {
    selectedPersonContainer.innerHTML = '';
    document.querySelectorAll('.personCardsmall').forEach((card, index) => {
        const cardCheckbox = card.querySelector('.Personcardcheckbox');
        const [name, short, color] = users[index + 2];

        if (cardCheckbox.checked) {
            if (!assignedActiv.includes(name)) {
                taskForm.assigned.push({ name, short, color });
                assignedActiv.push(name);
            }
        } else {
            assignedActiv = assignedActiv.filter((user) => user !== name);
            taskForm.assigned = taskForm.assigned.filter(user => user.name !== name);
        }
    });

    assignedActiv.forEach((activeName) => {
        const userIndex = users.findIndex(user => user[0] === activeName);
        if (userIndex !== -1) {
            const initialsDiv = document.querySelectorAll('.personCardsmall')[userIndex - 2].querySelector('.Initialenperson');
            const selectedInitialsDiv = initialsDiv.cloneNode(true);
            selectedPersonContainer.appendChild(selectedInitialsDiv);
        }
    });

    toggleSelectedPersonContainer(selectedPersonContainer);
}


export { renderUsers };