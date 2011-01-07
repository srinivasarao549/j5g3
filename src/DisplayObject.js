
/**
 * Base for all classes
 */
DisplayObject = Class.extend({

	init: function(properties)
	{
		_extend(this, properties);
		this._dirty = true;
		this.__apply_transform = function() { };
	}, 

	/**
	 * Save Transform Matrix and apply transformations.
	 */
	begin: function()
	{
		context.save();
		context.globalAlpha *= this.alpha();
		context.translate(this.x(), this.y());
		context.scale(this.scaleX(), this.scaleY());
		context.rotate(this.rotation());

		if (this.__skewX)
			context.transform(1, 0, Math.tan(this.__skewX), 1, 0, 0);
		if (this.__skewY)
			context.transform(1, Math.tan(this.__skewY), 0, 1, 0, 0);

		this.__apply_transform();
	},

	/**
	 * Restores Transform Matrix
	 */
	end: function()
	{
		context.restore();
	},

	/**
	 * Applies Transformations and paints Object in the screen.
	 * To define your custom DisplayObject class implement the paint() function.
	 */
	draw: function()
	{
		this.begin();
		this.paint();
		this.end();
	},

	invalidate : function()  
	{ 
		this._dirty = true;
		return this;
	},

	is_dirty : function()  
	{ 
		return this._dirty;
	},

	/**
	 * Sets position of the object according to alignment and container.
	 */
	align: function(alignment, container) 
	{
		switch (alignment) {
		case 'center': 	this.x(container.width() / 2); 	break;
		case 'left':    this.x(0); break;
		case 'right':   this.x(container.width() - this.width()); break;
		case 'middle':  this.y(container.height() / 2); break;
		case 'origin':  this.pos(-this.width()/2, -this.height()/2); break;
		case 'origin top': this.pos(-this.width()/2, -this.height()); break;
		case 'origin bottom': this.pos(-this.width()/2, 0); break;
		}
		return this;
	},

	/**
	 * Default collision Algorithm is Circle (Collision Module)
	 */
	collides: Collision.Circle,

	/**
	 * Sets x and y
	 */
	pos: function(x, y)
	{
		this.__x = x;
		this.__y = y;

		return this.invalidate();
	},

	size: function(w, h)
	{
		this.__width = w;
		this.__height = h;
		return this.invalidate();
	},

	scale: function(sx, sy)
	{
		this.scaleX(sx);
		return this.scaleY(sy);
	},

	/** 
	 * Multiplies current Transformation matrix with the passed matrix values. 
	 * This is applied after rotation, scaling and translation
	 */
	transform: function(a, b, c, d, e, f)
	{
		this.__apply_transform = function() { context.transform(a, b, c, d, e, f); };		
		return this;
	},

	/**
	 * Skews an Image in the x and y axis. Value is in radians.
	 */
	skew: function(x, y)
	{
		return this.skewX(x).skewY(y);
	},

	/**
	 * Moves Display Object relative to the current position
	 */
	move: function(x, y)
	{
		this.__x += x;
		this.__y += y;
		return this;
	},

	remove: function()
	{
		this.parent().remove_child(this);
	},

	visible: function()
	{
		return this.__alpha > 0;
	},

	getContext: function()
	{
		return context;
	}
	
}).properties({
	source: null, parent: null, x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1,
	skewX: null, skewY: null
});
