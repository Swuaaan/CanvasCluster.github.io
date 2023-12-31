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



export default class weightedSelectioninit {

	static lastposition = {};
	static lastindex = 0;

	constructor(targetarray) {	
		
		this.targetarray = targetarray;

		// #==== Functions ====#
		this.#weightedSelectionInit(); 
		// console.log("test");     

	}

	#weightedSelectionInit () {        

		for (let i = 0; i < this.targetarray.length; i++) {
			weightedSelectioninit.lastposition[i] = [];
			// console.log(weightedSelectioninit.lastposition[i]);
		}
	}

	weightedSelection (x, y, position) {    		
		if (weightedSelectioninit.lastposition[position].length == 0) return this.#savePosition(x, y, position);

		for (let i = 0; i < weightedSelectioninit.lastposition[position].length; i++) {
			
			// Berechnung des Abstands vom angegebenen Punkt
			const distance = +((Math.sqrt((x - weightedSelectioninit.lastposition[position][i].x) ** 2 + (y - weightedSelectioninit.lastposition[position][i].y) ** 2)).toFixed(1));
			console.log(distance);
			if (distance >= 100) {
				return this.#savePosition(x, y, position);
			}
		} 
		
		return false;		
	}

	#savePosition (x, y, position) {
		weightedSelectioninit.lastposition[position].unshift({
			x: x,
			y: y
		});  
		return true;
	}

	generateindex () {
		let coloreindex = Math.floor(Math.random() * settings.colors.length);
		if (this.lastindex == coloreindex) {
			this.generateindex();
		}	

		return coloreindex;
	}
}