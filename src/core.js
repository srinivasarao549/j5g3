/**
 * JS Game Engine
 *
 * j5g3 Core Library.
 */

(function(window, undefined) {
	
	var Engine = function()
	{
		var _p = {
			canvas = document.getElementById('screen'),
			fps    = 100,
			backgroundStyle = 'black',
			width  = 640,
			height = 480
		};

	var 
		self = this,
		canvas = this.canvas,

		getContext= function()
		{
			return self.canvas.getContext('2d');
		},
		gameLoop= function()
		{
			var context = getContext();

			self.background.draw(context);
			self.root.draw(context);
		}, 
		initialize: function()
		{
			self.background = new j5g3.Rect({ 
				fillStyle: self.backgroundStyle(), 
				width: self.width(), 
				height: self.height() 
			});
			
			self.root = new j5g3.Clip({
				width: self.width(),
				height: self.height()
			});

			canvas.width = self.width();
			canvas.height = self.height();
			canvas.addEventListener('click', self.onClick, false);
		}
	;

		$.Property.define(this, _p, ['fps', 'canvas', 'backgroundStyle', 'width', 'height']);

		/**
		 * Starts the execution.
		 */
		this.run= function()
		{
			setInterval(gameLoop, this.fps);
		};
	
		/**
		 * You should always call this method first.
		 */
		this.start= function(initfunc)
		{
			initialize();
			initfunc(this);
		};

		this.invalidate = function() { };
	};

	window.j5g3 = new Engine();
})(window);

