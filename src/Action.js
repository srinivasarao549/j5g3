
Action = 

/**
 * Executes code on FrameEnter.
 *
 * @class
 * @extends j5g3.Class
 */
j5g3.Action = Class.extend(
/** @scope j5g3.Action.prototype */ {

	init: function(properties)
	{
		this.draw = _typeof(properties)== 'function' ? properties : properties.code;
	},

	parent: function() { }
}, /** @scope j5g3.Action */ {

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

	/**
	 */
	remove: function()
	{
		this.parent().remove_child(this);
	}

}),

