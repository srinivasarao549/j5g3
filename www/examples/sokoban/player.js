

var
	TH = 48 * 0.25,
	TW = 54 * 0.5
;

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

		this.pos(startPos.x, startPos.y-4);
	},

	walk: function(position)
	{
		this.animateTo(this.__x + position.mx, this.__y + position.my, 'walk_' + this.direction);
		
	},

	push: function(position)
	{
		Sokoban.scene.Level.stats.addPushes(1);
// TODO Use constants
		this.__world.map.set(position.next.x, position.next.y, 12) 
		     .set(position.x, position.y, 11)
		;

		this.animateTo(this.__x + position.mx, this.__y + position.my, 'push_' + this.direction);

	},

	move: function(direction)
	{
		this.direction = direction;
		if (this.mapPos = this.check_direction(direction))
		{
			this[this.mapPos.action](this.mapPos);
				
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
		if (sprite >= 0 && sprite <= 10)
			return false;
		if (sprite == 12)
		{
			// move the damn box
			nb = this.get_direction(direction, n.x, n.y);

			sprite = map.get(nb.x, nb.y);

			if (sprite != 11 && sprite != 13)
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

		this.spritesheet(Sokoban.assets.spritesheet)
			.keys({
				numpad9: go('ne'),
				numpad3: go('se'),
				numpad1: go('sw'),
				numpad7: go('nw')
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

}).properties({ world: null });

