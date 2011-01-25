/**
 * Collision Module Algorithsm
 */

Collision = {
	
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
		    w  = this.width(),
		    d2
		;

		if (Math.abs(dx) > w || Math.abs(dy) > w)
			return false;

		d2 = dx*dx + dy*dy;

		return (d2 <= w*w);
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
	}

};
