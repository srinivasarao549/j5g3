
game.Gorilla = j5g3.GDK.User.extend({

	setup: function(p)
	{
	var
		$ = j5g3,
		ss = $.spritesheet('ss').grid(20,10),

		go= function(state, offset)
		{
			return function() { 
				this.go_state(state).x(this.__x + offset);
			}
		}
	;

		this.spritesheet(ss)
		    .states({
			idle_l: [ 60, 61, 62, 63, 64 ],
			idle_r: [ 80, 81, 82, 83, 84 ],
			fall_l: [ 40, 41, 42, 43, 44 ], 
			fall_r: [ 51, 50, 49, 48, 47 ],
			shoot: [ 20, 21, 22, 23, 24, 23, 22, 21 ],
			platform_l: [ 45, 45, 45, [ ss.sprite(45), function() { this.parent().parent().go_state('idle_l') } ] ],
			platform_r: [ 46, 46, 46, [ ss.sprite(46), function() { this.parent().parent().go_state('idle_r') } ] ]
		    }).keys({
			left: go('idle_l', -2),
			right: go('idle_r', 2)
		    }).stop()
		    .gravity(1)
		    .size(50, 76)
		;
		this.__frames[0][0].scaleT(3);
		this.__frames[1][0].scaleT(3);
		this.__frames[2][0].scaleT(3);
		this.__frames[3][0].scaleT(3);
	},

	update: function()
	{
		if (this.collides(platform))
		{
			this.__gravity = 0;
			this.g.__vy = 0;
			this.__y = platform.__y - this.__height;
			if (this.__state=='fall_l')
				this.go_state('platform_l');
			else if (this.__state=='fall_r')
				this.go_state('platform_r');
		} else
		{
			if (this.__state=='idle_l')
				this.go_state('fall_l');
			else if (this.__state=='idle_r')
				this.go_state('fall_r');

			this.__gravity = 1;
		}
	}

});
