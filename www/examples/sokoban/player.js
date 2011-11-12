
game.Player = j5g3.Clip.extend({

	states: function(ss, states)
	{
	var
		me = this,
		frames = [],
		STATES = me.STATES = {}, 
		i
	;
		for (i in states)
			if (states.hasOwnProperty(i))
			{
				STATES[i] = frames.length;
				frames.push([ ss.clip_array(states[i]) ]);
			}

		return frames;
	},

	go_state: function(name)
	{
		this.go(this.STATES[name] || 0);
	},

	keyboard: function(key, keyboard)
	{
	var
		KEYS = this.KEYS,
		i
	;
		for (i in KEYS)
			if (KEYS.hasOwnProperty(i) && key[j5g3.Input.KEYS[i]])
			{
				KEYS[i].apply(this);
			}
	},

	draw: j5g3.Draw.Keyboard,

	init: function(p)
	{
	var
		ss = game.ss,

		// Tile width and height
		TH = game.world.TH * 0.25, //0.433012702,
		TW = game.world.TW * 0.5,

		states = {
			idle_ne: [15],
			idle_se: [16],
			idle_sw: [17],
			idle_nw: [14],
			push_ne: [18, 19, 20, 21, 22],
			push_nw: [23, 24, 25, 26, 27],
			push_se: [28, 29, 30, 31, 32],
			push_sw: [33, 34, 35, 36, 37],
			walk_ne: [38, 39, 40, 41, 42],
			walk_nw: [43, 44, 45, 46, 47],
			walk_se: [48, 49, 50, 51, 52],
			walk_sw: [53, 54, 55, 56, 57]
		},

		directions= {
			ne: [ 1, -1 ],
			nw: [ -1, -1],
			se: [ 1, 1  ],
			sw: [ -1, 1 ]
		},

		me = this,
		world = game.world,

		check_direction = function(direction)
		{
		var
			nx = me.mapX, ny = me.mapY, objects = {
				'#': true,
				'$': true
			}
		;
			switch (direction)
			{
			case 'ne': ny--; break;
			case 'nw': nx--; break;
			case 'se': nx++; break;
			case 'sw': ny++; break;
			}

			return (world.omap[ny] && (!objects[world.omap[ny][nx]])) ? [ nx, ny ] : false;
		},

		go = function(action, direction) {
			return function() { 
				if (me.moving)
					return;

				var dirs = directions[direction], newpos;

				if (newpos = check_direction(direction))
				{
					me.moving = true;
					me.go_state(action + '_' + direction);
					me.mapX = newpos[0];
					me.mapY = newpos[1];

					me.add(j5g3.tween({ 
						target: me,
						to: { 
							x: me.__x + TW * dirs[0], 
							y: me.__y + TH * dirs[1]
						}, 
						auto_remove: true, 
						duration: 10,
						on_remove: function() { 
							me.go_state('idle_' + direction); 
							me.moving = false;
						} 
					}));
				} else
					me.go_state('idle_' + direction);
			}
		},

		keys = this.KEYS = {
			numpad9: go('walk', 'ne'),
			numpad3: go('walk', 'se'),
			numpad1: go('walk', 'sw'),
			numpad7: go('walk', 'nw')
		}
	;
		this.__frames = this.states(ss, states);
		this._super(p);
		this._playing = false;
	}

});

