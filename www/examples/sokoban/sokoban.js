/**
 * Sokoban Game
 */

function game($, document, undefined)
{
	game.spritesheet = $.spritesheet('ss').grid(12, 6);

	$.root.frames([
		/* SPLASH SCREEN */
		[ 
			splash = $.image('splash').stretch(640, 480)
		],
		/* LEVEL SCENE */
		[
			game.world  = new game.World(),
			game.player = new game.Player(),
			game.stats = new game.Stats()
		]
	]).stop();

	game.world.loadMap($.id('map').value);

	$.Input.Keyboard.waitForKey(function() { 
		start_time = new Date;
		$.root.go(1); 
	})

	$.run();

	$.Input.Keyboard.capture();
}

