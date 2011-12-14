
(function ($, document, undefined) {

var 
	/* Elements */
	canvas = $.canvas,

	/* Constants */
	rand = $.rand,

	MAX_BALLS = 77,
	DIAMETER = $.id('ball').width,
	MAX_SPEED = 5,
	WIDTH = canvas.width,
	HEIGHT= canvas.height,
	MAX_X = WIDTH-DIAMETER,
	MAX_Y = HEIGHT-DIAMETER,

	Ball = $.Image.extend({
	
		init: function(i)
		{
			this.source('ball')
				.pos(rand(MAX_X), rand(MAX_Y))
			;
			this.velocity = { x: rand(MAX_SPEED), y: rand(MAX_SPEED) }
			this.i = i;
		},

		collide: function(obj)
		{
		var 
			velocity = this.velocity,
			dx = this.__x - obj.__x,
			dy = this.__y - obj.__y,
			dvx = velocity.x - obj.velocity.x,
			dvy = velocity.y - obj.velocity.y,
			mag = dvx * dx + dvy * dy
		;

			if (mag > 0)
				return;

			var d2 = dx*dx + dy*dy;

			mag /= d2;

			dvx = dx * mag;
			dvy = dy * mag;

			velocity.x -= dvx;
			velocity.y -= dvy;

			obj.velocity.x += dvx;
			obj.velocity.y += dvy;
		},

		draw: function()
		{
		var
			j= MAX_BALLS-1
		;
			this.__x += this.velocity.x; 
			this.__y += this.velocity.y;

			// Check Wall Collision
			if (this.__x<0) {
				this.__x = 0;
				this.velocity.x = -this.velocity.x;
			}
			else if (this.__x>MAX_X) {
				this.__x = MAX_X;
				this.velocity.x = -this.velocity.x;
			}

			if (this.__y<0) { 
				this.__y = 0;
				this.velocity.y = -this.velocity.y;
			} else if (this.__y>MAX_Y) {
				this.__y = MAX_Y;
				this.velocity.y = -this.velocity.y;
			}

			for (; j>this.i; j--)
				if (this.collides(objs[j]))
					this.collide(objs[j]);
			
			$.Draw.FastImage.apply(this);
		}
	}),

	objs
;
	$.fps(1000);

	for (i = 0; i < MAX_BALLS; i++)
		$.root.add(new Ball(i));
	objs = $.root.frame();

	$.run();
})

