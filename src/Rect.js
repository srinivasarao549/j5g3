/*
 * Displays a Rect
 */

var Rect = function(properties)
{
	Property.extend(this, properties);
};

$.Rect = Util.inherits(DisplayObject, Rect, {
	fillStyle: null
});

/* METHODS */
Rect.prototype.paint = function(context)
{
	if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;

	context.fillRect(this._p.x, this._p.y, this._p.width, this._p.height);
};

