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

	

	// // #=#=#=#=#=# 1.3 Draw Symbol #=#=#=#=#=#
	// drawSymbol(x, y, iconRot) {
	// 	canvas.context.fillStyle		= this.color; // Farbe des Symbols
	// 	canvas.context.globalAlpha 		= this.transparency;
	// 	canvas.context.font				= this.symfont; // Dynamische Schriftgröße basierend auf der Bildschirmbreite
	// 	canvas.context.textAlign		= 'center'; // Zentriere den Text horizontal
	// 	canvas.context.textBaseline		= 'middle'; // Zentriere den Text vertikal

	// 	canvas.context.save(); // Speichere den aktuellen Zustand des Kontexts

	// 	// Übernehme die Rotation des Polygons, wenn keine separate Symbolrotation angegeben ist
	// 	const symbolRotation = this.rotation != null ? (this.rotation * Math.PI) / 180 : iconRot;

	// 	// Rotiere den Kontext um den Winkel der Symbolrotation
	// 	canvas.context.translate(x, y);
	// 	canvas.context.rotate(symbolRotation);

	// 	// this.canvas.context.fillText(this.icon, 0, 0);
	// 	canvas.context.fillText(this.symbol, 0, 0);

	// 	canvas.context.restore(); // Stelle den ursprünglichen Zustand des Kontexts wieder her
	// }	

	

	drawSymbol(x, y, iconRot) {
		const svgString = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>';

		
		
		// Ersetzen Sie die Farbe im SVG-String durch Rot
		const colored  = svgString.substring(0, 5) + `fill="${this.color}" ` + svgString.substring(5);

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
	
			// const symbolRotation = this.rotation != null ? (this.rotation * Math.PI) / 180 : iconRot;
			
			canvas.context.rotate(this.rotation); // Umrechnung von Grad in Bogenmaß
			//TODO scale an passen
			// Ändere die Größe des Symbols
			canvas.context.scale(2, 2);
	
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