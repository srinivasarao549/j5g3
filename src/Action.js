
Action = 

/**
 * Executes code on FrameEnter.
 *
 * @class
 * @extends j5g3.Class
 *
 */
j5g3.Action = Class.extend(
/** @scope j5g3.Action.prototype */ {

	init: function(properties)
	{
		this.draw = _typeof(properties)== 'function' ? properties : properties.code;
	},

	remove: DisplayObject.prototype.remove

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
	 * Removes the clip
	 */
	remove: function()
	{
		this.__parent.remove();
	},

	/**
	 * Runs fn every n frames.
	 *
	 * @param {Number} n Number of frames
	 * @param {function) fn Function to run
	 */
	every_n_frames: function(n, fn)
	{
		var i = n;
		return $.action(function() { 

		});
	},

	/**
	 * Action to run once and remove itself
	 */
	once: function(fn)
	{
		return $.action(function() {
			fn();
			this.remove();
		})
	}


}).properties({
	parent: null
}),

