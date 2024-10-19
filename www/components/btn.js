/**
 * Initialize navigation once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initializeNavigation();
  }, 1000);
});


/**
 * Initializes navigation buttons and sets the last active button from localStorage.
 */
function initializeNavigation() {
  const lastActiveButtonId = localStorage.getItem('activeNavButton');
  setActiveButton(lastActiveButtonId);
  initializeButtons();
};


/**
 * Sets a button as active by adding the 'active' class.
 * @param {string} buttonId - The ID of the button to be activated.
 */
function setActiveButton(buttonId) {
  document.getElementById(buttonId)?.classList.add('active');
};


/**
 * Initializes both profile and navbar buttons.
 */
function initializeButtons() {
  initializeProfileButtons();
  initializeNavBarButtons();
};


/**
 * Attaches event listeners to profile buttons.
 */
function initializeProfileButtons() {
  const buttons = document.querySelectorAll('.profile-btns');
  buttons.forEach((button) => {
    const element = document.getElementById(button.getAttribute('id'));
    element.removeEventListener('click', handleProfileEvent);
    element.addEventListener('click', (event) => handleProfileEvent(event));
  });
};


/**
 * Attaches event listeners to navigation bar buttons.
 */
function initializeNavBarButtons() {
  const buttons = document.querySelectorAll('.navBar-btns');
  buttons.forEach((button) => {
    const element = document.getElementById(button.getAttribute('id'));
    element.removeEventListener('click', handleNavEvent);
    element.addEventListener('click', (event) => handleNavEvent(event));
  });
};


/**
 * Handles the profile button click event and loads the next page.
 * @param {Event} event - The click event.
 */
function handleProfileEvent(event) {
  const button = event.currentTarget;
  const buttonHref = button.getAttribute('data-href');
  const buttonId = button.getAttribute('data-id');
  loadNextPage(buttonId, buttonHref);
};


/**
 * Handles the navigation bar button click event and loads the next page.
 * @param {Event} event - The click event.
 */
function handleNavEvent(event) {
  const button = event.currentTarget;
  const buttonHref = button.getAttribute('data-href');
  loadNextPage(button.id, buttonHref);
};


/**
 * Loads the next page, sets the active button, and updates localStorage.
 * @param {string} buttonId - The ID of the button clicked.
 * @param {string} pageUrl - The URL of the next page to load.
 */
function loadNextPage(buttonId, pageUrl) {
  removeLastActiveButton();
  setActiveButton(buttonId);
  const lastActiveButtonId = localStorage.getItem('activeNavButton');
  localStorage.setItem('lastActiveNavButton', lastActiveButtonId);
  localStorage.setItem('activeNavButton', buttonId);
  window.location.href = pageUrl;
};


/**
 * Removes the 'active' class from the last active button.
 */
function removeLastActiveButton() {
  const lastActiveButtonId = localStorage.getItem('activeNavButton');
  document.getElementById(lastActiveButtonId)?.classList.remove('active');
};


/**
 * Navigates back to the previous page by restoring the last active button.
 */
function backToPreviousPage() {
  const lastActiveButtonId = localStorage.getItem('lastActiveNavButton');
  const buttons = document.querySelectorAll('.navBar-btns');
  buttons.forEach(button => {
    if (button.id === lastActiveButtonId) {
      const path = button.getAttribute('data-href');
      loadNextPage(lastActiveButtonId, path);
    };
  });
};