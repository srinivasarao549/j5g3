
(function ($)
{
	// CHange collision mode to AABB
	$.Sprite.prototype.collides = $.Collision.AABB;

	var 
		MAXW = 640,
		MAXH = 480,
	    maxvx = 12,
	    ss = $.spritesheet($.id('pong-ss')),
	    player   = ss.cut(8, 8, 8, 40).pos(20, MAXH/2-10),
	    computer = ss.cut(8, 54, 8, 40 ).pos(MAXW-20, MAXH/2-10),
	    ball     = ss.cut(24, 8, 8, 8).pos(MAXW/2, MAXH/2),

	    score1 = $.text({ text: "0", x: MAXW/2 - 50, y: 10, font: '14px' }),
	    score2 = $.text({ text: "0", x: MAXW/2 + 50, y: 10, font: '14px' }),

	    p = $.physics({ target: ball, vx: -maxvx, vy: 0 }),
	    restart = function(winner)
	    {
	    	winner.text(parseInt(winner.text()) + 1);
		ball.x(MAXW/2).y(MAXH/2);
		p.__vx = -maxvx;
		p.__vy = 0; //[ -maxvx, 0, 1 ]);
		player.y(MAXH/2-10);
		computer.y(MAXH/2-10);
		computer.v = 0;
	    },

	    sound_play = function()
	    {
	    	sound.currentTime = 0;
		sound.play();
	    },

	    wall = function(newy)
	    {
	    	ball.y(newy);
		p.force(0, -2 * p.__vy);
		sound_play();
	    },
	    update = function()
	    {
	    	if (ball.collides(player))
		{
			ball.x(player.x()+8);
			p.__vx = maxvx;
			p.force(0, player.F);
			sound_play();
		} else if (ball.collides(computer))
		{
			ball.x(computer.x()-8);
			p.__vx = -maxvx;
			p.force(0, computer.a);
			sound_play();
		} else if (ball.x() < 0)
			restart(score2);
		else if (ball.x() > MAXW)
			restart(score1);
		else if (ball.y() <= 0)
			wall(0);
		else if (ball.y() >= MAXH)
			wall(MAXH);

		player.F = 0;
	    },

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

	    mouse = function(evt)
	    {
	    	var yi = player.y(), yf;
	    	player.y(yf = evt.offsetY-20);
		// Calculate force, t = 1 frame, m = 1
		player.F = (yf-yi)/3; 
	    },

	    sound = $.id('pong');
	;

	player.F = 0;
	computer.v = 0;
	sound.volume = 0.2;

	$.canvas.onmousemove = mouse;
	$.fps(32);

	$.root.add([ player, computer, ball, score1, score2, p, update, ai]);
	$.run();
})
