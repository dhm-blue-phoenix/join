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