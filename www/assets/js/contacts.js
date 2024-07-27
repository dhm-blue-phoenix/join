const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const CLASS_Contactcards = document.querySelector('.Contactcards');

const ID_personShortcut = document.getElementById('personShortcut');
const ID_personName = document.getElementById('personName');
const ID_personEmail = document.getElementById('personEmail');
const ID_personTel = document.getElementById('personTel');

let userID;
let lastCart;
let contacts = {};

/**
 * Initialisiert die Kontakt-Karten.
 * ---------------------------------
 * Diese Funktion lädt die Kontakte des aktuellen Benutzers und rendert die Kontakt-Karten.
 * ---------------------------------
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
    } catch (err) { }
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

/**
 * Rendert die Kontakt-Karten mit eindeutigen IDs.
 * -----------------------------------------------
 * Diese Funktion rendert die Kontakt-Karten basierend auf den geladenen Kontakten
 * und weist jeder Karte eine eindeutige ID zu.
 * -----------------------------------------------
 */
function renderCards() {
    const carts = CLASS_Contactcards;
    carts.innerHTML = '';
    Object.keys(contacts).forEach(key => {
        carts.innerHTML += `
            <div class="letter">${key.toUpperCase()}</div>
            <div class="ContactcardsTrennline"></div>
        `;
        contacts[key].forEach((contact, cardId) => {
            const contactCard = document.createElement('div');
            contactCard.innerHTML = htmlCard(key, cardId, contact.name, contact.email, contact.tel);
            carts.appendChild(contactCard);
        });
    });
}

/**
 * Erzeugt eine HTML-Karte für einen Kontakt.
 * ------------------------------------------
 * Diese Funktion erstellt eine HTML-Karte, die die Kontaktdaten anzeigt.
 * ------------------------------------------
 * @param {number} id Die ID des Kontakts.
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {string} Die HTML-Karte als String.
 */
function htmlCard(key, id, name, email, tel) {
    card = `
        <div class="card" id="${key.toLowerCase() + id}" onclick="openContact('${key.toLowerCase() + id}', '${name}', '${email}', '${tel}')">
            <div id="nameShortcut" style="background-color: rgb(255, 112, 16)">${name.split(' ').map(namePart => namePart[0]).join('').toUpperCase()}</div>
            <div class="namemail">
            <p>${name}</p>
            <a href="#Mail">${email}</a>
        </div>`;
    return card;
}

/**
 * Öffnet den Kontakt mit der angegebenen ID und zeigt die detaillierten Kontaktdaten an.
 * --------------------------------------------------------------------------------------
 * @param {number} cardId Die ID der Kontakt-Karte.
 * @param {string} personName Der Name des Kontakts.
 * @param {string} personEmail Die E-Mail-Adresse des Kontakts.
 * @param {string} personTel Die Telefonnummer des Kontakts.
 */
function openContact(cardId, personName, personEmail, personTel) {
    const card = document.getElementById(cardId);
    card.classList.add('cardactive');
    card.classList.remove('card');
    card.style.pointerEvents = "none";
    renderPerson(personName, personEmail, personTel);
    removeLastCart(card);
}

/**
 * Rendert die detaillierten Kontaktdaten.
 * ---------------------------------------
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @param {string} tel Die Telefonnummer des Kontakts.
 */
function renderPerson(name, email, tel) {
    ID_personShortcut.textContent = '[!]'; // [!] Ist noch nicht Fertig
    ID_personName.textContent = name;
    ID_personEmail.textContent = email;
    ID_personTel.textContent = tel;
}

/**
 * Entfernt die letzte aktive Kontakt-Karte.
 * -----------------------------------------
 * @param {HTMLElement} card Die aktuell aktive Kontakt-Karte.
 */
function removeLastCart(card) {
    if (lastCart !== undefined) {
        lastCart.classList.remove('cardactive');
        lastCart.classList.add('card');
        lastCart.style.pointerEvents = "";
    }
    lastCart = card;
}

function addContact() { }
function editContact() { }
function delContact() { }






// [!] Wird noch gelöscht
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

