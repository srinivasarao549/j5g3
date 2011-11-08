/**
 * Sokoban Game
 */

function game($, document, undefined)
{
var

	// Spritesheet
	_map,

	/* Game Objects */
	player, world,
	prev, prevv
;

	_map = $.id('map');
	_map.onkeyup = function() { world.loadMap(_map.value); }

	player = new game.Player();
	world  = new game.World();

	world.loadMap(map.value);
	//world.loadMap("         \n        "); //  \n  \n  \n  ");
	$.canvas.onmousemove = function(evt) {
	var 
		p = world.getCoord(evt.offsetX, evt.offsetY),
		x = p[0], y = p[1],
		map = world.__map
	;
		if (prevv)
			map[prev[1]][prev[0]] = prevv;

		if (y < map.length && x < map[y].length)
		{
			prev = p;
			prevv= map[p[1]][p[0]];

			map[p[1]][p[0]] = 4;
		}
	};
	$.root.add(world);

	$.run();

}

