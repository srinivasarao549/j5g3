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

	getIsoSize: function()
	{
	var
		map = this.__data,
		w = map[0].length, h = map.length
	;
		return { w: w+h+1, h: Math.ceil(h/2+w/2)+1 }
	},

	/** Transform 2D Map to Isometric */
	transform: function()
	{
	var 
		map = this.__data,
		x = map[0].length, y = map.length, 
		l = y, n,
		out = j5g3.ary(Math.ceil(y/2 + x/2), x+y, 71) 
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
		maxy = maxy || this.__data.length
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
		return this.__data[y][x];
	},

	/** Sets Data at x, y */
	set: function(x, y, val)
	{
		this.__data[y][x] = val;
		/*
		var s = this.__data[y];
		this.__data[y] = s.substr(0, x) + val + s.substr(x+1);
		*/
		return this;
	}

}).properties({
	data: null, maxX: 0, maxY: 0
});

