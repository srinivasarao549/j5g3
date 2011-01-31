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

Map = DisplayObject.extend({

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
	    w  = this.__map[0].length,
	    h  = this.__map.length,

	    nx = Math.round(x / this.__tw),
	    ny = Math.round(y / (this.__th/2 + this.__offsetY))
	;

	return [ nx, ny ];
},

cache: function(w, h)
{
	var pc = context;
	// TODO This might be dangerous
	cache.width = this.__x + w;
	cache.height= this.__y + h;
	context = cache.getContext('2d');

	if (this._oldPaint)
		this.paint = this._oldPaint;

	this.draw();
	this.__source = context.getImageData(this.__x, this.__y, w, h);
	this._oldPaint= this.paint;
	this.paint = Draw.ImageData;

	context = pc;
},

paint: Draw.Map

}).properties({ sprites: null, map: null, tw: 0, th: 0, offsetX: 0, offsetY: 0 });
