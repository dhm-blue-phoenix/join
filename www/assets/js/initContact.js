import { displayContactCards } from './module/displayContactCards.js';

/**
 * Initialisiert die Kontaktkartenanzeige nach dem Laden des DOM-Inhalts.
 * ====================================================================================================
 * Diese Funktion wird ausgeführt, sobald der gesamte DOM-Inhalt geladen und analysiert wurde.
 * Sie ruft die Funktion `displayContactCards` auf, um die Kontaktkarten im Benutzerinterface darzustellen.
 * Die Funktion sorgt dafür, dass alle notwendigen Daten geladen und die Kontaktkarten korrekt gerendert werden,
 * bevor der Benutzer mit ihnen interagieren kann.
 * ====================================================================================================
 * func displayContactCards() - findet man in der './module/displayContactCards.js'
 * ====================================================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    displayContactCards();
});