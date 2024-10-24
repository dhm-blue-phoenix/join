const currentWindow = window.location.pathname;


/**
 * Loads the content of HTML files into elements that contain the 'w3-include-html' attribute.
 * The function iterates through all elements with the 'w3-include-html' attribute and replaces their
 * inner HTML with the content of the loaded file. If the file is not found,
 * the content of the element is set to "Page not found".
 *
 * @async
 * @function includeHTML
 * @returns {Promise<void>} A promise that resolves with no value.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        const file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        };
    };
};


/**
 * Navigates the browser back to the previous page in history.
 *
 * @function actionBack
 */
function actionBack() {
    window.history.back();
};


/**
 * Opens and closes the dropdown list for the account.
 * 
 * This function adds event listeners to the account container to toggle the visibility
 * of the dropdown content. It also closes the dropdown if a click occurs outside of it.
 * 
 * @function setupAccountDropdown
 */
if (
    !currentWindow.includes('index.html') &&
    !currentWindow.includes('signUp.html') &&
    !currentWindow.includes('nologinlegalnotice.html') &&
    !currentWindow.includes('nologinprivacyPolicy.html')
) {
    document.addEventListener('DOMContentLoaded', (event) => {
        const accountContainer = document.getElementById('account');
        const dropdownContent = document.getElementById('dropdownContent');

        accountContainer.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        // Close the dropdown menu if a click occurs outside of it
        window.addEventListener('click', (event) => {
            if (!event.target.matches('.account-container')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                };
            };
        });
    });
};


// Similar dropdown setup for contact editing and deleting
if (currentWindow.includes('contacts.html')) {
    document.addEventListener('DOMContentLoaded', (event) => {
        const accountContainer = document.getElementById('editdeletcontact');
        const dropdownContent = document.getElementById('dropdownEditDeletContact');

        accountContainer.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        // Close the dropdown menu if a click occurs outside of it
        window.addEventListener('click', (event) => {
            if (!event.target.matches('.addEditDeletContactmobile')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                };
            };
        });
    });
};


/**
 * Adds the class 'd-nonepopup' to the element with the specified ID.
 *
 * @function showPopup
 * @param {string} id - The ID of the HTML element to which the class should be added.
 * @param {string} remove - The ID of the element from which the class should be removed.
 */
function showPopup(id, remove) {
    document.getElementById(remove).classList.remove('d-nonepopup');
    document.getElementById(id).classList.remove('hide');
    document.getElementById(id).classList.add('show');
};


/**
 * Removes the class 'd-nonepopup' from the element with the specified ID.
 *
 * @function hidePopup
 * @param {string} id - The ID of the HTML element from which the class should be removed.
 * @param {string} remove - The ID of the element to which the class should be added.
 */
function hidePopup(id, remove) {
    document.getElementById(id).classList.remove('show');
    document.getElementById(id).classList.add('hide');
    setTimeout(function () {
        document.getElementById(remove).classList.add('d-nonepopup');
    }, 200); // wait for the animation to finish before adding d-nonepopup
};


/**
 * Displays a welcome message on the summary page.
 * 
 * This function shows the welcome content container and animates it based on the current time.
 * 
 * @function showWelcomeContent
 */
if (currentWindow.includes('summary.html')) {
    function showWelcomeContent() {
        const welcomeContent = document.getElementById("welcomecontent");
        const welcomeMessage = document.querySelector(".welcomemassage");
        const welcomeSetDayTime = document.getElementById("welcomeSetDayTime");

        // Determine the current time
        const currentHour = new Date().getHours();

        if (currentHour >= 0 && currentHour < 12) {
            welcomeSetDayTime.textContent = "Good morning,";
        } else if (currentHour >= 12 && currentHour < 18) {
            welcomeSetDayTime.textContent = "Good afternoon,";
        } else {
            welcomeSetDayTime.textContent = "Good evening,";
        }

        // Show the container
        welcomeContent.style.display = "flex";

        // Add fade-in animation
        setTimeout(() => {
            welcomeMessage.classList.add("fade-in");
        }, 0); // Immediate execution to start the animation

        // Fade-out animation after 2 seconds
        setTimeout(() => {
            welcomeMessage.classList.remove("fade-in");
            welcomeMessage.classList.add("fade-out");
        }, 1000);

        // Hide the entire container after 3 seconds
        setTimeout(() => {
            welcomeContent.style.display = "none";
        }, 2000);
    };
};


// Event listener for the page load
window.addEventListener('load', showWelcomeContent);
window.addEventListener('load', showGreeting);


/**
 * Sets up event listeners for buttons in the navbar.
 *
 * This function adds the 'active' class to the clicked button and removes it from the previously active button.
 *
 * @function btnsnavbar
 */
function btnsnavbar() {
    var btns = document.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            if (current.length > 0 && current[0] !== null) {
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
        });
    }
    btns[0].className += " active";
};

function showGreeting() {
    const currentHour = new Date().getHours();
    const massage = document.getElementById("massage");
  
    if (currentHour >= 0 && currentHour < 12) {
      massage.textContent = "Good morning,";
    } else if (currentHour >= 12 && currentHour < 18) {
      massage.textContent = "Good afternoon,";
    } else {
      massage.textContent = "Good evening,";
    }
  }