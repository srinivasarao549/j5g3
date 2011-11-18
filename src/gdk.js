
(function(window, j5g3, undefined) {
var 
	$ = j5g3,
	GDK =

/**
 * Game Development Kit
 *
 * Built as a separate module. @requires j5g3
 *
 * @namespace
 */
j5g3.GDK = {

	User: $.Clip.extend({

		draw: $.Draw.Keyboard,

		init: function(p)
		{
			
			this._super(p);
		},

		keyboard: function()
		{
		var
			KEYS = this.KEYS,
			i
		;
			for (i in KEYS)
				if (key[j5g3.Input.KEYS[i]])
					KEYS[i].apply(this);
		},

		/**
		 * @param {Array} states Array of frames
		 *
		 */
		states: function(states)
		{
			
		}

	}).properties({
		spritesheet: null
	})

};

})(window, window.j5g3);
