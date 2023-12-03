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


/* ================================================== */
/* 2. Draw Array */
/* -------------------------------------------------- */
export default class DrawArray {
	// #=#=#=#=#=#  #=#=#=#=#=#
	

	// #=#=#=#=#=# 2.2 Constructor #=#=#=#=#=#
    constructor(iconClass, polygonClass) {
        this.iconClass = iconClass;
        this.polygonClass = polygonClass;
        this.iconArray = [];
        this.xSpacing = 50;
        this.ySpacing = 50;
    }


	// #=#=#=#=#=# 2.3 Set horizontal Space #=#=#=#=#=#
    setXSpacing(xSpacing) {
        this.xSpacing = xSpacing;
    }


	// #=#=#=#=#=# 2.4 Set vrtical Space #=#=#=#=#=#
    setYSpacing(ySpacing) {
        this.ySpacing = ySpacing;
    }


	// #=#=#=#=#=# 2.5 Draw #=#=#=#=#=#
	/**
	 * Draws a grid of Polygons
	 * @param {Number} rows 		Row Count
	 * @param {Number} columns 		Column Count
	 */
    drawArray(rows, columns) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const x = col * this.xSpacing;
                const y = row * this.ySpacing + (col % 2 === 0 ? this.ySpacing / 2 : 0);
            }
        }
    }

    
}