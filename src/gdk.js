
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
			this.STATES = {}
			this.KEYS = {}
			this._super(p);
		},

		keyboard: function(key)
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
		var 
			me = this,
			frames = [],
			STATES = me.STATES, 
			i,
			ss = me.__spritesheet,
			state
		;
			for (i in states)
				if (states.hasOwnProperty(i))
				{
					STATES[i] = frames.length;
					state = states[i];
					if (state instanceof Array)
						state = ss.clip_array(state);

					frames.push([ state ]);
				}

			return me.__frames = frames;
		},

		go_state: function(name)
		{
			return this.go(this.STATES[name] || 0);
		}

	}).properties({
		spritesheet: null
	})

};

})(window, window.j5g3);
