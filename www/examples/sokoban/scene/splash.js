
Sokoban.scene.Splash = new j5g3.GDK.Scene({

	on_enter: function()
	{
	var
		me = this,
		image = Sokoban.assets.splash.stretch(Sokoban.WIDTH, Sokoban.HEIGHT).alpha(0),
		transition = j5g3.tween({ target: image, auto_remove: true, to: { alpha: 1 }, duration: 10 })
	;
		me.add([
			image,
			transition
		]);

		j5g3.Input.wait(function() { 

			transition.to({ alpha: 0 })
				.restart()
				.from({ alpha: 1 })
				.on_remove(function() 
				{
					j5g3.root.go(1); 
				})
			;

			me.add(transition);
		})
	}

});

