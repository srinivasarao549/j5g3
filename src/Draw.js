

Draw = 

/**
 * This are all the core drawing algorithms. "this" will point to the current object.
 *
 * @namespace
 */
j5g3.Draw = 
{
	Void: function() { },

	Default: function()
	{
		this.begin();
		this.paint();
		this.end();
	},

	/**
	 * Draw with no transformations applied. Faster...
	 */
	NoTransform: function()
	{
		this.paint();		
	},

	/**
	 * It will call the keyboard() function before drawing.
	 */
	Keyboard: function()
	{
		this.keyboard($.Input.Key, $.Input.Keyboard);
		this.begin();
		this.paint();
		this.end();
	},

	/**
	 * Draw Method for the Root Clip.
	 */
	Root: function()
	{
		// Set Clipping region.. TODO SLOW..
		if (clip)
		{
			context.beginPath();
			context.rect(clip.x, clip.y, clip.w, clip.h); 
			context.clip();
		}

		context.clearRect(0, 0, canvas.width, canvas.height);
		this.begin();
		this.paint();
		this.end();
	},

	/**
	 * Renders to render canvas then draws to main canvas. Set j5g3.prerender = true to use this method.
	 */
	RootPreRender: function()
	{
		context.clearRect(0, 0, canvas.width, canvas.height);

		this.begin();
		this.paint();
		this.end();

		if (clip)
			screen.drawImage(render, clip.x, clip.y, clip.w, clip.h, clip.x, clip.y, clip.w, clip.h);
		else
		{
			screen.clearRect(0, 0, canvas.width, canvas.height);
			screen.drawImage(render, 0, 0);
		}
	},

	/** Draws Image with no transformations only translation */
	FastImage: function()
	{
		context.drawImage(this.__source, this.__x, this.__y);
	},

	Cache: function()
	{
		context.drawImage(this.__source, this.__x, this.__y);
	}
},

Paint = 

/**
 * Paint Algorithms. Use this to draw you custom objects after all transformation are applied. Replace the Draw function
 * to add extra steps to the draw process.
 * @namespace
 */
j5g3.Paint = {

	Image: function ()
	{
		context.drawImage(this.__source, 0, 0);	
	},

	/**
	 * Drawing function for Sprites
	 */
	Sprite: function () 
	{
		var src = this.__source,
		    w = this.__width, 
		    h = this.__height
		;

		context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h);
	},

	/**
	 * Paint function for Clips and other containers.
	 */
	Container: function ()
	{
	var 
		frame = this.frame(),
		i = 0,
		l = frame.length
	;

		for (i=0; i<l;i++)
			frame[i].draw();

		if (this._playing)
			this.nextFrame();
	},

	Text: function()
	{
		context.fillText(this.__text, 0, 0);
	},

	/**
	 * Draws text using strokeText function.
	 */
	TextStroke: function()
	{
		context.strokeText(this.__text, 0, 0);
	},

	Map: function()
	{
		var map = this.__map, y = map.length, x, sprites = this.__sprites, s, cm;

		while (y--)
		{
			x = map[y].length;
			cm= map[y];

			while (x--)
			{
				s = sprites[cm[x]].__source;
				context.drawImage(s.image, s.x, s.y, s.w, s.h, x*this.__tw, y*this.__th, this.__tw, this.__th);
			}
		}
	},

	/* TODO Optimize This */
	Isometric: function()
	{
		var map = this.__map, y = 0, x, l=map.length,
		    sprites = this.__sprites, s, cm, 
		    dx = Math.round(this.__tw/2) + this.__offsetX,
		    dy = Math.round(this.__th/2) + this.__offsetY, 
		    offset 
		;

		context.translate(-dx, -dy);

		for (; y<l; y++)
		{
			x = map[y].length;
			cm= map[y];
			offset = (y%2) ? dx : -dx;

			context.translate(x*this.__tw-offset, dy);

			while (x--)
			{
				context.translate(-this.__tw, 0);
				sprites[cm[x]].draw();
			}

		}
		
	}

},

