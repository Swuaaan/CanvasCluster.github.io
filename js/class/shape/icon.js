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

		// const svgString = settings.svgs[1];

		// console.log(svgString);

		// const svgString = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/></svg>';
		
		// Ersetzen Sie die Farbe im SVG-String durch Rot
		const resized  = this.symbol.substring(0, 40) + `height="${this.size}" width="${this.size}" ` + this.symbol.substring(62);
		
		// console.log(resized);

		// Ersetzen Sie die Farbe im SVG-String durch Rot
		const colored  = resized.substring(0, 5) + `fill="${this.color}" ` + resized.substring(5);

		// console.log(colored);

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