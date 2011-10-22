
Animate = 

/**
 * j5g3 Animation Module.
 *
 * @namespace
 */
j5g3.Animate = { 

	/**
	 * @namespace
	 */
	Easing:
	{

		/**
		 * No Easing
		 */
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

},

