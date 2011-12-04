
j5g3.module(function($) {

var
	TH = game.World.TH * 0.25,
	TW = game.World.TW * 0.5
;

game.Player = j5g3.GDK.User.extend({

	setPlayerPosition: function(x, y)
	{
	var
		l = this.omap.length,
		startPos = this.getXY(x, y, l)
	;
		game.player.mapX = x;
		game.player.mapY = y;
		this.walls.getIsometricCoords(startPos.x, startPos.y);

		game.player.pos(startPos.x, startPos.y-4);
	},

	walk: function(direction)
	{
		
	},

	push: function(direction)
	{

	},

	move: function()
	{
	},

	animateTo: function(x, y, state)
	{
	var
		me = this
	;
		me.moving = true;
		me.go_state(state);
		game.stats.addMoves(1);

		this.add(j5g3.tween({ 
			target: me,
			to: { x: x, y: y }, 
			auto_remove: true, 
			duration: 10,
			on_remove: function() { 
				me.go_state('idle_' + me.direction); 
				me.moving = false;
			} 
		}));
	},

	setup: function()
	{
	var
		directions= {
			ne: [ 1, -1 ],
			nw: [ -1, -1],
			se: [ 1, 1  ],
			sw: [ -1, 1 ]
		},

		me = this,
		world = game.world,

		get_direction = function(direction, x, y)
		{
		var
			nx = x || me.mapX, ny = y || me.mapY
		;
			switch (direction)
			{
			case 'ne': ny--; break;
			case 'nw': nx--; break;
			case 'se': nx++; break;
			case 'sw': ny++; break;
			}

			return { x: nx, y: ny }
		},

		check_direction = function(direction)
		{
		var
			n = get_direction(direction), nb,
			objects = {
				'#': function() { return false; },
				'$': function() {
					// move the damn box
					nb = get_direction(direction, n.x, n.y);

					if (!world.omap[n.y] || objects.hasOwnProperty(world.get(nb.x, nb.y)))
						return false;

					game.stats.addPushes(1);

					world.set(nb.x, nb.y, '$') 
					     .set(n.x, n.y, ' ')
					;

					return n;
				}
			}, ns
		;

			if (!world.omap[n.y])
				return false;

			ns = objects[world.get(n.x, n.y)];

			return  ns ? ns() : n;
		},

		go = function(action, direction) {
			return function() { 
				if (me.moving)
					return;

				var dirs = directions[direction], newpos;

				if (newpos = check_direction(direction))
				{
					me.mapX = newpos.x;
					me.mapY = newpos.y;

					me.walkTo(me.__x + TW * dirs[0], me.__y + TH * dirs[1]);
				} else
					me.go_state('idle_' + direction);
			}
		}

	;
		me.direction = 'ne';


		this.spritesheet(game.spritesheet)
			.keys({
				numpad9: go('walk', 'ne'),
				numpad3: go('walk', 'se'),
				numpad1: go('walk', 'sw'),
				numpad7: go('walk', 'nw'),
				numpad5: go('push')
			})
			.states({
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
			})
			.stop()
			.go_state('idle_ne')
		;
	}

});

});


