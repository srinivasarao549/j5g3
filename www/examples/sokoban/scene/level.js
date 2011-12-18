/**
 * LEVEL Scene
 */

Sokoban.scene.Level = new j5g3.GDK.Scene({

	on_enter: function(me, $) {
	var
		me = this,
		go = function(dir)
		{
			return function() { if (!me.world.player.moving) me.world.player.move(dir); }
		}
	;

		this.add([ 
			this.world = new Sokoban.World(),
			this.stats = new Sokoban.Stats() 
		]);

		Sokoban.restart();
		j5g3.id('level').style.display = 'block';

		j5g3.id('arrow-nw').onclick = go('nw');
		j5g3.id('arrow-sw').onclick = go('sw');
		j5g3.id('arrow-ne').onclick = go('ne');
		j5g3.id('arrow-se').onclick = go('se');

	}

});
