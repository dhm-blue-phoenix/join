// script.js

/**
 * Lädt den Inhalt von HTML-Dateien in Elemente, die das Attribut 'w3-include-html' enthalten.
 * Die Funktion durchläuft alle Elemente mit dem Attribut 'w3-include-html' und ersetzt deren
 * inneres HTML durch den Inhalt der geladenen Datei. Wenn die Datei nicht gefunden wird,
 * wird der Inhalt des Elements auf "Page not found" gesetzt.
 * 
 * @async
 * @function includeHTML
 * @returns {Promise<void>} Ein Promise, das keinen Wert zurückgibt.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Initialisiert die Anwendung durch Laden der Konfiguration für die Navigationsleiste.
 */
function init() {
  loadConfigData();
}

/**
 * Lädt die Konfigurationsdaten für die Navigationsleiste aus der Datei './navBar.config'.
 * Die geladenen Daten werden in das globale Array config_navBar gespeichert.
 * Nach dem Laden der Konfiguration wird die Funktion loadNavBarConfig() aufgerufen,
 * um die Navigationsleiste entsprechend der geladenen Daten zu aktualisieren.
 * 
 * @async
 * @function loadConfigData
 * @returns {Promise<void>} Ein Promise, das keinen Wert zurückgibt.
 */
async function loadConfigData() { // wird noch überarbeitet
  try {
    const response = await fetch('./assets/json/configs/navbar.json');
    const data = await response.json();
    config_navBar = data;
  } catch (err) {
    console.error(err);
  }
  loadNavBarConfig();
}

/**
 * Lädt die Konfiguration für die Navigationsleiste und aktualisiert die entsprechenden Klassen
 * und Deaktivierungsstatus der Elemente basierend auf der `config_navBar`-Konfiguration.
 * Geht durch jedes Element in der Konfiguration und passt die entsprechenden Eigenschaften
 * des HTML-Elements und der zugehörigen Klasse an.
 * Gibt eine Warnung aus, falls ein Element mit der angegebenen ID nicht gefunden wurde.
 */
function loadNavBarConfig() {
  config_navBar.forEach(element => {
    let ID_ELEMENT = document.getElementById(element.id);
    let CLASS_ELEMENT = document.querySelector(element.class);
    ID_ELEMENT ? (
      ID_ELEMENT.classList.contains('currentPage') ? ID_ELEMENT.classList.remove('currentPage') & CLASS_ELEMENT.classList.remove('activePage') : ID_ELEMENT.classList.remove('nextPage') & CLASS_ELEMENT.classList.remove('inactive'),
      ID_ELEMENT.classList.add(element.statusClass.nav),
      CLASS_ELEMENT.classList.add(element.statusClass.page),
      ID_ELEMENT.disabled = element.disabled
    ) : console.warn(`Element mit ID '${element.id}' wurde nicht gefunden.`);
  });
}