import canvas	from '../controller/canvas.js';
import polygon 	from './polygon.js';
import settings from '../../../settings.json' assert {type: 'json'};

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
	/** @type		{number} */
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

	drawSymbol(x, y, iconRot) {

		// Ersetzen Sie die Farbe im SVG-String durch Rot
		const resized  = this.symbol.substring(0, 40) + `height="${this.size}" width="${this.size}" ` + this.symbol.substring(62);

		// Ersetzen Sie die Farbe im SVG-String durch Rot
		const colored  = resized.substring(0, 5) + `fill="${this.color}" ` + resized.substring(5);

		// Erstelle ein neues Image-Objekt
		var img = new Image();
		img.src = 'data:image/svg+xml,' + encodeURIComponent(colored);
	
		// Lade das Bild und zeichne es auf den Kontext, wenn es geladen ist
		img.onload  = () => {
			// Speichere den aktuellen Zustand des Kontexts
			canvas.context.save();
	
			// Setze die Transparenz des Symbols
			canvas.context.globalAlpha = this.transparency;
	
			// Rotiere den Kontext um den gewünschten Winkel (in Grad)
			canvas.context.translate(x, y);
	
			const symbolRotation = this.rotation != null ? (this.rotation * Math.PI) / 180 : iconRot;
			
			canvas.context.rotate(symbolRotation); // Umrechnung von Grad in Bogenmaß
	
			// Zeichne das Bild ohne Farbänderung
			canvas.context.drawImage(img, -img.width / 2, -img.height / 2);
	
			// Stelle den ursprünglichen Zustand des Kontexts wieder her
			canvas.context.restore();
		};
	
		// Es fehlte der Aufruf von save(), daher füge ihn hier hinzu
		canvas.context.save();
	
		canvas.context.restore(); // Stelle den ursprünglichen Zustand des Kontexts wieder her
	}

	// #=#=#=#=#=# 1.4 Set Size #=#=#=#=#=#
	setSize() {
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