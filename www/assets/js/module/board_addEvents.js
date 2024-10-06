import { initShowTaskDetails } from './board_show_taskDetails.js';
import { reloadWindow } from './modules.js';

/**
 * Fügt ein Klick-Event für das Schließen des Task-Karten-Popups hinzu.
 * ====================================================================================================
 * Diese Funktion stellt sicher, dass das Fenster neu geladen wird, wenn auf das Element 
 * zum Schließen des Task-Karten-Popups geklickt wird.
 * ====================================================================================================
 */
const addEventToCloseTaskCard = () => {
    setTimeout(() => {
        const ELEMENT = document.getElementById('CLOSE_TASK_CARD_POPUP');
        ELEMENT.removeEventListener('click', reloadWindow);
        ELEMENT.addEventListener('click', reloadWindow);
    }, 1000);
};

/**
 * Fügt ein Klick-Event für das weiterleiten zu addTask Seite hinzu.
 * ====================================================================================================
 */
const addEventToLoadAddTask = () => {
    document.querySelectorAll('.loadNextPage').forEach(element => {
        element.removeEventListener('click', () => { });
        element.addEventListener('click', () => {
            localStorage.setItem('activNavBtn', 'nav-btn2');
            window.location.href = './addTask.html';
        });
    });
};

/**
 * Fügt ein Klick-Event-Listener zu einer Task-Karte hinzu.
 * ====================================================================================================
 * Diese Funktion sucht ein Element mit der angegebenen ID, entfernt einen eventuell vorhandenen
 * 'click'-Event-Listener, und fügt dann einen neuen 'click'-Event-Listener hinzu, der die 
 * Funktion `handleClick` auslöst.
 * ====================================================================================================
 * @param {string} id Die ID des DOM-Elements, zu dem der Event-Listener hinzugefügt werden soll.
 * ====================================================================================================
 */
const addEventFromTaskCard = (id) => {
    let element = document.getElementById(id);
    element.removeEventListener('click', handleClick);
    element.addEventListener('click', handleClick);
};

/**
 * Behandelt den Klick auf ein Element und zeigt Details zu einer Aufgabe an.
 * ====================================================================================================
 * Diese Funktion wird bei einem Klick auf ein spezifisches Element ausgelöst. Sie lädt die 
 * zugehörigen Attributdaten des geklickten Elements, zeigt ein Popup an und initialisiert die 
 * Anzeige der Aufgaben-Details.
 * ====================================================================================================
 * @param {Event} event Das Event-Objekt, das den Klick repräsentiert. Es enthält Informationen über das geklickte Element und den Kontext des Events.
 * ====================================================================================================
 */
const handleClick = (event) => {
    const TARGET = event.currentTarget;
    const TASK_ID = TARGET.getAttribute('task-id');
    showPopup('TaskcardPopupanimation', 'taskCardpopup');
    initShowTaskDetails(TASK_ID);
};

export { addEventToCloseTaskCard, addEventToLoadAddTask, addEventFromTaskCard };