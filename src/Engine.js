/**
 *
 * Properties:
 *
 * canvas:   Canvas object where the game will be rendered. If not present it will default to element with id 'screen'.
 *
 *
 *
 */

(function($, undefined)
{
	$.Engine = function(p)
	{
		this.canvas = p.canvas || document.getElementById('screen');
		this.fps    = p.fps    || 100;
		this.backgroundStyle = p.backgroundStyle || 'black';
		this.width  = p.width || 640;
		this.height = p.height || 480;

	var 
		self = this,

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

		this.run= function()
		{
			setInterval(gameLoop, this.fps);
		};


		this.background = new j5g3.Rect({ fillStyle: this.backgroundStyle, width: this.width, height: this.height });
		
		this.root = new $.Clip({ width: this.width, height: this.height });

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.addEventListener('click', this.onClick, false);
	};



	/**
	 * This are all the core drawing algorithms. "this" will point to the DisplayObject.
	 */
	$.Engine.Draw = 
	{
		Image: function (context)
		{
			context.drawImage(this.source(), 0, 0);	
		},
		
		/**
		 * Drawing function for Clips
		 */
		Sprite: function (context) 
		{
			var src = this.source(), 
			    w = this.width(), 
			    h = this.height()
			;

			context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h);
		},

		Container: function (context)
		{
			var frame = this.frame();

			for (var i in frame)
				frame[i].draw(context);
		}

	}

})(j5g3);

