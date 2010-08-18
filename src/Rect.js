
var Rect = function(properties)
{
	Property.extend(this, properties);

	this.fillStyle = function(value) { return value ? (this.invalidate(), (this._p.fillStyle = value), this) : this._p.fillStyle; };

	this.paint = function(context) {
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		context.fillRect(this._p.x, this._p.y, this._p.width, this._p.height);
	};
};

Rect.prototype = new DisplayObject;

$.Rect = Rect;

