// script.js

/**
 * Asynchrone Funktion zum Einbinden von HTML-Inhalten
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
  loadNavBarConfig();
}

/**
 * Lädt die Konfiguration für die Navigationsleiste und aktualisiert die entsprechenden Klassen und Deaktivierungsstatus der Elemente.
 * Geht durch jedes Element in der Konfiguration und passt die entsprechenden Eigenschaften des HTML-Elements an.
 * Gibt eine Warnung aus, falls ein Element mit der angegebenen ID nicht gefunden wurde.
 */
function loadNavBarConfig() {
  config_navBar.forEach(element => {
    let ID_ELEMENT = document.getElementById(element.id);
    ID_ELEMENT ? (
      ID_ELEMENT.classList.contains('currentPage') ? ID_ELEMENT.classList.remove('currentPage') : ID_ELEMENT.classList.remove('nextPage'),
      ID_ELEMENT.classList.add(element.addClass),
      ID_ELEMENT.disabled = element.disabled
    ) : console.warn(`Element mit ID '${element.id}' wurde nicht gefunden.`);
  });
  console.table(config_navBar);
}