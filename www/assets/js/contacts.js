const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const CLASS_Contactcards = document.querySelector('.Contactcards');
let userID;
let contacts = {};

/**
 * Initialisiert die Kontakt-Karten.
 * -----------------------------
 * Diese Funktion lädt die Kontakte des aktuellen Benutzers und rendert die Kontakt-Karten.
 * -----------------------------
 */
async function initCard() {
    await loadContacts();
    renderCards();
}

/**
 * Lädt die Kontakte des aktuellen Benutzers.
 * ------------------------------------------
 * Diese Funktion lädt die Kontakte des aktuellen Benutzers aus der Datenbank,
 * sortiert sie alphabetisch und gruppiert sie nach Anfangsbuchstaben.
 * ------------------------------------------
 */
async function loadContacts() {
    try {
        lodeUserId();
        const tempContacts = await loadContactsData('users/' + userID + '/contacts');
        sortContacts(tempContacts);
    } catch (err) {}
}

/**
 * Lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * ---------------------------------------------------------------
 * Diese Funktion lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * Wenn keine ID gefunden wird, wird ein Fehler geworfen.
 * ---------------------------------------------------------------
 */
function lodeUserId() {
    if (storedLocalUserID) {
        userID = storedLocalUserID;
    } else if (storedSessionUserID) {
        userID = storedSessionUserID;
    } else {
        throw new Error('Es ist ein Problem aufgetreten!');
    };
}

/**
 * Sortiert Kontakte alphabetisch und gruppiert sie nach Anfangsbuchstaben.
 * ------------------------------------------------------------------------
 * Diese Funktion sortiert die übergebenen Kontakte alphabetisch nach Namen 
 * und gruppiert sie nach Anfangsbuchstaben.
 * ------------------------------------------------------------------------
 * @param {Array} data Die zu sortierenden Kontakte.
 */
function sortContacts(data) {
    const sortedContacts = data.sort((a, b) => a.name.localeCompare(b.name));
    sortedContacts.forEach((contact) => {
        const firstLetter = contact.name.charAt(0).toLowerCase();
        if (!contacts[firstLetter]) {
            contacts[firstLetter] = [];
        }
        contacts[firstLetter].push(contact);
    });
}

function renderContact() { }

/**
 * Rendert die Kontakt-Karten.
 * ---------------------------
 * Diese Funktion rendert die Kontakt-Karten basierend auf den geladenen Kontakten.
 * ---------------------------
 */
function renderCards() {
    const carts = CLASS_Contactcards;
    carts.innerHTML = '';
    Object.keys(contacts).forEach(key => {
        carts.innerHTML += `
            <div class="letter">${key.toUpperCase()}</div>
            <div class="ContactcardsTrennline"></div>
        `;
        contacts[key].forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.innerHTML = `
                <div class="card">
                    <div id="nameShortcut" style="background-color: rgb(255, 112, 16)">${contact.name.split(' ').map(namePart => namePart[0]).join('').toUpperCase()}</div>
                    <div class="namemail">
                    <p>${contact.name}</p>
                    <a href="#Mail">${contact.email}</a>
                </div>`;
            carts.appendChild(contactElement);
        });
    });
}

function addContact() { }
function editContact() { }
function delContact() { }







async function betta() {
    let userID;
    const contact = {
        'name': 'Ava Adams',
        'email': 'ava.adams@example.com',
        'tel': '00309032111'
    };
    if (storedLocalUserID) { userID = storedLocalUserID; }
    else if (storedSessionUserID) { userID = storedSessionUserID; }
    else { throw new Error('Es ist ein Problem aufgetreten!'); }
    await uploadPatchData('users/' + userId + '/contacts');
    const tempContacts = await loadContactsData('users/' + userID + '/contacts');
}

