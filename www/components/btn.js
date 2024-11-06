const currentPage = window.location.pathname;
const navigates = [
  { page: "/summary.html", id: "nav-btn0" },
  { page: "/board.html", id: "nav-btn1" },
  { page: "/addTask.html", id: "nav-btn2" },
  { page: "/contacts.html", id: "nav-btn3" },
  { page: "/privacyPolicy.html", id: "nav-btn4" },
  { page: "/legalNotice.html", id: "nav-btn5" }
];


/**
 * Initialize navigation once the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initializeNavigation, 100);
});


/**
 * Initializes navigation buttons and sets the last active button from localStorage.
 */
function initializeNavigation() {
  navigates.some(({ page, id }) => page === currentPage && setActiveButton(id));
};


/**
 * Sets a button as active by adding the 'active' class.
 * @param {string} id - The ID of the button to be activated.
 */
function setActiveButton(id) {
  const element = document.getElementById(id);
  if (!element) {
    return setTimeout(initializeNavigation, 100);
  };
  element.classList.add("active");
};