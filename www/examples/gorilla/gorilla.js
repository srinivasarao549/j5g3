
function game($, doc)
{
var
<<<<<<< HEAD
	ss = $.spritesheet('ss').grid(20,10),

	go= function(state, offset)
	{
		return function() { 
			this.go_state(state).x(this.__x + offset);
		}
	},

	rect = $.rect({ strokeStyle: 'white', fillStyle: 'none' }),

	Gorilla = $.GDK.User.extend({

		setup: function(p)
		{
			this.spritesheet(ss)
			    .states({
				idle_l: [ 60, 61, 62, 63, 64 ],
				idle_r: [ 80, 81, 82, 83, 84 ],
				fall_l: [ 40, 41, 42, 43, 44 ],
				fall_r: [ 51, 50, 49, 48, 47 ],
				shoot: [ 20, 21, 22, 23, 24, 23, 22, 21 ]
			    }).keys({
				left: go('idle_l', -2),
				right: go('idle_r', 2)
			    }).stop()
			    .gravity(1)
			    .size(50, 76)
			;
			rect.size(this.__width, this.__height);

			this.__frames[0][0].scaleT(3);
			this.__frames[1][0].scaleT(3);
		},

		update: function()
		{
			rect.pos(this.__x, this.__y);
			if (this.collides(platform))
			{
				this.__gravity = 0;
				this.g.__vy = 0;
				this.__y = platform.__y - this.__height;
			} else
				this.__gravity = 1;
		}

	}),

	gorilla = (new Gorilla()).pos(100,100),
=======
	gorilla = (new game.Gorilla()).pos(100,100),
>>>>>>> c6449ca86e1e9e8c0deeba98640c284add7c0ecf
	platform = $.rect({ x: 100, y: 300, width: 100, height: 10, fillStyle: 'white' })
;

	$.id('loading').style.display = 'none';
	$.canvas.style.display = '';

	$.root.add([gorilla, platform]);

	$.run();

	$.Input.Keyboard.capture();
}
