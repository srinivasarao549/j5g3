/**
 * Sokoban Game
 */

function game($, document, undefined)
{
var
	_map = $.id('map'),
	ss = game.ss = j5g3.spritesheet('ss').grid(12,6),

	/* Game Objects */
	world  = game.world  = new game.World(),
	player = game.player = new game.Player()
;
	_map.onkeyup = function() { world.loadMap(_map.value); }
	_map.onfocus = $.Input.Keyboard.release;
	_map.onblur  = $.Input.Keyboard.capture;

	world.loadMap(_map.value);

	$.root.add([world, player]);
	$.run();

	$.Input.Keyboard.capture();
}

