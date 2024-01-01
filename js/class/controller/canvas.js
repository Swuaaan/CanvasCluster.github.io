/**
 * controller/canvas.js
 * 
 * Inhaltsverzeichnis
 * 		1. Canvas
 * 		1.1 Variables
 * 		1.2 Constructor
 * 		1.3 Recalculate
 * 		1.4 Resize to Screen
 * 		1.5 Set Color
 * 		1.6 Clear
 * 
 */

import settings from '../../../settings.json' assert {type: 'json'};

/* ================================================== */
/* 1. Canvas */
/* -------------------------------------------------- */
export default class canvas {
	// #=#=#=#=#=# 1.1 Variables #=#=#=#=#=#
		// #==== Uninitialized ====#
	/**	@type	{Element} */
	element;
	/**	@type	{string} */
	color


		// #==== Initialized			| Static ====#
	/** @type {number} */
		static	windowwidth				= window.innerWidth;
	/** @type {number} */
		static	windowheight			= window.innerHeight;
	/** @type {number} */
		static	factor					= window.innerHeight / settings.defautheight;
	/** @type {CanvasRenderingContext2D} */
		static  context;

	
	// #=#=#=#=#=# 1.2 Constructor #=#=#=#=#=#
	constructor(
		canvasId,
		color					= '#fbff00'
	) {


		// #==== Varibales ====#
		this.element			= document.getElementById(canvasId);
		canvas.context			= this.element.getContext('2d');
		this.color 				= color;


		// #==== Functions ====#
		this.setColor(color);		// Setze Hintergrundfarbe

		this.#resizeCanvas();
		window.addEventListener('resize', () => {
			this.#recalculate();
		});
	}


	// #=#=#=#=#=# 1.3 Recalculate #=#=#=#=#=#
	/**
	 * @private
	 */
	#recalculate() {
		// this.clear();
		this.#resizeCanvas();
	}


	// #=#=#=#=#=# 1.4 Resize to Screen #=#=#=#=#=#
	#resizeCanvas() {
		this.element.width			= window.innerWidth;
		this.element.height			= window.innerHeight;
	}


	// #=#=#=#=#=# 1.5 Set Color #=#=#=#=#=#
	/**
	 * @public
	 * @param			{null|string}		color				Neuer Farbwert
	 */
	setColor(
		color			= null
	) {
		// #==== Redefine Color ====#
		if(color != null) {
			this.color		= color;
		}


		// #==== Set Color ====#
		this.element.style.setProperty('background-color', this.color);
	}


	// #=#=#=#=#=# 1.6 Clear #=#=#=#=#=#
	/**
	 * @public
	 */
	clear() {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
		this.setColor();
	}
}