// login/dataprotection.js

const ID_privacy_policy = document.getElementById('privacy_policy');
const ID_legal_notice = document.getElementById('legal_notice');

const CLASS_privacyPolicy = document.querySelector('.privacyPolicy');
const CLASS_legalNotice = document.querySelector('.legalNotice');

/**
 * Initialisiert die Seite, indem die aktuelle Seite überprüft und entsprechende Aktionen ausgeführt werden.
 */
function init() {
    checkTheCurrentPage();
}

/**
 * Überprüft die aktuelle URL, um festzustellen, welche Seite angezeigt werden soll, 
 * und ruft die entsprechende Funktion auf, um die Seite zu laden.
 */
function checkTheCurrentPage() {
    const currentPageUrl = window.location.href;
    currentPageUrl.includes('privacy_policy') && currentDataprotectionPage('privacy_policy');
    currentPageUrl.includes('legal_notice') && currentDataprotectionPage('legal_notice');
}

/**
 * Lädt die angeforderte Seite basierend auf dem übergebenen Seitennamen 
 * und führt die entsprechenden Aktionen zur Aktualisierung der Seite durch.
 * 
 * @param {string} currentPage - Der Name der aktuellen Seite (z.B. 'privacy_policy', 'legal_notice', 'help').
 */
function currentDataprotectionPage(currentPage) {
    currentPage === 'privacy_policy' && currentPagePrivacyPolicy();
    currentPage === 'legal_notice' && currentPageLegalNotice();
}

/**
 * Führt die notwendigen Aktionen aus, um die "Privacy Policy"-Seite anzuzeigen.
 */
function currentPagePrivacyPolicy() {
    ID_legal_notice.classList.contains('currentPage') && removeLegalNoticeClass();
    ID_legal_notice.classList.add('nextPage');
    ID_privacy_policy.classList.add('currentPage');
    CLASS_privacyPolicy.classList.add('activePage');
}

/**
 * Führt die notwendigen Aktionen aus, um die "Legal Notice"-Seite anzuzeigen.
 */
function currentPageLegalNotice() {
    ID_privacy_policy.classList.contains('currentPage') && removePrivacyPolicyClass();
    ID_privacy_policy.classList.add('nextPage');
    ID_legal_notice.classList.add('currentPage');
    CLASS_legalNotice.classList.add('activePage');
}

/**
 * Entfernt die Klassen der "Legal Notice"-Seite, um deren Anzeige zu beenden.
 */
function removeLegalNoticeClass() {
    ID_legal_notice.classList.remove('currentPage');
    CLASS_legalNotice.classList.remove('activePage');
    ID_privacy_policy.classList.remove('nextPage');
    return;
}

/**
 * Entfernt die Klassen der "Privacy Policy"-Seite, um deren Anzeige zu beenden.
 */
function removePrivacyPolicyClass() {
    ID_privacy_policy.classList.remove('currentPage');
    CLASS_privacyPolicy.classList.remove('activePage');
    ID_legal_notice.classList.remove('nextPage');
    return;
}

/**
 * Führt eine Aktion aus, um zur vorherigen Seite zurückzukehren oder das Fenster zu schließen.
 */
function actionBack() {
    // window.history.back();
    // window.close();
    console.warn('noch in arbeit!');
}