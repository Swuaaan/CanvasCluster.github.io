/**
 * MAIN JS
 * 
 * Inhaltsverzeichnis
 * 	1. Imports
 * 
 */


/* ================================================== */
/* 1. Imports */
/* -------------------------------------------------- */
import settings from '../settings.json' assert {type: 'json'};
import Array from './class/Layout/drawArray.js';

new Array(settings.rotation, settings.rowspaching, settings.columspaching);

// const   	positionArray = [],     // Array zum Speichern der x- und y-Koordinaten jeder Position
// 			clustermid = [];        // Array zum Speichern der x- und y-Koordinaten jeder Position

// Funktion, die aufgerufen wird, wenn die Fenstergröße geändert wird
function handleResize() {
	// Hier können Sie den Code platzieren, den Sie ausführen möchten, wenn die Größe geändert wird
	location.reload(); // Das lädt die Seite neu
}

// setInterval, um die Funktion alle 10 Sekunden aufzurufen
// setInterval(handleResize, 1000); // 1000 Millisekunden entsprechen 10 Sekunden

// Ereignislistener für das "resize"-Ereignis hinzufügen
window.addEventListener('resize', handleResize);

