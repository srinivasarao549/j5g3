
/**
 * Base for all classes
 */
var DisplayObject = function(properties)
{
	this._p = { };

	$.Property.extend(this, properties);

	this._dirty = true;
};

/* METHODS */

DisplayObject.prototype = {
	
	/**
	 * Save Transform Matrix and apply transformations.
	 */
	begin : function(context)
	{
		context.save();
		context.globalAlpha *= this.alpha();
		context.translate(this.x(), this.y());
		context.scale(this.scaleX(), this.scaleY());
		context.rotate(this.rotation());
	},

	/**
	 * Restores Transform Matrix
	 */
	end : function(context)
	{
		context.restore();
	},

	/**
	 * Applies Transformations and paints Object in the screen.
	 * To define your custom DisplayObject class implement the paint() function. The paint function receives
	 * the current context for drawing.
	 */
	draw : function(context)
	{
		this.begin(context);
		this.paint(context);
		this.end(context);
	},

	invalidate : function()  
	{ 
		this._dirty = true;
	},

	isDirty : function()  
	{ 
		return this._dirty;
	},

	/**
	 * Sets position of the object according to alignment and container.
	 */
	align : function(alignment, container) 
	{
		switch (alignment) {
		case 'center': 	this.x(container.width() / 2); 	break;
		case 'left':    this.x(0); break;
		case 'right':   this.x(container.width() - this.width()); break;
		case 'middle':  this.y(container.height() / 2); break;
		}
		return this;
	},

	/**
	 * Collision Check
	 */
	collidesWith : function(obj)
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
	},

	/**
	 * Sets x and y
	 */
	pos : function(x, y)
	{
		this._p.x = x;
		this._p.y = y;
		this.invalidate();
		return this;
	}
};
/* PROPERTIES */

DisplayObject.properties = {
	source: null, parent: null, x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1
};

DisplayObject.readonly = {
};

$.Property.define(DisplayObject);

/* METHODS */


$.DisplayObject= DisplayObject;
