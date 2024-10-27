document.addEventListener('DOMContentLoaded', function() {
  showGreeting();
  init();
});

function init() {
  // Leere den Inhalt der DIV-Container
  document.getElementById('countTasksinToDo').innerHTML = '';
  document.getElementById('countTasksinDone').innerHTML = '';
  document.getElementById('countTasksinBoard').innerHTML = '';
  document.getElementById('countTasksinProgress').innerHTML = '';
  document.getElementById('countTasksinAwait').innerHTML = '';

  // Fülle die Container mit einer 1
  document.getElementById('countTasksinToDo').innerHTML = '<h2>1</h2> To-do';
  document.getElementById('countTasksinDone').innerHTML = '<h2>1</h2> Done';
  document.getElementById('countTasksinBoard').innerHTML = '<h2>1</h2> Tasks in Board';
  document.getElementById('countTasksinProgress').innerHTML = '<h2>12</h2> Tasks In Progress';
  document.getElementById('countTasksinAwait').innerHTML = '<h2>1</h2> Awaiting Feedback';
}

/**
* Aktualisiert den Textinhalt des Elements mit der ID "massage",
* um einen Gruß basierend auf der aktuellen Tageszeit anzuzeigen.
*
* Diese Funktion überprüft die aktuelle Stunde und setzt den Gruß
* auf "Guten Morgen," für Stunden zwischen 0 und 11, "Guten Tag,"
* für Stunden zwischen 12 und 17 und "Guten Abend," für Stunden
* zwischen 18 und 23.
*/
function showGreeting() {
  const currentHour = new Date().getHours();
  const massage = document.getElementById("massage");

  if (currentHour >= 0 && currentHour < 12) {
    massage.textContent = "Good morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    massage.textContent = "Good afternoon,";
  } else {
    massage.textContent = "Good evening,";
  }
}

