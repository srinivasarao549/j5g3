
/* CLASSES */
game.Piece = $.Clip.extend({

	/* private */
	_get_map: function(piece, c)
	{
		switch (piece) {
		case 0: return [ [[c],[c],[c,c]], [[c,c,c],[c],[]], [[0,c,c],[0,0,c],[0,0,c]], [[],[0,0,c],[c,c,c]] ];
		case 1: return [ [[0,c],[0,c],[0,c],[0,c]], [[],[c,c,c,c],[],[]], [[0,0,c],[0,0,c],[0,0,c],[0,0,c]], [[],[],[c,c,c,c],[]] ];
		case 2: return [ [[c],[c,c],[c]], [[c,c,c],[0,c],[]], [[0,0,c],[0,c,c],[0,0,c]], [[],[0,c],[c,c,c]] ];
		case 3: return [ [[c,c],[c,c]],[[c,c],[c,c]],[[c,c],[c,c]],[[c,c],[c,c]] ] ;
		case 4: return [ [[0,c],[0,c],[c,c]], [[c],[c,c,c],[]], [[0,c,c],[0,c],[0,c]], [[],[c,c,c],[0,0,c]] ];
		case 5: return [ [[0,c],[c,c],[c]], [[c,c],[0,c,c],[]], [[0,0,c],[0,c,c],[0,c]], [[],[c,c],[0,c,c]] ];
		case 6: return [ [[c],[c,c],[0,c]], [[0,c,c],[c,c],[]], [[0,c],[0,c,c],[0,0,c]], [[],[0,c,c],[c,c]] ];
		
		}
	},

	// Creates a new map object based on the template and color specified
	_piece: function(template, color)
	{
		this.__mapData = this._get_map(template, color);
		this.__mapCur  = 0;

		var result = $.map({ sprites: _ss.sprites(), map: this.__mapData[0], tw: BLOCK_WIDTH, th: BLOCK_HEIGHT}); 

		this.__mapWidth = PIECE_WIDTHS[template];
		this.__mapHeight= this.__mapData[0].length;

		result.width(BLOCK_WIDTH*this.__mapWidth)
		      .height(BLOCK_HEIGHT*this.__mapHeight)
		;
		return result;		
	},

	init: function(properties)
	{
		this._super(properties);

		this.__map = this._piece(properties.piece, properties.color);
		this.add(this.__map)
		    .size(this.__map.width(), this.__map.height())
		    .align_children('origin')
		;
	},

	tween: function(property, to)
	{
		var from = { }, _to = { };
		from[property]=this[property]();
		_to[property] = to;
		return this.add($.tween({ target: this, auto_remove: true, duration: 3, from: from, to: _to }));
	},

	rotate: function()
	{
		var temp = this.__mapHeight;
		this.__mapHeight = this.__mapWidth;
		this.__mapWidth=temp;
		this.__mapCur += this.__mapCur==3 ? -3 : 1;

		this.tween('rotation', this.__rotation+Math.PI/2);
		this.size(this.__height, this.__width);
	},

	getCurrentMap: function()
	{
		return this.__mapData[this.__mapCur];
	},

	left: function()
	{
		if (this.verify(-1,1))
		{
			this.tween('x', this.__x-BLOCK_WIDTH);
			this.__mapX--;
		}
	},

	right: function()
	{
		if (this.verify(1, 1))
		{
			this.tween('x', this.__x+BLOCK_WIDTH);
			this.__mapX++;
		}
	},

	down: function()
	{
		if (this.verify(0, 1))
		{
			this.__y++;
			this.__mapY += 1/BLOCK_HEIGHT;
		} else
			return true;
	},

	nail: function()
	{
		this.__map.__map = this._get_map(this.__piece, this.__color + 10)[0];
		// Copy to board
		var srcX, srcY = this.__mapHeight, destX=this.__mapX+1, destY=Math.floor(this.__mapY),
		    map=this.__board.__map, piece=this.getCurrentMap();
		while (srcY--)
			for (srcX=0; srcX<this.__mapWidth; srcX++)
				if (piece[srcY][srcX])
					map[destY+srcY][destX+srcX] = piece[srcY][srcX];
		
	},

	verify: function(x, y)
	{
		var srcX, srcY=this.__mapHeight, destX=this.__mapX+1+x, destY=Math.floor(this.__mapY)+y,
		    map=this.__board.__map, piece=this.getCurrentMap()
		;

		while (srcY--)
			for (srcX=0; srcX<this.__mapWidth; srcX++)
				if (piece[srcY][srcX] && map[destY+srcY][destX+srcX])
					return false;
		return true;
	}
}).properties({ board: null, mapX: 0, mapY: 0, mapWidth: 0, piece: 0, color: 0 });