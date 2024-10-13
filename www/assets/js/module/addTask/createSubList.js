let type;

/**
 * Erstellt ein Listenelement und fügt es zu einer spezifischen Liste hinzu.
 * ====================================================================================================
 * @param {string} id - Die ID der Liste, zu der das Listenelement hinzugefügt wird.
 * @param {string} text - Der Text, der im Listenelement angezeigt wird.
 * @param {number} number - Eine eindeutige Nummer, die zur Identifizierung des Listenelements verwendet wird.
 * ====================================================================================================
 */
const createListItem = (id, text, number) => {
    type = id;
    const LIST_ITEM = document.createElement('li');
    LIST_ITEM.className = 'list-item';
    LIST_ITEM.appendChild(createListText(text, number));
    LIST_ITEM.appendChild(createListOptions(number));
    document.getElementById(`${id}-list`).appendChild(LIST_ITEM);
};

/**
 * Erstellt ein Eingabefeld für den Text innerhalb eines Listenelements.
 * ====================================================================================================
 * @param {string} text - Der Text, der im Eingabefeld angezeigt wird.
 * @param {number} number - Eine eindeutige Nummer, um das Eingabefeld zu identifizieren.
 * @returns {HTMLInputElement} - Das erstellte Eingabefeld-Element.
 * ====================================================================================================
 */
const createListText = (text, number) => {
    const LIST_TEXT = document.createElement('input');
    LIST_TEXT.value = text;
    LIST_TEXT.className = 'list-item-text';
    LIST_TEXT.id = 'list_edit' + number;
    return LIST_TEXT;
};

/**
 * Erstellt einen Optionsbereich für das Listenelement (Löschbutton).
 * ====================================================================================================
 * @param {number} number - Eine eindeutige Nummer, für den Löschbutton.
 * @returns {HTMLDivElement} - Das erstellte Optionsbereichs-Element.
 * ====================================================================================================
 */
const createListOptions = (number) => {
    const LIST_OPTIONS = document.createElement('div');
    LIST_OPTIONS.className = 'list-item-option';
    LIST_OPTIONS.appendChild(createListBtn('delete.svg', number));
    return LIST_OPTIONS;
};

/**
 * Erstellt einen Button für ein Listenelement.
 * ====================================================================================================
 * @param {string} btnImg - Der Dateiname des Bildes, das auf dem Button angezeigt wird.
 * @param {number} number - Eine eindeutige Nummer, um den Button zu identifizieren.
 * @returns {HTMLButtonElement} - Das erstellte Button-Element.
 * ====================================================================================================
 */
const createListBtn = (btnImg, number) => {
    const LIST_BTN = document.createElement('button');
    LIST_BTN.type = 'button';
    LIST_BTN.appendChild(createListBtnImg(btnImg, number));
    return LIST_BTN;
};

/**
 * Erstellt ein Bild für den Button eines Listenelements.
 * ====================================================================================================
 * @param {string} btnImg - Der Dateiname des Bildes, das verwendet wird.
 * @param {number} number - Eine eindeutige Nummer, um das Bild zu identifizieren.
 * @returns {HTMLImageElement} - Das erstellte Bild-Element.
 * ====================================================================================================
 */
const createListBtnImg = (btnImg, number) => {
    const LIST_BTN_IMG = document.createElement('img');
    LIST_BTN_IMG.src = '../../join/www/resources/symbols/' + btnImg;
    LIST_BTN_IMG.alt = 'btn_img_' + btnImg;
    LIST_BTN_IMG.id = 'list_' + type + '_btn_' + (btnImg.substring(0, btnImg.indexOf('.')) + number);
    LIST_BTN_IMG.setAttribute('key', number);
    LIST_BTN_IMG.setAttribute('type', type);
    return LIST_BTN_IMG;
};

export { createListItem };