
Sokoban.World = j5g3.GDK.Element.extend({

	setup: function()
	{
	var
		me = this,
		ss = Sokoban.assets.spritesheet,
		floor = me.floor = j5g3.map({ sprites: j5g3.Util.fill(30, ss.__sprites[11]), tw: 54, th: 49, offsetY: -11 }).set_iso(),
		shadows = me.shadows = j5g3.map({ sprites: j5g3.Util.fill(30, ss.__sprites[71]), tw: 54, th: 49, offsetY: -11 }).set_iso(),
		player = me.player = new Sokoban.Player({ world: this }),
		walls = me.walls = ss.map(54, 49).offsetY(-11).set_iso(),
		boxes = me.boxes = j5g3.clip(),
		i = 11
	;
		me.loadMap(Sokoban.LEVELS[0]); //j5g3.id('map').value);

		this.add([ floor, shadows, boxes, walls, player ]);

		me.shadows.__sprites[71] =me.floor.__sprites[71]=ss.__sprites[71];
		me.floor.__sprites[13]=ss.__sprites[13];
		
		while (i--)
			me.shadows.__sprites[i] = ss.__sprites[i+60];

		ss.__sprites[11]=ss.__sprites[71];
		ss.__sprites[13]=ss.__sprites[71];
	},

	addBox: function(x, y)
	{
		// Add Box
		this.boxes.add(new Sokoban.Box({ mapPos: { x: x, y: y }, world: this }));
	},

	loadMap: function(map)
	{
	var 
		i=0, x=0, y=0, l=map.length, 
		// TODO .....
		out = new Array(map.split("\n").length),

		sprite,
		// Last Start, Current Line Start, End
		ls = null, s = 0, e, startPos,
		/* Constants */
		SPRITES= {
			0   : 71,
			" " : 11, '@': 11,
			"$" : 12, "." : 13, '*': 13,
			"l" : 9, "r": 9, "lr" : 9,
			"lt": 7, "lrt": 3, "rt":6,
			"lb": 8, "lrb": 1, "rb":5,
			"tb": 10, "t" : 10, "b": 10,
			"lrtb": 0, "rtb": 2, "ltb": 4
		}
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
					sprite = ' ';
					break;
				}

				out[y][x++] = SPRITES[sprite] || 0;
			}
		}

		// Make it Isometric. Magic happens here.
		this.shadows.__map = this.floor.__map = this.walls.__map = this.map.transform();
	}

});

