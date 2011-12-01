/**
 * A Box Object
 */

j5g3.module(function($)
{
	game.Box = $.GDK.Thing.extend({

		setup: function(p)
		{
			this.spritesheet(game.spritesheet)
				.states({
					normal: [ 12 ],
					placed: [ 13 ]
				})
			;
		}

	});
});
