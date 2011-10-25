
(function ($)
{
var
	walls = $.spritesheet('pacman-walls').grid(6,5),
	chars = $.spritesheet('pacman-characters').grid(14,4),
	fruits= $.spritesheet('pacman-fruits').grid(4,3),

	map = [ 
	        "                        ",
		" %%%%%%%%%%%%%%%%%%%%%% ",
		" % %%        % %      % ",
		" %    %%%%%% % %%%%%% % ",
		" %%%%%%     P  %      % ",
		" %    % %%%%%% %% %%%%% ",
		" % %%%% %         %   % ",
		" %        %%% %%%   % % ",
		" %%%%%%%%%%    %%%%%% % ",
		" %.         %%        % ",
		" %%%%%%%%%%%%%%%%%%%%%% ",
	        "                        "
	],

	mapsprites = {
		"  %%%": 25,
		" %%% ": 16,
		" %%%%": 3,
		" %% %": 5,
		"% % %": 9,
		"% %% ": 20,
		"%%%  ": 24,
		"% %%%": 14,
		"% %  ": 23,
		" %%  ": 22,
		"%%% %": 17,
		"  % %": 8,
		"  %% ": 2,
		"%%%% ": 21
	},
	
	// Assume squared map
	xl = map[0].length-1,
	yl = map.length-1,
	x, y,
	row, s, smap=[], srow,
	tw = $.width/(xl-1),
	th = $.height/(yl-1),
	background,
	//pacman = $.clip([ chars.__sprites[11] ])
	pacman = $.clip([
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
	]);
;
/*	$.id('html').innerHTML = 
		'<p><label>Map</label><select><option>Normal</option></select></p>'
	;
	*/
	// Translate Map
	for (y=1; y<yl; y++)
	{
		row = map[y];
		smap.push(srow = []);

		for (x=1; x<xl; x++)
		{
			s = row[x];
			if (s==='%')
			{
				s = map[y-1][x] + row.substr(x-1, 3) + map[y+1][x];
				s = s.replace('P', ' ').replace('.', ' ');
				s = mapsprites[s] || 0;
			} 
			else if (s==='P')
			{
				pacman.pos((x-1)*tw, (y-1)*th).size(tw, th);
				s = 29;
			} else if (s==='.')
				s = 30;
			else
				s = 29;

			srow.push(s);
		}
	}

	background = $.map({ sprites: walls.sprites(), map: smap, th: th, tw: tw });
	background.__sprites.push(fruits.__sprites[10]);

	$.fps(32);
	$.root.add([ background, pacman ]);
	$.run();
})
