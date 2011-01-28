
game.Board = $.Clip.extend({

	init: function(properties)
	{
		var i = BOARD_HEIGHT+2;

		this._super(properties);

		// Initialize Map
		this.__map = [];

		this.__sprites = _ss.sprites();
		while (i--)
			this.__map.push([1,0,0,0,0,0,0,0,0,0,0,1]);

		this.__map.push([1,1,1,1,1,1,1,1,1,1,1,1]);

		this.size(BLOCK_WIDTH * BOARD_WIDTH, BLOCK_HEIGHT * BOARD_HEIGHT)
		    .add($.rect({ fillStyle: '#333', alpha: 0.3, width: this.width(), height: this.height() }))
		;
	}
});
