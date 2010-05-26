/**
 * JS Game Engine
 *
 * Core Library.
 */

var j5g3 = {


	/**
	 * j5g3
	 * Core Utility functions
	 *
	 */

	/**
	 * Extends object a with b
	 */
	extend: function(a, b)
	{
		for (var i in b)
			a[i] = b[i];
		return a;
	},

	/**
	 * Extends Caller with b
	 * @param b is the class to extend
	 */
	inherits: function(obj, klass, args)
	{
		klass.apply(obj, args);
	},

	/**
	 * Declares a j5g3 Property.
	 * @param prop       Property name
	 */
	property: function(caller, prop)
	{
		caller[prop] = function(val) { 
			if (val)
			{
				caller.invalidate();
				caller._p[prop] = val;
				return caller;
			}
			return caller._p[prop];
		};
		return caller[prop];
	},

	/**
	 * Defines multiple properties for a j5g3 class
	 */
	properties: function(obj, prop_array)
	{
		var i;
		for (i in prop_array)
			j5g3.property(obj, prop_array[i]);
	},

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

