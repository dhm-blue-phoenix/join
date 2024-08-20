/**
 * Generiert die Überschrift für eine Gruppe von Kontaktkarten.
 * ====================================================================================================
 * Diese Funktion erstellt und fügt zwei `div`-Elemente in den angegebenen Container ein:
 * Ein Element für den Anfangsbuchstaben der Kontaktgruppe und eine Trennlinie.
 * ====================================================================================================
 * @param {HTMLElement} container Das HTML-Element, in das die Überschrift eingefügt wird.
 * @param {string} letter Der Anfangsbuchstabe der Kontaktgruppe.
 * ====================================================================================================
 */
export const generateCardHeadline = (container, letter) => {
    container.appendChild(createDivLetter(letter));    
    container.appendChild(createDivTrennline());
};

/**
 * Erstellt ein `div`-Element, das den Anfangsbuchstaben einer Kontaktgruppe enthält.
 * ====================================================================================================
 * Diese Funktion erzeugt ein `div`-Element mit einer CSS-Klasse und setzt den Textinhalt
 * auf den übergebenen Buchstaben, in Großbuchstaben umgewandelt.
 * ====================================================================================================
 * @param {string} letter Der Anfangsbuchstabe der Kontaktgruppe.
 * @returns {HTMLElement} Das erstellte `div`-Element mit dem Buchstaben.
 * ====================================================================================================
 */
const createDivLetter = (letter) => {
    const DIV_LETTER = document.createElement('div');
    DIV_LETTER.className = 'letter';
    DIV_LETTER.textContent = letter.toUpperCase();
    return DIV_LETTER;
};

/**
 * Erstellt ein `div`-Element für eine Trennlinie zwischen Kontaktgruppen.
 * ====================================================================================================
 * Diese Funktion erzeugt ein `div`-Element mit einer CSS-Klasse, das als Trennlinie
 * zwischen verschiedenen Gruppen von Kontaktkarten dient.
 * ====================================================================================================
 * @returns {HTMLElement} Das erstellte `div`-Element für die Trennlinie.
 * ====================================================================================================
 */
const createDivTrennline = () => {
    const DIV_TRENNLINE = document.createElement('div');
    DIV_TRENNLINE.className = 'ContactcardsTrennline';
    return DIV_TRENNLINE;
};

/**
 * Erstellt eine Kontaktkarte und fügt sie dem angegebenen Container hinzu.
 * ====================================================================================================
 * Diese Funktion erstellt eine Kontaktkarte mit den angegebenen Informationen und fügt sie
 * einem Container hinzu. Die Karte enthält den Namen, die E-Mail-Adresse und die Telefonnummer
 * des Kontakts sowie einen farbigen Hintergrund für das Namens-Shortcut.
 * ====================================================================================================
 * @param {HTMLElement} container Der HTML-Container, dem die erstellte Kontaktkarte hinzugefügt wird.
 * @param {string} key Ein eindeutiger Schlüssel, der die Kontaktkarte identifiziert.
 * @param {number} id Eine eindeutige ID für die Kontaktkarte.
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @param {string} tel Die Telefonnummer des Kontakts.
 * @param {string} shortcutBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * ====================================================================================================
 */
export const createContactCard = (container, key, id, name, email, tel, shortcutBackColor) => {
    const DIV_CARD = document.createElement('div');
    DIV_CARD.className = 'card';
    DIV_CARD.id = key.toLowerCase() + id;
    DIV_CARD.setAttribute('data-key', key.toLowerCase() + id);
    DIV_CARD.setAttribute('data-name', name);
    DIV_CARD.setAttribute('data-email', email);
    DIV_CARD.setAttribute('data-tel', tel);
    DIV_CARD.setAttribute('data-shortcut-color', shortcutBackColor);
    DIV_CARD.appendChild(createDivShortName(name, shortcutBackColor));
    DIV_CARD.appendChild(createDivEmail(name, email));
    container.appendChild(DIV_CARD);
};

/**
 * Erstellt ein Div-Element, das das Namens-Shortcut für den Kontakt enthält.
 * ====================================================================================================
 * Diese Funktion erstellt ein Div-Element mit dem Namens-Shortcut, basierend auf den Initialen des Namens.
 * Die Hintergrundfarbe des Divs wird ebenfalls festgelegt.
 * ====================================================================================================
 * @param {string} name Der vollständige Name des Kontakts.
 * @param {string} shortcutBackColor Die Hintergrundfarbe des Namens-Shortcuts.
 * @returns {HTMLElement} Das erstellte Div-Element mit dem Namens-Shortcut.
 * ====================================================================================================
 */
const createDivShortName = (name, shortcutBackColor) => {
    const DIV_ShortName = document.createElement('div');
    DIV_ShortName.id = 'nameShortcut';
    DIV_ShortName.style.backgroundColor = shortcutBackColor;
    DIV_ShortName.textContent = name.split(' ').map(namePart => namePart[0]).join('').toUpperCase();
    return DIV_ShortName;
};

/**
 * Erstellt ein Div-Element, das die E-Mail-Adresse des Kontakts anzeigt.
 * ====================================================================================================
 * Diese Funktion erstellt ein Div-Element, das den Namen des Kontakts und seine E-Mail-Adresse enthält.
 * ====================================================================================================
 * @param {string} name Der Name des Kontakts.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {HTMLElement} Das erstellte Div-Element mit dem Namen und der E-Mail-Adresse.
 * ====================================================================================================
 */
const createDivEmail = (name, email) => {
    const DIV_EMAIL = document.createElement('div');
    DIV_EMAIL.className = 'nameemail';
    DIV_EMAIL.appendChild(createDivEmailName(name));
    DIV_EMAIL.appendChild(createDivEmailAnchor(email));
    return DIV_EMAIL;
};

/**
 * Erstellt ein Paragraph-Element, das den Namen des Kontakts anzeigt.
 * ====================================================================================================
 * Diese Funktion erstellt ein Paragraph-Element (`<p>`), das den Namen des Kontakts enthält.
 * ====================================================================================================
 * @param {string} name Der Name des Kontakts.
 * @returns {HTMLElement} Das erstellte Paragraph-Element mit dem Namen des Kontakts.
 * ====================================================================================================
 */
const createDivEmailName = (name) => {
    const DIV_EMAIL_NAME = document.createElement('p');
    DIV_EMAIL_NAME.textContent = name;
    return DIV_EMAIL_NAME;
};

/**
 * Erstellt ein Anker-Element, das die E-Mail-Adresse des Kontakts anzeigt und verlinkt.
 * ====================================================================================================
 * Diese Funktion erstellt ein Anker-Element (`<a>`), das die E-Mail-Adresse des Kontakts enthält
 * und einen Link zu einer Mailto-Adresse darstellt.
 * ====================================================================================================
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {HTMLElement} Das erstellte Anker-Element mit der E-Mail-Adresse.
 * ====================================================================================================
 */
const createDivEmailAnchor = (email) => {
    const DIV_EMAIL_ANCHOR = document.createElement('a');
    DIV_EMAIL_ANCHOR.href = `mailto:${email}`; // Mailto-Link hinzugefügt
    DIV_EMAIL_ANCHOR.textContent = email;
    return DIV_EMAIL_ANCHOR;
};