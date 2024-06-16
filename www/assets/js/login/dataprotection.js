// login/dataprotection.js

const ID_privacy_policy = document.getElementById('privacy_policy');
const ID_legal_notice = document.getElementById('legal_notice');
const CLASS_privacyPolicy = document.querySelector('.privacyPolicy');
const CLASS_legalNotice = document.querySelector('.legalNotice');

function init() {
    checkTheCurrentPage();
}

function checkTheCurrentPage() {
    const currentPageUrl = window.location.href;
    if (currentPageUrl.includes('privacy_policy')) {
        currentDataprotectionPage('privacy_policy');
        return;
    }
    if (currentPageUrl.includes('legal_notice')) {
        currentDataprotectionPage('legal_notice');
        return;
    }
    console.error('Etwas stimmt nicht mit der URL:', currentPageUrl);
}

function currentDataprotectionPage(currentPage) {
    if (currentPage === 'privacy_policy') {
        currentPagePrivacyPolicy();
    }
    if (currentPage === 'legal_notice') {
        currentPageLegalNotice();
    }
}

function currentPagePrivacyPolicy() {
    if (ID_legal_notice.classList.contains('currentPage')) {
        ID_legal_notice.classList.remove('currentPage');
        CLASS_legalNotice.classList.remove('activePage');
        ID_privacy_policy.classList.remove('nextPage');
    }
    ID_legal_notice.classList.add('nextPage');
    ID_privacy_policy.classList.add('currentPage');
    CLASS_privacyPolicy.classList.add('activePage');
}

function currentPageLegalNotice() {
    if (ID_privacy_policy.classList.contains('currentPage')) {
        ID_privacy_policy.classList.remove('currentPage');
        CLASS_privacyPolicy.classList.remove('activePage');
        ID_legal_notice.classList.remove('nextPage');
    }
    ID_privacy_policy.classList.add('nextPage');
    ID_legal_notice.classList.add('currentPage');
    CLASS_legalNotice.classList.add('activePage');
}

function actionBack() {
    // window.history.back();
    window.close();
}