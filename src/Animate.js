
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
			var start = this.__from,
			    v = (to - start[prop]) / this.__duration
			;

			return start[prop] + v*t;
		},

		RegularOut: function()
		{
			return 0;	
		}
	}

},

