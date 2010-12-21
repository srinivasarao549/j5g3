/**
 * j5g3 Physics Class
 *
 * NOTE: You need to include the physics object to the scene.
 *
 * Properties
 *
 * obj     Object to apply physics to.
 * v       Velocity 2D Vector
 */

Physics = Class.extend({

	init: function(properties)
	{
		_extend(this, properties);
	},

	draw: function()
	{
		var o = this.__obj,
		    v = this.__v
		;

		o.x(o.x() + v[0]);
		o.y(o.y() + v[1]);
	},

	/**
	 * Applies force [fx, fy] for 1 frame.
	 */
	force: function(fx, fy, x, y)
	{
		var m = this.__m,
		    v = this.__v
		; 

		v[0] = (m*v[0]+fx)/m;
		v[1] = (m*v[1]+fy)/m;

		return this;
	},

	impulse: function()
	{
	},

	invalidate: function() { }
}).properties(
{
	obj: null, v: null, m: 1, parent: null
});

