

Sokoban.Player = j5g3.GDK.User.extend({

	setPlayerPosition: function(x, y)
	{
	var
		world = this.__world,
		l = world.map.data().length,
		startPos = world.map.getXY(x, y, l)
	;
		this.mapPos = { x: x, y:y }
		startPos = world.walls.getIsometricCoords(startPos.x, startPos.y);

		this.pos(startPos.x+16, startPos.y+64);
	},

	walk: function(position)
	{
		this.animateTo(this.__x + position.mx, this.__y + position.my, 'walk_' + this.direction);
		
	},

	push: function(position)
	{
		Sokoban.scene.Level.stats.addPushes(1);
		
		this.__world.getBox(position.x, position.y).push(position);

		this.animateTo(this.__x + position.mx, this.__y + position.my, 'push_' + this.direction);
	},

	move: function(direction)
	{
		var pos;

		this.direction = direction;
		if (pos = this.check_direction(direction))
		{
			this.mapPos = pos;
			this[pos.action](pos);
				
		} else
			this.go_state('idle_' + direction);
	},

	animateTo: function(x, y, state)
	{
	var
		me = this
	;
		me.moving = true;
		me.go_state(state);

		Sokoban.scene.Level.stats.addMoves(1);

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

	get_direction: function(direction, x, y)
	{
	var
		nx = x || this.mapPos.x, ny = y || this.mapPos.y,
		mx = TW, my = TH
	;
		switch (direction)
		{
		case 'ne': ny--; my*=-1; break;
		case 'nw': nx--; mx*=-1; my*=-1; break;
		case 'se': nx++; break;
		case 'sw': ny++; mx*=-1; break;
		}

		return { x: nx, y: ny, mx: mx, my: my }
	},

	check_direction: function(direction)
	{
	var
		map = this.__world.map,
		n = this.get_direction(direction), nb, 
		sprite = map.get(n.x, n.y)
	;
		if (sprite >= Sokoban.WALLS[0] && sprite <= Sokoban.WALLS[1])
			return false;

		n.current = sprite;
		if (sprite == Sokoban.BOX || sprite == Sokoban.PLACED_BOX)
		{
			// Check if box can be moved
			nb = this.get_direction(direction, n.x, n.y);
			sprite = map.get(nb.x, nb.y);

			if (sprite != Sokoban.FREE && sprite != Sokoban.TARGET)
				return false;

			n.action = 'push';
			n.next = nb;
		} else
			n.action = 'walk';
		
		return n;
	},

	setup: function()
	{
	var
		me = this,

		go = function(direction) {
			return function() { 
				if (!me.moving)
					me.move(direction); 
			}
		}
	;

		me.direction = 'ne';

		this.spritesheet(Sokoban.assets.spritesheet_player)
			.keys({
				numpad9: go('ne'),
				numpad3: go('se'),
				numpad1: go('sw'),
				numpad7: go('nw')
			})
			.states({
				idle_ne: [65],
				idle_se: [91],
				idle_sw: [78],
				idle_nw: [52],
				push_ne: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
				push_nw: [52,53,54,55,56,57,58,59,60,61,62,63,64],
				push_se: [91,92,93,94,95,96,97,98,99,100, 101,102,103],
				push_sw: [78,79,80,81,82,83,84,85,86,87,88,89,90],
				walk_ne: [13, 14, 15, 16, 17, 18, 19],
				walk_nw: [0, 1, 2, 3, 4, 5, 6, 7],
				walk_se: [39, 40, 41, 42, 43, 44, 45],
				walk_sw: [26, 27, 28, 29, 30, 31, 32]
			})
			.stop()
			.go_state('idle_ne')
		;
	}

}).properties({ world: null });

