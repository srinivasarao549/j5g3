/**
 * j5g3 Physics Class
 *
 * NOTE: You need to include the physics object to the scene.
 *
 * Properties
 *
 * obj     Object to apply physics to.
 * v       Velocity 2D Vector. Default [0, 0]
 */

Physics = $.Physics = Class.extend({

	init: function(properties)
	{
		_extend(this, properties);
	},

	draw: function()
	{
		var o = this.__obj;

		o.__x = (o.__x + this.__vx);
		o.__y = (o.__y + this.__vy);
	},

	/**
	 * Applies force [fx, fy] for 1 frame.
	 */
	force: function(fx, fy, x, y)
	{
		var m = this.__m,
		    vx = this.__vx,
		    vy = this.__vy
		; 

		this.__vx = (m*vx+fx)/m;
		this.__vy = (m*vy+fy)/m;

		return this;
	},

	impulse: function()
	{
	},

	invalidate: function() { }
}).properties(
{
	obj: null, vx: 0, vy: 0, m: 1, parent: null
}),

