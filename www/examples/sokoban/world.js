
Sokoban.World = j5g3.GDK.Element.extend({

	setup_floor: function()
	{
		
	},

	setup: function()
	{
	var
		me = this,
		ss = Sokoban.assets.spritesheet,
		floor = me.floor = j5g3.map({ 
			sprites: j5g3.ary(45, 0, ss.__sprites[Sokoban.FREE]),
			tw: Sokoban.TW, 
			th: Sokoban.TH, 
			offsetY: Sokoban.TO 
		}).set_iso(),
		player = me.player = new Sokoban.Player({ world: this }),
		walls = me.walls = ss.map(Sokoban.TW, Sokoban.TH).offsetY(Sokoban.TO).set_iso(),
		boxes = me.boxes = j5g3.clip(),
		i = 11
	;
		boxes.map = {}
		me.loadMap(Sokoban.LEVELS[0]); //j5g3.id('map').value);

		this.add([ floor, boxes, walls ]);

		me.floor.__sprites[Sokoban.EMPTY]=ss.__sprites[Sokoban.EMPTY];
		me.floor.__sprites[Sokoban.TARGET]=ss.__sprites[Sokoban.TARGET];
		
		ss.__sprites[Sokoban.TARGET]= ss.__sprites[Sokoban.FREE] = ss.__sprites[Sokoban.BOX] = ss.__sprites[71];
		ss.__sprites[Sokoban.PLAYER]= player;
	//	me.floor.__sprites[Sokoban.PLAYER]= player;
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
						sprite = 't';

					break;
				case '@':
					this.player.setPlayerPosition(x, y); 
					break;
				case '$':
					this.addBox(x, y);
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
	}

});

