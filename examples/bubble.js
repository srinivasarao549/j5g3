
var game = function(engine, undefined) {

	/* Classes used */
var 
	Image = j5g3.Image,

	/* Functions */
	rand = Math.random,
	max_balls = 10,

	/* Elements */
	canvas = engine.canvas(),

	Ball = function()
	{
		Image.apply(this);	

		this.source('soccer-ball.gif');

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
			var dx = self.x() - obj.x(),
			    dy = self.y() - obj.y(),
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
				
		this.paint = function(context)
		{
			this.x(this.x() + velocity.x);
			this.y(this.y() + velocity.y);

			// wall collission
			checkCollision('x', canvas.width);
			checkCollision('y', canvas.height);
			
			engine.algorithms.drawImage.apply(this, [context]);
		};
	},
	update = function()
	{
		var objs = engine.root.frame(), i=0, j;

		for (; i < max_balls; i++)
			for (j = i+1; j < max_balls; j++)
				if (objs[i].collidesWith(objs[j]))
					objs[i].collide(objs[j]);
	}
;

	engine.fps = (1000/60);

	for (i = 0; i < max_balls; i++)
		engine.root.add(new Ball());

	engine.root.add(update);
	engine.run();

};
