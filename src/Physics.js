
Physics = 

/**
 * @class Physics Engine
 *
 * NOTE: You need to include the physics object to the scene.
 *
 * Properties
 *
 * target  Object to apply physics to.
 * v       Velocity 2D Vector. Default [0, 0]
 */
j5g3.Physics = Class.extend(/**@scope j5g3.Physics.prototype */{

	init: function(properties)
	{
		_extend(this, properties);
	},

	draw: function()
	{
		var o = this.__target;

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

	/**
	 * Sets vx and vy properties.
	 */
	v: function(vx, vy)
	{
		this.__vx = vx;
		this.__vy = vy;
		return this;
	},

	invalidate: function() { }
}).properties(
{
	target: null, vx: 0, vy: 0, 
	/** Mass */
	m: 1, 
	parent: null
}),

