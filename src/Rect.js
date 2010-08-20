/*
 * Displays a Rect
 */

Class(
	Rect = function(properties)
	{
		_extend(this, properties);
	}, 
	DisplayObject,
	{
		fillStyle: null
	},
	{
		paint : function()
		{
			if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;

			context.fillRect(this._p.x, this._p.y, this._p.width, this._p.height);
		}
	}
);

