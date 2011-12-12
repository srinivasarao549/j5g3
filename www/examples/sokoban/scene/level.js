/**
 * LEVEL Scene
 */

Sokoban.scene.Level = new j5g3.GDK.Scene({

	on_enter: function(me, $) {

		this.add([ 
			this.world = new Sokoban.World(),
			this.stats = new Sokoban.Stats() 
		]);

		// TODO ...
		Sokoban.restart();
	}

});
