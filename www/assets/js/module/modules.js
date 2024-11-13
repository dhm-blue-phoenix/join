import { retrievingData, deleteData } from './dataResponse.js';


const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');


/**
 * Retrieves user data based on provided search criteria.
 * @param {Object} find - Object containing email and password to search for.
 * @returns {Object} - User object matching the search criteria.
 */
async function loadUserData(find) {
    try {
        const users = await retrievingData('');
        const user = await findUser(users[2], find);
        return user;
    } catch (err) {
        console.error('Error loading user data:', err);
        throw err;
    };
};


/**
 * Finds a user in the provided list based on email and password.
 * @param {Object} users - List of users to search through.
 * @param {Object} find - Object containing email and password to search for.
 * @returns {Object} - User object matching the search criteria.
 */
async function findUser(users, find) {
    let msg = '';
    const userData = Object.entries(users);
    const checkEmail = userData.find(([id, user]) => user.email === find.email);
    if(!checkEmail) {
        msg = 'Email not Fount!'
        return ['email', msg];
    };
    const checkPw = Object.entries(users).find(([id, user]) => user.email === find.email && user.password === find.pw);
    if(!checkPw) {
        msg = 'Password is incorrect!'
        return ['pw', msg];
    };
    return [checkPw, msg];
};


/**
 * Retrieves user data based on user ID.
 * @param {string} uid - User ID to retrieve data for.
 * @returns {Object} - User object associated with the provided ID.
 */
async function findUserById(uid) {
    return await retrievingData('users/' + uid);
};


/**
 * Loads the stored user ID from either localStorage or sessionStorage.
 * Redirects to index.html if neither is available.
 * @returns {string} - Stored user ID.
 */
function loadUserIdFromStored() {
    if (storedLocalUserID) return storedLocalUserID;
    if (storedSessionUserID) return storedSessionUserID;
    window.location.href = './index.html';
};


/**
 * Retrieves contact ID based on user ID, email, and category.
 * @param {string} userID - User ID to search under.
 * @param {string} email - Email of the contact to find.
 * @param {string} category - Category ('taskCard' or 'contactCard') to search under.
 * @returns {string} - Contact ID.
 */
async function getContactId(userID, email, category) {
    return await loadElementById(`users/${userID}/`, email, category);
};


/**
 * Extracts initials from a given username.
 * @param {string} username - User's full name.
 * @returns {string} - Initials extracted from the username.
 */
function extractInitials(username) {
    return username.split(' ').map(namePart => namePart[0]).join('').toUpperCase();
};


/**
 * Loads elements based on patch and value.
 * @param {string} patch - Patch to retrieve data from.
 * @param {string} value - Value to search for within the retrieved data.
 * @returns {Array} - Array of elements loaded based on the patch and value.
 */
async function loadElementByPatch(patch, value) {
    const data = await retrievingData(patch);
    const cards = Object.values(data[value]);
    return cards;
};


/**
 * Loads element by ID based on patch, type, and category.
 * @param {string} patch - Patch to retrieve data from.
 * @param {string} type - Type of element to search for.
 * @param {string} category - Category ('taskCard' or 'contactCard') to search under.
 * @returns {Object} - Element ID based on the provided parameters.
 */
async function loadElementById(patch, type, category) {
    if (category === 'taskCard') {
        const data = await retrievingData(patch);
        const taskId = await findTaskById(data[5], type);
        return taskId;
    };
    if (category === 'contactCard') {
        const data = await retrievingData('');
        const contactId = await findContactById(data[1], type);
        return contactId;
    };
};


/**
 * Finds a task by its ID.
 * @param {Object} tasks - List of tasks to search through.
 * @param {string} findId - ID of the task to find.
 * @returns {Object} - Task object matching the provided ID.
 */
async function findTaskById(tasks, findId) {
    return Object.entries(tasks).find(([id, task]) => task.id === findId);
};


/**
 * Finds a contact by its email.
 * @param {Object} contacts - List of contacts to search through.
 * @param {string} findEmail - Email of the contact to find.
 * @returns {Object} - Contact object matching the provided email.
 */
async function findContactById(contacts, findEmail) {
    return Object.entries(contacts).find(([id, contact]) => contact.email === findEmail);
};


/**
 * Deletes an element by its ID.
 * @param {string} patch - Patch to delete data from.
 */
async function deleteElementById(patch) {    
    await deleteData(patch);
};


/**
 * Reloads the current window.
 */
const reloadWindow = () => {
    window.location.reload();
};


/**
 * Loads task data and returns an array of task IDs.
 * @returns {Array} - Array of task IDs.
 */
const loadTaskData = async () => {
    const taskData = await retrievingData('board');
    const taskIds = [];
    taskData.forEach((task) => {
        if (typeof task === 'object' && task !== null) {
            if (task !== '' && task !== 'none') {
                if (!taskIds.includes(task.id)) {
                    taskIds.push(task.id);
                }
            }
        }
    });
    return taskIds;
};


export {
    loadTaskData,
    reloadWindow,
    deleteElementById,
    loadElementById,
    loadElementByPatch,
    extractInitials,
    getContactId,
    loadUserIdFromStored,
    findUserById,
    loadUserData,
};