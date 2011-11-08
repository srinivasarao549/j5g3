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
		var p = this.getCoord(x, y);
		return this.__map[p[1]][p[0]];
	},

	getCoord: function(x, y)
	{
		var 
	            me = this,
		    map= me.__map,
		    w  = map[0].length,
		    h  = map.length,

		    nx = Math.round(x / me.__tw),
		    ny = Math.round(y / (me.__th/2 + me.__offsetY))
		;

		return [ nx, ny ];
	},

	// TODO Why is this function here?
	cache: function(w, h)
	{
	var 
		me = this,
		pc = context
	;
		// TODO This might be dangerous
		cache.width = me.__x + w;
		cache.height= me.__y + h;

		context = cache.getContext('2d');

		if (me._oldPaint)
			me.paint = me._oldPaint;

		me.draw();
		me.__source = context.getImageData(me.__x, me.__y, w, h);
		me._oldPaint= me.paint;
		me.paint = Draw.ImageData;

		context = pc;
	},

	paint: Draw.Map

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
