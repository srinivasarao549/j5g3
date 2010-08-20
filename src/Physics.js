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
	obj: null, v: null
},
{
	draw: function()
	{
		var o = this._p.obj,
		    v = this._p.v
		;

		o.x(o.x() + v[0]);
		o.y(o.y() + v[1]);
	}
});

