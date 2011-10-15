/**
 * Executes code on FrameEnter.
 */
Action = Class.extend({

	init: function(properties)
	{
		this.draw = _typeof(properties)== 'function' ? properties : properties.code;
	},

	parent: function() { }
}, {
	/* Static Methods */

	/**
	 * Rotates object forever. Clockwise by default.
	 */
	rotate: function(obj)
	{
		return function() { 
			var r = obj.rotation();
			obj.rotation(r < 6.1 ? r+0.1 : 0);
		};
	},

	remove: function()
	{
		this.parent().remove_child(this);
	}

}),

