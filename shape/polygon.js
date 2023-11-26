// Polygone_Gen/Polygon_Gen.js
import canvas	from '../controller/canvas.js';
import icon		from './icon.js';

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

	// #=#=#=#=#=# Constructor #=#=#=#=#=#
	constructor(
		canvas,
		icon,
		cornerCount,
		x						= null,
		y						= null,
		size					= 100,
		color					= '#ff0000',
		rotation				= 0
	) {
		// #==== Variables ====#
		this.canvas				= canvas;
		this.icon				= icon;
		this.cornerCount		= cornerCount;
		this.color				= color;				// Das Symbol, das im Polygon angezeigt werden soll
		this.rotation			= ((Math.PI / 180) * rotation);				// Anfangsrotation in Radiant
		this.size				= (size * (window.innerWidth / 1920));					// Radius des Polygons
		this.x					= x;					// X-Koordinate des Polygons (kann null sein, um die Bildschirmmitte zu verwenden)
		this.y					= y;					// Y-Koordinate des Polygons (kann null sein, um die Bildschirmmitte zu verwenden)
		this.icon.polygon		= this;

		// #==== Functions ====#

		this.icon.initiator();
		this.#draw();
	}
	
	// #=#=#=#=#=# Draw Polygon #=#=#=#=#=#
	/**
	 * @private
	 */
	#draw() {
		// window.getComputedStyle(this.canvas.element)

		const	centerX		= this.x != null ? this.x : this.canvas.element.width / 2,
				centerY		= this.y != null ? this.y : this.canvas.element.height / 2,
				vertices	= []; // Array für die Eckpunkte

		// Berechne und zeichne das Polygon
		canvas.context.fillStyle = this.color; // Verwende die gesetzte Füllfarbe
		canvas.context.beginPath();

		if (this.cornerCount < 3) {
			// Wenn das Polygon zwei oder weniger Ecken hat, zeichne einen Kreis
			canvas.context.arc(centerX, centerY, this.size, 0, 2 * Math.PI);
		} else {
			// Ansonsten zeichne das Polygon
			for (let i = 0; i < this.cornerCount; i++) {
				const angle = (i * 2 * Math.PI) / this.cornerCount + this.rotation;
				const x = centerX + this.size * Math.cos(angle);
				const y = centerY + this.size * Math.sin(angle);

				vertices.push({ x, y }); // Speichere die Eckpunkte

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
		if (this.icon) {
			this.icon.drawSymbol(centerX, centerY, this.rotation);
		}		
	}	
}