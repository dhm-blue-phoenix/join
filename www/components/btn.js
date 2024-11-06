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
  initializeNavigation();
});


/**
 * Initializes navigation buttons and sets the last active button from localStorage.
 */
const initializeNavigation = () => {
  setTimeout(() => {
    navigates.some(({ page, id }) => page === currentPage && setActiveButton(id));
  }, 100);
};


/**
 * Sets a button as active by adding the 'active' class.
 * @param {string} id - The ID of the button to be activated.
 */
const setActiveButton = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    return initializeNavigation();
  };
  element.classList.add("active");
};