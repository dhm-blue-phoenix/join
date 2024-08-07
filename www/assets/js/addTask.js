const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const ID_taskTitle = document.getElementById('taskTitle');
const ID_taskDescription = document.getElementById('taskDescription');
const ID_select01 = document.getElementById('select01');
const ID_taskDate = document.getElementById('taskDate');
const ID_select02 = document.getElementById('select02');

let taskForm = {
    'title': '',
    'description': '',
    'assigned': '',
    'date': '',
    'prio': '',
    'category': ''
};
let lastBtnPrio = 'medium';

/**
 * Lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * ---------------------------------------------------------------
 * Diese Funktion lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * Wenn keine ID gefunden wird, wird ein Fehler geworfen.
 * ---------------------------------------------------------------
 * @returns {void}
 */
function lodeUserId() {
    if (storedLocalUserID) return userID = storedLocalUserID;
    if (storedSessionUserID) return userID = storedSessionUserID;
    throw new Error('User ID wurde nicht gefunden!');
}

/**
 * Initialisiert das Hinzufügen einer neuen Aufgabe.
 * -------------------------------------------------
 * Diese Funktion wird aufgerufen, wenn das Formular zum Hinzufügen einer neuen Aufgabe
 * gesendet wird. Sie verhindert das Standard-Absendeverhalten des Formulars,
 * lädt die eingegebenen Formulardaten in ein globales `taskForm`-Objekt,
 * lädt diese Daten auf den Server hoch und leert die Eingabefelder.
 * -------------------------------------------------
 * func uploadPatchData() - findet man in der dataResponse.js
 * -------------------------------------------------
 * @param {Event} event - Das Ereignis, das beim Absenden des Formulars ausgelöst wird.
 *                        Es wird verwendet, um das Standard-Absendeverhalten des Browsers zu verhindern.
 */
async function initAddTask(event) {
    event.preventDefault();
    try {
        loadFormData();
        await uploadPatchData(`users/${userID}/tasks/`, taskForm);
        clearInput();
        console.warn('Erstellen des Tasks abgeschlossen!'); // [!] Ändern zu Benutzer-Feedback
    } catch (err) {
        console.error(`Es ist ein Schwerwigender Fehler aufgetreten! ${err}`);
    }
}

/**
 * Setzt die Eingabefelder des Formulars zurück.
 * ---------------------------------------------
 * Diese Funktion leert alle Eingabefelder des Formulars, indem sie die Werte
 * auf leere Zeichenfolgen zurücksetzt, um die Benutzeroberfläche nach dem Absenden
 * des Formulars zu bereinigen.
 */
function clearInput() {
    ID_taskTitle.value = '';
    ID_taskDescription.value = '';
    ID_select01.value = '';
    ID_taskDate.value = '';
    ID_select02.value = '';
}

/**
 * Lädt die Formulardaten in ein globales `taskForm`-Objekt.
 * ---------------------------------------------------------
 * Diese Funktion liest die aktuellen Werte der Formulareingaben für Titel,
 * Beschreibung, Zuweisung, Datum und Kategorie und speichert sie in einem
 * globalen `taskForm`-Objekt. Dadurch werden die eingegebenen Daten für die
 * weitere Verarbeitung oder Speicherung verfügbar gemacht.
 */
function loadFormData() {
    taskForm.title = ID_taskTitle.value;
    taskForm.description = ID_taskDescription.value;
    taskForm.assigned = ID_select01.value;
    taskForm.date = ID_taskDate.value;
    taskForm.category = ID_select02.value;
    setBtnPrio('medium');
}

/**
 * Setzt die Priorität der Aufgabe und aktualisiert die UI entsprechend.
 * ---------------------------------------------------------------------
 * Diese Funktion setzt einen Button, der eine bestimmte Priorität darstellt,
 * auf aktiv, deaktiviert ihn und speichert die Priorität im globalen
 * `taskForm`-Objekt. Wenn zuvor ein anderer Prioritäts-Button aktiv war,
 * wird dessen Status zurückgesetzt.
 * ---------------------------------------------------------------------
 * @param {string} prio - Die Priorität, die für die Aufgabe gesetzt wird.
 *                        Dies entspricht der ID des Buttons, der die Priorität darstellt.
 */
function setBtnPrio(prio) {
    lastBtn();
    document.getElementById(prio).classList.add('activBtnPrio');
    document.getElementById(prio).disabled = true;
    taskForm.prio = prio;
    lastBtnPrio = prio;
}

/**
 * Setzt den Status des zuletzt aktiven Prioritäts-Buttons zurück.
 * ---------------------------------------------------------------
 * Diese Funktion wird aufgerufen, um den Zustand des Buttons, der zuvor
 * als aktiv markiert wurde, zurückzusetzen. Der Button wird wieder
 * klickbar gemacht und die aktive CSS-Klasse wird entfernt.
 */
function lastBtn() {
    document.getElementById(lastBtnPrio).classList.remove('activBtnPrio');
    document.getElementById(lastBtnPrio).disabled = false;
}