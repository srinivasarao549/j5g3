/**
 * A Box Object
 */

Sokoban.Box = j5g3.GDK.Element.extend({

	setup: function()
	{
	var
		// TODO Fix this
		startPos = this.__world.map.getXY(this.__mapPos.x, this.__mapPos.y)
	;
		startPos = this.__world.walls.getIsometricCoords(startPos.x, startPos.y);

		this.spritesheet(Sokoban.assets.spritesheet)
			.stop()
			.states({
				normal: [ 12 ],
				placed: [ 58 ]
			})
			.go_state('normal')
			.pos(startPos.x, startPos.y)
		;
	}

}).properties({ mapPos: null, world: null });

