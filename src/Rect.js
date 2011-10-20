/**
 *
 * j5g3.Shape
 *
 * Base class for all shapes.
 * 
 */
Shape = $.Shape = DisplayObject.extend({

	begin: function()
	{
		var me = this;

		DisplayObject.prototype.begin.apply(me);

		if (me.__fillStyle) context.fillStyle = me.__fillStyle;
		if (me.__strokeStyle) context.strokeStyle = me.__strokeStyle;
		if (me.__lineWidth) context.lineWidth = me.__lineWidth;
		if (me.__lineCap) context.lineCap = me.__lineCap;
		if (me.__lineJoin) context.lineJoin = me.__lineJoin;
		if (me.__miterLimit) context.miterLimit = me.__miterLimit;
	}

}).properties(
{
	fillStyle: 0, strokeStyle: 0, lineWidth: 0, lineCap: 0, lineJoin: 0, miterLimit: 0
}),

/**
 *
 * j5g3.Rect
 *
 * Displays a Rect
 *
 */
Rect = $.Rect = Shape.extend({

	paint : function()
	{
		context.fillRect(this.__x, this.__y, this.__width, this.__height);
	}

}),

/*
 * Displays a Dot
 */
Dot = $.Dot = Shape.extend({
	/**
	 * p can be properties or lineWidth
	 */
	init: function(p)
	{
		if (typeof(p)!='object')
			p = { lineWidth: p };

		_extend(this, p);
	},
	paint: function()
	{
		context.strokeRect(this.x(), this.y(), 1, 1);
	}

}).properties({ lineCap: 'round', lineJoin: 'round' }),
