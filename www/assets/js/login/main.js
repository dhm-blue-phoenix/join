// login/main.js

const CLASS_Signup = document.querySelector(".signup");
function setSignupToActive() {
  CLASS_Signup.classList.add("activSignup");
}

function removeActiveFromSignup() {
  CLASS_Signup.classList.remove("activSignup");
}