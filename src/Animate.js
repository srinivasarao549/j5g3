/**
 * j5g3 Animation Module.
 */

Animate = { 

	Easing:
	{
		None: function( prop, to, t)
		{
			var start = this.from(),
			    v = (to - start[prop]) / this.duration()
			;

			return start[prop] + v*t;
		},

		RegularOut: function()
		{
			return 0;	
		}
	}
};

