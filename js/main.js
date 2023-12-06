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
import polygon from '../js/class/shape/polygon.js';
import canvas from '../js/class/controller/canvas.js';
import icon from '../js/class/shape/icon.js';
import settings from '../settings.json' assert {type: 'json'};

// Beispiel: Erstelle ein Canvas-Manager und ein Polygon mit 6 Ecken und einem Copyright-Symbol
const	controller		= new canvas('myCanvas', 'hsl(0, 0.00%, 23.10%)');


/* ================================================== */
/* 2. Colors */
/* -------------------------------------------------- */
const monokaiColors = [
	'hsl(39, 70%, 55%)', // Monokai Yellow
	'hsl(198, 100%, 47%)', // Monokai Blue
	'hsl(154, 56%, 52%)', // Monokai Green
	'hsl(345, 100%, 50%)', // Monokai Pink
	'hsl(14, 100%, 58%)', // Monokai Orange
	'hsl(204, 86%, 53%)', // Monokai Cyan
	'hsl(16, 72%, 51%)', // Monokai Red
	'hsl(209, 56%, 63%)', // Monokai Purple
];


/* ================================================== */
/* 3. Symbols */
/* -------------------------------------------------- */
const fontAwesomeSymbols = [
	'\uf2b9',
	'\uf1f8',
	'\uf0c8',
	'\uf17d',
	'\uf06e',
	'\uf135',
	'\uf219',
	'\uf2dc',
	'\uf11b',
	'\uf1c0',
  ];

const   positionArray = [],     // Array zum Speichern der x- und y-Koordinaten jeder Position
		clustermid = [];        // Array zum Speichern der x- und y-Koordinaten jeder Position

// Funktion, die aufgerufen wird, wenn die Fenstergröße geändert wird
function handleResize() {
	// Hier können Sie den Code platzieren, den Sie ausführen möchten, wenn die Größe geändert wird
	location.reload(); // Das lädt die Seite neu
}

// setInterval, um die Funktion alle 10 Sekunden aufzurufen
// setInterval(handleResize, 1000); // 1000 Millisekunden entsprechen 10 Sekunden

// Ereignislistener für das "resize"-Ereignis hinzufügen
window.addEventListener('resize', handleResize);

createArray(settings.rotation, settings.rowspaching, settings.columspaching ); 
drawArray();

function createArray (tiltAngle, rowSpace, colSpace) {
	let columeSpace = ((colSpace + 5) / 2) * canvas.factor,
		rowSpaceing = rowSpace * canvas.factor;

	const	rows = Math.floor(((window.innerHeight / 100) * 125) / rowSpaceing),
			columns = Math.floor(((window.innerWidth / 100) * 125) / columeSpace);

	for (let row = -100; row <= rows; row++) {
		for (let col = -100; col <= columns; col++) {
			const angle = tiltAngle * (Math.PI / 180);
			const x = col * columeSpace + (row * columeSpace);
			const y = row * rowSpaceing;

			const polygonX = x + Math.cos(angle) * columeSpace * col;
			const polygonY = y + Math.sin(angle) * columeSpace * col;

			positionArray.push({
				x: polygonX,
				y: polygonY
			})

			const cluster = 0.019; // Zum Beispiel 20% Chance, dass kein Fill stattfindet

			if (Math.random() < cluster) {
				clustermid.push({
					x: polygonX,
					y: polygonY,
					generat: false
				})
			}
		}
	}
}



function drawArray () {

	while(clustermid.length > 0) {
		let cluster = clustermid.shift();

		for(const index in positionArray) {
			const item = positionArray[index];
	
			// Berechnung des Abstands vom angegebenen Punkt
			const distance = Math.sqrt((item.x - cluster.x) ** 2 + (item.y - cluster.y) ** 2);

			// Berechnung des Fade-Offsets, indem fadeDistance vom Abstand subtrahiert wird
			const fadeOffset = Math.max(0, distance - settings.fadeoffset);

			// Setzen der Transparenz basierend auf dem Abstand und Fade-Offset
			let alpha = 1 - fadeOffset / settings.fadeSize; // Ändere den Divisor nach Bedarf

			// Begrenze den Alpha-Wert im Bereich [0, 1]
			alpha = Math.max(0, Math.min(1, alpha));
	
			let randomSymbol = settings.symbols[Math.floor(Math.random() * settings.symbols.length)];
			
			if ((distance < settings.clusterSize || distance < settings.fadeSize) && (item.generat !== true)) {
				if (Math.random() > settings.noFillChanceColore) {
					if (Math.random() > settings.noFillChanceGra) {
						let fillColor = `rgba(78, 78, 78, ${alpha})`; // Blau mit variabler Transparenz
						let symbolIcon = new icon(randomSymbol, 0, `hsla(0, 0.00%, 23.10%, ${alpha})`, 20);
						
						new polygon(controller, symbolIcon, 6, item.x, item.y, 20, fillColor, 29);
					}
				}
		
				else {
					if (distance < settings.clusterSize) {
						let fillColor = settings.colors[Math.floor(Math.random() * settings.colors.length)];
						let symbolIcon = new icon(randomSymbol, 0, `hsl(0, 0.00%, 23.10%)`, 20);     
						
						new polygon(controller, symbolIcon, 6, item.x, item.y, 20, fillColor, 29); 
					}
				} 

				item.generat = true;

			}
		}
	}
}
