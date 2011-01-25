
var game = function($, document, undefined) {

	/* Classes used */
var 
	Image = $.Image,

	/* Functions */
	rand = Math.random,
	max_balls = 77,

	/* Elements */
	canvas = $.canvas(),

	Ball = Image.extend({
	
		init: function()
		{
			this.source('ball');

			var max_speed = 5,
			    diameter  = this.width(),
			    velocity  = { x: rand() * max_speed, y: rand() * max_speed },
			    radius    = diameter / 2,
			    i=0,
			    self=this,

			    checkCollision = function(coord, limit)
			    {
				var v = self[coord]();
				
				if (v<0)
					self[coord](0);
				else if (v > limit-diameter)
					self[coord](limit - diameter);
				else
					return;

				velocity[coord] = -velocity[coord]; 
			    }, 

			    collide = function(obj)
			    {
				var dx = self.__x - obj.__x,
				    dy = self.__y - obj.__y,
				    dvx = velocity.x - obj.velocity.x,
				    dvy = velocity.y - obj.velocity.y,
				    mag = dvx * dx + dvy * dy;
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
			    }
			;

			this.x(rand() * (canvas.width  -diameter));
			this.y(rand() * (canvas.height -diameter));
			this.velocity = velocity;
			this.collide  = collide;
					
			this.paint = function()
			{
				this.__x = this.__x + velocity.x; 
				this.__y = this.__y + velocity.y;

				// wall collission
				checkCollision('x', canvas.width);
				checkCollision('y', canvas.height);
				
				$.Draw.Image.apply(this);
			};
		}
	}),
	update = function()
	{
		var j, i=max_balls;

		while (i--)
		{
			j=i;
			while (j--)
				if (objs[i].collides(objs[j]))
					objs[i].collide(objs[j]);
		}
	},
	objs

;
	$.fps(1000);

	for (i = 0; i < max_balls; i++)
		$.root.add(new Ball());
	objs = $.root.frame();

	$.root.add(update);
	$.run();

};
