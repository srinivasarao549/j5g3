/**
 * Maps an array to a spritesheet.
 *
 * Properties:
 *
 * sprites: Array of sprites 
 * map: 2D Array containing the indexes of the sprites
 * tw: Tile Width
 * th: Tile Height
 */

Map = $.Map = DisplayObject.extend({

	init: function(p)
	{
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

}).properties({ sprites: null, map: null, tw: 0, th: 0, offsetX: 0, offsetY: 0 }),
