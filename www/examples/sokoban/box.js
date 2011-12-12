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
				normal: [ 24 ],
				placed: [ 25 ]
			})
			.go_state('normal')
			.pos(startPos.x, startPos.y)
		;
	},

	push: function(position)
	{
	var
		me = this,
		map = this.__world.map,
		destination = map.get(position.next.x, position.next.y)
		x = this.__x + position.mx,
		y = this.__y + position.my
	;
		this.mapPos = position.next;
		this.go_state('normal');
		this.add(j5g3.tween({ 
			target: me,
			to: { x: x, y: y }, 
			auto_remove: true, 
			duration: 10,
			on_remove: function() { 
				if (destination == Sokoban.TARGET)
					me.go_state('placed');
			} 
		}));
		Sokoban.assets.drag.play();
			
		map.set(position.next.x, position.next.y, destination == Sokoban.TARGET ? Sokoban.PLACED_BOX : Sokoban.BOX)
		   .set(position.x, position.y, position.current==Sokoban.PLACED_BOX ? Sokoban.TARGET : Sokoban.FREE)
		;
		this.__world.setBox(position.x, position.y, undefined);
		this.__world.setBox(position.next.x, position.next.y, this);

	},

	y: function(val)
	{
		this.__world.updateBoxesZ();
		return val!==undefined ? ((this.__y = val), this) : this.__y;
		//return this._super.prototype.y.apply(this, [val]);
	}

}).properties({ mapPos: null, world: null });

