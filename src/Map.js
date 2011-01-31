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

paint: Draw.Map

}).properties({ sprites: null, map: null, tw: 0, th: 0, offsetY: 0 });
