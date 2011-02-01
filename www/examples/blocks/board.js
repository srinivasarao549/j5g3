
game.Board = $.Clip.extend({

	init: function(properties)
	{
		var i = BOARD_HEIGHT+2;

		this._super(properties);

		// Initialize Map
		this.__map = [];

		this.__sprites = _ss.sprites();
		while (i--)
			this.__map.push([10,0,0,0,0,0,0,0,0,0,0,10]);

		this.__map.push([10,10,10,10,10,10,10,10,10,10,10,10]);

		this.size(BLOCK_WIDTH * BOARD_WIDTH, BLOCK_HEIGHT * BOARD_HEIGHT)
		    .add($.rect({ fillStyle: '#333', alpha: 0.3, width: this.width(), height: this.height() }))
		    .add($.map({ x: -BLOCK_WIDTH, y: -BLOCK_HEIGHT*2, sprites: _ss.sprites(), map: this.__map, tw: BLOCK_WIDTH, th: BLOCK_HEIGHT}))
		;
	},

	/* Checks completed lines */
	reduce: function()
	{
		var map=this.__map, y = map.length-1, x, row, bw = BOARD_WIDTH, rowc=0;

		while (y--)
		{
			row = map[y];
			rowc= true;
			for (x=1; x<=bw; x++)
				if (!row[x])
				{
					rowc=false;
					break;
				}

			if (rowc)
				this.reduceRow(y++);
		}
	},

	reduceRow: function(row)
	{
		audio.line.currentTime=0;
		audio.line.play();

		var map = this.__map;
		for (; row>1; row--)
		{
			for (x=1; x<=BOARD_WIDTH; x++)
				map[row][x] = map[row-1][x];
		}
		map[0]=[10,0,0,0,0,0,0,0,0,0,0,10];
	}
});
