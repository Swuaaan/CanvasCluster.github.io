import canvas	from '../controller/canvas.js';
import polygon 	from './polygon.js';

/**
 * Inhaltsverzeichnis
 * 	1. Icon
 * 		1.1 Variables
 * 		1.2 Constructor
 * 		1.3 Draw Symbol
 * 		1.4 Set Size
 * 		1.5 Initiator
 */


// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text?retiredLocale=de
/* ================================================== */
/* 1. Icon */
/* -------------------------------------------------- */
export default class icon {
	// #=#=#=#=#=# 1.1 Variables #=#=#=#=#=#
		// #==== Uninitialized ====#
	/** @type		{string} */
	color;
	/**	@type		{number} */
	size;
	/**	@type		{number} */
	rotation;
	/**	@type		{string} */
	symbol;
	/**	@type		{string} */
	symfont;
	/**	@type		{polygon} */
	polygon;
	/** @type	{number} */
	transparency;

		// #==== Initialized ====#
	
	

	// #=#=#=#=#=# 1.2 Constructor #=#=#=#=#=#
	constructor(
		symbol				= null,
		color				= '#ffffff',
		transparency		= 1,
		size				= null,
		rotation			= null
		
	) {
		// #==== Variables ====#
		this.color 			= color;
		this.symbol			= symbol;
		this.size			= size;
		this.rotation		= rotation;	
		this.transparency	= transparency;
		
		// #==== Functions ====#
	}

	

	// #=#=#=#=#=# 1.3 Draw Symbol #=#=#=#=#=#
	drawSymbol(x, y, iconRot) {
		canvas.context.fillStyle		= this.color; // Farbe des Symbols
		canvas.context.globalAlpha 		= this.transparency;
		canvas.context.font				= this.symfont; // Dynamische Schriftgröße basierend auf der Bildschirmbreite
		canvas.context.textAlign		= 'center'; // Zentriere den Text horizontal
		canvas.context.textBaseline		= 'middle'; // Zentriere den Text vertikal

		canvas.context.save(); // Speichere den aktuellen Zustand des Kontexts

		// Übernehme die Rotation des Polygons, wenn keine separate Symbolrotation angegeben ist
		const symbolRotation = this.rotation != null ? (this.rotation * Math.PI) / 180 : iconRot;

		// Rotiere den Kontext um den Winkel der Symbolrotation
		canvas.context.translate(x, y);
		canvas.context.rotate(symbolRotation);

		// this.canvas.context.fillText(this.icon, 0, 0);
		canvas.context.fillText(this.symbol, 0, 0);

		canvas.context.restore(); // Stelle den ursprünglichen Zustand des Kontexts wieder her
	}	

	// #=#=#=#=#=# 1.4 Set Size #=#=#=#=#=#
	setSize() {
		console.log(this.size);
		if (this.size != null) {
			return (this.size * canvas.factor);		
		}
		else {
			return (this.polygon.size / 100) * 80;
		}
	}

	// #=#=#=#=#=# 1.5 Initiator #=#=#=#=#=#
	initiator () {
		this.size 			= this.setSize();
		this.symfont		= `${this.size}px FontAwesome`;				// Standard-Font	
	}
}