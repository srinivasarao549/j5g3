
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
		context.translate(me.__x, me.__y);
		context.scale(me.__scaleX, me.__scaleY);

		if (me.__alpha!==1) context.globalAlpha *= me.__alpha;
		if (me.__rotation) context.rotate(me.__rotation);
		if (this.__fillStyle) context.fillStyle = this.__fillStyle;
		if (this.__strokeStyle) context.strokeStyle = this.__strokeStyle;
		if (this.__font) context.font = this.__font;

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
	 * To define your custom DisplayObject class implement the paint() function. Replace this function if 
	 * you need to add extra functionality to the draw process, ie: transformations or keyboard handling.
	 */
	draw: Draw.Default,

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
		container = container || this.__parent;

		switch (alignment) {
		case 'center': 	this.x(container.width() / 2); 	break;
		case 'left':    this.x(0); break;
		case 'right':   this.x(container.width() - this.width()); break;
		case 'middle':  this.y(container.height() / 2); break;
		case 'center middle': this.pos(container.width()/2, container.height()/2); break;
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
	},

	/**
	 * Sets the scaleX and scaleY properties according to w and h
	 */
	stretch: function(w, h)
	{
		return this.scale(w / this.__width, h/this.__height);
	},

	/**
	 * Encloses Object into a Clip.
	 */
	to_clip: function()
	{
		return $.clip([[ this ]]);
	},

	/**
	 * Caches content to ImageData
	 */
	cache: function(w, h)
	{
	var 
		me = this,
		pc = context
	;
		w = w || me.__width;
		h = h || me.__height;
		// TODO This might be dangerous
		cache.width = me.__x + w;
		cache.height= me.__y + h;

		context = cache.getContext('2d');

		me.clear_cache();

		me.draw();
		me.__source = context.getImageData(me.__x, me.__y, w, h);
		me._oldPaint= me.paint;
		me.paint = Paint.ImageData;

		context = pc;

		return this;
	},

	/**
	 * Restores Paint Method
	 */
	clear_cache: function()
	{
		if (this._oldPaint)
			this.paint = this._oldPaint;
	}
	
}).properties(/**@scope j5g3.DisplayObject.prototype */{
	
	/** @type {Image} Used by the draw function to paint the object */
	source: null, 

	/** 
	 * Parent
	 * @type Object
	 */
	parent: null, 
	/** @type {number} X position */
	x: 0, 
	/** @type {number} Y position */
	y: 0, 
	/** @type {number|null} Width */
	width: null, 
	/** @type {number|null} Height */
	height: null, 
	/** @type {number} Rotation */
	rotation: 0, 
	/** @type {number} X Scale */
	scaleX: 1, 
	/** @type {number} Y Scale */
	scaleY: 1, 
	/** @type {number} Alpha transparency value */
	alpha: 1,
	/** @type {number|null} Skew the object horizontally */
	skewX: null, 
	/** @type {number|null} Skew the object vertically */
	skewY: null,
	
	strokeStyle: null, fillStyle: null, font: null 
}),
