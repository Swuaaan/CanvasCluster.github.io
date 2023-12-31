// Polygone_Gen/Polygon_Gen.js
import canvas	from '../controller/canvas.js';
import icon		from './icon.js';
import settings from '../../../settings.json' assert {type: 'json'};

export default class polygon {
	// #=#=#=#=#=# Variables #=#=#=#=#=#
		// #==== Uninitialized ====#
	/** @type	{canvas} */
	canvas;
	/** @type	{number} */
	cornerCount;
	/** @type	{string} */
	symbol;
	/** @type	{number} */
	size;
	/** @type	{number} */
	rotation;
	/** @type	{number} */
	x;
	/** @type	{number} */
	y;
	/** @type	{icon} */
	icon;
	/** @type	{number} */
	transparency;

	//TODO include Transperency

	// #=#=#=#=#=# Constructor #=#=#=#=#=#
	constructor(
		controller,
		icon,
		cornerCount,
		x						= null,
		y						= null,
		size					= 100,
		color					= '#ff0000',
		rotation				= 0,
		transparency			= 1
	) {
		// #==== Variables ====#
		this.controller			= controller;
		this.icon				= icon;
		this.cornerCount		= cornerCount;
		this.color				= color;				// Das Symbol, das im Polygon angezeigt werden soll
		this.rotation			= rotation;				// Anfangsrotation in Radiant
		this.size				= (size * canvas.factor);					// Radius des Polygons
		this.x					= x;					// X-Koordinate des Polygons (kann null sein, um die Bildschirmmitte zu verwenden)
		this.y					= y;					// Y-Koordinate des Polygons (kann null sein, um die Bildschirmmitte zu verwenden)
		this.icon.polygon		= this;
		this.transparency		= transparency;

		// #==== Functions ====#

		this.icon.initiator();
		this.#draw();

	}
	
	// #=#=#=#=#=# Draw Polygon #=#=#=#=#=#
	/**
	 * @private
	 */
	#draw () {
		// window.getComputedStyle(this.controller.element)

		const	centerX		= this.x != null ? this.x : this.controller.element.width / 2,
				centerY		= this.y != null ? this.y : this.controller.element.height / 2,
				vertices	= []; // Array für die Eckpunkte

		// Berechne und zeichne das Polygon
		canvas.context.fillStyle 	= this.color; 
		canvas.context.globalAlpha 	= this.transparency;
		canvas.context.beginPath();

		if (this.cornerCount < 3) {
			// Wenn das Polygon zwei oder weniger Ecken hat, zeichne einen Kreis
			canvas.context.arc(centerX, centerY, this.size, 0, 2 * Math.PI);
		} else {
			// Ansonsten zeichne das Polygon
			for (let i = 0; i < this.cornerCount; i++) {
				const angle = (i * 2 * Math.PI) / this.cornerCount + ((Math.PI / 180) * this.rotation),
				 		x 	= centerX + this.size * Math.cos(angle),
				 		y 	= centerY + this.size * Math.sin(angle);

				vertices.push({ x, y }); 

				if (i === 0) {
					canvas.context.moveTo(x, y);
				} else {
					canvas.context.lineTo(x, y);
				}
			}
			canvas.context.closePath();
		}

		canvas.context.fill();

		// Zeichne das Symbol in der Mitte des Polygons oder Kreises
		if (this.icon) this.icon.drawSymbol(centerX, centerY, this.#handelRotation());
			
	}
	
	#handelRotation () {
		if (settings.iconrotaion != null) {
			return settings.iconrotaion;

		} else {
			return this.rotation;

		}
	}
}