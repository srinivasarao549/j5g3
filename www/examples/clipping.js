/**
 * Example of clipping
 */

(function($)
{
var
	DIAMETER = $.id('ball').width,
	MAX_X = $.width - DIAMETER-4,
	MAX_Y = $.height - DIAMETER-4,

	text = $.text('Press SPACE to enable/disable clipping').pos(15, 25).font('18px Arial').fillStyle('white'),
	sprite = $.image('ball').align('center middle'),
	background = $.image('pic').stretch($.width, $.height).size($.width, $.height).cache(),

	clip_enable= false,

	onclick = function()
	{
		clip_enable = !clip_enable;
		if (clip_enable)
		{
			$.set_clipping(sprite.__x, sprite.__y, sprite.__width+4, sprite.__height+4);
		} else
			$.set_clipping(false);
	},

	onkey = function(ev)
	{
		if (ev.keyCode == 32)
			onclick();
	},

	update = function()
	{
		sprite.__x += velocity.x; 
		sprite.__y += velocity.y;

		// Check Wall Collision
		if (sprite.__x<2) {
			sprite.__x = 2;
			velocity.x = -velocity.x;
		}
		else if (sprite.__x>MAX_X) {
			sprite.__x = MAX_X;
			velocity.x = -velocity.x;
		}

		if (sprite.__y<2) { 
			sprite.__y = 2;
			velocity.y = -velocity.y;
		} else if (sprite.__y>MAX_Y) {
			sprite.__y = MAX_Y;
			velocity.y = -velocity.y;
		}
		// Set clipping
		if (clip_enable)
		{
			$.clipping.x = sprite.__x-2;
			$.clipping.y = sprite.__y-2;
		}
	},

	velocity = { x: 1, y: 1 }
;

	window.onkeypress = onkey;
	$.canvas.onclick = onclick;
	$.root.add([ update, background, sprite, text]);
	// Max FPS
	$.fps(1000).run();
})
