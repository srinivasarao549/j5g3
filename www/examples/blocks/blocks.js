
var
	/* CONSTANTS */
	BLOCK_WIDTH = 24,
	BLOCK_HEIGHT= 24,
	BLOCK_PIECES= 7,
	BLOCK_COLORS= 9,
	PIECE_WIDTHS = [3,4,3,2,3,3,3],
	BOARD_WIDTH = 10,
	BOARD_HEIGHT= 18,

	/* Elements */
	_ss,
	audio
;

function game($)
{

	_ss = $.spritesheet('spritesheet').grid(10,2);
	audio = { 
		pop   : $.id('audio-pop'),
		slide : $.id('audio-slide'),
		rotate: $.id('audio-rotate'),
		line  : $.id('audio-line')
	}

var

	game_over = function()
	{
		$.root.add(game_over_text);

	},

	/* Gets next piece as a clip, and centers it to its origin */
	get_next = function()
	{
		return new game.Piece({ 
			piece: Math.floor(Math.random()*BLOCK_PIECES), 
			color: Math.ceil(Math.random()*BLOCK_COLORS),
			board: board
		});
	},

	go_next = function() {
		// TODO replace this please.
		var starty = { 2: -1, 3: -.5, 4: 0 }, mapY = { 2: 2, 3: 1, 4: 0 }, mapX = { 2: 0, 3: BLOCK_WIDTH/2, 4: BLOCK_WIDTH };

		if (current)
			current.nail();
		window.current = current = next.remove()
		              .x(Math.floor(BOARD_WIDTH/2)*BLOCK_WIDTH + (mapX[next.__mapWidth]))
			      .y(-BLOCK_HEIGHT*starty[next.__mapHeight])
			      .mapY(mapY[next.__mapHeight])
			      .mapX(4)
		;

		board.add(current);
		next_box.add(next = get_next());

		//debug_text.innerHTML = (board.__map.toString().match(/.{24}/g).toString().replace(/,,/g,"\n"));
	},

	gravity = function() {
		if (current.down())
			go_next();
	},

	keyboard_delay,

	keyboard = function(evt) {
		// Ignore if it is already moving. TODO hack
		if (current.__frames[0].length>1) return;

		var i = $.Input.Keyboard;
		if (i[38])
		{
			if (!keyboard_delay--)
			{
				current.rotate();
				keyboard_delay=10;
			}
		}
		else if (i[37]) current.left();
		else if (i[39]) current.right();
		else if (i[40]) { current.down();current.down();current.down();current.down();current.down();current.down(); }
		else if (i[32]) { 
			if (!keyboard_delay--)
			{
				audio.slide.currentTime=0;
				audio.slide.play();
				keyboard_delay=10;
				while (!current.down());
			}
		}
		else if (i[90]) {
			piece.rotateCC();
		}
		else
			keyboard_delay=0;
	},

	speed = 15,

	// Screen Element
	board = new game.Board({ x: 200, y: 24 }),
	background = $.image('background'),
	next = get_next(),
	current,
	next_box = $.clip({x: 48, y: 100}).add(next),
	game_over_text = $.text('Game Over').font("40px"),

	debug_text = $.id('debug-out')
;
	go_next();
	setInterval(gravity, speed);

	$.background.fillStyle('#006');
	$.root.add([background, next_box, board, keyboard]);
	$.run();
	$.Input.Keyboard.capture(true);
}

window.$ = j5g3;
