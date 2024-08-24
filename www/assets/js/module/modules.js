import { retrievingData, deleteData } from './dataResponse.js';

const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

/**
 * Überprüft, ob ein Benutzer bereits in der Datenbank existiert.
 * ====================================================================================================
 * Diese Funktion ruft die Benutzerdaten aus der Datenbank ab und sucht nach einem 
 * Benutzer, der mit den übergebenen Daten übereinstimmt.
 * ====================================================================================================
 * @async
 * @param {Object} find Ein Objekt mit den Benutzerdaten, nach denen gesucht werden soll.
 * @returns {Object} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 * ====================================================================================================
 */
export async function loadUserData(find) {
    try {
        const users = await retrievingData('');
        const user = await findUser(users[0], find);
        return user;
    } catch (err) { };
};

/**
 * Sucht nach einem Benutzer in der Liste der Benutzer.
 * ====================================================================================================
 * Diese Funktion durchsucht die Liste der Benutzer nach einem Benutzer, der mit den 
 * übergebenen Daten übereinstimmt.
 * ====================================================================================================
 * @async
 * @param {Array} users Die Liste der Benutzer.
 * @param {Object} find Ein Objekt mit den Benutzerdaten, nach denen gesucht werden soll.
 * @returns {Object} Der gefundene Benutzer oder undefined, wenn kein Benutzer gefunden wurde.
 * ====================================================================================================
 */
async function findUser(users, find) {
    return Object.entries(users).find(([id, user]) => user.email === find.email && user.password === find.pw);
};

/**
 * Holt die Benutzerdaten eines bestimmten Benutzers aus der Firebase Realtime Database.
 * ====================================================================================================
 * Diese Funktion ruft die Benutzerdaten eines bestimmten Benutzers aus der Datenbank ab.
 * ====================================================================================================
 * @async 
 * @param {String} uid Die eindeutige Benutzer-ID.
 * @returns {Object} Die Benutzerdaten des bestimmten Benutzers.
 * ====================================================================================================
 */
export async function findUserById(uid) {
    return await retrievingData('users/' + uid);
};

/**
 * Lädt die Benutzer-ID aus dem lokalen Speicher oder der Session.
 * ====================================================================================================
 * Diese Funktion versucht, die Benutzer-ID zuerst aus dem lokalen Speicher (`localStorage`) und 
 * anschließend aus der Session (`sessionStorage`) zu laden. Wenn keine Benutzer-ID gefunden wird, 
 * wird ein Fehler ausgelöst.
 * ====================================================================================================
 * @returns {string} Die Benutzer-ID, wenn sie im lokalen Speicher oder in der Session gefunden wurde.
 * @throws {Error} Wenn keine Benutzer-ID gefunden wird.
 * ====================================================================================================
 */
export function loadUserIdFromStored() {
    if (storedLocalUserID) return storedLocalUserID;
    if (storedSessionUserID) return storedSessionUserID;
    throw new Error('User ID wurde nicht gefunden!');
};

/**
 * Lädt die Kontakt-ID basierend auf der E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion ruft die Kontakt-ID für den angegebenen Benutzer ab, indem sie die E-Mail-Adresse nutzt.
 * ====================================================================================================
 * func loadContactsId() - findet man in der './dataResponse.js'
 * ====================================================================================================
 * @async
 * @param {string} userID Die ID des Benutzers, zu dem der Kontakt gehört.
 * @param {string} email Die E-Mail-Adresse des Kontakts.
 * @returns {Promise<string>} Die ID des Kontakts.
 * @throws {Error} Wenn ein Fehler beim Laden der Kontakt-ID auftritt.
 * ====================================================================================================
 */
export async function getContactId(userID, email, category) {
    return await loadElementById(`users/${userID}/`, email, category);
};

/**
 * Extrahiert die Initialen aus einem Benutzernamen.
 * ====================================================================================================
 * Diese Funktion teilt den Benutzernamen in einzelne Namensteile auf, extrahiert den
 * ersten Buchstaben jedes Namens und gibt diese als Initialen zurück.
 * ====================================================================================================
 * @param {String} username Der Benutzername.
 * @returns {String} Die Initialen des Benutzers.
 * ====================================================================================================
 */
export function extractInitials(username) {
    return username.split(' ').map(namePart => namePart[0]).join('').toUpperCase();
};

/**
 * Lädt Elemente basierend auf dem angegebenen Pfad.
 * ====================================================================================================
 * Diese Funktion ruft die Daten von einem angegebenen Pfad ab und extrahiert die Kontaktkarten
 * aus den Daten. Die Kontaktkarten werden als Array zurückgegeben.
 * ====================================================================================================
 * func retrievingData() - findet man in der './dataResponse.js'
 * ====================================================================================================
 * @async
 * @param {string} patch Der Pfad, von dem die Daten abgerufen werden sollen.
 * @returns {Promise<Array>} Ein Promise, das ein Array von Kontaktkarten zurückgibt.
 * @throws {Error} Wenn ein Fehler beim Abrufen der Daten auftritt.
 * ====================================================================================================
 */
export async function loadElementByPatch(patch, value) {
    const DATA = await retrievingData(patch);   
    const CARTS = Object.values(DATA[value]);
    return CARTS;
};

// FUNC BESCHREIBUNG...
export async function loadElementById(patch, type, category) {
    if(category === 'taskCard') {
        const DATA = await retrievingData(patch);
        const TASK_ID = await findTaskById(DATA[4], type);
        return TASK_ID;      
    }
    if(category === 'contactCard') {
        const DATA = await retrievingData(patch);
        const CONTACT_ID = await findContactById(DATA[0], type);
        return CONTACT_ID;
    }
};

// FUNC BESCHREIBUNG...
async function findTaskById(tasks, findId) {    
    return Object.entries(tasks).find(([id, task]) => task.id === findId);
};

/**
 * Sucht ein Element in den Kontakten basierend auf der E-Mail-Adresse.
 * ====================================================================================================
 * Diese Funktion durchsucht die Kontakte und gibt das erste Element zurück, dessen E-Mail-Adresse
 * mit der angegebenen übereinstimmt.
 * ====================================================================================================
 * @param {Object} contacts Ein Objekt, das die zu durchsuchenden Kontakte enthält.
 * @param {string} findEmail Die E-Mail-Adresse, die gesucht wird.
 * @returns {[string, Object]} Ein Array mit der Kontakt-ID und dem Kontakt-Objekt.
 * @throws {Error} Wenn ein Fehler beim Suchen des Kontakts auftritt.
 * ====================================================================================================
 */
async function findContactById(contacts, findEmail) {
    return Object.entries(contacts).find(([id, contact]) => contact.email === findEmail);
};

/**
 * Löscht ein Element basierend auf dem angegebenen Pfad.
 * ====================================================================================================
 * Diese Funktion löscht Daten von einem angegebenen Pfad und gibt eine Konsolennachricht aus,
 * um die Aktion zu bestätigen.
 * ====================================================================================================
 * func deleteData() - findet man in der './dataResponse.js'
 * ====================================================================================================
 * @async
 * @param {string} patch Der Pfad, von dem die Daten gelöscht werden sollen.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Daten erfolgreich gelöscht wurden.
 * @throws {Error} Wenn ein Fehler beim Löschen der Daten auftritt.
 * ====================================================================================================
 */
export async function deletElementById(patch) {
    await deleteData(patch);
};