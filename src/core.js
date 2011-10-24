	
	/**
	 * @ignore
	 */
	initialize = function(properties)
	{
		Util.extend($, properties);

		canvas = $.canvas = properties.canvas || $.id('screen');

		$.background = new Rect({ 
			fillStyle: $.backgroundStyle,
			width: $.width, 
			height: $.height
		});
		
		$.root = new Clip({
			width: $.width,
			height: $.height
		});

		canvas.width = $.width;
		canvas.height = $.height;

		context = canvas.getContext('2d');
		cache = document.createElement('CANVAS');

		properties.startFn($, document);
	},

	process,

$ = window.j5g3 = /** @namespace */ j5g3 =  { 

	/** fillStyle for background */
	backgroundStyle: 'black',
	/** Width of the screen */
	width: 640,
	/** Height of the screen */
	height: 480,

	/**
	 * Starts the execution.
	 */
	run: function()
	{
		if (process)
			clearInterval(process);

		process = setInterval($.gameLoop, __fps);
	},

	/**
	 * This is here to allow overriding by Debug.js
	 */
	gameLoop: function()
	{
		$.background.draw();
		$.root.draw();
	},

	/**
	 * Set the game Frames per Second.
	 */
	fps: function(val)
	{
		return val===undefined ? 1000/__fps : (__fps=1000/val, $);
	},

	/**
	 * You should always call this method first.
	 *
	 * @param {function|object} initfunc Initialization settings for the Engine, or a init function.
	 *
	 */
	start: function(initfunc)
	{
		initialize(typeof(initfunc)=='function' ? { startFn: initfunc } : initfunc);
	},

	/**
	 * Pauses game execution
	 */
	pause: function()
	{
		$.Input.Keyboard.release();
		$.root.stop();
	},

	/**
	 * Resume game execution.
	 */
	resume: function()
	{
		$.root.play();
		$.Input.Keyboard.capture();
	},

	/**
	 * Returns a DOM element by ID.
	 *
	 * @param {String} id
	 */
	id: function(id) { return document.getElementById(id); },
	
	/**
	 * Returns a random number from 0 to max
	 */
	rand: function(max) { return Math.random() * max; },

	/**
	 * Returns a random integer from 0 to max
	 */
	irand: function(max) { return Math.floor(Math.random() * max); },

	/** Creates an array of w*h dimensions initialized with value v */
	ary: function(w, h, v)
	{
		var result = [], x;
		while (h--)
		{
			result[h] = [];
			for (x=0; x<w; x++)
				result[h][x]=v;
		}
		return result;
	},

	/**
	 * Shuffles array ary.
	 *
	 * @param {Array} ary
	 */
	shuffle: function(ary)
	{
		var l=ary.length, i=l, t, b;

		while (i--)
		{
			t = ary[i];
			ary[i] = ary[b = $.irand(l)];
			ary[b] = t;
		}
	},

	/**
	 * Iterates through ary and runs the fn function for each element
	 *
	 * @param {Array} ary
	 * @param {Function} fn
	 */
	each: function(ary, fn)
	{
		for (var i=0; i<ary.length; i++)
			fn.apply(ary[i], [i]);
	}
},

