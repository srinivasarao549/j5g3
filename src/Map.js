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

paint: Draw.Map

}).properties({ sprites: null, map: null, tw: 0, th: 0 });
