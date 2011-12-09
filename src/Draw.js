

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
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.begin();
		this.paint();
		this.end();
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

	ImageData: function()
	{
		context.putImageData(this.__source, 0, 0);
	},
	
	/**
	 * Drawing function for Sprites
	 */
	Sprite: function () 
	{
		var src = this.source(), 
		    w = this.width(), 
		    h = this.height()
		;

		context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h);
	},

	/**
	 * Paint function for Clips and other containers.
	 */
	Container: function ()
	{
		var frame = this.frame(),i=0,l=frame.length;

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
		    tw2 = Math.round(this.__tw/2) + this.__offsetX,
		    th2 = Math.round(this.__th/2) + this.__offsetY, 
		    offset
		;

		for (; y<l; y++)
		{
			x = map[y].length;
			cm= map[y];
			offset = (y%2)*tw2;

			while (x--)
			{
				s = sprites[cm[x]].__source;
				context.drawImage(s.image, s.x, s.y, s.w, s.h, 	x*this.__tw-offset, y*th2, this.__tw, this.__th);
			}
		}
		
	}



},

