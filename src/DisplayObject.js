
DisplayObject = 

/**
 * @class Base for all classes
 *
 */
j5g3.DisplayObject = Class.extend(/** @scope j5g3.DisplayObject.prototype */ {

	init: function(properties)
	{
		_extend(this, properties);
	}, 

	_dirty: true,
	_apply_transform: function() { },

	/**
	 * Save Transform Matrix and apply transformations.
	 */
	begin: function()
	{
	var
		me = this
	;
		context.save();
		context.globalAlpha *= me.__alpha;
		context.translate(me.__x, me.__y);
		context.scale(me.__scaleX, me.__scaleY);
		context.rotate(me.__rotation);

		if (me.__skewX)
			context.transform(1, 0, Math.tan(me.__skewX), 1, 0, 0);
		if (me.__skewY)
			context.transform(1, Math.tan(me.__skewY), 0, 1, 0, 0);

		me._apply_transform();
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

	/**
	 * Sets object to dirty and forces paint
	 *
	 * @returns this
	 */
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
	 *
	 * @type {Function}
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
		this._apply_transform = function() { context.transform(a, b, c, d, e, f); };		
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
		return this;
	},

	visible: function()
	{
		return this.__alpha > 0;
	}
	
}).properties(/**@scope j5g3.DisplayObject.prototype */{
	
	/** @type {Image} Used by the draw function to paint the object */
	source: null, 

	/** @type {j5g3.DisplayObject} Parent */
	parent: null, 
	/** @type {Number} X position */
	x: 0, 
	/** @type {number} Y position */
	y:0, 
	/** @type {Number} Width */
	width: null, 
	/** @type {Number} Height */
	height: null, 
	/** @type {Number} Rotation */
	rotation: 0, 
	/** @type {Number} X Scale */
	scaleX: 1, 
	/** @type {Number} Y Scale */
	scaleY: 1, 
	/** @type {Number} Alpha transparency value */
	alpha: 1,
	/** @type {Number} Skew the object horizontally */
	skewX: null, 
	/** @type {Number} Skew the object vertically */
	skewY: null
}),
