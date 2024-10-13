import { taskForm } from '../addTask.js';
import { extractInitials } from './modules.js';
import { retrievingData } from './dataResponse.js';

const ID_SELECT_ASSIGNED = document.getElementById('assigned');
const USER_CARDS_CONTAINER = document.getElementById('userCardsContainerID');

let assignedActiv = [''];
let users = ['', 'Select contacts to assign'];

const renderUsers = async () => {
    try {
        const tempUsers = await retrievingData(`users`);
        await tempUsers.forEach(async (user) => {
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
    USER_CARDS_CONTAINER.innerHTML = ''; // Clear the container
    const selectedPersonContainer = document.getElementById('selectedPerson'); // Container for selected persons

    let counter = 1;

    // Function to show or hide the selected person container based on its content
    const toggleSelectedPersonContainer = () => {
        if (selectedPersonContainer.children.length > 0) {
            selectedPersonContainer.style.display = 'flex';  // Show the container when it has content
        } else {
            selectedPersonContainer.style.display = 'none';  // Hide the container when it's empty
        }
    };

    users.forEach(user => {
        // Skip the first two entries (empty string and "Select contacts to assign")
        if (typeof user === 'string' && (user === '' || user === 'Select contacts to assign')) {
            return; // Skip this iteration
        }

        // Create a new <div> for each valid user
        const userDiv = document.createElement('div');
        userDiv.id = `person${counter}`;  // Assign a unique ID like person1, person2, etc.
        userDiv.classList.add('personCardsmall');  // Add the class 'personCard' to the div
        userDiv.style.display = 'flex';  // Ensure flexbox layout
        userDiv.style.alignItems = 'center';
        userDiv.style.justifyContent = 'space-between';  // Align content to sides

        // Get the first and last name
        const fullName = user[0];  // Assuming user[0] contains the full name
        const nameParts = fullName.split(' ');  // Split the name by spaces
        const firstName = nameParts[0];
        const lastName = nameParts[1] || '';  // Handle cases with no last name

        // Create a <div> for the initials
        const initialsDiv = document.createElement('div');
        initialsDiv.classList.add('Initialenperson');  // Add the class 'Initialenperson' to the div
        initialsDiv.style.backgroundColor = user[2];  // Alternating background color for initials div
        initialsDiv.textContent = (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase();  // Display initials

        // Set the content of the userDiv (user's full name)
        const nameDiv = document.createElement('div');
        nameDiv.textContent = fullName;

        // Create a checkbox with class 'Personcardcheckbox'
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('Personcardcheckbox');  // Add the class 'Personcardcheckbox'

        // Function to handle adding/removing initials from the selected person container
        const updateSelectedPersonContainer = () => {
            // Remove all existing initials from the selected person container
            selectedPersonContainer.innerHTML = '';

            // Go through all users and append initials of those with checked checkboxes
            document.querySelectorAll('.personCardsmall').forEach((card, index) => {
                const cardCheckbox = card.querySelector('.Personcardcheckbox');
                const [name, short, color] = users[index + 2];

                // Wenn die Checkbox nicht ausgewählt ist, entferne den Namen aus assignedActiv
                if (!cardCheckbox.checked) {
                    if (assignedActiv.includes(name)) {
                        assignedActiv = assignedActiv.filter((user) => user !== name);
                        taskForm.assigned = taskForm.assigned.filter(user => user.name !== name);
                    };
                };

                // Wenn die Checkbox ausgewählt ist, füge das Element hinzu
                if (cardCheckbox.checked) {
                    if (!assignedActiv.includes(name)) {
                        taskForm.assigned.push({ name, short, color });
                        assignedActiv.push(name);
                    };
                };
            });

            // Bereinige den selectedPersonContainer, bevor die neuen aktiven Nutzer hinzugefügt werden
            selectedPersonContainer.innerHTML = '';  // Entferne alle bisherigen Einträge

            // Füge alle aktiven Nutzer erneut hinzu
            assignedActiv.forEach((activeName) => {
                const userIndex = users.findIndex(user => user[0] === activeName);  // Finde den passenden Nutzer
                if (userIndex !== -1) {
                    const initialsDiv = document.querySelectorAll('.personCardsmall')[userIndex - 2].querySelector('.Initialenperson');  // Hole das passende Initialen-Div
                    const selectedInitialsDiv = initialsDiv.cloneNode(true);  // Clone das Initialen-Div
                    selectedPersonContainer.appendChild(selectedInitialsDiv);  // Füge es zum Container hinzu
                }
            });

            toggleSelectedPersonContainer();  // Show or hide the container based on content
        };

        // Add event listener for the userDiv (this toggles the checkbox when the div is clicked)
        userDiv.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;  // Toggle checkbox state
            updateSelectedPersonContainer();  // Update the selected persons container
        });

        // Handle checkbox clicks
        checkbox.addEventListener('click', (event) => {
            event.stopPropagation();  // Prevent the div's click event from firing
            updateSelectedPersonContainer();  // Update the selected persons container
        });

        // Append the initials, name, and checkbox to the userDiv
        userDiv.appendChild(initialsDiv);
        userDiv.appendChild(nameDiv);
        userDiv.appendChild(checkbox);

        // Append the new <div> to the userCardsContainer
        USER_CARDS_CONTAINER.appendChild(userDiv);
        counter++;
    });

    toggleSelectedPersonContainer();  // Initially hide the container
}

export { renderUsers };