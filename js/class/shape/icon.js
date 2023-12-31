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

		let Pathfactor = settings.iconsize / this.symbol.height,			
			xPathOffset = (this.symbol.width * Pathfactor) / 2,
			yPathOffset = (this.symbol.height * Pathfactor) / 2;
	
		canvas.context.save();
	
		// Translate the context to the center of the area
		canvas.context.translate(x, y);
	
		// Rotate the context based on the specified angle
		canvas.context.rotate((Math.PI / 180) * iconRot);
	
		// Adjust the translation to the center of the icon
		canvas.context.translate(-xPathOffset, -yPathOffset);
	
		canvas.context.scale(Pathfactor, Pathfactor);
	
		const path = new Path2D(this.symbol.path);
	
		canvas.context.fillStyle = this.color;
		canvas.context.fill(path);
	
		canvas.context.restore();
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
	}
}