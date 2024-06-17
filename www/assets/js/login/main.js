// login/main.js

const baseURL = 'https://join-393a6-default-rtdb.europe-west1.firebasedatabase.app';

const CLASS_Signup = document.querySelector(".signup");

let userData;


function init() {
  retrieveUserData('/users');
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
    loginDataIsNotCorrect();
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

function loginDataIsNotCorrect() {
  const inputContainers = document.querySelectorAll('.input-container');
  inputContainers.forEach(function(container) {
    container.style.borderColor = 'brown';
  });
}