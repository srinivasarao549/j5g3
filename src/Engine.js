/**
 *
 *
 *
 *
 */

j5g3.Engine =
{
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
		this._p = j5g3.extend({
			canvas: document.getElementById('screen'),
			fps: 100,
			backgroundStyle: 'black',
			width: 640,
			height: 480
		}, properties);

		this.background = new j5g3.Rect({ fillStyle: this._p.backgroundStyle, width: this._p.width, height: this._p.height });
		
		this.root = new j5g3.Clip({ width: this._p.width, height: this._p.height });

		this._p.canvas.width = this._p.width;
		this._p.canvas.height = this._p.height;
		this._p.canvas.addEventListener('click', this.onClick, false);

		j5g3.property.get(this, 'canvas');
		
		return this;
	},

	getContext: function()
	{
		return this._p.canvas.getContext('2d');
	},

	gameLoop: function()
	{
		var context = this.getContext();

		this.background.draw(context);
		this.root.draw(context);
	},

	run: function()
	{
		setInterval('j5g3.Engine.gameLoop()', this._p.fps);
	}
}
