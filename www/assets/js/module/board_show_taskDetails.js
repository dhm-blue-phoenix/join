import { deleteTaskCard } from './board_delete_taskCard.js';
import { loadUserIdFromStored, loadElementById } from './modules.js';
import { updateData } from './dataResponse.js';

const IDS = ['TASK_ID', 'TITLE', 'DESCRIPTION_HEADLINE', 'DESCRIPTION_CONTENT', 'DATE', 'BTN_PRIO', 'PERSONS', 'SUBTASKS', 'BTN_CONTAINER'];
let taskId;

/**
 * Initialisiert die Anzeige der Details einer Aufgabe.
 * ====================================================================================================
 * Diese Funktion aktualisiert die verschiedenen Teile der Task-Karte basierend auf den übergebenen 
 * Daten. Sie verwendet eine Reihe von Hilfsfunktionen, um spezifische DOM-Elemente zu aktualisieren. 
 * Am Ende wird eine Event-Handler-Funktion für das Löschen der Aufgabe hinzugefügt.
 * ====================================================================================================
 * @function initShowTaskDetails
 * @param {Object} taskData Ein Objekt, das die Details der Aufgabe enthält.
 * ====================================================================================================
 */
export function initShowTaskDetails(taskData) {
    try {
        IDS.forEach((id, value) => {
            if (id === 'TASK_ID') taskId = taskData[value];
            if (['TITLE', 'DESCRIPTION_HEADLINE', 'DESCRIPTION_CONTENT', 'DATE', 'BTN_PRIO'].includes(id)) updateTextContent(id, taskData[value]);
            if (id === 'PERSONS') updatePersons(id, taskData[value]);
            if (id === 'SUBTASKS') updateSubtasks(id, taskData[value], taskId);
            if (id === 'BTN_CONTAINER') updateButtonContainer(id, taskId);
        });
        addEventFromDelTaskCard();
    } catch (err) {
        console.error(err);
    }
}

/**
 * Aktualisiert den Textinhalt eines HTML-Elements.
 * ====================================================================================================
 * Diese Funktion setzt den Textinhalt eines HTML-Elements, das durch die gegebene ID identifiziert wird,
 * auf den angegebenen Text. Dies wird verwendet, um Texte in verschiedenen Teilen der Benutzeroberfläche 
 * zu aktualisieren, wie z.B. Titel, Beschreibungen und Daten.
 * ====================================================================================================
 * @function updateTextContent
 * @param {string} id Die ID des HTML-Elements, dessen Textinhalt aktualisiert werden soll.
 * @param {string} text Der neue Text, der im HTML-Element angezeigt werden soll.
 * ====================================================================================================
 */
const updateTextContent = (id, text) => {
    document.getElementById(id).textContent = text;
};

/**
 * Aktualisiert die Anzeige der Personen auf der Task-Karte.
 * ====================================================================================================
 * Diese Funktion leeren den Inhalt eines HTML-Elements, das durch die gegebene ID identifiziert wird, 
 * und fügt neue Kontaktkarten hinzu, die aus den übergebenen Personendaten erstellt werden. Die Personendaten
 * werden von einem JSON-String in ein JavaScript-Array umgewandelt und anschließend verarbeitet.
 * ====================================================================================================
 * @function updatePersons
 * @param {string} id Die ID des HTML-Elements, das die Personenanzeigen enthält.
 * @param {string} personsData Ein JSON-String, der ein Array von Personendaten enthält.
 * ====================================================================================================
 */
const updatePersons = (id, personsData) => {
    const element = document.getElementById(id);
    element.innerHTML = '';
    JSON.parse(personsData).forEach(personData => createPersionCard(element, personData));
};

/**
 * Aktualisiert die Anzeige der Unteraufgaben auf der Task-Karte.
 * ====================================================================================================
 * Diese Funktion leeren den Inhalt eines HTML-Elements, das durch die gegebene ID identifiziert wird,
 * und fügt neue Unteraufgaben hinzu, die aus den übergebenen Daten erstellt werden. Die Unteraufgaben werden
 * aus einem JSON-String in ein JavaScript-Array umgewandelt. Die erste Unteraufgabe wird entfernt, 
 * und für jede verbleibende Unteraufgabe werden die entsprechenden Elemente erstellt und hinzugefügt.
 * ====================================================================================================
 * @function updateSubtasks
 * @param {string} id Die ID des HTML-Elements, das die Unteraufgaben enthält.
 * @param {string} subtasksData Ein JSON-String, der ein Array von Unteraufgaben enthält.
 * @param {number} taskId Die ID der aktuellen Aufgabe, um die Unteraufgaben eindeutig zuzuordnen.
 * ====================================================================================================
 */
const updateSubtasks = (id, subtasksData, taskId) => {
    const element = document.getElementById(id);
    const subtasks = JSON.parse(subtasksData);
    element.innerHTML = '';
    subtasks.shift();
    if (subtasks[0] === undefined) element.textContent = 'Keine Subtask gefunden!';
    subtasks.forEach((subtask, index) => {
        createSubtask(element, subtask, taskId, index);
        createAddEventFromCheackbox(`CHEACKBOX_${taskId}${index}`);
    });
};

/**
 * Aktualisiert den Button-Container auf der Task-Karte.
 * ====================================================================================================
 * Diese Funktion leeren den Inhalt eines HTML-Elements, das durch die gegebene ID identifiziert wird,
 * und fügt neue Buttons hinzu, die für die Bearbeitung, Trennung und Löschung der Aufgabe zuständig sind.
 * Die Buttons werden durch separate Funktionen erstellt und in den Button-Container eingefügt.
 * ====================================================================================================
 * @function updateButtonContainer
 * @param {string} id Die ID des HTML-Elements, das den Button-Container darstellt.
 * @param {number} taskId Die ID der aktuellen Aufgabe, die für die Löschfunktion benötigt wird.
 * ====================================================================================================
 */
const updateButtonContainer = (id, taskId) => {
    const buttonFunctions = [createBtnEdit(), createBtnTrennline(), createBtnDelete(taskId)];
    const element = document.getElementById(id);
    element.innerHTML = '';
    buttonFunctions.forEach(button => element.appendChild(button));
};

/**
 * Erstellt und fügt eine Kontaktkarte für eine Person zur angegebenen Container hinzu.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `div`-Element für eine Kontaktkarte, füllt es mit den entsprechenden 
 * Informationen zur Person (Kurzname und Name) und fügt diese Karte dem angegebenen Container hinzu.
 * Die Kontaktkarte wird verwendet, um die zugewiesenen Personen auf der Task-Karte anzuzeigen.
 * ====================================================================================================
 * @function createPersionCard
 * @param {HTMLElement} container Das HTML-Element, zu dem die Kontaktkarte hinzugefügt wird.
 * @param {Object} persionData Ein Objekt, das die Informationen der Person enthält, einschließlich 
 *                              `shortBackColor` (Hintergrundfarbe des Kurznamens), `shortname` (Kurzname) 
 *                              und `name` (vollständiger Name der Person).
 * ====================================================================================================
 */
const createPersionCard = (container, persionData) => {
    const PERSION = document.createElement('div');
    PERSION.className = 'taskcardbigassignedtoperson';
    PERSION.appendChild(createPersionShortname(persionData.shortBackColor, persionData.shortname));
    PERSION.appendChild(createPersionName(persionData.name));
    container.appendChild(PERSION);
};

/**
 * Erstellt ein Element für den Kurzname einer Person.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `div`-Element, das den Kurzname einer Person darstellt. 
 * Das Element erhält eine Hintergrundfarbe und den Kurzname der Person. Es wird als Teil der Kontaktkarte 
 * verwendet, um eine visuelle Darstellung des Namens der Person zu bieten.
 * ====================================================================================================
 * @function createPersionShortname
 * @param {string} color Die Hintergrundfarbe des Kurznamens.
 * @param {string} shortname Der Kurzname der Person, der im Element angezeigt wird.
 * @returns {HTMLElement} Ein `div`-Element, das den Kurzname der Person mit der angegebenen Hintergrundfarbe enthält.
 * ====================================================================================================
 */
const createPersionShortname = (color, shortname) => {
    const SHORTNAME = document.createElement('div');
    SHORTNAME.id = 'nameShortcut';
    SHORTNAME.style.backgroundColor = color;
    SHORTNAME.textContent = shortname;
    return SHORTNAME;
};

/**
 * Erstellt ein Element für den vollständigen Namen einer Person.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `span`-Element, das den vollständigen Namen einer Person darstellt. 
 * Das Element wird verwendet, um den Namen innerhalb der Kontaktkarte darzustellen, nachdem der Kurzname hinzugefügt wurde.
 * ====================================================================================================
 * @function createPersionName
 * @param {string} name Der vollständige Name der Person, der im Element angezeigt wird.
 * @returns {HTMLElement} Ein `span`-Element, das den vollständigen Namen der Person enthält.
 * ====================================================================================================
 */
const createPersionName = (name) => {
    const NAME = document.createElement('span');
    NAME.textContent = name;
    return NAME;
};

/**
 * Erstellt und fügt eine Unteraufgabe zur angegebenen Container hinzu.
 * ====================================================================================================
 * Diese Funktion erstellt ein `div`-Element für eine Unteraufgabe, das eine Checkbox und den Text der 
 * Unteraufgabe enthält. Das Element wird dann dem angegebenen Container hinzugefügt. Die Checkbox 
 * zeigt den Status der Unteraufgabe an (erledigt oder nicht erledigt) und der Text beschreibt die Aufgabe.
 * ====================================================================================================
 * @function createSubtask
 * @param {HTMLElement} container Das HTML-Element, zu dem die Unteraufgabe hinzugefügt wird.
 * @param {Object} subtask Ein Objekt, das die Details der Unteraufgabe enthält, einschließlich des Status (`status`) und des Textes (`text`).
 * @param {number} taskId Die ID der übergeordneten Aufgabe, um die Unteraufgabe eindeutig zuzuordnen.
 * @param {number} value Der Index der Unteraufgabe, der für die Identifizierung der Checkbox verwendet wird.
 * ====================================================================================================
 */
const createSubtask = (container, subtask, taskId, value) => {
    const SUBTASKS = document.createElement('div');
    SUBTASKS.className = 'taskcardbigsubtaskscheckbox';
    SUBTASKS.appendChild(createSubtaskInputBox(subtask.status, taskId, value));
    SUBTASKS.appendChild(createSubtaskText(subtask.text));    
    container.appendChild(SUBTASKS);
};

/**
 * Erstellt ein Eingabefeld für eine Unteraufgabe in Form einer Checkbox.
 * ====================================================================================================
 * Diese Funktion erstellt ein `input`-Element vom Typ `checkbox`, das den Status der Unteraufgabe anzeigt.
 * Die Checkbox wird mit einer eindeutigen ID versehen, die auf der Aufgaben-ID und dem Index der Unteraufgabe basiert.
 * Der Status der Checkbox wird auf `true` oder `false` gesetzt, basierend auf dem übergebenen Status der Unteraufgabe.
 * ====================================================================================================
 * @function createSubtaskInputBox
 * @param {boolean} status Der Status der Unteraufgabe, der angibt, ob die Checkbox aktiviert (`true`) oder deaktiviert (`false`) sein soll.
 * @param {number} taskId Die ID der übergeordneten Aufgabe, die in der ID der Checkbox verwendet wird.
 * @param {number} value Der Index der Unteraufgabe, der in der ID der Checkbox verwendet wird.
 * @returns {HTMLElement} Ein `input`-Element vom Typ `checkbox`, das den Status der Unteraufgabe anzeigt.
 * ====================================================================================================
 */
const createSubtaskInputBox = (status, taskId, value) => {
    const INPUTBOX = document.createElement('input');
    INPUTBOX.type = 'checkbox';
    INPUTBOX.id = `CHEACKBOX_${taskId}${value}`;
    INPUTBOX.checked = status;
    return INPUTBOX;
};

/**
 * Erstellt ein Element für den Text einer Unteraufgabe.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `span`-Element, das den Text der Unteraufgabe anzeigt. 
 * Das Element wird verwendet, um den Text der Unteraufgabe zusammen mit der Checkbox darzustellen.
 * ====================================================================================================
 * @function createSubtaskText
 * @param {string} text Der Text der Unteraufgabe, der im Element angezeigt wird.
 * @returns {HTMLElement} Ein `span`-Element, das den Text der Unteraufgabe enthält.
 * ====================================================================================================
 */
const createSubtaskText = (text) => {
    const TEXT = document.createElement('span');
    TEXT.textContent = text;
    return TEXT;
};

/**
 * Fügt einem Checkbox-Element ein `change`-Ereignis hinzu, um auf Änderungen zu reagieren.
 * ====================================================================================================
 * Diese Funktion bindet einen Event-Listener an das Checkbox-Element mit der angegebenen ID. Der Event-Listener
 * reagiert auf Änderungen des Status der Checkbox (aktiviert/deaktiviert) und ruft eine Funktion auf, die 
 * den neuen Status und die ID der Checkbox verarbeitet.
 * ====================================================================================================
 * @function createAddEventFromCheackbox
 * @param {string} id Die ID des Checkbox-Elements, zu dem der `change`-Event-Listener hinzugefügt werden soll.
 * ====================================================================================================
 */
const createAddEventFromCheackbox = (id) => {
    const ELEMENT = document.getElementById(id);
    ELEMENT.removeEventListener('change', handleChange);
    ELEMENT.addEventListener('change', (event) => {
        const TARGET = event.currentTarget;
        handleChange(TARGET.checked, TARGET.id);
    });
};

/**
 * Verarbeitet die Änderung des Status einer Checkbox und aktualisiert die entsprechende Unteraufgabe.
 * ====================================================================================================
 * Diese Funktion wird aufgerufen, wenn sich der Status einer Checkbox ändert. Sie ruft eine Funktion auf, 
 * um die Unteraufgabe basierend auf dem neuen Status der Checkbox zu aktualisieren.
 * ====================================================================================================
 * @function handleChange
 * @param {boolean} change Der neue Status der Checkbox, der angibt, ob sie aktiviert (`true`) oder deaktiviert (`false`) ist.
 * @param {string} id Die ID der Checkbox, die den Kontext oder die spezifische Unteraufgabe identifiziert.
 * ====================================================================================================
 */
const handleChange = (change, id) => {
    updateSubtaskInputBox(change, id);
};

/**
 * Aktualisiert den Status einer Unteraufgabe basierend auf dem Zustand einer Checkbox.
 * ====================================================================================================
 * Diese asynchrone Funktion wird aufgerufen, wenn eine Checkbox innerhalb einer Task-Card aktiviert oder 
 * deaktiviert wird. Sie aktualisiert den Status der entsprechenden Unteraufgabe sowohl im UI als auch 
 * in der persistenten Datenspeicherung. Dies umfasst das Aktualisieren der entsprechenden Datenstruktur 
 * der Task-Card und das Speichern der Änderungen im Backend.
 * ====================================================================================================
 * @async
 * @function updateSubtaskInputBox
 * @param {boolean} status Der neue Status der Checkbox, der angibt, ob die Unteraufgabe abgeschlossen (`true`) oder nicht abgeschlossen (`false`) ist.
 * @param {string} id Die eindeutige ID der Checkbox, die sowohl die Task-Card als auch die Unteraufgabe innerhalb dieser Karte identifiziert.
 * ====================================================================================================
 */
const updateSubtaskInputBox = async (status, id) => {
    const INPUT_BOX = document.getElementById(id);
    INPUT_BOX.change = status;
    const CHECKBOX_INDEX = getCheckboxIndex(id);
    const SUBTASKS = getSubtasksForTask();
    SUBTASKS[CHECKBOX_INDEX + 1].status = status;
    updateTaskSubtasks(SUBTASKS);
    const CARD_INDEX = getCardIndex(id);
    const USER_ID = await loadUserIdFromStored();
    const TASK_DATA = await loadElementById(`users/${USER_ID}`, CARD_INDEX, 'taskCard');
    TASK_DATA[1].subtask[CHECKBOX_INDEX + 1].status = status;   
    await updateData(`users/${USER_ID}/tasks/${TASK_DATA[0]}/subtask`, TASK_DATA[1].subtask);    
};

/**
 * Extrahiert den Index der Checkbox aus der ID.
 * ====================================================================================================
 * @function getCheckboxIndex
 * @param {string} id Die ID der Checkbox.
 * @returns {number} Der Index der Checkbox.
 * ====================================================================================================
 */
const getCheckboxIndex = (id) => parseInt(id.slice(-1), 10);

/**
 * Ruft die Unteraufgaben für eine bestimmte Task-Card ab.
 * ====================================================================================================
 * @function getSubtasksForTask
 * @returns {Array} Eine Liste der Unteraufgaben der Task-Card.
 * ====================================================================================================
 */
const getSubtasksForTask = () => {
    const TASK_CARD = document.getElementById(`taskCardID${taskId}`);
    return JSON.parse(TASK_CARD.getAttribute('task-subtask'));
};

/**
 * Aktualisiert die Unteraufgaben in der Task-Card.
 * ====================================================================================================
 * @function updateTaskSubtasks
 * @param {Array} subtasks Die aktualisierte Liste der Unteraufgaben.
 * ====================================================================================================
 */
const updateTaskSubtasks = (subtasks) => {
    const TASK_CARD = document.getElementById(`taskCardID${taskId}`);
    TASK_CARD.setAttribute('task-subtask', JSON.stringify(subtasks));
};

/**
 * Bestimmt den Index der Task-Card basierend auf der ID.
 * ====================================================================================================
 * @function getCardIndex
 * @param {string} id Die ID der Checkbox.
 * @returns {number} Der Index der Task-Card.
 * ====================================================================================================
 */
const getCardIndex = (id) => parseInt(id.slice(-2, -1), 10) + 1;

/**
 * Erstellt einen Bearbeiten-Button für eine Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein `button`-Element, das als Bearbeiten-Button dient. Der Button erhält
 * einen Bild-Icon durch die Funktion `createBtnEditImg` und wird für die Bearbeitung einer Task-Karte verwendet.
 * ====================================================================================================
 * @function createBtnEdit
 * @returns {HTMLElement} Ein `button`-Element, das einen Bearbeiten-Button darstellt.
 * ====================================================================================================
 */
const createBtnEdit = () => {
    const BTN_EDIT = document.createElement('button');
    BTN_EDIT.type = 'button';
    BTN_EDIT.appendChild(createBtnEditImg());
    return BTN_EDIT;
};

/**
 * Erstellt ein Bild-Element für den Bearbeiten-Button.
 * ====================================================================================================
 * Diese Funktion erstellt ein `img`-Element, das als Icon für den Bearbeiten-Button verwendet wird. 
 * Das Bild wird von einer spezifischen Quelle geladen, und es wird ein alternativer Text für Barrierefreiheit bereitgestellt.
 * ====================================================================================================
 * @function createBtnEditImg
 * @returns {HTMLElement} Ein `img`-Element, das das Bearbeiten-Icon darstellt.
 * ====================================================================================================
 */
const createBtnEditImg = () => {
    const BTN_EDIT_IMG = document.createElement('img');
    BTN_EDIT_IMG.src = './resources/symbols/edit.png';
    BTN_EDIT_IMG.alt = '';
    BTN_EDIT_IMG.textContent = 'Edit';
    return BTN_EDIT_IMG;
};

/**
 * Erstellt eine Trennlinie zwischen Buttons.
 * ====================================================================================================
 * Diese Funktion erstellt ein `div`-Element, das als visuelle Trennlinie zwischen verschiedenen Buttons 
 * dient. Es erhält eine CSS-Klasse, die für das Design und die Positionierung der Trennlinie verantwortlich ist.
 * ====================================================================================================
 * @function createBtnTrennline
 * @returns {HTMLElement} Ein `div`-Element, das als Trennlinie zwischen Buttons verwendet wird.
 * ====================================================================================================
 */
const createBtnTrennline = () => {
    const BTN_TRENNLINE = document.createElement('div');
    BTN_TRENNLINE.className = 'buttonstrennline';
    return BTN_TRENNLINE;
};

/**
 * Erstellt einen Löschen-Button für eine Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein `button`-Element, das als Löschen-Button dient. Der Button erhält eine 
 * eindeutige ID basierend auf der übergebenen Task-ID und ein Bild-Icon durch die Funktion `createBtnDeleteImg`.
 * Der Button wird verwendet, um eine Task-Karte zu löschen.
 * ====================================================================================================
 * @function createBtnDelete
 * @param {number|string} taskId Die ID der Task, für die der Löschen-Button erstellt wird.
 * @returns {HTMLElement} Ein `button`-Element, das einen Löschen-Button darstellt.
 * ====================================================================================================
 */
const createBtnDelete = (taskId) => {
    const BTN_DEL = document.createElement('button');
    BTN_DEL.type = 'button';
    BTN_DEL.id = `DEL${taskId}`;
    BTN_DEL.setAttribute('task-id', taskId);
    BTN_DEL.appendChild(createBtnDeleteImg());
    return BTN_DEL;
};

/**
 * Erstellt ein Bild-Element für den Löschen-Button.
 * ====================================================================================================
 * Diese Funktion erstellt ein `img`-Element, das als Icon für den Löschen-Button verwendet wird. 
 * Das Bild wird von der angegebenen Quelle geladen, und es wird ein alternativer Text bereitgestellt, 
 * um Barrierefreiheit zu gewährleisten.
 * ====================================================================================================
 * @function createBtnDeleteImg
 * @returns {HTMLElement} Ein `img`-Element, das das Löschen-Icon darstellt.
 * ====================================================================================================
 */
const createBtnDeleteImg = () => {
    const BTN_DEL_IMG = document.createElement('img');
    BTN_DEL_IMG.src = './resources/symbols/delete.svg';
    BTN_DEL_IMG.alt = '';
    return BTN_DEL_IMG;
};

/**
 * Fügt einem Löschen-Button einen `click`-Event-Listener hinzu, der eine Task-Karte löscht.
 * ====================================================================================================
 * Diese Funktion fügt dem Button, der zum Löschen einer Task-Karte dient, einen `click`-Event-Listener hinzu.
 * Der Event-Listener entfernt vorherige Event-Listener und bindet dann eine Funktion ein, die beim Klicken 
 * des Buttons die entsprechende Task-Karte löscht.
 * ====================================================================================================
 * @function addEventFromDelTaskCard
 * ====================================================================================================
 */
const addEventFromDelTaskCard = () => {
    const ELEMENT = document.getElementById(`DEL${taskId}`);
    ELEMENT.removeEventListener('click', () => deleteTaskCard());
    ELEMENT.addEventListener('click', (event) => deleteTaskCard(event));
};