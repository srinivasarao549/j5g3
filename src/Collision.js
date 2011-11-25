
Collision = 

/**
 * Collision Module Algorithsm
 *
 * @namespace
 */
j5g3.Collision = {
	
	/**
	 * Determines if point is inside object.
	 */
	Point: function(x, y)
	{
		var ox = this.x(), oy = this.y();

		return (x >= ox && x <= ox+this.width()) &&
		       (y >= oy && y <= oy+this.height());		
	},

	/**
	 * Circle Collision detection algorithm.
	 */
	Circle: function(b) 
	{
		var dx = this.__x - b.__x,
		    dy = this.__y - b.__y,
		    w  = this.__width
		;

		return (dx*dx+dy*dy <= w*w);
	},

	/**
	 * AABB Test
	 */
	AABB: function(b)
	{
		var ax = this.x(),
		    ay = this.y(),
		    bx = b.x(),
		    by = b.y()
		;

		return (ax+this.width() >= bx && ax <= bx+b.width()) && (ay+this.height() > by && ay <= by+b.height());
	},

	Box: function(b)
	{
		return !((b.__x > this.__x+this.__width) || 
		       (b.__x+b.__width < this.__x) ||
		       (b.__y > this.__y+this.__height) ||
		       (b.__y + b.__height < this.__y))
		;
	}

},
