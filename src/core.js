	
	/**
	 * @ignore
	 */
	initialize = function(properties)
	{
		Util.extend($, properties);

		canvas = $.canvas = typeof(properties.canvas)=='string' ?
			$.id(properties.canvas) : 
			(properties.canvas || $.id('screen'))
		;
		cache = document.createElement('CANVAS');
		render= document.createElement('CANVAS');

		$.root = new Clip();
		$.resolution($.width || ($.width = canvas.clientWidth), $.height || ($.height = canvas.clientHeight));


		screen  = canvas.getContext('2d');
		if ($.prerender)
		{
			context = $.context = render.getContext('2d'); //canvas.getContext('2d');
			$.root.draw = Draw.RootPreRender;
		} else
		{
			$.root.draw = Draw.Root;
			context = $.context = screen;
		}

		properties.startFn($, document);
	},

	process,

$ = window.j5g3 = /** @namespace */ j5g3 =  { 

	/** fillStyle for background */
	backgroundStyle: 'black',
	/** Width of the screen */
	width: null,
	/** Height of the screen */
	height: null,

	/** If true, the engine will pre render the frame to another canvas object. */
	prerender: true,

	/**
	 * Starts the execution.
	 */
	run: function()
	{
		if (process)
			clearInterval(process);

		process = setInterval($.gameLoop, __fps);
	},

	warning: function()
	{
	},

	/**
	 * This is here to allow overriding by Debug.js
	 */
	gameLoop: function()
	{
		//$.background.draw();
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
	 * @param {Function|Object} initfunc Initialization settings for the Engine, or a init function.
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
		if ($.root)
			$.root.stop();
	},

	/**
	 * Resume game execution.
	 */
	resume: function()
	{
		if ($.root)
			$.root.play();
		$.Input.Keyboard.capture();
	},

	/**
	 * Returns a DOM element by ID.
	 *
	 * @param {String} id Id of DOM Element
	 */
	id: function(id) { return document.getElementById(id); },
	
	/**
	 * @return A random number from 0 to max
	 */
	rand: function(max) { return Math.random() * max; },

	/**
	 * @return A random integer from 0 to max
	 */
	irand: function(max) { return Math.floor(Math.random() * max); },

	/** Creates an array of w*h dimensions initialized with value v */
	ary: function(w, h, v)
	{
		var result = [], x;

		if (h)
			while (h--)
			{
				result[h] = [];
				for (x=0; x<w; x++)
					result[h][x]=v;
			}
		else
			while (w--)
				result.push(v);
			
		return result;
	},

	/**
	 * Shuffles array ary.
	 *
	 * @param {Array} ary Array to shuffle
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
	 * @param {Array} ary Array to Iterate through
	 * @param {Function} fn Function to execute on each iteration
	 */
	each: function(ary, fn)
	{
		for (var i=0; i<ary.length; i++)
			fn(ary[i], i); //.apply(ary[i], [i]);
	},

	/**
	 * Clones Array
	 */
	clone: function(ary)
	{
	var
		i = 0, l=ary.length, current, result=[]
	;
		for (;i < l; i++)
			result.push((current=ary[i]) instanceof Array ? $.clone(current) : current);

		return result;
	},

	/** Sets Screen Resolution and Root Width and Height */
	resolution: function(w, h)
	{
		canvas.width = render.width = cache.width = w;
		canvas.height= render.height= cache.height= h;

		$.root.size(w, h);
	},

	/**
	 * Defines a user Module. fn will be passed the j5g3 object and the window.document
	 */
	module: function(fn)
	{
		fn($, document);
	}
},

