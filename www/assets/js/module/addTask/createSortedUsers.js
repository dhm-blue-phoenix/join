import { taskForm } from '../../initAddTask.js';
import { extractInitials } from '../modules.js';
import { retrievingData } from '../dataResponse.js';

const ID_SELECT_ASSIGNED = document.getElementById('assigned');
const USER_CARDS_CONTAINER = document.getElementById('userCardsContainerID');

let assignedActiv = [''];
let users = ['', 'Select contacts to assign'];

const renderUsers = async () => {
    try {
        const tempUsers = await retrievingData(`users`);
        await tempUsers.forEach(async (user) => {
            if(user.name === 'Guest') return;
            users.push([user.name, extractInitials(user.name), user.shortcutBackColor]);
            await createSortedUsers();
        });
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

/*
    Die Funktion ist viel zu Lang !!!!
                                    ||
                                    \/
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

function shouldSkipUser(user) {
    return typeof user === 'string' && (user === '' || user === 'Select contacts to assign');
}

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

function createInitialsDiv(user) {
    const initialsDiv = document.createElement('div');
    initialsDiv.classList.add('Initialenperson');
    initialsDiv.style.backgroundColor = user[2];  // Background color for initials
    const nameParts = user[0].split(' ');
    initialsDiv.textContent = (nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : '')).toUpperCase();
    return initialsDiv;
}

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

function toggleSelectedPersonContainer(container) {
    container.style.display = container.children.length > 0 ? 'flex' : 'none';
}

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