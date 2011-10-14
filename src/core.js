	
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

		properties.start($, document);
	},

$ = window.j5g3 = { 

	canvas: null,
	backgroundStyle: 'black',
	width: 640,
	height: 480,

	/**
	 * Starts the execution.
	 */
	run: function()
	{
		setInterval($.gameLoop, __fps);
	},

	/**
	 * This is here to allow overriding by Debug.js
	 */
	gameLoop: function()
	{
		$.background.draw();
		$.root.draw();
	},

	fps: function(val)
	{
		return val===undefined ? 1000/__fps : (__fps=1000/val, $);
	},

	/**
	 * You should always call this method first.
	 */
	start: function(initfunc)
	{
		initialize(typeof(initfunc)=='function' ? { start: initfunc } : initfunc);
	},

	id: function(id) { return document.getElementById(id); },
	
	rand: function(max) { return Math.random() * max; }
};

