/**
 * Generates a card headline with a letter and a separating line.
 * @param {HTMLElement} container - The container element to append the headline to.
 * @param {string} letter - The letter to display in the headline.
 */
export const generateCardHeadline = (container, letter) => {
    container.appendChild(createDivLetter(letter));
    container.appendChild(createDivTrennline());
};


/**
 * Creates a div element displaying a letter in uppercase.
 * @param {string} letter - The letter to display.
 * @returns {HTMLDivElement} The created div element.
 */
const createDivLetter = (letter) => {
    const divLetter = document.createElement('div');
    divLetter.className = 'letter';
    divLetter.textContent = letter.toUpperCase();
    return divLetter;
};


/**
 * Creates a div element used as a separating line for contact cards.
 * @returns {HTMLDivElement} The created div element.
 */
const createDivTrennline = () => {
    const divTrennline = document.createElement('div');
    divTrennline.className = 'ContactcardsTrennline';
    return divTrennline;
};


/**
 * Creates a contact card and appends it to the specified container.
 * @param {HTMLElement} container - The container element to append the card to.
 * @param {string} key - The key for the card.
 * @param {string} id - The id for the card.
 * @param {string} name - The name displayed on the card.
 * @param {string} email - The email displayed on the card.
 * @param {string} tel - The telephone number displayed on the card.
 * @param {string} shortcutBackColor - The background color for the shortcut element.
 */
export const createContactCard = (container, key, id, name, email, tel, shortcutBackColor) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.id = `${key.toLowerCase()}${id}`;
    divCard.setAttribute('data-key', `${key.toLowerCase()}${id}`);
    divCard.setAttribute('data-name', name);
    divCard.setAttribute('data-email', email);
    divCard.setAttribute('data-tel', tel);
    divCard.setAttribute('data-shortcut-color', shortcutBackColor);
    divCard.appendChild(createContactShort(name, shortcutBackColor));
    divCard.appendChild(createContactEmail(name, email));
    container.appendChild(divCard);
};


/**
 * Creates a div element displaying the short name for a contact.
 * @param {string} name - The full name of the contact.
 * @param {string} shortBackColor - The background color for the short name element.
 * @returns {HTMLDivElement} The created div element.
 */
export const createContactShort = (name, shortBackColor) => {
    const divShortName = document.createElement('div');
    divShortName.id = 'nameShortcut';
    divShortName.style.backgroundColor = shortBackColor;
    divShortName.textContent = name.split(' ').map(namePart => namePart[0]).join('').toUpperCase();
    return divShortName;
};


/**
 * Creates a div element displaying the contact's email.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @returns {HTMLDivElement} The created div element.
 */
const createContactEmail = (name, email) => {
    const divEmail = document.createElement('div');
    divEmail.className = 'nameemail';
    divEmail.appendChild(createEmailName(name));
    divEmail.appendChild(createEmailAnchor(email));
    return divEmail;
};


/**
 * Creates a paragraph element displaying the contact's name.
 * @param {string} name - The name of the contact.
 * @returns {HTMLParagraphElement} The created paragraph element.
 */
const createEmailName = (name) => {
    const divEmailName = document.createElement('p');
    divEmailName.textContent = name;
    return divEmailName;
};


/**
 * Creates an anchor element linking to the contact's email address.
 * @param {string} email - The email address of the contact.
 * @returns {HTMLAnchorElement} The created anchor element.
 */
const createEmailAnchor = (email) => {
    const divEmailAnchor = document.createElement('a');
    // divEmailAnchor.href = `mailto:${email}`;
    divEmailAnchor.textContent = email;
    return divEmailAnchor;
};