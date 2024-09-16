let type;

const createListItem = (id, text, number) => {
    type = id;
    const LIST_ITEM = document.createElement('li');
    LIST_ITEM.className = 'list-item';
    LIST_ITEM.appendChild(createListText(text, number));
    LIST_ITEM.appendChild(createListOptions(number));
    document.getElementById(`${id}-list`).appendChild(LIST_ITEM);
};

const createListText = (text, number) => {
    const LIST_TEXT = document.createElement('input');
    LIST_TEXT.value = text;
    LIST_TEXT.className = 'list-item-text';
    LIST_TEXT.id = 'list_edit' + number;
    return LIST_TEXT;
};

const createListOptions = (number) => {
    const LIST_OPTIONS = document.createElement('div');
    LIST_OPTIONS.className = 'list-item-option';
    LIST_OPTIONS.appendChild(createListBtn('delete.svg', number));
    return LIST_OPTIONS;
};

const createListBtn = (btnImg, number) => {
    const LIST_BTN = document.createElement('button');
    LIST_BTN.type = 'button';
    LIST_BTN.appendChild(createListBtnImg(btnImg, number));
    return LIST_BTN;
};

const createListBtnImg = (btnImg, number) => {
    const LIST_BTN_IMG = document.createElement('img');
    LIST_BTN_IMG.src = '../../resources/symbols/' + btnImg;
    LIST_BTN_IMG.alt = 'btn_img_' + btnImg;
    LIST_BTN_IMG.id = 'list_' + type + '_btn_' + (btnImg.substring(0, btnImg.indexOf('.')) + number);
    LIST_BTN_IMG.setAttribute('key', number);
    LIST_BTN_IMG.setAttribute('type', type);
    return LIST_BTN_IMG;
};

export { createListItem };