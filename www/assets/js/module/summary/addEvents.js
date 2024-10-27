/**
 * Adds a click event listener to each button with the class `.summarybtn`.
 * When clicked, the button triggers the `loadNextWindow` function.
 * 
 * @function addEventToBtn
 */
function addEventToBtn() {
    document.querySelectorAll('.summarybtn').forEach((item) => {
        item.addEventListener('click', () => {
            loadNextWindow();
        });
    });
};


/**
 * Loads the next window by setting a specific navigation button identifier
 * (`'nav-btn1'`) in local storage and redirecting the user to 'board.html'.
 * 
 * @function loadNextWindow
 */
function loadNextWindow() {
    localStorage.setItem('activNavBtn', 'nav-btn1');
    window.location.href = './board.html';
};


/**
 * Initializes event listeners required for this module. 
 * Calls `addEventToBtn` to set up event handling for `.summarybtn` elements.
 * 
 * @function initEvents
 */
function initEvents() {
    addEventToBtn();
};


export { initEvents };