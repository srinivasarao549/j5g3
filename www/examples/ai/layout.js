/**
 * Encapsulates a Layout
 */

game.Layout = j5g3.Map.extend({

	init: function(data)
	{
	var
		$ = j5g3,
		walls = $.spritesheet('pacman-walls').grid(6,5),
		fruits= $.spritesheet('pacman-fruits').grid(4,3),

		mapsprites = {
			"  %%": 25,
			" %% ": 16,
			" %%%": 3,
			" % %": 5,
			"%  %": 9,
			"% % ": 20,
			"%%  ": 24,
			"% %%": 14,
			"%   ": 23,
			" %  ": 22,
			"%% %": 17,
			"   %": 8,
			"  % ": 2,
			"%%% ": 21,
			"%%%%": 15,
			"    ": 11
		},
		
		// Assume rectangular map
		xl = data[0].length,
		yl = data.length,
		x, y,
		row, s, smap=[], srow,
		me = this,

		tw = me.__tw = (me.__width || $.width) /(xl),
		th = me.__th = (me.__height || $.height) /(yl),

		translate_map= function()
		{
			// Translate Map
			for (y=0; y<yl; y++)
			{
				row = data[y];
				smap.push(srow = []);

				for (x=0; x<xl; x++)
				{
					s = row[x];
					if (s==='%')
					{
						s = (y > 0 ? data[y-1][x] : ' ') + 
						    (x > 0 ? data[y][x-1] : ' ') + 
						    (x < xl-1? data[y][x+1] : ' ') + 
						    (y < yl-1? data[y+1][x] : ' ');
						s = s.replace(/[P\.]/g, ' ');
						s = mapsprites[s] || 0;
					} 
					else if (s==='P')
					{
						game.pacman.pos(x*tw, y*th).stretch(tw, th);
						s = 29;
					} else if (s==='.')
						s = 30;
					else
						s = 29;

					srow.push(s);
				}
			}

			return smap;
		}
	;
		walls.__sprites.push(fruits.__sprites[10]);
		me.__sprites = walls.__sprites;
		me.__map = translate_map();

		console.log(me.__map);
	},


});
