
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
	}
});
