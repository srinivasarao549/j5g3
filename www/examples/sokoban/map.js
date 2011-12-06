/**
 * Isometric Map
 *
 */

Sokoban.Map = j5g3.Class.extend({

	init: function(p)
	{
		if (p instanceof Array)
			this.data(p);

		//this._super(p);
	},

	/** Transform 2D Map to Isometric */
	transform: function()
	{
	var 
		map = this.__data,
		ss = Sokoban.assets.spritesheet.__sprites,
		x, y = map.length, 
		l = y*2-1, n,
		out = j5g3.ary(l, l, 71) 
	;
		while (y--)
			for (x=0; x < map[y].length; x++)
			{
				n = this.getXY(x, y, l);
				out[n.y][n.x] = map[y][x];
			}

		return out;
	},

	/** Translates X and Y to Isometric */
	getXY: function(x, y, maxy)
	{
	var
		ny = x+y,
		nx = Math.floor((maxy-y)/2) + Math.round(x/2)
	;
		if ((y&1) && !(ny&1)) 
			nx--;

		return { x: nx, y: ny }
	},

	/** Gets Data at X, Y */
	get: function(x, y)
	{
		return this.omap[y][x];
	},

	/** Sets Data at x, y */
	set: function(x, y, val)
	{
		var s = this.omap[y];
		this.omap[y] = s.substr(0, x) + val + s.substr(x+1);
		return this;
	}

}).properties({
	data: null, maxX: 0, maxY: 0
});

