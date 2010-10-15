	
$ = window.j5g3 = new (function()
{
	var 
		/* PRIVATE MEMBERS */
		self = this,
		callee = arguments.callee,
		__fps = 31,

		getContext= function()
		{
			return context;
		},
		initialize = function(properties)
		{
			// TODO this is horrible.
			Class.properties.apply(callee, [{
				'canvas' : null,
				backgroundStyle : 'black',
				width  : 640,
				height : 480
			}]);	
			_extend(self, properties);

			if (self.canvas() === null)
				self.canvas($.id('screen'));

			canvas = self.canvas();

			self.background = new Rect({ 
				fillStyle: self.backgroundStyle(),
				width: self.width(), 
				height: self.height() 
			});
			
			self.root = new Clip({
				width: self.width(),
				height: self.height()
			});

			canvas.width = self.width();
			canvas.height = self.height();

			context = canvas.getContext('2d');

			properties.start($, document);
		}
	;

	/**
	 * Starts the execution.
	 */
	this.run= function()
	{
		setInterval(this.gameLoop, __fps);
	};

	/**
	 * This is here to allow overriding by Debug.js
	 */
	this.gameLoop = function()
	{
		self.background.draw();
		self.root.draw();
	}; 

	this.fps = function(val)
	{
		return val===undefined ? 1000/__fps : (__fps=1000/val, this);
	};

	/**
	 * You should always call this method first.
	 */
	this.start= function(initfunc)
	{
		initialize(typeof(initfunc)=='function' ? { start: initfunc } : initfunc);
	};

	this.invalidate = function() { return this; };

	this.id = function(id) { return document.getElementById(id); };
});

