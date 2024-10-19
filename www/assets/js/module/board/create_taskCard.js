import { TASK_STATUS } from '../../initBoard.js';

/**
 * Erstellt eine neue Task-Karte und fügt sie in das DOM ein.
 * ====================================================================================================
 * Diese Funktion erstellt eine neue Task-Karte basierend auf den übergebenen Parametern, setzt verschiedene
 * Attribute und fügt die Task-Karte in das entsprechende Kategorie-Element im DOM ein.
 * ====================================================================================================
 * @function createTaskCard
 * @param {number} cardId Die eindeutige ID der Task-Karte.
 * @param {string} headline Die Überschrift der Aufgabe.
 * @param {string} description Eine Beschreibung der Aufgabe.
 * @param {Array} users Eine Liste von Kontakten, die der Aufgabe zugewiesen sind.
 * @param {string} date Das Fälligkeitsdatum der Aufgabe.
 * @param {string} BTNprio Die Priorität der Aufgabe.
 * @param {string} category Die Kategorie der Aufgabe.
 * @param {Array} subtask Eine Liste von Unteraufgaben.
 * ====================================================================================================
 * @returns {void} Die Funktion gibt keinen Wert zurück, sondern fügt die erstellte Task-Karte in das DOM ein.
 * ====================================================================================================
 */
export const createTaskCard = (cardId, headline, description, users, category, subtask) => {
    const TASK_CARD = document.createElement('div');
    TASK_CARD.id = `taskCardID${cardId}`;
    TASK_CARD.className = 'taskcard';
    TASK_CARD.draggable = true;
    TASK_CARD.setAttribute('task-id', cardId);
    TASK_CARD.appendChild(createCategory(category));
    TASK_CARD.appendChild(createDescription(headline, description));
    TASK_CARD.appendChild(createProgress(subtask));
    TASK_CARD.appendChild(createPerson(users));
    TASK_CARD.appendChild(createMobile(cardId));
    document.getElementById(TASK_STATUS[0].value).appendChild(TASK_CARD);
};

/**
 * Erstellt ein Kategorie-Element für eine Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues Paragraph-Element (`<p>`), setzt die Klasse für das Element 
 * und den Textinhalt basierend auf der angegebenen Kategorie. Das Element repräsentiert die Kategorie 
 * der Aufgabe und wird in die Task-Karte eingefügt.
 * ====================================================================================================
 * @function createCategory
 * @param {string} category Der Kategorie-Schlüssel, der zur Bestimmung des Textinhalts verwendet wird.
 * @returns {HTMLElement} Ein Paragraph-Element (`<p>`) mit der Klasse 'taskcardtitle' und dem entsprechenden Kategorietext als Inhalt.
 * ====================================================================================================
 */
const createCategory = (category) => {
    const CATEGORY = document.createElement('p');
    CATEGORY.className = 'taskcardtitle';
    CATEGORY.textContent = category;
    return CATEGORY;
};

/**
 * Erstellt ein Beschreibungselement für eine Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `div`-Element, das als Container für die Beschreibung der Aufgabe dient. 
 * Das Element enthält sowohl die Überschrift als auch den Inhalt der Beschreibung und wird zur Task-Karte hinzugefügt.
 * ====================================================================================================
 * @function createDescription
 * @param {string} headline Die Überschrift der Beschreibung.
 * @param {string} description Der Inhalt der Beschreibung.
 * @returns {HTMLElement} Ein `div`-Element mit der Klasse 'teskdescription', das die Überschrift und den Inhalt der Beschreibung als Kinder-Elemente enthält.
 * ====================================================================================================
 */
const createDescription = (headline, description) => {
    const DESCRIPTION = document.createElement('div');
    DESCRIPTION.className = 'teskdescription';
    DESCRIPTION.appendChild(createDescriptionHeadline(headline));
    DESCRIPTION.appendChild(createDescriptionContent(description));
    return DESCRIPTION;
};

/**
 * Erstellt ein Überschriftselement für die Beschreibung einer Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `h3`-Element, setzt den Textinhalt auf die übergebene Überschrift 
 * und gibt das `h3`-Element zurück. Es wird verwendet, um die Überschrift der Beschreibung auf der 
 * Task-Karte anzuzeigen.
 * ====================================================================================================
 * @function createDescriptionHeadline
 * @param {string} headline Der Text, der als Überschrift angezeigt werden soll.
 * @returns {HTMLElement} Ein `h3`-Element mit dem angegebenen Textinhalt.
 * ====================================================================================================
 */
const createDescriptionHeadline = (headline) => {
    const DESCRIPTION_HEADLINE = document.createElement('h3');
    DESCRIPTION_HEADLINE.textContent = headline;
    return DESCRIPTION_HEADLINE;
};

/**
 * Erstellt ein Inhaltselement für die Beschreibung einer Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `p`-Element und setzt den Textinhalt auf die übergebene Beschreibung. 
 * Das Element wird verwendet, um den Hauptinhalt der Beschreibung auf der Task-Karte anzuzeigen.
 * ====================================================================================================
 * @function createDescriptionContent
 * @param {string} description Der Text, der als Inhalt der Beschreibung angezeigt werden soll.
 * @returns {HTMLElement} Ein `p`-Element mit dem angegebenen Textinhalt.
 * ====================================================================================================
 */
const createDescriptionContent = (description) => {
    const DESCRIPTION_CONTENT = document.createElement('p');
    DESCRIPTION_CONTENT.textContent = description;
    return DESCRIPTION_CONTENT;
};

const createProgress = (subtask) => {
    const taskStatus = progressStatus(subtask);
    const progressPercentage = taskStatus[0]; // Fortschritt in Prozent
    const taskText = progressText(taskStatus[1], subtask);

    const PROGRESS = document.createElement('div');
    PROGRESS.className = 'taskprogress';

    // Aufruf der angepassten Funktion mit zusätzlichem Parameter subtask.length
    PROGRESS.appendChild(createProgressImage(progressPercentage, subtask.length));
    PROGRESS.appendChild(createProgressText(taskText));

    return PROGRESS;
};




/**
 * Berechnet den Fortschritt basierend auf dem Status der Unteraufgaben.
 * ====================================================================================================
 * Diese Funktion berechnet den Fortschritt in Prozent, indem sie den Status der Unteraufgaben überprüft. 
 * Jede abgeschlossene Unteraufgabe erhöht den Fortschritt. Die Berechnung geht davon aus, dass der 
 * Fortschritt gleichmäßig über alle Unteraufgaben verteilt ist.
 * ====================================================================================================
 * @param {Array<Object>} subtask Eine Liste von Unteraufgaben, bei denen jede Aufgabe ein `status`-Feld hat, das angibt, ob sie abgeschlossen ist (`true` für abgeschlossen, `false` für nicht abgeschlossen).
 * @returns {number[]} Ein Array, das zwei Werte enthält:
 *                     - Den Prozentsatz des Fortschritts (basierend auf der Anzahl der abgeschlossenen Aufgaben).
 *                     - Die Anzahl der abgeschlossenen Aufgaben.
 * ====================================================================================================
 */
const progressStatus = (subtask) => {
    let progressFinished = 0;
    let progressMultiplier = Math.floor(100 / (subtask.length - 1));
    subtask.forEach(task => task.status === true && (progressFinished += 1));
    progressMultiplier === Infinity && (progressMultiplier = 0);
    return [progressMultiplier * progressFinished, progressFinished];
};

/**
 * Generiert einen Fortschritts-Text für die Unteraufgaben einer Aufgabe.
 * ====================================================================================================
 * Diese Funktion erstellt einen Text, der den Fortschritt bei den Unteraufgaben anzeigt. Der Text zeigt an, 
 * wie viele Unteraufgaben abgeschlossen sind und wie viele insgesamt vorhanden sind. Wenn keine Unteraufgaben 
 * vorhanden sind, wird "0/0 Subtasks" angezeigt.
 * ====================================================================================================
 * @param {number} taskFinished Die Anzahl der abgeschlossenen Unteraufgaben.
 * @param {Array<Object>} subtask Eine Liste von Unteraufgaben. Die Länge dieser Liste gibt die Gesamtanzahl der Unteraufgaben an.
 * @returns {string} Ein String, der den Fortschritt der Unteraufgaben im Format 'X/Y Subtasks' darstellt, wobei X die Anzahl der abgeschlossenen Unteraufgaben und Y die Gesamtanzahl der Unteraufgaben ist.
 * ====================================================================================================
 */
const progressText = (taskFinished, subtask) => {
    if (subtask.length > 1) {
        return `${taskFinished}/${subtask.length - 1}`;
    };
};

const createProgressImage = (progressPercentage, subtaskLength) => {
    if (subtaskLength <= 1) { // Wenn es keine Subtasks gibt (1, weil das Array meist eine leere Struktur enthält)
        const NO_SUBTASKS_MESSAGE = document.createElement('div');
        NO_SUBTASKS_MESSAGE.textContent = 'Keine Subtasks';
        NO_SUBTASKS_MESSAGE.style.color = '#5ab824';
        NO_SUBTASKS_MESSAGE.style.fontWeight = 'bold';
        return NO_SUBTASKS_MESSAGE;
    }

    const PROGRESS_CONTAINER = document.createElement('div');
    PROGRESS_CONTAINER.style.width = '128px'; // Feste Breite von 128px
    PROGRESS_CONTAINER.style.height = '8px';
    PROGRESS_CONTAINER.style.backgroundColor = '#e0e0e0';
    PROGRESS_CONTAINER.style.borderRadius = '4px';

    const PROGRESS_BAR = document.createElement('div');
    PROGRESS_BAR.style.width = `${progressPercentage}%`;
    PROGRESS_BAR.style.height = '100%';
    PROGRESS_BAR.style.backgroundColor = '#007CEE';  // Farbe der Fortschrittsanzeige
    PROGRESS_BAR.style.borderRadius = '4px';

    PROGRESS_CONTAINER.appendChild(PROGRESS_BAR);
    return PROGRESS_CONTAINER;
};

/**
 * Erstellt ein Element zur Anzeige des Fortschrittstexts.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `span`-Element, setzt den Textinhalt auf den übergebenen Fortschrittstext 
 * und gibt das `span`-Element zurück. Das Element kann verwendet werden, um den Fortschritt der Unteraufgaben 
 * in der Task-Karte anzuzeigen.
 * ====================================================================================================
 * @function createProgressText
 * @param {string} progressText Der Text, der den Fortschritt der Unteraufgaben beschreibt.
 * @returns {HTMLElement} Ein `span`-Element, das den übergebenen Fortschrittstext als Inhalt hat.
 * ====================================================================================================
 */
const createProgressText = (progressText) => {
    const PROGRESS_TEXT = document.createElement('span');
    PROGRESS_TEXT.textContent = progressText;
    return PROGRESS_TEXT;
};

/**
 * Erstellt ein Element zur Anzeige von Kontakten auf einer Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `div`-Element, das als Container für die Kontakte dient. 
 * Das Element enthält eine Kurzform der Kontakte, die durch die Funktion `createPersonShortcut` erstellt wird.
 * ====================================================================================================
 * @function createPerson
 * @param {Array<Object>} contacts Eine Liste von Kontakten, die in der Task-Karte angezeigt werden sollen.
 * @returns {HTMLElement} Ein `div`-Element mit der Klasse 'taskPersons', das die Kurzform der Kontakte enthält.
 * ====================================================================================================
 */
const createPerson = (contacts) => {
    const PERSON = document.createElement('div');
    PERSON.className = 'taskPersons';
    PERSON.appendChild(createPersonShortcut(contacts));
    return PERSON;
};

/**
 * Erstellt ein Element zur Anzeige von Kontakt-Kürzeln auf einer Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `div`-Element, das als Container für die Kontakt-Kürzel dient. 
 * Für jeden Kontakt in der übergebenen Liste wird ein Kontakt-Kürzel erstellt und in das Container-Element 
 * eingefügt. Die Kurzform jedes Kontakts wird durch die Funktion `createPersonShortcutContent` erstellt.
 * ====================================================================================================
 * @function createPersonShortcut
 * @param {Array<Object>} contacts Eine Liste von Kontaktobjekten, die in Kurzform angezeigt werden sollen.
 * @returns {HTMLElement} Ein `div`-Element mit der Klasse 'nameShortcutContent', das die Kontakt-Kürzel enthält.
 * ====================================================================================================
 */
const createPersonShortcut = (contacts) => {
    const PERSON_SHORTCUT = document.createElement('div');
    PERSON_SHORTCUT.className = 'nameShortcutContent';
    contacts = contacts.filter(item => item !== 'none');
    contacts.forEach(contact => PERSON_SHORTCUT.appendChild(createPersonShortcutContent(contact)));
    return PERSON_SHORTCUT;
};

/**
 * Erstellt ein Kontakt-Kürzel-Element für die Anzeige auf einer Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `div`-Element, das als Kontakt-Kürzel dient. Das Element wird mit 
 * einem Hintergrundfarbwert und einem Namen versehen, die aus dem übergebenen Kontaktobjekt stammen. 
 * Es wird verwendet, um die visuelle Darstellung von Kontakten auf der Task-Karte zu gestalten.
 * ====================================================================================================
 * @function createPersonShortcutContent
 * @param {Object} contact Ein Kontaktobjekt, das Informationen über den Kontakt enthält, wie z.B. den Namen und die Hintergrundfarbe.
 * @returns {HTMLElement} Ein `div`-Element, das das Kontakt-Kürzel darstellt, mit dem Namen des Kontakts und einem Hintergrundfarbwert.
 * ====================================================================================================
 */
const createPersonShortcutContent = (contact) => {
    const PERSON_SHORTCUT_CONTENT = document.createElement('div');
    PERSON_SHORTCUT_CONTENT.id = 'nameShortcut';
    PERSON_SHORTCUT_CONTENT.style.marginLeft = '-10px';
    PERSON_SHORTCUT_CONTENT.style.backgroundColor = contact.color;
    PERSON_SHORTCUT_CONTENT.textContent = contact.short;
    return PERSON_SHORTCUT_CONTENT;
};

/**
 * Erstellt ein mobiles Element für die Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `div`-Element, das als Container für mobile Funktionen oder 
 * Anzeigen auf der Task-Karte dient. Das Element enthält die Kategorie und einen Button, die durch 
 * die Funktionen `createMobileCategory` und `createMobileButton` erstellt werden.
 * ====================================================================================================
 * @function createMobile
 * @param {string} category Die Kategorie der Aufgabe, die im mobilen Element angezeigt werden soll.
 * @returns {HTMLElement} Ein `div`-Element mit der Klasse 'taskbottommobilesmall', das die Kategorie und einen Button enthält.
 * ====================================================================================================
 */
const createMobile = (cardId) => {
    const MOBILE = document.createElement('div');
    MOBILE.className = 'taskbottommobilesmall';
    MOBILE.appendChild(createMobileCategory(cardId));
    MOBILE.appendChild(createMobileButton(cardId));
    return MOBILE;
};

/**
 * Erstellt ein Auswahlfeld für die Kategorie in einer Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `select`-Element, das als Dropdown-Menü zur Auswahl der Kategorie dient. 
 * Das Dropdown-Menü wird mit den verfügbaren Kategorie-Optionen gefüllt. Die aktuell ausgewählte Kategorie 
 * wird zuerst hinzugefügt, gefolgt von allen verfügbaren Kategorien.
 * ====================================================================================================
 * @function createMobileCategory
 * @param {string} category Der Schlüssel der aktuell ausgewählten Kategorie, die als Option im Dropdown-Menü angezeigt wird.
 * @returns {HTMLElement} Ein `select`-Element, das ein Dropdown-Menü mit den verfügbaren Kategorien enthält.
 * ====================================================================================================
 */
export function createMobileCategory(cardId, category) {
    const MOBILE_CATEGORY = document.createElement('select');
    MOBILE_CATEGORY.className = 'taskCategorySelect';
    MOBILE_CATEGORY.id = `taskCategorySelect${cardId}`;

    // Füge einen Event-Listener hinzu, der das Event-Handling des Klicks auf das <select>-Element stoppt
    MOBILE_CATEGORY.addEventListener('click', (event) => {
        event.stopPropagation(); // Verhindert, dass das Klick-Event das Popup öffnet
    });

    // Füge die ersten 4 Kategorie-Optionen hinzu
    TASK_STATUS.slice(0, 4).forEach(option => MOBILE_CATEGORY.appendChild(createMobileCategoryOptions(option)));

    // Setze den Wert der aktuell ausgewählten Kategorie
    const selectedOption = MOBILE_CATEGORY.querySelector(`option[value="${category}"]`);
    if (selectedOption) {
        selectedOption.selected = true;
    }

    return MOBILE_CATEGORY;
};

/**
 * Erstellt eine Option für ein Kategorie-Auswahlfeld in einer Task-Karte.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `option`-Element für ein `select`-Element, das als Dropdown-Menü zur Auswahl 
 * der Kategorie dient. Das `option`-Element wird mit einem Wert und einem Text für die Anzeige gefüllt und 
 * kann dann dem `select`-Element hinzugefügt werden.
 * ====================================================================================================
 * @function createMobileCategoryOptions
 * @param {Object} option Ein Objekt, das die Kategorie-Option darstellt, mit `value` und `text`-Eigenschaften.
 * @returns {HTMLElement} Ein `option`-Element, das den Wert und den Text der Kategorie-Option enthält.
 * ====================================================================================================
 */
const createMobileCategoryOptions = (option) => {
    const MOBILE_CATEGORY_OPTIONS = document.createElement('option');
    MOBILE_CATEGORY_OPTIONS.value = option.value;
    MOBILE_CATEGORY_OPTIONS.textContent = option.text;
    return MOBILE_CATEGORY_OPTIONS;
};

/**
 * Erstellt einen Button für die Task-Karte zur Aufgabenverschiebung.
 * ====================================================================================================
 * Diese Funktion erstellt ein neues `button`-Element, das auf der Task-Karte als "Move"-Button verwendet 
 * wird. Der Button erhält eine ID zur späteren Identifizierung und wird mit dem Text "Move" versehen.
 * ====================================================================================================
 * @function createMobileButton
 * @returns {HTMLElement} Ein `button`-Element mit der ID 'moveTaskButton' und dem Text 'Move'.
 * ====================================================================================================
 */
const createMobileButton = (cardId) => {
  const MOBILE_BTN = document.createElement('button');
  MOBILE_BTN.id = 'moveTaskButton';

  // Füge einen Event-Listener hinzu, der das Event-Handling des Klicks auf das <button>-Element stoppt
  MOBILE_BTN.addEventListener('click', (event) => {
    event.stopPropagation(); // Verhindert, dass das Klick-Event das Popup öffnet
  });

  MOBILE_BTN.textContent = 'Move';

  // Füge einen Event-Listener für die switchCategory-Funktion hinzu
  MOBILE_BTN.addEventListener('click', () => {
    import('./draganddrop.js').then(module => {
      module.switchCategory(cardId);
    });
  });

  return MOBILE_BTN;
};