
game.Player = j5g3.Clip.extend({

	init: function(p)
	{
	var
		ss = game.ss.__sprites
	;
		this.__frames = [[ ss[16] ]];
		this._super(p);
	}

});

