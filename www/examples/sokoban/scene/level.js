/**
 * LEVEL Scene
 */

Sokoban.scene.Level = new j5g3.GDK.Scene({

	on_enter: function(me, $) {

	var
		world = new Sokoban.World(),
		stats = new Sokoban.Stats()		
	;
		
		this.add([ world, stats ]);
		/*
			me.floor = $.map({ sprites: j5g3.Util.fill(30, ss.__sprites[11]), tw: 54, th: 49, offsetY: -11 }).set_iso(),
			me.boxes = $.clip(),
			me.walls = ss.map(54, 49).offsetY(-11).set_iso(),
			me.stats = new game.Stats()
		]);
		*/

	}

});
