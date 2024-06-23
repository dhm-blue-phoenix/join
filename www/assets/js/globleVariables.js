// globleVariables.js

/**
 * Konfigurationsobjekt für die Navigationsleiste.
 * Enthält Konfigurationsdetails für verschiedene Navigationsleisten-Elemente.
 * Jedes Objekt enthält eine ID zur Identifizierung des HTML-Elements, eine Klasse
 * zur Hinzufügung und eine Option zur Deaktivierung des Elements.
 * 
 * @typedef {Object} NavBarConfigElement
 * @property {string} id - Die ID des HTML-Elements.
 * @property {string} addClass - Die Klasse, die dem Element hinzugefügt werden soll.
 * @property {boolean} disabled - Gibt an, ob das Element deaktiviert ist oder nicht.
 * 
 * @type {Array.<NavBarConfigElement>}
 */
let config_navBar = [];