/**
 * Pacman Class
 */

game.Pacman = j5g3.Clip.extend({
	
	init: function()
	{
	var
		$ = j5g3,
		chars = $.spritesheet('pacman-characters').grid(14,4)
	;
		this.__frames = [
			[ chars.__sprites[10] ],
			[ chars.__sprites[10] ],
			[ chars.__sprites[10] ],
			[ chars.__sprites[10] ],
			[ chars.__sprites[10] ],
			[ chars.__sprites[11] ],
			[ chars.__sprites[11] ],
			[ chars.__sprites[11] ],
			[ chars.__sprites[11] ],
			[ chars.__sprites[11] ]
		];

		this.__width = 32;
		this.__height= 32;
		this._super();
	}
});
