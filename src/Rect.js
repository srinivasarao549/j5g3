Shape = 

/**
 *
 * j5g3.Shape
 *
 * Base class for all shapes.
 *
 * @class
 * @extends j5g3.DisplayObject
 * 
 */
j5g3.Shape = DisplayObject.extend(
/** @scope j5g3.Shape.prototype */ {

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

Rect = 

/**
 *
 * j5g3.Rect
 *
 * Displays a Rect
 *
 * @class
 * @extends j5g3.Shape
 *
 */
j5g3.Rect = Shape.extend(/**@scope j5g3.Rect.prototype */{

	paint : function()
	{
		context.fillRect(this.__x, this.__y, this.__width, this.__height);
	}

}),

Dot = 
/**
 * Displays a Dot
 *
 * @class
 * @extends j5g3.Shape
 */
j5g3.Dot = Shape.extend(/**@scope j5g3.Dot.prototype */{
	/**
	 * p can be properties or lineWidth
	 */
	init: function(p)
	{
		if (typeof(p) == 'number' )
			p = { lineWidth: p };

		_extend(this, p);
	},

	paint: function()
	{
		context.strokeRect(this.x(), this.y(), 1, 1);
	}

}).properties({ lineCap: 'round', lineJoin: 'round' }),
