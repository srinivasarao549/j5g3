
(function ($)
{
var
	/** @const */ MAP_WIDTH = 11,
	/** @const */ MAP_HEIGHT= 33,

	terrain = $.spritesheet('iso-terrain').grid(10, 10, 1),

	i, a,
	pt, x, y, prev,

	/* Initialize Map to zero so the animation is possible */
	mapa = $.ary(MAP_WIDTH, MAP_HEIGHT, 0), 
	rand = $.irand,

	/**
	 * points Array of points to modify. [x, y, sprite_index array]
	 */
	expand = function(points)
	{
		var pts = [];

		a = points.length;
		while (a--) {
			pt = points[a];
			x  = pt[0]; y=pt[1];

			if (mapa[y][x])
				continue;

			mapa[y][x]= pt[2][rand(pt[2].length)];
			i=y%2;


			if (x>0 && y>0) pts.push([x-i, y-1, pt[2]]);
			if (y>0 && x<MAP_WIDTH-1+i) pts.push([x+1-i, y-1, pt[2]]);

			if (x<MAP_WIDTH-1+i && y<MAP_HEIGHT-1) pts.push([x+1-i, y+1, pt[2]]);
			if (y<MAP_HEIGHT-1 && x>0) pts.push([x-i,y+1, pt[2]]);
		}

		if (pts.length)
			setTimeout(function() { expand(pts); }, 250);
	},

	/* Generate a 11x30 map */
	genmap = function()
	{
		expand([
			[ rand(MAP_WIDTH), rand(MAP_HEIGHT), [6, 7]],
		        [ rand(MAP_WIDTH), rand(MAP_HEIGHT), [2, 3]],
			[ rand(MAP_WIDTH), rand(MAP_HEIGHT), [4, 5]],
			[ rand(MAP_WIDTH), rand(MAP_HEIGHT), [8, 9]]
		]);
	},

	map = $.map({ x: -32, y: -16, sprites: terrain.sprites(), th: 32, tw:64, 'map': mapa, offsetX: -1, offsetY: -1})
;
	
	/*$.canvas.onmousemove = function(evt)
	{
		var p = map.getIsometricCoords(evt.offsetX, evt.offsetY); 
		if (prev)
			map.__map[prev.y][prev.x] = prevv;

		prev = p;
		prevv= map.__map[p.y][p.x];

		map.__map[p.y][p.x] = 2;
	}*/

	map.paint = $.Paint.Isometric;
	$.root.add([map]);
	setTimeout(genmap, 250);
	$.run();
})
