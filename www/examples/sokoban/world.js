
Sokoban.World = j5g3.GDK.Element.extend({

	setup_floor: function()
	{
		
	},

	get_map: function(ss, fill)
	{
		return j5g3.map({
			sprites: ss || j5g3.ary(80, 0, Sokoban.assets.spritesheet.__sprites[fill || Sokoban.EMPTY]),
			tw: Sokoban.TW, th: Sokoban.TH,
			offsetY: Sokoban.TO
		}).set_iso();
	},

	setup: function()
	{
	var
		me = this,
		ss = j5g3.spritesheet({ sprites: j5g3.clone(Sokoban.assets.spritesheet.__sprites) }),
		floor = me.floor = me.get_map(false, Sokoban.FREE),
		player = me.player = new Sokoban.Player({ world: this }),
		walls = me.walls = me.get_map(ss.__sprites),
		decoration0 = me.decoration0 = j5g3.clip(),
		decoration1 = me.decoration1 = j5g3.clip(),
		boxes = me.boxes = j5g3.clip(),
		i = 11
	;
		boxes.map = {}

		this.add([ floor, decoration0, boxes, walls, decoration1 ]);

		me.floor.__sprites[Sokoban.EMPTY]=ss.__sprites[Sokoban.EMPTY];
		me.floor.__sprites[Sokoban.PLACED_BOX] = me.floor.__sprites[Sokoban.PLAYER_TARGET] = me.floor.__sprites[Sokoban.TARGET]=ss.__sprites[Sokoban.TARGET];
		
		ss.__sprites[Sokoban.DOOR_EAST] = ss.__sprites[Sokoban.DOOR_WEST] =
		ss.__sprites[Sokoban.PLACED_BOX] = ss.__sprites[Sokoban.TARGET] = 
		ss.__sprites[Sokoban.FREE] = ss.__sprites[Sokoban.BOX] = ss.__sprites[71];

		ss.__sprites[Sokoban.PLAYER]= ss.__sprites[Sokoban.PLAYER_TARGET] = player;

	},

	addBox: function(x, y)
	{
	var
		box = new Sokoban.Box({ mapPos: { x: x, y: y }, world: this });
	;
		this.boxes.add(box);
		this.setBox(x, y, box);
	},

	getBox: function(x, y)
	{
		// TODO figure out if this is ok
		return this.boxes.map[x+'-'+y];
	},

	setBox: function(x, y, box)
	{
		this.boxes.map[x+'-'+y] = box;
	},

	updateBoxesZ: function()
	{
	var
		boxes = this.boxes.__frames[0]
	;
		boxes.sort(function(a, b) { return a.__y - b.__y });
	},

	loadMap: function(map)
	{
	var 
		i=0, x=0, y=0, l=map.length, 
		// TODO .....
		out = new Array(map.split("\n").length),

		sprite,
		// Last Start, Current Line Start, End
		ls = null, s = 0, e
	;
		// Create Our Map object
		out[0] = [];
		this.boxes.__frames = [[]];
		this.decoration0.__frames = [[]];
		this.decoration1.__frames = [[]];
		this.map = new Sokoban.Map(out);

		for (; i<l; i++)
		{
			if (map[i]=="\n")
			{
				x=0; y++;
				out[y] = [];
				ls = s;
				s = i+1;
			} else
			{
				sprite = map[i];

				switch (sprite) 
				{
				case '#': 
					sprite = (map[i-1]=='#') ? 'l' : '';
					if (map[i+1]=='#') sprite += 'r';
					if (ls!==null && map[ls+x]=='#') sprite += 't';
					if ((e = map.indexOf("\n",i)+1) && map[e+x]=='#')
						sprite += 'b';
					if (sprite=='')
						sprite = 'desk';

					break;
				case '+':
				case '@':
					this.player.setPlayerPosition(x, y); 
					break;
				case '*':
					out[y][x++] = Sokoban.SPRITES[sprite];// || 0;
					this.addBox(x-1, y);
					continue;
				case '$':
					this.addBox(x, y);
					break;
				case '!':
					sprite = this.decorate(Sokoban.SPRITES[sprite], x, y);
					break;
				}

				out[y][x++] = Sokoban.SPRITES[sprite] || 0;
			}
		}

		// Make it Isometric. Magic happens here.

		this.walls.__map = this.map.transform();
		this.floor.__map = j5g3.clone(this.walls.__map);
		this.updateBoxesZ();
		// Set Width And Height 
		e = this.map.getIsoSize();
		this.size(e.w * Sokoban.TW/2, e.h * Sokoban.TH / 2);
		this.stretch(Sokoban.WIDTH, Sokoban.HEIGHT);

		this.floor.size(e.w * Sokoban.TW/2, e.h * Sokoban.TH / 2)
			//.stretch(Sokoban.WIDTH, Sokoban.HEIGHT)
			//.cache()
		;
	},

	/** Adds decoration sprite to both layers! */
	decorate: function(sprite, x, y)
	{
	var
		pos = this.map.getXY(x, y),
		sprites = Sokoban.assets.spritesheet.__sprites
	;
		pos = this.walls.getIsometricCoords(pos.x, pos.y);
		this.decoration0.add(j5g3.clip([[sprites[sprite]]]).pos(pos.x, pos.y));
		this.decoration1.add(j5g3.clip([[sprites[sprite+8]]]).pos(pos.x, pos.y));

		return ' ';
	}

});

