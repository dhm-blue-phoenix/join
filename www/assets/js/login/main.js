// login/main.js

const baseURL = 'https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app';
const patchUsers = '/users';

const CLASS_Signup = document.querySelector(".signup");
let userData;

function init() {
  retrieveUserData(patchUsers);
}

async function retrieveUserData(patch) {
  try {
    const response = await fetch(baseURL + patch + '.json');
    userData = await response.json();
  } catch (err) {
    console.error(err);
  }
}


function setSignupToActive() {
  CLASS_Signup.classList.add("activSignup");
}

function removeActiveFromSignup() {
  CLASS_Signup.classList.remove("activSignup");
}


function CheckInputOfLoginForm() {
  const ID_Email = document.getElementById('userEmail');
  const ID_UserPassword = document.getElementById('userPassword');
  let checkLogin;
  checkLogin = checkUserData(ID_Email.value, ID_UserPassword.value);
  if (!checkLogin) {
    loginDataIsNotCorrect('loginPasswordContainer', 'loginWarning');
  }
}

function checkUserData(email, passw) {
  for (let i = 0; i < userData.length; i++) {
    if (email === userData[i].user.email && passw === userData[i].user.password) {
      window.alert('Super dein Login stimmt!'); // Dort muss noch die Weiterleitung zu task seite hin!
      return true;
    }
  }
  return false;
}

function loginDataIsNotCorrect(passwContain, warn) {
  const passwordContainer = document.getElementById(`${passwContain}`);
  const warning = document.getElementById(`${warn}`);
  passwordContainer.style.borderColor = 'brown';
  warning.style.opacity = 1;
}


function formToCreateAnewUser() {
  const userName = document.getElementById('inputName');
  const userEmail = document.getElementById('inputEmail');
  const userPassw = document.getElementById('inputPassword');
  const userConfirmPassw = document.getElementById('inputConfirmPassword');
  createNewUser(userName.value, userEmail.value, userPassw.value, userConfirmPassw.value);
}

// Noch nicht Fertig
async function createNewUser(name, email, passw, confirmPassw) {
  let checkPassw = checkTheNewPassword(passw, confirmPassw);
  checkPassw ? await newUser(name, email, passw) : loginDataIsNotCorrect('signupPasswordContainer', 'signupLoginWarning');
}

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

function checkTheNewPassword(passw, confirmPassw) {
  return passw === confirmPassw ? true : false;
}