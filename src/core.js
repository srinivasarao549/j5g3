	
	initialize= function(properties)
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

$ = window.j5g3 = { 

	backgroundStyle: 'black',
	width: 640,
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
	 * @param initfunc function|object  Initialization settings for the Engine, or a init function.
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

	each: function(ary, fn)
	{
		for (var i=0; i<ary.length; i++)
			fn.apply(ary[i], [i]);
	}
},

