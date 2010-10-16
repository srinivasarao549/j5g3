/*
 * Displays a Rect
 */

Shape = DisplayObject.extend({
	begin: function()
	{
		DisplayObject.prototype.begin.apply(this);

		if (this.__fillStyle) context.fillStyle = this.__fillStyle;
		if (this.__strokeStyle) context.strokeStyle = this.__strokeStyle;
		if (this.__lineWidth) context.lineWidth = this.__lineWidth;
		if (this.__lineCap) context.lineCap = this.__lineCap;
		if (this.__lineJoin) context.lineJoin = this.__lineJoin;
		if (this.__miterLimit) context.miterLimit = this.__miterLimit;
	}
}).properties(
{
	fillStyle: undefined, strokeStyle: undefined, lineWidth: undefined, lineCap: undefined, lineJoin: undefined,
	miterLimit: undefined
});

Rect = Shape.extend({
	paint : function()
	{
		context.fillRect(this.__x, this.__y, this.__width, this.__height);
	}
});

/*
 * Displays a Dot
 */
Dot = Shape.extend({
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
		context.moveTo(this.x(), this.y());
		context.lineTo(this.x(), this.y());
	}
});
