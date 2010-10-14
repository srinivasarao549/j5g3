/*
 * Displays a Rect
 */

Rect = DisplayObject.extend({

	init: function(properties)
	{
		_extend(this, properties);
	}, 
	paint : function()
	{
		if (this.__fillStyle) context.fillStyle = this.__fillStyle;

		context.fillRect(this.__x, this.__y, this.__width, this.__height);
	}

}).properties(
{
	fillStyle: null
});

