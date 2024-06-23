// navBar.js

/**
 * Ändert die aktuelle Seite basierend auf der übergebenen Seiten-ID und aktualisiert die Navigation.
 * Deaktiviert das aktuelle Navigations-Element und aktualisiert dessen Klasse auf 'nextPage'.
 * Aktiviert das Navigations-Element der neuen Seite und aktualisiert dessen Klasse auf 'currentPage'.
 * Schließlich setzt die Funktion die neue Seite als aktiv.
 * 
 * @param {string} pageID - Die ID der Seite, die aktiviert werden soll.
 */
function currentPage(pageID) {
    config_navBar.forEach(element => element.disabled === true && (element.disabled = false, element.addClass = 'nextPage'));
    config_navBar.forEach(element => pageID === element.id && (element.disabled = true, element.addClass = 'currentPage'));
    loadNavBarConfig();
}

function actionBack() {
    console.log('actionBack')
}