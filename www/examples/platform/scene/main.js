
/**
 * Main Scene
 */

Game.scene.Main = new j5g3.GDK.Scene({

	on_enter: function(me, $) {

		this.add([ 
			new j5g3.Gorilla() 
		]);

		this.size(640, 480);
		
	}

});
