
/**
 * Pacman Class
 */

game.Ghost = j5g3.Clip.extend({
	
	init: function(p)
	{
	var
		$ = j5g3,
		chars = game.chars.__sprites,
		color = (this.__color = $.irand(5))*2
	;
		this.frames([[ chars[color] ], [ chars[color+1] ]])
		    .size(32, 32)
		    ._super(p)
		;
	}

});
