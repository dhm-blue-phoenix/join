// script.js

/**
 * Lädt den Inhalt von HTML-Dateien in Elemente, die das Attribut 'w3-include-html' enthalten.
 * Die Funktion durchläuft alle Elemente mit dem Attribut 'w3-include-html' und ersetzt deren
 * inneres HTML durch den Inhalt der geladenen Datei. Wenn die Datei nicht gefunden wird,
 * wird der Inhalt des Elements auf "Page not found" gesetzt.
 * 
 * @async
 * @function includeHTML
 * @returns {Promise<void>} Ein Promise, das keinen Wert zurückgibt.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Navigates the browser back to the previous page in history.
 * -----------------------------------------------------------
 */
function actionBack() {
  window.history.back();
}

/**
 * Fügt die Klasse 'd-nonepopup' zum Element mit der angegebenen ID hinzu.
 * -----------------------------------------------------------------------
 * @param {string} id - Die ID des HTML-Elements, zu dem die Klasse hinzugefügt werden soll.
 */
function addClass(id) {
  document.getElementById(id).classList.add('d-nonepopup');
}

/**
 * Entfernt die Klasse 'd-nonepopup' vom Element mit der angegebenen ID.
 * ---------------------------------------------------------------------
 * @param {string} id - Die ID des HTML-Elements, von dem die Klasse entfernt werden soll.
 */
function removeClass(id) {
  document.getElementById(id).classList.remove('d-nonepopup');
}

// Öffnet und schließt das Popup-Window:
// function addtaskpopup() {
//   document.getElementById("addtaskpopup").classList.remove('d-nonepopup');
// }
// function closeaddtaskpopup(){
//   document.getElementById('addtaskpopup').classList.add('d-nonepopup');
// }

// function taskCardpopup() {
//   document.getElementById("taskCardpopup").classList.remove('d-nonepopup');
// }
// function closetaskCardpopup(){
//   document.getElementById('taskCardpopup').classList.add('d-nonepopup');
// }

// function editcontactpopup() {
//   document.getElementById("editcontactpopup").classList.remove('d-nonepopup');
// }
// function closeeditcontactpopup(){
//   document.getElementById('editcontactpopup').classList.add('d-nonepopup');
// }

document.addEventListener('DOMContentLoaded', (event) => {
  const accountContainer = document.getElementById('account');
  const dropdownContent = document.getElementById('dropdownContent');

  accountContainer.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
  });

  // Schließe das Dropdown-Menü, wenn irgendwo außerhalb geklickt wird
  window.addEventListener('click', (event) => {
    if (!event.target.matches('.account-container')) {
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
      }
    }
  });
});
