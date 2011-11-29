
function pong($, document)
{

var
	// Constants
	MAXW = $.width,
	MAXH = $.height,
	MAXVX = 8,

	// Create our spritesheet. The j5g3.Spritesheet constructor takes an object string or a DOM Object.
	// j5g3.id returns the DOM object with the specified id.
	ss = $.spritesheet($.id('pong-ss')),

	// Create our game entities. The cut method of j5g3.Spritesheet will return a j5g3.Clip.
	player   = ss.cut(8, 8, 8, 40).x(20),
	computer = ss.cut(8, 54, 8, 40 ).x(MAXW-20),
	ball     = ss.cut(24, 8, 8, 8),

	// We will create two j5g3.Text objects to display the score.
	score1 = $.text({ text: "0", x: MAXW/2 - 50, y: 10, font: '14px' }),
	score2 = $.text({ text: "0", x: MAXW/2 + 50, y: 10, font: '14px' }),

	// We create our j5g3.Physics object to control the movement of the ball
	p = $.physics({ target: ball }),

	// Our sound object.
	sound = $.id('pong-sound'),

	// Reset Position and States.
	start = function(winner)
	{
		if (winner) winner.text(parseInt(winner.text()) + 1);

		ball.x(MAXW/2).y(MAXH/2);
		p.v(-MAXVX, 0);

		player.y(MAXH/2-10);
		computer.y(MAXH/2-10);

		player.F = 0;
		computer.v = 0;
	},

	sound_play = function()
	{
		sound.currentTime = 0;
		sound.play();
	},

	// This is our update function. Most of the game logic will be here.
	update = function()
	{
		// Check collission with players
	    	if (ball.collides(player))
		{
			ball.x(player.x()+8);
			p.vx(MAXVX).force(0, player.F);
			sound_play();

		} else if (ball.collides(computer))
		{
			ball.x(computer.x()-8);
			p.vx(-MAXVX).force(0, computer.a);
			sound_play();

		} 
		// Check winning condition
		else if (ball.x() < 0)
			start(score2);
		else if (ball.x() > MAXW)
			start(score1);
		// Check collission with walls
		else if (ball.y() <= 0)
			wall(0);
		else if (ball.y() >= MAXH)
			wall(MAXH);

		player.F = 0;
	},

	wall = function(newy)
	{
		ball.y(newy);
		p.force(0, -2 * p.__vy);
		sound_play();
	},

	// this function will contain our AI code
	ai = function()
	{
		var by = ball.y(), vx = p.__vx, y = computer.y()+computer.height()/2, a=0;

		if (vx > 0)
		{
			if (computer.y() <5) computer.y(5);
			else if (computer.y()>MAXH-20) computer.y(MAXH-20);
			else if (by > y+4) a = 2;
			else if (by < y-4) a = -2;

			if (a)
			{
				computer.v += a;
				computer.y(computer.y() + computer.v);
				computer.a = a;
				return;
			}
		} 

		computer.v = 0;
		computer.a = 0;
	},

	// Our Mouse Event Handler
	mouse = function(evt)
	{
		var yi = player.y(), yf;
		player.y(yf = evt.offsetY-20);
		// Calculate force, t = 1 frame, m = 1
		player.F = (yf-yi)/3; 
	}

;
	// Set our sound volume
	sound.volume = 0.2;

	ball.collides = $.Collision.AABB;

	start();

	// Add our mouse event listener to the canvas.
	$.canvas.addEventListener('mousemove', mouse);
	// Set our Frames per second to 32
	$.fps(32);

	// Add all of our game entities to the Root Clip
	$.root.add([ player, computer, score1, score2, ball, p, ai, update ]);

	$.canvas.onclick = function()
	{
		$.run();
	}
}
