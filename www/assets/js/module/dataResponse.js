const baseURL = "https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app/";


/**
 * Retrieves data from Firebase database based on provided path.
 * @param {string} path - Path to retrieve data from.
 * @returns {Promise<Array>} - Resolves with array of retrieved data values.
 */
export async function retrievingData(path) {
    try {

        console.log('%c' + '[DEBUG-1-retrievingData]', 'color: #0ef4e9;', path)

        const response = await fetch(baseURL + path + '.json');
        await checkAnswer(response);
        const data = await response.json();

        console.log('%c' + '[DEBUG-2-retrievingData]', 'color: #0ef4e9;', path, 'data:', Object.values(data))

        if(data) {
            return Object.values(data);
        }

        return []
    } catch (err) {
        handleError(err);
    };
};


/**
 * Deletes data from Firebase database based on provided path.
 * @param {string} path - Path to delete data from.
 */
export async function deleteData(path) {
    try {
        const deleteResponse = await fetch(baseURL + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await checkAnswer(deleteResponse);
    } catch (err) {
        handleError(err);
    };
};


/**
 * Updates data in Firebase database at the provided path.
 * @param {string} path - Path to update data.
 * @param {Object} data - Data object to update.
 */
export async function updateData(path, data) {
    try {
        const updateResponse = await fetch(baseURL + path + '.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        await checkAnswer(updateResponse);
    } catch (err) {
        handleError(err);
    };
};


/**
 * Uploads data to Firebase database at the provided path.
 * @param {string} path - Path to upload data to.
 * @param {Object} data - Data object to upload.
 */
export async function uploadPatchData(path, data) {
    try {        
        const patchResponse = await fetch(baseURL + path + '.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        await checkAnswer(patchResponse);
    } catch (err) {
        handleError(err);
    };
};


/**
 * Checks the HTTP response and throws an error if it's not ok.
 * @param {Response} response - HTTP response object.
 * @throws {Error} - Throws an error if response status is not ok.
 */
async function checkAnswer(response) {
    if (!response.ok) {
        throw new Error(`[HTTP] Status: ${response.status} - ${response.statusText}`);
    };
};


/**
 * Handles errors by throwing them.
 * @param {Error} err - Error object to handle.
 * @throws {Error} - Throws the received error.
 */
function handleError(err) {
    throw err;
};