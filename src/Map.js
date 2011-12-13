Map = 

/**
 * @class Maps an array to a spritesheet.
 *
 * Properties:
 *
 *
 * @extends j5g3.DisplayObject
 *
 */
j5g3.Map = DisplayObject.extend(/**@scope j5g3.Map.prototype */ {

	init: function(p)
	{
		this.__map = []
		_extend(this, p);
	},

	getTileAt: function(x, y)
	{
		var 
	            me = this,

		    nx = Math.round(x / me.__tw),
		    ny = Math.round(y / (me.__th/2 + me.__offsetY))
		;

		return this.__map[ny][nx]; 
	},

	/**
	 * Gets the top left coordinate of the tile at x,y for isometric maps.
	 * TODO 
	 */
	getIsometricCoords: function(x, y)
	{
	var 
		me = this,
		tw2=Math.floor(this.__tw/2) + this.__offsetX, 
		th2=Math.floor(this.__th/2)+this.__offsetY, 
		offset = (y%2)*tw2,

		nx = Math.round(x * me.__tw - offset),
		ny = Math.round(y * th2) 
		;

		return { x: nx, y: ny };
	},

	/**
	 * Sets the map to Isometric
	 */
	set_iso: function()
	{
		this.paint = Paint.Isometric;
		return this;
	},

	paint: Paint.Map

}).properties(
/**@scope j5g3.Map.prototype */{ 
 	/** Spritesheet */
	sprites: null, 
	/** 2D Array containing the indexes of the sprites */
	map: null, 
	/** Tile Width */
	tw: 0, 
	/** Tile Height */
	th: 0, 
	offsetX: 0, 
	offsetY: 0 
}),
