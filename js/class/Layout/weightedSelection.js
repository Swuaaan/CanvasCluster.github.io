/**
 * DrawArray.js
 * 
 * Inhaltsverzeichnis
 * 	1. Imports
 * 	2. weightedSelectioninit
 * 		2.1 variables
 * 		2.2 constructor
 * 		2.3 weightedSelectionInit
 * 		2.4 weightedSelection
 * 		2.5 #savePosition
 * 		2.6 generateindex
 */		

/* ================================================== */
/* 1. Imports */
/* -------------------------------------------------- */

import settings from '../../../settings.json' assert {type: 'json'};

/* ================================================== */
/* 2. weightedSelectioninit */
/* -------------------------------------------------- */

export default class weightedSelectioninit {

	// #=#=#=#=#=# 2.1 variables #=#=#=#=#=#
		// #==== initalized ====#
	
	/** @type	{number} */
	static lastposition = {};

	/** @type	{number} */
	static lastindex = 0;

	/** @type	{number} */
	static watchdog = 0;

	// #=#=#=#=#=# 2.2 constructor #=#=#=#=#=#

	constructor(targetarray) {	
		
		// #==== variables ====#
		
		this.targetarray = targetarray;

		// #==== Functions ====#

		this.#weightedSelectionInit();  

	}

	// #=#=#=#=#=# 2.3 weightedSelectionInit #=#=#=#=#=#
	/**
	 * Generate the Array that save the coordinates for color or icon
	 * @returns	{number[]}
	 */

	#weightedSelectionInit () {     

		for (let i = 0; i < this.targetarray.length; i++) {
			weightedSelectioninit.lastposition[i] = [];
		}
	}

	// #=#=#=#=#=# 2.4 weightedSelection #=#=#=#=#=#
	/**
	 * Calculates the distance betwen two equel color or icon. And compares the distance to a refrenc
	 * @param {number} x coordinate x
	 * @param {number} y coordinate y
	 * @param {number} position index of the array
	 * @param {number} refrenc min distance betwen two equel color or icon
	 * @returns {boolean} if distance is larger or equel than refrenc or if ther is no other option left than return true
	 */

	weightedSelection (x, y, position, refrenc) {  
		
		if (weightedSelectioninit.lastposition[position].length == 0) return this.#savePosition(x, y, position);

		// runs throuh all saves position with that index until it finds a distance that is larger than refrenc or until all positions are tested
		for (let i = 0; i < weightedSelectioninit.lastposition[position].length; i++) {
			weightedSelectioninit.watchdog++;
			
			// calculates the distance betwen old and new position
			const distance = +(Math.hypot((x - weightedSelectioninit.lastposition[position][i].x), (y - weightedSelectioninit.lastposition[position][i].y))).toFixed(1);
			
			if (distance >= refrenc || weightedSelectioninit.watchdog > 100) {
				return this.#savePosition(x, y, position);
			}
		} 

		return false;				
	}

	// #=#=#=#=#=# 2.5 #savePosition #=#=#=#=#=#
	/**
	 * If called safes x, y, resets failcounter and return true
	 * @param {number} x coordinate x
	 * @param {number} y coordinate y
	 * @param {number} position index of the array
	 * @returns {boolean} true if called
	 */

	#savePosition (x, y, position) {
		weightedSelectioninit.lastposition[position].unshift({
			x: x,
			y: y
		});  

		weightedSelectioninit.watchdog = 0;
		
		return true;
	}

	// #=#=#=#=#=# 2.6 generateindex #=#=#=#=#=#
	/**
	 * Generate a random number as an index
	 * @returns {number} return the generated index for the colore or icin array
	 */
	generateindex (length) {
		let coloreindex = Math.floor(Math.random() * length);
		if (this.lastindex == coloreindex) {
			this.generateindex();
		}	

		return coloreindex;
	}
}