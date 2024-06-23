// navBar.js

/**
 * Aktualisiert die Navigationsleiste basierend auf der übergebenen Seiten-ID.
 * Deaktiviert das aktuelle Navigations-Element und aktualisiert dessen Status.
 * Aktiviert das Navigations-Element der neuen Seite und aktualisiert dessen Status.
 * Schließlich lädt die Funktion die aktualisierte Konfiguration der Navigationsleiste.
 * 
 * @param {string} pageID - Die ID der Seite, die aktiviert werden soll.
 */
function currentPage(pageID) {
    config_navBar.forEach(element => element.disabled === true && (element.disabled = false, element.statusClass.nav = 'nextPage', element.statusClass.page = 'inactive'));
    config_navBar.forEach(element => pageID === element.id && (element.disabled = true, element.statusClass.nav = 'currentPage', element.statusClass.page = 'activePage'));
    console.table(config_navBar)
    loadNavBarConfig();
}

function actionBack() {
    console.log('actionBack')
}