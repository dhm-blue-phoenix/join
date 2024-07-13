// globleVar.js

const firebasedatabase = {
    'baseURL': 'https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app',
    'patchUsers': '/users.json',
    'patchTastks': '',
    'patchContacts': ''
}

localStorage.setItem('firebasedatabase', JSON.stringify(firebasedatabase));