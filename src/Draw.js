

/**
 * This are all the core drawing algorithms. "this" will point to the DisplayObject.
 */
var Draw = $.Draw =  
{
	Image: function (context)
	{
		context.drawImage(this._p.source, 0, 0);	
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

};

