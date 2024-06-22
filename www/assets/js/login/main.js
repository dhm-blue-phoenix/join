// login/main.js

const baseURL = 'https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app';
const patchUsers = '/users';

const CLASS_Signup = document.querySelector(".signup");
let userData;

/**
 * Initialisiert die Anwendung durch Abrufen der Benutzerdaten.
 */
function init() {
  retrieveUserData(patchUsers);
}

/**
 * Ruft die Benutzerdaten von einem bestimmten Endpunkt ab.
 * @param {string} patch - Der Endpunkt, von dem die Benutzerdaten abgerufen werden sollen.
 */
async function retrieveUserData(patch) {
  try {
    const response = await fetch(baseURL + patch + '.json');
    userData = await response.json();
  } catch (err) {
    console.error(err);
  }
}

/**
 * Setzt die Signup-Klasse auf aktiv, indem eine CSS-Klasse hinzugefügt wird.
 */
function setSignupToActive() {
  CLASS_Signup.classList.add("activSignup");
}

/**
 * Entfernt die aktive Klasse vom Signup-Element.
 */
function removeActiveFromSignup() {
  CLASS_Signup.classList.remove("activSignup");
}

/**
 * Überprüft die Eingabefelder des Login-Formulars anhand der gespeicherten Benutzerdaten.
 */
function CheckInputOfLoginForm() {
  const ID_Email = document.getElementById('userEmail');
  const ID_UserPassword = document.getElementById('userPassword');
  let checkLogin;
  checkLogin = checkUserData(ID_Email.value, ID_UserPassword.value);
  if (!checkLogin) {
    loginDataIsNotCorrect('loginPasswordContainer', 'loginWarning');
  }
}

/**
 * Überprüft, ob die angegebene E-Mail und das Passwort mit den gespeicherten Benutzerdaten übereinstimmen.
 * @param {string} email - Die E-Mail, die im Login-Formular eingegeben wurde.
 * @param {string} passw - Das Passwort, das im Login-Formular eingegeben wurde.
 * @returns {boolean} Gibt true zurück, wenn die Anmeldeinformationen korrekt sind, andernfalls false.
 */
function checkUserData(email, passw) {
  for (let i = 0; i < userData.length; i++) {
    if (email === userData[i].user.email && passw === userData[i].user.password) {
      window.alert('Super dein Login stimmt!'); // Dort muss noch die Weiterleitung zu task seite hin!
      return true;
    }
  }
  return false;
}

/**
 * Behandelt die UI-Rückmeldung, wenn die Login-Daten inkorrekt sind.
 * @param {string} passwContain - Die ID des Passwort-Container-Elements.
 * @param {string} warn - Die ID des Warnungs-Elements.
 */
function loginDataIsNotCorrect(passwContain, warn) {
  const passwordContainer = document.getElementById(`${passwContain}`);
  const warning = document.getElementById(`${warn}`);
  passwordContainer.style.borderColor = 'brown';
  warning.style.opacity = 1;
}

/**
 * Sammelt die Formulardaten zur Erstellung eines neuen Benutzers.
 */
function formToCreateAnewUser() {
  const userName = document.getElementById('inputName');
  const userEmail = document.getElementById('inputEmail');
  const userPassw = document.getElementById('inputPassword');
  const userConfirmPassw = document.getElementById('inputConfirmPassword');
  createNewUser(userName.value, userEmail.value, userPassw.value, userConfirmPassw.value);
}

// Noch nicht Fertig
/**
 * Erstellt einen neuen Benutzer, wenn die Passwortbestätigung erfolgreich ist.
 * @param {string} name - Der Name des neuen Benutzers.
 * @param {string} email - Die E-Mail des neuen Benutzers.
 * @param {string} passw - Das Passwort des neuen Benutzers.
 * @param {string} confirmPassw - Das bestätigte Passwort des neuen Benutzers.
 */
async function createNewUser(name, email, passw, confirmPassw) {
  let checkPassw = checkTheNewPassword(passw, confirmPassw);
  checkPassw ? await newUser(name, email, passw) : loginDataIsNotCorrect('signupPasswordContainer', 'signupLoginWarning');
}

/**
 * Registriert einen neuen Benutzer durch Senden eines PATCH-Anforderung an den Server.
 * @param {string} name - Der Name des neuen Benutzers.
 * @param {string} email - Die E-Mail des neuen Benutzers.
 * @param {string} passw - Das Passwort des neuen Benutzers.
 */
async function newUser(name, email, passw) {
  const successfulRegistration = document.querySelector('.successfulRegistration');
  const response = await fetch(baseURL + '/users' + '.json', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'user': {
        'name': name,
        'email': email,
        'password': passw
      }
    })
  });
  successfulRegistration.classList.add('activSuccessfulRegistration');
  retrieveUserData(patchUsers);
}

/**
 * Überprüft, ob das angegebene Passwort und die Bestätigung übereinstimmen.
 * @param {string} passw - Das Passwort, das im Signup-Formular eingegeben wurde.
 * @param {string} confirmPassw - Das bestätigte Passwort, das im Signup-Formular eingegeben wurde.
 * @returns {boolean} Gibt true zurück, wenn die Passwörter übereinstimmen, andernfalls false.
 */
function checkTheNewPassword(passw, confirmPassw) {
  return passw === confirmPassw ? true : false;
}