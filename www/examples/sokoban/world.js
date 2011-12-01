
j5g3.module(function($)
{

game.World = $.Clip.extend({


	init: function(p)
	{
	var
		me = this,
		ss = game.spritesheet
	;
		this._super(p);

		this.add([ 
			me.floor = $.map({ sprites: j5g3.Util.fill(30, ss.__sprites[11]), tw: 54, th: 49, offsetY: -11 }).set_iso(),
			me.boxes = $.clip(),
			game.player = new game.Player(),
			me.walls = ss.map(54, 49).offsetY(-11).set_iso()
		]);

		me.floor.__sprites[71]=ss.__sprites[71];
		ss.__sprites[11]=ss.__sprites[71];
	},

	transform: function(_in, out)
	{
		var x, y=_in.length, nx, ny;

		while (y--)
			for (x=0; x<_in[y].length; x++)
			{
				ny = x+y;
				nx = Math.floor((_in.length-y)/2) + Math.round(x/2);

				if ((y&1) && !(ny&1)) 
					nx--;

				out[ny][nx] = _in[y][x]; 
			}
	},

	getXY: function(x, y, maxy)
	{
	var
		ny = x+y,
		nx = Math.floor((maxy-y)/2) + Math.round(x/2)
	;
		if ((y&1) && !(ny&1)) 
			nx--;

		return [ nx, ny ]
	},

	loadMap: function(map)
	{
	var 
		i=0, x=0, y=0, l=map.length, out=[[]], maxx=0, sprite,
		// Last Start, Current Line Start, End
		ls = null, s = 0, e, startPos,
		/* Constants */
		SPRITES= {
			0   : 71,
			//" " : 11,
			" " : 11, '@': 11,
			"$" : 12, "." : 13, '*': 13,
			"l" : 9, "r": 9, "lr" : 9,
			"lt": 7, "lrt": 3, "rt":6,
			"lb": 8, "lrb": 1, "rb":5,
			"tb": 10, "t" : 10, "b": 10,
			"lrtb": 0, "rtb": 2, "ltb": 4
		}
	;
		this.omap = map.split('\n');

		for (; i<l; i++)
		{
			if (map[i]=="\n")
			{
				if (x>maxx)
					maxx=x;
				x=0; y++;
				out[y] = [];
				ls = s;
				s = i+1;
			} else
			{
				if (map[i]=='#')
				{
					sprite = (map[i-1]=='#') ? 'l' : '';
					if (map[i+1]=='#') sprite += 'r';
					if (ls!==null && map[ls+x]=='#') sprite += 't';
					if ((e = map.indexOf("\n",i)+1) && map[e+x]=='#')
						sprite += 'b';
					if (sprite=='')
						sprite = 't';
				} else if (map[i]=='@')
				{
					// TODO clean up
					startPos = [ x, y ]
					sprite = map[i];
				} else
					sprite = map[i];

				if (SPRITES[sprite]===undefined)
					sprite = '0';

				out[y][x++] = SPRITES[sprite];
			}
		}

		if (maxx==0)
			maxx=map.length;

		l = out.length;
		out.unshift([]);
		if ((l&1))
			out.unshift([]);

		// Prepare array for rotation
		this.walls.__map = this.floor.__map = j5g3.ary(l+maxx+1, l+maxx+1, SPRITES[0]);

		// Make it Isometric. Magic happens here.
		this.transform(out, this.walls.__map);

		// Set Player Position
		if (startPos)
		{
			game.player.mapX = startPos[0];
			game.player.mapY = startPos[1];

			startPos = this.getXY(startPos[0], startPos[1]+(out.length-l), out.length);
			startPos = this.walls.getIsometricCoords(startPos[0], startPos[1]);
			game.player.pos(startPos[0], startPos[1]-4);
		} else
			game.player.pos(-100, -100);
	}

});

game.World.TH = 49;
game.World.TW = 54;

});

