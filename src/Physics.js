/**
 * j5g3 Physics Class
 *
 * Properties
 *
 * obj     Object to apply physics to.
 * v       Velocity 2D Vector
 */

Class(Physics = function(properties)
{
	_extend(this, properties);
},
Object,
{
	obj: null, v: null, m: 1
},
{
	draw: function()
	{
		var o = this._p.obj,
		    v = this._p.v
		;

		o.x(o.x() + v[0]);
		o.y(o.y() + v[1]);
	},

	/**
	 * Applies force [fx, fy] for 1 frame.
	 */
	force: function(fx, fy, x, y)
	{
		var m = this._p.m,
		    v = this._p.v
		; 

		v[0] = (m*v[0]+fx)/m;
		v[1] = (m*v[1]+fy)/m;

		return this;
	},

	impulse: function()
	{
	},

	invalidate: function() { }
});

