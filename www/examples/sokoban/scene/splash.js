
Sokoban.scene.Splash = new j5g3.GDK.Scene({

	on_enter: function()
	{
		this.frames([[
			Sokoban.assets.splash.stretch(640, 480)
		]])
		
		j5g3.Input.Keyboard.waitForKey(function() { 
			start_time = new Date;
			j5g3.root.go(1); 
		})
	}

});

