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

import polygon  from '../shape/polygon.js';
import canvas   from '../controller/canvas.js';
import icon     from '../shape/icon.js';
import settings from '../../../settings.json' assert {type: 'json'};
import paths     from '../../../font-awesome/icons.json' assert {type: 'json'};


const	controller		= new canvas('myCanvas', settings.backcolore),
        positionArray   = [],     
		clustermid      = [];      

/* ================================================== */
/* 2. Draw Array */
/* -------------------------------------------------- */
export default class Array {

    	// #==== Uninitialized ====#
	/** @type	{number} */
	tiltAngle;
	/** @type	{number} */
	rowSpace;
	/** @type	{number} */
	colSpace;

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
        this.#createArray();
        this.#drawArray();

	}
	
    // #=#=#=#=#=# Create Array #=#=#=#=#=#
	/**
	 * @private
	 */
	#createArray () {
        let     columeSpace = ((this.colSpace + 5) / 2) * canvas.factor,
                rowSpaceing = this.rowSpace * canvas.factor;
    
        const	rows        = Math.floor(((canvas.windowwidth / 100) * 125) / rowSpaceing),
                columns     = Math.floor(((canvas.windowwidth / 100) * 125) / columeSpace);
    
        for (let row = -100; row <= rows; row++) {
            for (let col = -100; col <= columns; col++) {
                const angle = this.tiltAngle * (Math.PI / 180),
                      x = col * columeSpace + (row * columeSpace),
                      y = row * rowSpaceing;
    
                const polygonX = x + Math.cos(angle) * columeSpace * col,
                      polygonY = y + Math.sin(angle) * columeSpace * col;
    
                positionArray.push({
                    x: polygonX,
                    y: polygonY
                })
    
                if (Math.random() < settings.clusterchance) {
                    clustermid.push({
                        x: polygonX,
                        y: polygonY,
                        generat: false
                    })
                }
            }
        }
    }

    // #=#=#=#=#=# Draw Array #=#=#=#=#=#
	/**
	 * @private
	 */
    #drawArray () {

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

                // let randomSymbol = settings.svgs[Math.floor(Math.random() * settings.svgs.length)];
                // let randomSymbol = paths.fire.svg.solid;
                let randomSymbol = this.#choosePath(settings.icons[Math.floor(Math.random() * settings.icons.length)]);       
                
                // console.log(randomSymbol);
                
                if ((distance < settings.clusterSize || distance < settings.fadeSize) && (item.generat !== true)) {
                    if (Math.random() > settings.noFillChanceColore) {
                        if (Math.random() > settings.noFillChanceGra) {
                            let symbolIcon = new icon(randomSymbol, settings.iconcolore, alpha, settings.iconsize, settings.iconrotaion);
                            
                            new polygon(
                                controller, 
                                symbolIcon, 
                                6, 
                                item.x, 
                                item.y, 
                                settings.polygonsize, 
                                settings.fadecolore, 
                                settings.polygonrotaion, 
                                alpha
                            );                                     
                        }
                    }
            
                    else {
                        if (distance < settings.clusterSize) {
                            let fillColor = settings.colors[Math.floor(Math.random() * settings.colors.length)];

                            let symbolIcon = new icon(randomSymbol, settings.iconcolore, 1, settings.iconsize, settings.iconrotaion);   
                            
                            new polygon(
                                controller, 
                                symbolIcon, 
                                6,
                                item.x, 
                                item.y, 
                                settings.polygonsize, 
                                fillColor, 
                                settings.polygonrotaion
                            ); 
                        }
                    } 
    
                    item.generat = true;
    
                }
            }
        }
    } 
    
    #choosePath (icon) {
        return paths[icon].svg.solid || paths[icon].svg.brands;
    }

}