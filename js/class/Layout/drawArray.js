/**
 * DrawArray.js
 *
 * Inhaltsverzeichnis
 * 	1. Imports
 * 	2. Draw Array
 * 		2.1 Variables Uninitialized 			
 *		2.2 constructor
 *		2.3 Variables Initialized			
 *		2.4 Create Array 
 *		2.5 Claculate_B_with_cos
 *		2.6 Claculate_rows
 *		2.7 Claculate_col
 *		2.8 InRange
 *		2.9 InViewArea
 *		2.10 DrawArray
 *		2.11 ChoosePath
 *		2.12 RandomMonoColore
 */

/* ================================================== */
/* 1. Imports */
/* -------------------------------------------------- */

import polygon from "../shape/polygon.js";
import canvas from "../controller/canvas.js";
import icon from "../shape/icon.js";
import settings from "../../../settings.json" assert { type: "json" };
import paths from "../../../font-awesome/icons.json" assert { type: "json" };
import selection from "../Layout/weightedSelection.js";
import iconselection from "../Layout/weightedSelection.js";

const controller = new canvas("myCanvas", settings.backcolore),
	positionArray = [],
	clustermid = [],
	selector = new selection(settings.colors),
	iconselector = new iconselection(settings.icons);

/* ================================================== */
/* 2. Draw Array */
/* -------------------------------------------------- */
export default class DrawArray {

	// #=#=#=#=#=# 2.1 Variables #=#=#=#=#=#
		// #==== Uninitialized ====#

	/** @type	{number} */
	tiltAngle;

	/** @type	{number} */
	rowSpace;

	/** @type	{number} */
	colSpace;

	// TODO nicht mehr als 46° drehung zu lassen
	/** @type	{number}*/
	static angel;


	// #=#=#=#=#=# 2.2 Constructor #=#=#=#=#=#

	constructor(tiltAngle, rowSpace, colSpace) {

	// #=#=#=#=#=# 2.3 Variables #=#=#=#=#=#
		// #==== Initialized ====#

		this.tiltAngle = tiltAngle;
		this.rowSpace = rowSpace;
		this.colSpace = colSpace;
		DrawArray.angel = +(this.tiltAngle * (Math.PI / 180)).toFixed(4);

		// #==== Functions ====#
		this.#createArray();
		this.#drawArray();
	}


	// #=#=#=#=#=# 2.4 Create Array #=#=#=#=#=#
	/**
	 * @private
	 */
	#createArray() {
		// multplay the spacing with an factor for diffrent screens
		let columeSpace = +(this.colSpace * canvas.factor).toFixed(1),
			rowSpaceing = +(this.rowSpace * canvas.factor).toFixed(1);
		// calculate the numbers off row and colums
		let rows = Math.floor(canvas.windowheight / rowSpaceing),
			columns = Math.floor(canvas.windowwidth / columeSpace);

		let row = 0;

		if (this.tiltAngle != 0) {
			row = row - this.#claculate_rows(rowSpaceing);
			columns = columns + this.#claculate_col(columeSpace);
		} else {
			row = 0;
		}

		for (; row < rows; row++) {
			for (let col = 0; col < columns; col++) {
				// col times the spacing to calculate the distance for that point and every odd row adds the half columspacing
				const x = +(col * columeSpace + (row % 2) * (columeSpace / 2)).toFixed(1),
					y = +(row * rowSpaceing).toFixed(1);

				const 	polygonX = +(x + Math.cos(DrawArray.angel) * columeSpace * col).toFixed(1),
						polygonY = +(y + Math.sin(DrawArray.angel) * columeSpace * col).toFixed(1);

				if (!this.#inViewArea(polygonX, polygonY, rowSpaceing, columeSpace)) {
					continue;
				}

				positionArray.push({
					x: polygonX,
					y: polygonY,
				});

				if (Math.random() < settings.clusterchance) {
					clustermid.push({
						x: polygonX,
						y: polygonY,
						generat: false,
					});
				}
			}
		}
	}

	// #=#=#=#=#=# 2.5 Claculate_B_with_cos #=#=#=#=#=#
	/**
	 * @private
	 * Calculates the site b from a triangle with right angle, needs angels and legth
	 * @param 	{number} c the legth from the c site off an triangle with right angle
	 * @returns {number} the legth from the b site off an triangle with right angle
	 */
	#claculate_B_with_cos(c) {
		// triangle with right angle = inner angel 180 - 90 = 90 - angel
		const radAngel = 90 * (Math.PI / 180);
		// this calculates distance b for a triangle with right angle by using the angels and on site off the triangel
		const 	b = Math.cos(radAngel - DrawArray.angel) * c;
		return 	b;
	}

	// #=#=#=#=#=# 2.6 Claculate_rows #=#=#=#=#=#
	/**
	 * @private
	 * Calculates the need rows to fill a distance 
	 * @param 	{number} rowspace the space between two rows
	 * @returns {number} the number of rows that need to be added
	 */
	#claculate_rows(rowspace) {
		// this calculates distance from screen corner to the first row 
		let 	row_b = this.#claculate_B_with_cos(canvas.windowwidth);
		// calculates the needed row to fill that gap and adds one 
				row_b = +(Math.floor(row_b / rowspace) + 1).toFixed(1);
		return 	row_b;
	}

	// #=#=#=#=#=# 2.7 Claculate_col #=#=#=#=#=#
	/**
	 * @private
	 * Calculates the need Columes to fill a distance 
	 * @param 	{number} colspace the space between two columes
	 * @returns {number} the number of columes that need to be added
	 */
	#claculate_col(colspace) {
		// calulates the legth frome the top right corner to the point where the columes end
		let 	row_a = Math.tan(DrawArray.angel) * canvas.windowwidth,
		// calulates the legth for site c of the triangel
				col_c = canvas.windowheight - row_a,
		// this calculates distance from screen corner to the last columes 
				col_b = this.#claculate_B_with_cos(col_c);
		// calculates the needed columes to fill that gap and adds one 
				col_b = +(Math.floor(col_b / colspace) + 1).toFixed(1);
		return 	col_b;
	}

	// #=#=#=#=#=# 2.8 InRange #=#=#=#=#=#
	/**
	 * @private
	 * Checks if a Number is in a given Range
	 * @param    {Number}    min        Minimum range
	 * @param    {Number}    cur        Current Offset
	 * @param    {Number}    max        Maximum Range
	 * @returns  {boolean}    Returns true if the given number is in the range
	 */
	#inRange(min, cur, max) {
		return cur >= min && cur <= max;
	}

	// #=#=#=#=#=# 2.9 InViewArea #=#=#=#=#=#
	/**
	 * @private
	 * Checks if coordinates are within the Viewport Area
	 * @param    {Number}    x        X coordinate
	 * @param    {Number}    y        Y coordinate
	 * @returns  {boolean}    Returns true if the coordinates are within the Viewport Area, false otherwise
	 */
	#inViewArea(x, y, rowSpace, colSpace) {
		return (
			this.#inRange(colSpace * -1, x, canvas.windowwidth + colSpace) &&
			this.#inRange(rowSpace * -1, y, canvas.windowheight + rowSpace)
		);
	}

	// #=#=#=#=#=# 2.10 DrawArray #=#=#=#=#=#
	/**
	 * @private
	 * desciption	  
	 */
	#drawArray() {
		while (clustermid.length > 0) {
			let cluster = clustermid.shift();

			for (const index in positionArray) {
				const item = positionArray[index];

				// Berechnung des Abstands vom angegebenen Punkt
				const distance = +Math.hypot(item.x - cluster.x, item.y - cluster.y).toFixed(1);

				// Berechnung des Fade-Offsets, indem fadeDistance vom Abstand subtrahiert wird
				const fadeOffset = Math.max(0, distance - settings.fadeoffset);

				// Setzen der Transparenz basierend auf dem Abstand und Fade-Offset
				let alpha = 1 - fadeOffset / settings.fadeSize; // Ändere den Divisor nach Bedarf

				// Begrenze den Alpha-Wert im Bereich [0, 1]
				alpha = Math.max(0, Math.min(1, alpha));

				let iconindex = iconselector.generateindex(settings.icons.length);

				while (
					!iconselector.weightedSelection(
						item.x,
						item.y,
						iconindex,
						settings.minDistancebetwen
					)
				) {
					iconindex = iconselector.generateindex(settings.icons.length);
				}

				let randomSymbol = this.#choosePath(settings.icons[iconindex]);

				if ((distance < settings.clusterSize || distance < settings.fadeSize) && item.generat !== true) {

					if (Math.random() > settings.noFillChanceColore) {

						if (Math.random() > settings.noFillChanceGra) {

							let symbolIcon = 	
							new icon(
								randomSymbol,
								settings.iconcolore,
								alpha,
								settings.iconsize,
								settings.iconrotaion
							);

							new polygon(
								controller,
								symbolIcon,
								6,
								item.x,
								item.y,
								settings.polygonsize,
								settings.fadecolore,
								settings.polygonrotaion,
								alpha
							);
						}
					} else {
						if (distance < settings.clusterSize) {
							let coloreindex = selector.generateindex(settings.colors.length);

							while (
								!selector.weightedSelection(
									item.x,
									item.y,
									coloreindex,
									settings.minDistancebetwen
								)
							) {
								coloreindex = selector.generateindex(settings.colors.length);
							}

							let fillColor = settings.colors[coloreindex];

							let symbolIcon = new icon(
								randomSymbol,
								settings.iconcolore,
								1,
								settings.iconsize,
								settings.iconrotaion
							);

							new polygon(
								controller,
								symbolIcon,
								6,
								item.x,
								item.y,
								settings.polygonsize,
								fillColor,
								settings.polygonrotaion
							);
						}
					}

					item.generat = true;
				}
			}
		}
	}

	// #=#=#=#=#=# 2.11 ChoosePath #=#=#=#=#=#
	/**
	 * lookes up the drawing path from the name in the icon.json
	 * @param 	{string} icon needs a name thats in the icon.json
	 * @returns {string} return the drawing path from the icon.json file	
	 */
	#choosePath(icon) {
		return paths[icon].svg.solid || paths[icon].svg.brands;
	}

	// #=#=#=#=#=# 2.12 RandomMonoColore #=#=#=#=#=#
	/**
	 * generates a monocromatic color
	 * @param	{number} saturation the saturation value 0 - 100%
	 * @param	{number} lightness the lightness value 0 - 100%
	 * @returns {string} monocromatic color
	 */
	#RandomMonoColore(saturation, lightness) {
		
		const 	hue = Math.floor(Math.random() * 360),
				color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

		return color;
	}
}
