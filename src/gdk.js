
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
	j5g3.GDK = {},

	get_dom_class = function(node)
	{
	var
		klass = node.getAttribute('j5g3-class'),
		classes = {
			IMG: 'Image'
		}
	;
		if (!klass)
			klass = classes[node.tagName];

		return klass;
	},

	initialize_assets = function(assets_dom)
	{
	var
		node, klass, id, assets={}
	;
		if (assets_dom)
			$.each(assets_dom.children, function(node)
			{
				klass = get_dom_class(node);
				id = node.getAttribute('id');

				assets[id] = klass ? new j5g3[klass](id) : node;
			});

		return assets;
	}



;
	/**
	 * @param config An object with the options for the game. Options are:
	 *
	 * - setup     function     A function to setup the game. Passed the j5g3 object as a parameter.
	 * - assets_id string       The ID of the assets container.
	 */
	GDK.game = function(config)
	{
	var
		game = function()
		{
			game.assets = initialize_assets($.id(config.assets_id || 'assets'));
			init_scenes();
			config.setup && config.setup($, game);

			$.root.stop();
			$.run();
			$.Input.Keyboard.capture();
		},

		scene, frames,

		init_scenes = function()
		{
			frames = [];
			for (scene in game.scene)
				if (game.scene.hasOwnProperty(scene))
				{
					frames.push([ game.scene[scene] ]);
				}

			$.root.frames(frames);
		}
	;
		game.scene = {};

		return game;
	}

	/**
	 * Scenes are initialized on their first PAINT.
	 */
	GDK.Scene = $.Clip.extend({
		
		draw: function()
		{
			this.__on_enter();
			this.draw = $.Clip.prototype.draw;
			this.draw();
		}

	}).properties({ on_enter: function() {} });

	GDK.Element = $.Clip.extend({
		
		collides: $.Collision.Box,

		initGravity: function()
		{
			this.g = $.physics({ target: this });
		},

		init: function(p)
		{
			this.STATES = {}
			this.initGravity();
			this._super(p);
			this.setup();
		},

		setup: function()
		{
		},

		/**
		 * @param {Array} states Array of frames
		 *
		 */
		states: function(states)
		{
		var 
			me = this,
			frames = me.__frames = [],
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

					me.add_frame(state);
				}

			return me;
		},

		/**
		 * Gets the clip of the state.
		 */
		get_state: function(name)
		{
			return this.__frames[this.STATES[name]][0];
		},

		/**
		 * Goes to the frame of the state
		 *
		 * @param name Name of the state.
		 */
		go_state: function(name)
		{
			return this.go(this.STATES[this.__state = name] || 0);
		}

	}).properties({
		spritesheet: null,
		gravity: 0,
		state: null
	});

	GDK.User= GDK.Element.extend({

		draw: $.Draw.Keyboard,
		collides: $.Collision.Box,


		init: function(p)
		{
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

			// Apply gravity if not zero.
			if (this.__gravity)
				// Manually Draw
				this.g.force(0, this.__gravity).draw();

			this.update();
		},

		update: function() { },
		
		/**
		 * Set Key Handlers.
		 *
		 * @param {Object} ks Key objects.
		 */
		keys: function(ks)
		{
			this.KEYS = ks;
			return this;
		}


	});

})(window, window.j5g3);
