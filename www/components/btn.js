/**
 * ====================================================================================================
 * Event-Listener, der ausgeführt wird, sobald das DOM vollständig geladen ist.
 * Ruft die Funktion `navInit` nach einer Verzögerung von 100 ms auf.
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
  setTimeout(() => {
    navInit();
  }, 100);
});

/**
 * Initialisiert die Navigation:
 * ====================================================================================================
 * - Holt den zuletzt aktiven Button aus dem localStorage.
 * - Setzt den aktiven Status auf diesen Button, falls vorhanden.
 * - Bindet Event-Listener an alle Buttons.
 * ====================================================================================================
 */
const navInit = () => {
  const lastActivBtn = localStorage.getItem('activNavBtn');
  setActivToBtn(lastActivBtn);
  loadBtns();
};

/**
 * Setzt den aktiven Status auf den Button mit der übergebenen ID.
 * ====================================================================================================
 * @param {string} id - Die ID des Buttons, der aktiv gesetzt werden soll.
 * ====================================================================================================
 */
const setActivToBtn = (id) => {
  document.getElementById(id).classList.add('active');
};

/**
 * ====================================================================================================
 * Lädt alle Buttons mit der Klasse 'btn' und bindet Event-Listener an sie.
 * Die Listener reagieren auf Klick-Ereignisse und rufen die Funktion `navEventHandler` auf.
 * ====================================================================================================
 */
const loadBtns = () => {
  const btns = document.querySelectorAll('.btn');
  btns.forEach((btn) => {
    const element = document.getElementById(btn.getAttribute('id'));
    element.removeEventListener('click', () => navEventHandler);
    element.addEventListener('click', (event) => { navEventHandler(event) });
  });
};

/**
 * Event-Handler, der aufgerufen wird, wenn ein Button geklickt wird.
 * ====================================================================================================
 * - Entfernt den aktiven Status vom vorherigen Button.
 * - Setzt den aktiven Status auf den geklickten Button.
 * - Lädt die Seite, die im `data-href`-Attribut des Buttons definiert ist.
 * ====================================================================================================
 * @param {Event} event - Das Klick-Ereignis.
 * ====================================================================================================
 */
const navEventHandler = (event) => {
  const btn = event.currentTarget;
  const btnHref = btn.getAttribute('data-href');
  removeLastActivBtn();
  setActivToBtn(btn.id);
  loadNextPage(btn.id, btnHref);
};

/**
 * ====================================================================================================
 * Entfernt den aktiven Status vom zuletzt aktiven Button, der im localStorage gespeichert ist.
 * ====================================================================================================
 */
const removeLastActivBtn = () => {
  const lastActivBtn = localStorage.getItem('activNavBtn');
  document.getElementById(lastActivBtn).classList.remove('active');
};

/**
 * Speichert die ID des aktuell aktiven Buttons im localStorage und lädt die nächste Seite.
 * ====================================================================================================
 * @param {string} btnId - Die ID des Buttons, der gerade aktiv wird.
 * @param {string} page - Die URL der Seite, die geladen werden soll.
 * ====================================================================================================
 */
const loadNextPage = (btnId, page) => {
  localStorage.setItem('activNavBtn', btnId);
  window.location.href = page;
};






// Get the container element
// var btnContainer = document.getElementById("myDIV");

// Get all buttons with class="btn" inside the container
// var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     console.log(current);
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }