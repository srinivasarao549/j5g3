/**
 * Sokoban Game
 */

var Sokoban = j5g3.GDK.game({

	//scenes: [ 'Splash' ] //, 'Level' ]

	setup: function()
	{
	var
		canvas = j5g3.canvas,
		height,
		resize = function()
		{
			height = Math.round(window.innerWidth * 0.75);
			if (height > window.innerHeight)
			{
				height = Math.round(window.innerHeight * 1.25);
				canvas.style.width = height + 'px';
				canvas.style.height = window.innerHeight + 'px';
				canvas.style.marginTop = 0;
			} else
			{
				canvas.style.width  = window.innerWidth + 'px';
				canvas.style.height = height + 'px';
				// Center Vertically!
				canvas.style.marginTop = (window.innerHeight - height)/2 + 'px';
			}
		}
	;
		window.addEventListener('resize', resize);
		resize();
		canvas.width = Sokoban.WIDTH;
		canvas.height= Sokoban.HEIGHT;

		Sokoban.assets.spritesheet.grid(8, 10);
		Sokoban.assets.spritesheet_player.grid(13, 10);
	}

});

Sokoban.LEVELS = [
	
"  #####  \n###   ###\n#  $..$ #\n# # ##  #\n# # ##@##\n#  $..$# \n### #$ # \n  # . .# \n  #$# .# \n  #  $ # \n  ###  # \n    #### \n"

];

Sokoban.WIDTH = 800;
Sokoban.HEIGHT= 600;

Sokoban.TH = 192;
Sokoban.TW = 128;
Sokoban.TO = -48;

Sokoban.SPRITES = {
	0   : 71,
	" " : 33, '@': 33,
	"$" : 24, "." : 32, '*': 13,
	"l" : 10, "r": 10, "lr" : 10,
	"lt": 7, "lrt": 3, "rt":6,
	"lb": 8, "lrb": 1, "rb":5,
	"tb": 9, "t" : 14, "b": 20,
	"lrtb": 0, "rtb": 2, "ltb": 4
}

Sokoban.BOX = 24;
Sokoban.PLACED_BOX = 25;
Sokoban.TARGET = 32;
Sokoban.FREE = 33;
Sokoban.WALLS = [ 0, 23];
Sokoban.EMPTY = 71;

var
	TH = Sokoban.TH * 0.25,
	TW = Sokoban.TW * 0.5
;
