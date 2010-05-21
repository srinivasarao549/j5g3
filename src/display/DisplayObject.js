
/**
 * Base for all classes
 */
j5g3.DisplayObject = function(properties)
{
	this._p = j5g3.Util.extend({
		x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1
	}, properties);

	this._dirty = false;

	/**
	 * Save Transform Matrix and apply transformations.
	 */
	this.begin = function(context)
	{
		context.save();
		context.globalAlpha *= this._p.alpha;
		context.translate(this.x(), this.y());
		context.scale(this.scaleX(), this.scaleY());
		context.rotate(this.rotation());
	};

	/**
	 * Restores Transform Matrix
	 */
	this.end = function(context)
	{
		context.restore();
	};

	/**
	 * Applies Transformations and paints Object in the screen.
	 * To define your custom DisplayObject class implement the paint() function. The paint function receives
	 * the current context for drawing.
	 */
	this.draw = function(context)
	{
		this.begin(context);
		this.paint(context);
		this.end(context);
	};

	this.source = function() { return this._p.source; };

	this.invalidate = function()  { this._dirty = true; }
	this.isDirty = function()  { return this._dirty; };

	this.alpha  = function(value) { return value ? (this.invalidate(), (this._p.alpha  = value), this) : this._p.alpha;  };
	this.width  = function(value) { return value ? (this.invalidate(), (this._p.width  = value), this) : this._p.width;  };
	this.height = function(value) { return value ? (this.invalidate(), (this._p.height = value), this) : this._p.height; };
	this.x      = function(value) { return value ? (this.invalidate(), (this._p.x      = value), this) : this._p.x;      };
	this.y      = function(value) { return value ? (this.invalidate(), (this._p.y      = value), this) : this._p.y;      };
	this.scaleX = function(value) { return value ? (this.invalidate(), (this._p.scaleX = value), this) : this._p.scaleX; };
	this.scaleY = function(value) { return value ? (this.invalidate(), (this._p.scaleY = value), this) : this._p.scaleY; };

	this.rotation = function(value) { return value ? (this.invalidate(), (this._p.rotation = value), this) : this._p.rotation; };

	this.align = function(alignment, container) 
	{
		switch (alignment) {
		case 'center': 	this.x(container.width() / 2); 	break;
		case 'left':    this.x(0); break;
		case 'right':   this.x(container.width() - this.width()); break;
		case 'middle':  this.y(container.height() / 2); break;
		}
	};

	/**
	 * Collision Check
	 */
	this.collidesWith = function(obj)
	{
		var dx = this.x() - obj.x();
		var dy = this.y() - obj.y();
		var w  = this.width();

		if (Math.abs(dx) > w || Math.abs(dy) > w)
			return false;

		var d2 = dx*dx + dy*dy;

		if (d2 > w*w)
			return false;

		return true;
	}
};