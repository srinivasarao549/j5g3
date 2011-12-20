/**
 * Sokoban Game
 */

var Sokoban = j5g3.GDK.game({

	//scenes: [ 'Splash' ] //, 'Level' ]

	setup: function()
	{
	var
		canvas = j5g3.canvas,
		stage  = j5g3.id('stage'),
		height,
		resize = function()
		{
			height = Math.round(window.innerWidth * 0.75);
			if (height > window.innerHeight)
			{
				height = Math.round(window.innerHeight * 1.25);
				canvas.style.width = height + 'px';
				canvas.style.height = window.innerHeight + 'px';
			} else
			{
				canvas.style.width = window.innerWidth + 'px';
				canvas.style.height = height + 'px';
			}
		},
		levelList = j5g3.id('level-list'),
		temp = ''
	;
		window.addEventListener('resize', resize);
		resize();

		j5g3.resolution(Sokoban.WIDTH, Sokoban.HEIGHT);

		Sokoban.assets.spritesheet.grid(8, 10);
		Sokoban.assets.spritesheet_player.grid(13, 10);

		j5g3.each(Sokoban.LEVELS, function(level, i)
		{
			temp += "<option value=" + i + ">Level " + (i+1) + "</option>";
		});

		levelList.innerHTML = temp;
		levelList.addEventListener('change', function() { 
			Sokoban.restart(this.value);
			Sokoban.chooseLevel();
		});

		j5g3.fps(1000);

	}

});


/* CONSTANTS */
j5g3.Util.extend(Sokoban, {

LEVELS: [
	
"  #####  \n###   ###\n#  $..$ #\n# # ##  #\n# # ##@##\n#  $..$# \n### #$ # \n  # . .# \n  #$# .# \n  #  $ # \n  ###  # \n    #### \n",
"###################\n#   ...  @  ...   #\n# $$$  #####  $$$ #\n##   ###   ###   ##\n ##  #       ##  #\n  ####        ####\n",
"  ####\n###  ##\n#   $ #\n# #.#@#\n# #$ .#\n#  .$ #\n##   ##\n #####\n",
"  #####\n###   ###\n# . $ . #\n# #.$.# #\n# $ # $ #\n### @ ###\n  #####",
"  #####\n  #   ###\n###.#   #\n# $.$ # #\n# #* $  #\n#@ . ####\n######",
"  #####\n  #   ##\n###$   ##\n#  .$.$ #\n# #.#.# #\n#  *$*  #\n###   ###\n  # @ #\n  #####",
"  #####  \n  #   #  \n### #$#  \n#  .$.###\n# #$+$  #\n#  .$ # #\n### #.  #\n  #   ###\n  #####  ",
"###########\n#@$   ....##\n# $$$$#....#\n# $  $..***##\n##   # ##.. #\n# $$$#  ##  #\n#    ## #  ##\n#  $$ #    #\n#     ###  #\n####### ####\n",
" ######   \n##    ##\n#  ##  #\n# #  # #\n#.  .#$##\n# # * $ #\n# # * $@#\n#  .. $ #\n#########",
"####   \n#  ####  \n#     ###\n#  #$ . #\n## #.#$ #\n#  # @* #\n#   *  ##\n####  ##\n   ####"

],

// Screen Width and Height
WIDTH: 800,// screen.width > 800 ? 800 : screen.width,
HEIGHT: 600, //screen.height > 600 ? 600 : screen.height,

// Tile Height, Width and Offset
TH: 192,
TW: 128,
TO: -48,

BOX : 24,
PLAYER : 54,
PLAYER_TARGET : 34,
PLACED_BOX : 25,
TARGET : 32,
FREE : 33,
WALLS : [ 0, 23],
EMPTY : 71,
/* Decorations */
DOOR_WEST : 40,
DOOR_EAST : 41

});

Sokoban.SPRITES = {
	0   : 71,
	" " : Sokoban.FREE,
	'@' : Sokoban.PLAYER,
	"+" : Sokoban.PLAYER_TARGET,
	"$" : 24, "." : 32, '*': Sokoban.PLACED_BOX,
	"l" : 11, "r": 10, "lr" : 10,
	"lt": 7, "lrt": 3, "rt":6,
	"lb": 8, "lrb": 1, "rb":5,
	"tb": 9, "t" : 12, "b": 9,
	"lrtb": 0, "rtb": 2, "ltb": 4,
	"desk": 14,
	"!": Sokoban.DOOR_WEST,
	"~": Sokoban.DOOR_EAST
}

Sokoban.currentLevel = 0;
Sokoban.restart = function(l)
{
	if (l)
		Sokoban.currentLevel = l;

	Sokoban.scene.Level.world.loadMap(Sokoban.LEVELS[Sokoban.currentLevel]); //j5g3.id('map').value);
	Sokoban.scene.Level.stats.reset();
}

Sokoban.chooseLevel = function()
{
var
	list = j5g3.id('choose-level')
;
	list.style.display = list.style.display ? '' : 'block';
}

var
	TH = Sokoban.TH * 0.25,
	TW = Sokoban.TW * 0.5
;
