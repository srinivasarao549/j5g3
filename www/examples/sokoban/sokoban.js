/**
 * Sokoban Game
 */

function game($, document, undefined)
{
var
	_map = $.id('map'),

	/* Game Objects */
	player, world
;
	_map.onkeyup = function() { world.loadMap(_map.value); }

	player = new game.Player();
	world  = new game.World();

	world.loadMap(_map.value);

	player.pos(world.startPos[0], world.startPos[1]);

	$.root.add(world);
	$.run();
}

