/**
 * JS Game Engine
 *
 * Core Library.
 */

var j5g3 = {

	Engine:
	{
		canvas: null,
		root: null, /** Root Node **/

		algorithms: {

			drawImage: function (context)
			{
				context.drawImage(this.source(), 0, 0);	
			},
			
			/**
			 * Drawing function for Clips
			 */
			drawSprite: function (context) 
			{
				var src = this.source(), 
				    w = this.width(), 
				    h = this.height()
				;

				context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h);
			},

			drawContainer: function (context)
			{
				var frame = this.frame();

				for (var i in frame)
					frame[i].draw(context);
			}
		},

		onClick: function()
		{
			
		},

		/**
		 * Properties:
		 *
		 * canvas:   Canvas object where the game will be rendered. If not present it will default to element with id 'screen'.
		 *
		 */
		initialize: function(properties)
		{
			
			if (properties)
			{
				this.canvas = properties.canvas;
				this.fps = properties.fps;
			}

			if (!this.canvas)
				this.canvas = document.getElementById('screen');

			this.canvas.width  = 640;
			this.canvas.height = 480;

			if (!this.fps) this.fps = 100;

			this.background = new j5g3.Rect({ width: 640, height: 480 });
			
			this.root = new j5g3.Clip({ width: 640, height: 480 });

			this.canvas.addEventListener('click', this.onClick, false);

			return this;
		},

		getContext: function()
		{
			return this.canvas.getContext('2d');
		},

		gameLoop: function()
		{
			var context = this.getContext();

			this.background.draw(context);
			this.root.draw(context);
		},

		run: function()
		{
			setInterval('j5g3.Engine.gameLoop()', this.fps);
		}
	}
};

j5g3.Action = function(properties)
{
	this.draw = properties.code;
};
