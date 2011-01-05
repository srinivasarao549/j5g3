/**
 * Maps an array to a spritesheet.
 */

Map = DisplayObject.extend({

init: function(p)
{
	_extend(this, p);
},

paint: Draw.Map

}).properties({ map: null });
