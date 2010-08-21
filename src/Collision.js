/**
 * Collision Module Algorithsm
 */

Collision = {

	/**
	 * Circle Collision detection algorithm.
	 */
	Circle: function(b) 
	{
		var dx = this.x() - b.x(),
		    dy = this.y() - b.y(),
		    w  = this.width()
		;

		if (Math.abs(dx) > w || Math.abs(dy) > w)
			return false;

		var d2 = dx*dx + dy*dy;

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
