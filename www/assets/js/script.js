// script.js

// Asynchrone Funktion zum Einbinden von HTML-Inhalten
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

const CLASS_Signup = document.querySelector('.signup');
function setSignupToActive() {
    CLASS_Signup.classList.add('activSignup');
}

function removeActiveFromSignup() {
    CLASS_Signup.classList.remove('activSignup');
}