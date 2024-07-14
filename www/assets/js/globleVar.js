// globleVar.js

/**
 * Konstante für die Firebase-Datenbankkonfiguration.
 * Enthält die baseURL und Pfade zu verschiedenen Endpunkten.
 * @type {Object}
 * @property {string} baseURL - Die Basis-URL der Firebase-Datenbank.
 * @property {string} patchUsers - Der Pfad zu den Benutzerdaten in der Firebase-Datenbank.
 * @property {string} patchTastks - Der Pfad zu den Aufgaben (falls vorhanden) in der Firebase-Datenbank.
 * @property {string} patchContacts - Der Pfad zu den Kontakten (falls vorhanden) in der Firebase-Datenbank.
 */
const firebasedatabase = {
    'baseURL': 'https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app',
    'patchUsers': '/users.json',
    'patchTastks': '', // Leerer String, muss ggf. angepasst werden
    'patchContacts': '' // Leerer String, muss ggf. angepasst werden
};

// Speichert die firebasedatabase-Konfiguration im localStorage
localStorage.setItem('firebasedatabase', JSON.stringify(firebasedatabase));