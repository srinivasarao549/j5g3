/**
 * Sokoban Game
 */

function game($, document, undefined)
{
var
	_map,

	/* Game Objects */
	player, world
;
	_map = $.id('map');
	_map.onkeyup = function() { world.loadMap(_map.value); }

	player = new game.Player();
	world  = new game.World();

	world.loadMap(map.value);

	$.root.add(world);
	$.run();
}

