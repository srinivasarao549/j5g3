	
$ = window.j5g3 = new (function()
{
	var 
		/* PRIVATE MEMBERS */
		self = this,
		callee = arguments.callee,

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

			self.__fps = 31;

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
		setInterval(this.gameLoop, this.__fps);
	};

	this.gameLoop = function()
	{
		self.background.draw();
		self.root.draw();
	}; 

	this.fps = function(val)
	{
		if (val === undefined) return 1000 / this.__fps;
		this.__fps = 1000 / val;
		return this;
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

