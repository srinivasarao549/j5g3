/**
 * Particle Emitter
 */

Emitter = DisplayObject.extend({
	
	init: function(properties)
	{
		_extend(this, properties);
	},

	play: function()
	{
		this.paint = this.emit;
	},

	stop: function()
	{
		this.paint = Draw.Void;		
	},

	paint: Draw.Void

}).properties({
	source: null, life: 10
});
