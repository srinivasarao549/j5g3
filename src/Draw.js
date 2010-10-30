

/**
 * This are all the core drawing algorithms. "this" will point to the DisplayObject.
 */
Draw =  
{
	Void: function() { },

	Image: function ()
	{
		context.drawImage(this.__source, 0, 0);	
	},
	
	/**
	 * Drawing function for Clips
	 */
	Sprite: function () 
	{
		var src = this.source(), 
		    w = this.width(), 
		    h = this.height()
		;

		context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h);
	},

	Container: function ()
	{
		var frame = this.frame(),i=0,l=frame.length;

		for (i=0; i<l;i++)
			frame[i].draw();
	},

	Text: function()
	{
		context.fillText(this.text(), 0, 0);
	}

};

