	
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
				fps    : 100,
				backgroundStyle : 'black',
				width  : 640,
				height : 480
			});
			_extend(self, properties);

			if (self._p.canvas === null)
				self._p.canvas = document.getElementById('screen');

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

	this._p = { };

	/**
	 * Starts the execution.
	 */
	this.run= function()
	{
		setInterval(this.gameLoop, this._p.fps);
	};
	this.gameLoop = function()
	{
		var context = getContext();

		self.background.draw(context);
		self.root.draw(context);
	}; 

	/**
	 * You should always call this method first.
	 */
	this.start= function(initfunc)
	{
		initialize(typeof(initfunc)=='function' ? { start: initfunc } : initfunc);
	};

	this.invalidate = function() { return this; };
});
