
/**
 * Base for all classes
 */
Class(
	DisplayObject=function(properties)
	{
		//this._p = { }
		_extend(this, properties);
		this._dirty = true;
	}, 
	Object, 
	{
		source: null, parent: null, x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1
	}, 
	{
	
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
	 * To define your custom DisplayObject class implement the paint() function. The paint function receives
	 * the current context for drawing.
	 */
	draw : function()
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
	 * Default collision Algorithm is Circle (Collision Module)
	 */
	collides: Collision.Circle,

	/**
	 * Sets x and y
	 */
	pos: function(x, y)
	{
		this._p.x = x;
		this._p.y = y;

		return this.invalidate();
	},

	size: function(w, h)
	{
		this._p.width = w;
		this._p.height = h;
		return this.invalidate();
	},

	scale: function(sx, sy)
	{
		this.scaleX(sx);
		return this.scaleY(sy);
	},

	remove: function()
	{
		this.parent().remove_child(this);
	},

	visible: function()
	{
		return this._p.alpha > 0;
	}
	
});
