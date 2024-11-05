let type;


/**
 * Creates a new list item and appends it to the specified list.
 * @param {string} id - The ID of the list to append the item to.
 * @param {string} text - The text content for the list item.
 * @param {number} number - The unique number identifier for the list item.
 */
const createListItem = (id, text, number) => {
    type = id;
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.appendChild(createListText(text, number));
    listItem.appendChild(createListOptions(number));
    document.getElementById(`${id}-list`).appendChild(listItem);
};


/**
 * Creates and returns an input element for the list item text.
 * @param {string} text - The initial text value for the input.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLInputElement} - The created input element.
 */
const createListText = (text, number) => {
    const listText = document.createElement('input');
    listText.value = text;
    listText.className = 'list-item-text';
    listText.id = `list_edit${number}`;
    return listText;
};


/**
 * Creates and returns a div element for the list item options.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLDivElement} - The created div element.
 */
const createListOptions = (number) => {
    const listOptions = document.createElement('div');
    listOptions.className = 'list-item-option';
    listOptions.id = 'list-item-option';
    listOptions.appendChild(createListBtn('edit.svg', number, 'edit')); // Create edit button
    listOptions.appendChild(createListBtn('delete.svg', number, 'delete')); // Create delete button
    return listOptions;
};


/**
 * Creates and returns a button element with an image for the list item.
 * @param {string} btnImg - The filename of the button's image.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLButtonElement} - The created button element.
 */
const createListBtn = (btnImg, number, btnType) => {
    const listBtn = document.createElement('button');
    listBtn.type = 'button';
    listBtn.id = `${btnType}_${number}`; // Assign a unique ID to the button
    listBtn.appendChild(createListBtnImg(btnImg, number));
    return listBtn;
};


/**
 * Creates and returns an image element for the list item button.
 * @param {string} btnImg - The filename of the button's image.
 * @param {number} number - The unique number identifier for the list item.
 * @returns {HTMLImageElement} - The created image element.
 */
const createListBtnImg = (btnImg, number) => {
    const listBtnImg = document.createElement('img');
    listBtnImg.src = `../../resources/symbols/${btnImg}`;
    listBtnImg.alt = `btn_img_${btnImg}`;
    listBtnImg.id = `list_${type}_btn_${btnImg.substring(0, btnImg.indexOf('.'))}${number}`;
    listBtnImg.setAttribute('key', number);
    listBtnImg.setAttribute('type', type);
    return listBtnImg;
};


export { createListItem };