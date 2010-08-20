	
$ = window.j5g3 = new (function()
{
	var 
		_pg = {
			version: VERSION
		},

		/* PRIVATE MEMBERS */

		self = this,

		getContext= function()
		{
			return canvas.getContext('2d');
		},
		initialize = function(properties)
		{
			$.Property.define(self.constructor, { 
				'canvas' : null,
				backgroundStyle : 'black',
				width  : 640,
				height : 480
			});
			_extend(self, properties);

			if (self._p.canvas === null)
				self._p.canvas = $.id('screen');

			canvas = self._p.canvas;

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
			canvas.addEventListener('click', self.onClick, false);

			properties.start($, document);
		}
	;
	/**
	 * Starts the execution.
	 */
	this.run= function()
	{
		setInterval(this.gameLoop, this._p.fps);
	};


	this.gameLoop = function()
	{
		context = getContext();

		self.background.draw();
		self.root.draw();
	}; 

	this.fps = function(val)
	{
		if (val === undefined) return 1000 / this._p.fps;
		this._p.fps = 1000 / val;
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
