// register.js

/**
 * Holt die gespeicherten Daten aus dem lokalen Speicher.
 * @type {Object|null}
 */
const storedDatabase = JSON.parse(localStorage.getItem('firebasedatabase'));
storedDatabase || console.error('Keine gespeicherten Daten gefunden!');

async function fromSignupData() {
    await addUserData();
}

async function addUserData() {
    const url = storedDatabase.baseURL + storedDatabase.patchUsers;
    let newUser = {
        'email': 'dummy@',
        'name': 'dummy dummy',
        'password': 'd'
    };
    try {
        const patchResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });

        if (!patchResponse.ok) {
            console.error('Fehler beim Hochladen der aktualisierten Benutzerdaten');
        }

        console.log('Neue Benutzerdaten erfolgreich hinzugefügt.');
    } catch (err) {
        throw new Error('Fehler beim Hochladen:', err);
    }
}