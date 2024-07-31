const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const CLASS_Contactcards = document.querySelector('.Contactcards');
const CLASS_dnone = document.querySelectorAll('.d-none');

const ID_personShortcut = document.getElementById('personShortcut');
const ID_personName = document.getElementById('personName');
const ID_personEmail = document.getElementById('personEmail');
const ID_personTel = document.getElementById('personTel');
const ID_personOptions = document.getElementById('personOptions');
const ID_personEdit = document.getElementById('');
const ID_personDel = document.getElementById('personDelete');

const ID_addPersionName = document.getElementById('addPersionName');
const ID_addPersionEmail = document.getElementById('addPersionEmail');
const ID_addPersionTel = document.getElementById('addPersionTel');

const ID_editPersionShortcut = document.getElementById('editPersionShortcut');
const ID_editPersionName = document.getElementById('editPersionName');
const ID_editPersionEmail = document.getElementById('editPersionEmail');
const ID_editPersionTel = document.getElementById('esitPersionTel');

const ID_dnonePersonCard = document.getElementById('dnonePersonCard');
const ID_dnoneInfoHeadline = document.getElementById('dnoneInfoHeadline');
const ID_dnoneInfo = document.getElementById('dnoneInfo');

let userID;
let lastCart;
let contacts;

/**
 * Initialisiert die Kontakt-Karten.
 * ---------------------------------
 * Diese Funktion lädt die Kontakte des aktuellen Benutzers und rendert die Kontakt-Karten.
 * ---------------------------------
 * @async
 * @returns {Promise<void>}
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
 * func loadContactsData() - findet man in der dataResponse.js
 * ------------------------------------------
 * @async
 * @returns {Promise<void>}
 */
async function loadContacts() {
    try {
        contacts = {};
        lodeUserId();
        const tempContacts = await lodeContactsCard(`users/${userID}/`);
        sortContacts(tempContacts);
    } catch (err) { }
}

/**
 * Lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * ---------------------------------------------------------------
 * Diese Funktion lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * Wenn keine ID gefunden wird, wird ein Fehler geworfen.
 * ---------------------------------------------------------------
 * @returns {void}
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
 * @returns {void}
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
 * Diese Funktion rendert die Kontakt-Karten basierend 
 * auf den geladenen Kontakten und weist jeder Karte 
 * eine eindeutige ID zu.
 * -----------------------------------------------
 * @returns {void}
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
 * @param {string} tel Die Telefonnummer des Kontakts.
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
 * @returns {void}
 */
function openContact(cardId, personName, personEmail, personTel) {
    const card = document.getElementById(cardId);
    CLASS_dnone.forEach(element => { element.classList.remove('d-none'); });
    card.classList.add('cardactive');
    card.classList.remove('card');
    card.style.pointerEvents = "none";
    renderPerson(personName, personEmail, personTel);
    removeLastCart(card);
}

/**
 * Rendert die detaillierten Kontaktdaten.
 * ---------------------------------------
 * Diese Funktion wird verwendet, um die Kontaktdaten
 * in der Benutzeroberfläche anzuzeigen.
 * ---------------------------------------
 * func extractInitials() - findet man in der extractInitials.js
 * ---------------------------------------
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @param {string} tel Die Telefonnummer des Kontakts.
 * @returns {void}
 */
function renderPerson(name, email, tel) {
    const initails = extractInitials(name);
    ID_personShortcut.textContent = initails;
    ID_personName.textContent = name;
    ID_personEmail.textContent = email;
    ID_personTel.textContent = tel;
    ID_personOptions.innerHTML = HtmlPersonOptions(email);
}

/**
 * Erstellt die HTML-Optionen für einen Kontakt.
 * ---------------------------------------------
 * Diese Funktion erstellt die HTML-Elemente für die Bearbeiten- und Löschen-Schaltflächen
 * für einen Kontakt.
 * ---------------------------------------------
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {string} Die HTML-Optionen als String.
 */
function HtmlPersonOptions(email) {
    const html = `
        <button onclick="removeClass('editcontactpopup')">
          <img src="./resources/symbols/edit.png" alt=""/> Edit
        </button>
        <button onclick="delContact('${email}')">
          <img src="./resources/symbols/delete.svg" alt=""/> Delete
        </button>
    `;
    return html;
}

/**
 * Entfernt die letzte aktive Kontakt-Karte.
 * -----------------------------------------
 * @param {HTMLElement} card Die aktuell aktive Kontakt-Karte.
 * @returns {void}
 */
function removeLastCart(card) {
    if (lastCart !== undefined) {
        lastCart.classList.remove('cardactive');
        lastCart.classList.add('card');
        lastCart.style.pointerEvents = "";
    }
    lastCart = card;
}

/**
 * Löscht den Kontakt mit der angegebenen E-Mail-Adresse.
 * ------------------------------------------------------
 * func loadContactsId() - findet man in der extractInitials.js
 * func deletContactById() - findet man in der extractInitials.js
 * ------------------------------------------------------
 * @async
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {Promise<void>}
 */
async function delContact(email) {
    const contactId = await loadContactsId(`users/${userID}/`, email);
    await deletContactById(`users/${userID}/contacts/${contactId[0]}`);
    await initCard();
    dnonePersionCard();
}

/**
 * Fügt den Klassen "d-none" hinzu, um die Personenkarte
 * und die zugehörigen Infos zu verbergen.
 * -----------------------------------------------------
 * @returns {void}
 */
function dnonePersionCard() {
    ID_dnonePersonCard.classList.add('d-none');
    ID_dnoneInfoHeadline.classList.add('d-none');
    ID_dnoneInfo.classList.add('d-none');
}

/**
 * Fügt einen neuen Kontakt hinzu.
 * -------------------------------
 * Diese Funktion wird aufgerufen,
 * wenn das Formular zum Hinzufügen eines neuen Kontakts abgeschickt wird.
 * Sie überprüft, ob der Kontakt bereits in der Kontaktliste existiert,
 * und fügt ihn hinzu, wenn er nicht existiert.
 * -------------------------------
 * func lodeContactsCard() - findet man in der extractInitials.js
 * -------------------------------
 * @async
 * @param {Event} event - Das Ereignis, das durch das Absenden des Formulars ausgelöst wird.
 */
async function addContact(event) {
    event.preventDefault();
    try {
        const formData = lodeFormData(ID_addPersionName.value, ID_addPersionEmail.value, ID_addPersionTel.value);
        const contactCards = await lodeContactsCard(`users/${userID}`);
        const findContact = contactCards.find(contact => contact.email === formData.email);
        if (findContact === undefined) {
            await uploadPatchData(`users/${userID}/contacts/`, formData);
            console.warn('Benutzer erfolgreich Hinzugefügt!'); // [!] Ändern zu Benutzer-Feedback
        } else return console.warn('Benutzer existiert Bereits!'); // [!] Ändern zu Benutzer-Feedback
    } catch (err) {
        console.warn('Beim Hochladen des Contacts ist etwas Fehlgeschlagen!');
    }
}

/**
 * Lädt die Formulardaten aus den Eingabefeldern.
 * ----------------------------------------------
 * @param {string} name - Der Wert des Namens-Eingabefelds.
 * @param {string} email - Der Wert des E-Mail-Eingabefelds.
 * @param {string} tel - Der Wert des Telefon-Eingabefelds.
 * @returns {Object} Das Formulardaten-Objekt.
 */
function lodeFormData(name, email, tel) {
    const formData = {
        'name': name,
        'email': email,
        'tel': tel
    };
    return formData;
}

function editContact() { /*- Edit Contact Function -*/ }