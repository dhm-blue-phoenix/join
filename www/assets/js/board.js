/**
 * Volgende dinge soll das script können!
 * =======================================================================
 * [] - Tasks ihns Bord Rendern
 * [] - Tasks Positionen Speichern
 * [] - Rendern mit letzer Position
 * =======================================================================
 * [] - Öffnen
 * [] - Schliessen
 * [] - Löschen + aktuallisieren des Task auf den Server & Neu Rendern
 * [] - Bearbeiten + aktuallisieren des Task auf den Server & Neu Rendern
 * =======================================================================
 * [] - Alle Functionen ausfürlich mach JSdoc Standart Kommentiren
 * =======================================================================
*/

import { HtmlCard } from "./module/boardCard.js";

const ID_taskToDo = document.getElementById('taskToDo');
const taskCard = {
    "assigned": "2",
    "category": "2",
    "date": "2024-08-22",
    "description": "[DESCRIPTION]",
    "prio": "urgent",
    "title": "[TITLE2]"
};


document.addEventListener('DOMContentLoaded', async () => {
    try {
        for (let i = 0; i < 1; i++) {
            ID_taskToDo.innerHTML += HtmlCard(i, taskCard.title, taskCard.description, taskCard.assigned, taskCard.date, taskCard.prio, taskCard.category);
        }
    } catch (err) {
        console.log(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
    }
});

/**
 * [!] Ist noch in Arbeit!
 * -----------------------
 * Ladet die Tasks vom Server und Rendert sie anschlissend hinein
*/
// async function initTaskBord() {
//     try {
//         ID_taskToDo.innerHTML += HtmlCard(taskCard.title, taskCard.description, taskCard.assigned, taskCard.date, taskCard.prio, taskCard.category);
//     } catch (err) {
//         console.log(`Ein schwerwiegender Fehler ist beim Rendern aufgetreten! ${err}`);
//     }
// }

