/**
 * JS Game Engine
 *
 * j5g3 Core Library.
 */

(function(window, undefined) {
	
	var Engine = function()
	{
		this.canvas = document.getElementById('screen');
		this.fps    = 100;
		this.backgroundStyle = 'black';
		this.width  = 640;
		this.height = 480;

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
		};

		/**
		 * Starts the execution.
		 */
		this.run= function()
		{
			setInterval(gameLoop, this.fps);
		};

		this.initialize = function()
		{
			this.background = new j5g3.Rect({ fillStyle: this.backgroundStyle, width: this.width, height: this.height });
			
			this.root = new j5g3.Clip({ width: this.width, height: this.height });

			canvas.width = this.width;
			canvas.height = this.height;
			canvas.addEventListener('click', this.onClick, false);
		};
	
		/**
		 * You should always call this method first.
		 */
		this.start= function(initfunc)
		{
			this.initialize();
			initfunc(this);
		};
	};

	window.j5g3 = new Engine();
})(window);

