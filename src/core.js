	
var Engine = function()
{
	var 
		_pg = {
			version: VERSION
		},

		/* PRIVATE MEMBERS */

		self = this,

		getContext= function()
		{
			return self._p.canvas.getContext('2d');
		},
		gameLoop= function()
		{
			var context = getContext();

			self.background.draw(context);
			self.root.draw(context);
		}, 
		initialize = function(properties)
		{
			$.Property.extend(self, properties);
			$.Property.define(Engine);

			if (self._p.canvas === null)
				self._p.canvas = document.getElementById('screen');

			self.background = new j5g3.Rect({ 
				fillStyle: self.backgroundStyle(),
				width: self.width(), 
				height: self.height() 
			});
			
			self.root = new j5g3.Clip({
				width: self.width(),
				height: self.height()
			});

			self._p.canvas.width = self.width();
			self._p.canvas.height = self.height();
			self._p.canvas.addEventListener('click', self.onClick, false);

			properties.start($, document);
		}
	;

	this._p = { };

	/**
	 * Starts the execution.
	 */
	this.run= function()
	{
		setInterval(gameLoop, this._p.fps);
	};

	/**
	 * You should always call this method first.
	 */
	this.start= function(initfunc)
	{
		if (typeof(initfunc)=='function')
			initialize({ start: initfunc });
		else
			initialize(initfunc);
	};

	this.invalidate = function() { };
};

Engine.properties = { 
	canvas : null,
	fps    : 100,
	backgroundStyle : 'black',
	width  : 640,
	height : 480
};

var $ = window.j5g3 = new Engine();

