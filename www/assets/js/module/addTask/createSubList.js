/**
 * Creates a new list item and appends it to the specified list.
 * @param {string} id - The ID of the list to append the item to.
 * @param {string} text - The text content for the list item.
 * @param {number} number - The unique number identifier for the list item.
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
 * Creates and returns an input element for the list item text.
 * @param {string} text - The initial text value for the input.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLInputElement} - The created input element.
 */
const createListText = (text, number) => {
    const LIST_TEXT = document.createElement('input');
    LIST_TEXT.value = text;
    LIST_TEXT.className = 'list-item-text';
    LIST_TEXT.id = `list_edit${number}`;
    return LIST_TEXT;
};


/**
 * Creates and returns a div element for the list item options.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLDivElement} - The created div element.
 */
const createListOptions = (number) => {
    const LIST_OPTIONS = document.createElement('div');
    LIST_OPTIONS.className = 'list-item-option';
    LIST_OPTIONS.appendChild(createListBtn('delete.svg', number));
    return LIST_OPTIONS;
};


/**
 * Creates and returns a button element with an image for the list item.
 * @param {string} btnImg - The filename of the button's image.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLButtonElement} - The created button element.
 */
const createListBtn = (btnImg, number) => {
    const LIST_BTN = document.createElement('button');
    LIST_BTN.type = 'button';
    LIST_BTN.appendChild(createListBtnImg(btnImg, number));
    return LIST_BTN;
};


/**
 * Creates and returns an image element for the list item button.
 * @param {string} btnImg - The filename of the button's image.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLImageElement} - The created image element.
 */
const createListBtnImg = (btnImg, number) => {
    const LIST_BTN_IMG = document.createElement('img');
    LIST_BTN_IMG.src = `../../join/www/resources/symbols/${btnImg}`;
    LIST_BTN_IMG.alt = `btn_img_${btnImg}`;
    LIST_BTN_IMG.id = `list_${type}_btn_${btnImg.substring(0, btnImg.indexOf('.'))}${number}`;
    LIST_BTN_IMG.setAttribute('key', number);
    LIST_BTN_IMG.setAttribute('type', type);
    return LIST_BTN_IMG;
};


export { createListItem };