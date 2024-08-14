import { loadUserIdFromStored } from './module/modules.js';
import { uploadPatchData } from './module/dataResponse.js';

const ID_FORM_AddTask = document.getElementById('formAddTask');
const ID_BTN_addSubTask = document.getElementById('addSubTask');
const ID_BTN_URGENT = document.getElementById('urgent');
const ID_BTN_MEDIUM = document.getElementById('medium');
const ID_BTN_LOW = document.getElementById('low');
const ID_INPUT_subtask = document.getElementById('subtask');
const ID_INPUT_TASK = ['title', 'description', 'assigned', 'date', 'category'];
const resetTaskForm = { 'title': '', 'description': '', 'assigned': '', 'date': '', 'prio': '', 'category': '', 'subtask': ['none'] };

let taskForm = { 'title': '', 'description': '', 'assigned': '', 'date': '', 'prio': '', 'category': '', 'subtask': ['none'] };
let lastBtnPrio = 'medium';

/**
 * Initialisiert die Event-Listener und setzt die Priorität beim Laden der Seite.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, sobald der DOM vollständig geladen ist. Sie richtet
 * die notwendigen Event-Listener für Formular- und Button-Elemente ein und stellt sicher,
 * dass die Priorität auf den Standardwert "medium" gesetzt wird. Dies sorgt dafür, dass
 * die Benutzeroberfläche sofort einsatzbereit ist und die entsprechenden Funktionen
 * korrekt aktiviert werden.
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    setBtnPrio('medium');
    addEventFromAddTask();
    addEventFromBtnUrgent();
    addEventFromBtnMedium();
    addEventFromBtnLow();
    addEventFromAddSubTask();
});

/**
 * Fügt ein Event-Listener für das Task-Hinzufügungsformular hinzu.
 * ====================================================================================================
 * Diese Funktion entfernt zuerst vorhandene Event-Listener für das Absenden des Formulars
 * und fügt dann einen neuen hinzu, um sicherzustellen, dass nur ein Listener aktiv ist.
 * ====================================================================================================
 */
const addEventFromAddTask = () => {
    ID_FORM_AddTask && (
        ID_FORM_AddTask.removeEventListener('submit', initAddTask),
        ID_FORM_AddTask.addEventListener('submit', initAddTask)
    );
};

/**
 * Fügt ein Event-Listener für den "Urgent"-Prioritäts-Button hinzu.
 * ====================================================================================================
 * Diese Funktion entfernt vorhandene Event-Listener für den Klick auf den "Urgent"-Button
 * und fügt dann einen neuen hinzu, um sicherzustellen, dass nur ein Listener aktiv ist.
 * ====================================================================================================
 */
const addEventFromBtnUrgent = () => {
    ID_BTN_URGENT && (
        ID_BTN_URGENT.removeEventListener('click', handleUrgentClick),
        ID_BTN_URGENT.addEventListener('click', handleUrgentClick)
    );
};

/**
 * Fügt ein Event-Listener für den "Medium"-Prioritäts-Button hinzu.
 * ====================================================================================================
 * Diese Funktion entfernt vorhandene Event-Listener für den Klick auf den "Medium"-Button
 * und fügt dann einen neuen hinzu, um sicherzustellen, dass nur ein Listener aktiv ist.
 * ====================================================================================================
 */
const addEventFromBtnMedium = () => {
    ID_BTN_MEDIUM && (
        ID_BTN_MEDIUM.removeEventListener('click', handleMediumClick),
        ID_BTN_MEDIUM.addEventListener('click', handleMediumClick)
    );
};

/**
 * Fügt ein Event-Listener für den "Low"-Prioritäts-Button hinzu.
 * ====================================================================================================
 * Diese Funktion entfernt vorhandene Event-Listener für den Klick auf den "Low"-Button
 * und fügt dann einen neuen hinzu, um sicherzustellen, dass nur ein Listener aktiv ist.
 * ====================================================================================================
 */
const addEventFromBtnLow = () => {
    ID_BTN_LOW && (
        ID_BTN_LOW.removeEventListener('click', handleLowClick),
        ID_BTN_LOW.addEventListener('click', handleLowClick)
    );
};

/**
 * Fügt ein Event-Listener für den "SubTask"-Button hinzu.
 * ====================================================================================================
 * Diese Funktion entfernt vorhandene Event-Listener für den Klick auf den "SubTask"-Button
 * und fügt dann einen neuen hinzu, um sicherzustellen, dass nur ein Listener aktiv ist.
 * ====================================================================================================
 */
const addEventFromAddSubTask = () => {
    ID_BTN_addSubTask && (
        ID_BTN_addSubTask.removeEventListener('click', addSubTask),
        ID_BTN_addSubTask.addEventListener('click', addSubTask)
    );
};

/**
 * Setzt die Priorität der Aufgabe auf "Urgent".
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Urgent"-Button klickt.
 * Sie setzt die Priorität der Aufgabe auf "Urgent" und aktualisiert die UI entsprechend.
 * ====================================================================================================
 */
const handleUrgentClick = () => {
    setBtnPrio('urgent');
};


/**
 * Setzt die Priorität der Aufgabe auf "Medium".
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Medium"-Button klickt.
 * Sie setzt die Priorität der Aufgabe auf "Medium" und aktualisiert die UI entsprechend.
 * ====================================================================================================
 */
const handleMediumClick = () => {
    setBtnPrio('medium');
};

/**
 * Setzt die Priorität der Aufgabe auf "Low".
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Low"-Button klickt.
 * Sie setzt die Priorität der Aufgabe auf "Low" und aktualisiert die UI entsprechend.
 * ====================================================================================================
 */
const handleLowClick = () => {
    setBtnPrio('low');
};

/**
 * Initialisiert das Hinzufügen einer neuen Aufgabe.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn das Formular zum Hinzufügen einer neuen Aufgabe
 * gesendet wird. Sie verhindert das Standard-Absendeverhalten des Formulars,
 * lädt die eingegebenen Formulardaten in ein globales `taskForm`-Objekt,
 * lädt diese Daten auf den Server hoch und leert die Eingabefelder.
 * ====================================================================================================
 * @param {Event} event - Das Ereignis, das beim Absenden des Formulars ausgelöst wird.
 *                        Es wird verwendet, um das Standard-Absendeverhalten des Browsers zu verhindern.
 * ====================================================================================================
 */
async function initAddTask(event) {
    event.preventDefault();
    try {
        loadFormData();
        await uploadData();
        resetFrom();
        console.warn('Erstellen des Tasks abgeschlossen!'); // [!] Ändern zu Benutzer-Feedback
    } catch (err) {
        console.error(`Es ist ein Fehler beim erstellen des Tasks aufgetreten! ${err}`);
    }
}

/**
 * Lädt die Formulardaten in ein globales `taskForm`-Objekt.
 * ====================================================================================================
 * Diese Funktion liest die aktuellen Werte der Formulareingaben für Titel,
 * Beschreibung, Zuweisung, Datum und Kategorie und speichert sie in einem
 * globalen `taskForm`-Objekt. Dadurch werden die eingegebenen Daten für die
 * weitere Verarbeitung oder Speicherung verfügbar gemacht.
 * ====================================================================================================
 */
const loadFormData = () => {
    ID_INPUT_TASK.forEach((key, i) => {
        ID_INPUT_TASK[i] && (taskForm[key] = document.getElementById(ID_INPUT_TASK[i]).value);
    });
}

/**
 * Lädt die aktuellen Formulardaten auf den Server hoch.
 * ====================================================================================================
 * Diese Funktion lädt das `taskForm`-Objekt auf den Server hoch,
 * indem sie die Daten unter dem Pfad des Benutzers speichert.
 * ====================================================================================================
 * func loadUserIdFromStored() - findet man in der './module/modules.js'
 * func uploadPatchData() - findet man in der './module/dataResponse.js'
 * ====================================================================================================
 * @async
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Daten erfolgreich hochgeladen wurden.
 * ====================================================================================================
 */
async function uploadData() {
    const userID = loadUserIdFromStored();
    await uploadPatchData(`users/${userID}/tasks/`, taskForm);
}

/**
 * Setzt die Priorität der Aufgabe und aktualisiert die UI entsprechend.
 * ====================================================================================================
 * Diese Funktion setzt einen Button, der eine bestimmte Priorität darstellt,
 * auf aktiv, deaktiviert ihn und speichert die Priorität im globalen
 * `taskForm`-Objekt. Wenn zuvor ein anderer Prioritäts-Button aktiv war,
 * wird dessen Status zurückgesetzt.
 * ====================================================================================================
 * @param {string} prio - Die Priorität, die für die Aufgabe gesetzt wird.
 *                        Dies entspricht der ID des Buttons, der die Priorität darstellt.
 * ====================================================================================================
 */
const setBtnPrio = (prio) => {
    lastBtn();
    document.getElementById(prio).classList.add('activBtnPrio');
    document.getElementById(prio).disabled = true;
    taskForm.prio = prio;
    lastBtnPrio = prio;
}

/**
 * Setzt den Status des zuletzt aktiven Prioritäts-Buttons zurück.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, um den Zustand des Buttons, der zuvor
 * als aktiv markiert wurde, zurückzusetzen. Der Button wird wieder
 * klickbar gemacht und die aktive CSS-Klasse wird entfernt.
 * ====================================================================================================
 */
const lastBtn = () => {
    document.getElementById(lastBtnPrio).classList.remove('activBtnPrio');
    document.getElementById(lastBtnPrio).disabled = false;
}

/**
 * Fügt einen neuen SubTask zur Aufgabe hinzu.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn der Benutzer einen neuen SubTask eingibt und
 * auf den entsprechenden Button klickt. Der SubTask wird zur Liste der SubTasks
 * im `taskForm`-Objekt hinzugefügt und das Eingabefeld wird geleert.
 * ====================================================================================================
 */
const addSubTask = () => {
    const input = ID_INPUT_subtask;
    input.value === '' || (
        taskForm.subtask.push(input.value),
        input.value = '',
        console.table(taskForm)
    );
}

/**
 * Setzt das Formular nach dem Hinzufügen einer Aufgabe zurück.
 * ====================================================================================================
 * Diese Funktion setzt alle Eingabefelder des Formulars zurück, leert das `taskForm`-Objekt
 * und stellt die Standard-Priorität auf "Medium" zurück.
 * ====================================================================================================
 */
const resetFrom = () => {
    clearInput();
    resetFromTaskForm();
    setBtnPrio('medium');
}

/**
 * Setzt die Eingabefelder des Formulars zurück.
 * ====================================================================================================
 * Diese Funktion leert alle Eingabefelder des Formulars, indem sie die Werte
 * auf leere Zeichenfolgen zurücksetzt, um die Benutzeroberfläche nach dem Absenden
 * des Formulars zu bereinigen.
 * ====================================================================================================
 */
const clearInput = () => {
    ID_INPUT_TASK.forEach((id) => document.getElementById(id).value = '');
}

/**
 * Setzt das globale `taskForm`-Objekt zurück.
 * ====================================================================================================
 * Diese Funktion stellt sicher, dass das `taskForm`-Objekt nach dem Hinzufügen einer Aufgabe
 * wieder auf seine Standardwerte zurückgesetzt wird. Dadurch wird sichergestellt, dass
 * das Formular für den nächsten Einsatz in einem sauberen Zustand ist.
 * ====================================================================================================
 */
const resetFromTaskForm = () => {
    taskForm = resetTaskForm;
}