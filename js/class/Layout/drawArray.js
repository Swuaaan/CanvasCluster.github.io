import polygon from '../shape/polygon.js';
import canvas from '../controller/canvas.js';
import icon from '../shape/icon.js';
import settings from '../../../settings.json' assert {type: 'json'};

/**
 * DrawArray.js
 * 
 * Inhaltsverzeichnis
 * 	1. Imports
 * 	2. Draw Array
 * 
 */


/* ================================================== */
/* 1. Imports */
/* -------------------------------------------------- */
// import polygon from './shape/polygon.js';
// import canvas from './controller/canvas.js';
// import icon from './shape/icon.js';
// import drawArray from './Layout/drawArray.js';

// Beispiel: Erstelle ein Canvas-Manager und ein Polygon mit 6 Ecken und einem Copyright-Symbol
const	controller		= new canvas('myCanvas', settings.backcolore);

const   positionArray = [],     // Array zum Speichern der x- und y-Koordinaten jeder Position
		clustermid = [];        // Array zum Speichern der x- und y-Koordinaten jeder Position

/* ================================================== */
/* 2. Draw Array */
/* -------------------------------------------------- */
export default class Array {

    constructor(
		tiltAngle, 
        rowSpace, 
        colSpace
	) {
		// #==== Variables ====#
		this.tiltAngle		= tiltAngle;
		this.rowSpace		= rowSpace;
		this.colSpace		= colSpace;

		// #==== Functions ====#
        this.createArray();
        this.drawArray();
		
	}

	// #=#=#=#=#=#  #=#=#=#=#=#
	createArray () {
        let columeSpace = ((this.colSpace + 5) / 2) * canvas.factor,
            rowSpaceing = this.rowSpace * canvas.factor;
    
        const	rows = Math.floor(((window.innerHeight / 100) * 125) / rowSpaceing),
                columns = Math.floor(((window.innerWidth / 100) * 125) / columeSpace);
    
        for (let row = -100; row <= rows; row++) {
            for (let col = -100; col <= columns; col++) {
                const angle = this.tiltAngle * (Math.PI / 180);
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

    drawArray () {

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
                            let symbolIcon = new icon(randomSymbol, 0, settings.backcolore, 20);     
                            
                            new polygon(controller, symbolIcon, 6, item.x, item.y, 20, fillColor, 29); 
                        }
                    } 
    
                    item.generat = true;
    
                }
            }
        }
    }    
}