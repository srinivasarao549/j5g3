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
	player = game.player = new game.Player(),

	moves, time,
	/* Stats */
	stats = $.clip([[
		moves = $.text('Moves: ').pos(40, 20),
		pushes= $.text('Pushes: ').pos(40, 40),
		time  = $.text('Time: ').pos(40, 60)
	]]).fillStyle('white'),

	splash = $.image('splash').stretch(640, 480)
;
	_map.onkeyup = function() { world.loadMap(_map.value); }
	_map.onfocus = $.Input.Keyboard.release;
	_map.onblur  = $.Input.Keyboard.capture;

	world.loadMap(_map.value);

	$.root.frames([
		[ splash ],
		[ world, player, stats]
	]).stop();

	$.Input.Keyboard.waitForKey(function() { $.root.go(1); })

	$.run();

	$.Input.Keyboard.capture();
}

