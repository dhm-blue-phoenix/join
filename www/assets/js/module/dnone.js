const idInputAddPerson = ['addPersonName', 'addPersonEmail', 'addPersonTel'];
const idDnonePersonCard = ['dnonePersonCard', 'dnoneInfoHeadline', 'dnoneInfo'];
const idEditPerson = ['editPersonShortcut', 'editPersonName', 'editPersonEmail', 'editPersonTel'];


/**
 * Resets the add contact form by clearing input values.
 */
export function resetAddContactForm() {
    addClass('addcontactpopup');
    idInputAddPerson.forEach((id) => document.getElementById(id).value = '');
};


/**
 * Hides elements related to person card by adding 'd-none' class.
 */
export function dnonePersonCard() {
    idDnonePersonCard.forEach((elementID) => document.getElementById(elementID).classList.add('d-none'));
};


/**
 * Resets the edit contact form by clearing input values.
 */
export function resetEditContactForm() {
    addClass('editcontactpopup');
    idEditPerson.forEach((id) => document.getElementById(id).value = '');
};


/**
 * Adds the 'd-nonepopup' class to hide an element by ID.
 * 
 * @param {string} id - The ID of the element to hide.
 */
function addClass(id) {
    document.getElementById(id).classList.add('d-nonepopup');
};