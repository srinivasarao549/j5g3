
function game ($)
{
var
	mapfile = $.id('map'),
	algo    = $.id('algo'),

	algorithm,
	data,
	
	pacman = game.pacman = new game.Pacman(),
	background, moves,

	update_stats = function()
	{
		for(var i in game.stats)
			$.id(i).innerHTML = game.stats[i];
	},

	do_move = function()
	{
		game.graph.reset(game.graph.current.x, game.graph.current.y);
		moves  = algorithm();
		game.stats.moves += moves.length;
		update_stats();
	},

	reset = function()
	{
		$.pause();

		game.stats = {
			nodes: 0,
			collected : 0,
			visited: 0,
			points: 0,
			moves: 0
		}

		game.ghosts = $.clip();
		background = new game.Layout(data.split("\n"));
		game.graph = new game.Graph(data);

		do_move();

		$.root.__frames = [[ 
			background, pacman, game.ghosts, run
		]];

		$.resume();
	},

	run = $.action(function()
	{
	var
		piece = moves.shift()
	;
		$.root.remove_child(run);

		if (piece)
			go(piece);
	}),

	loadmap = function()
	{
		$.Network.get(mapfile.value, function(response) {
			data = response;
			reset();
		});
	},

	loadalgo = function()
	{
		algorithm = Algorithms[algo.value];
		if (data) reset();
	},

	check_points= function(node)
	{
		if (node.char=='.')
		{
			game.stats.collected++;
			game.graph.replace(node.x, node.y, ' ');
			delete game.dotpos[node.x+' '+node.y];

			background.__map[node.y][node.x] = background.SPRITE_SPACE;

			do_move();
		}
	},

	go = function(node)
	{
	var
		x, y, node
	;
		x = node.x * background.__tw;
		y = node.y * background.__th;

		$.root.add($.tween({
			auto_remove: true,
			duration: 2,
			target: pacman,
			to: { x: x, y: y },
			on_remove: function()
			{
				$.root.add(run);
				check_points(node);
			}
		}));
	}

;

	algo.addEventListener('change', loadalgo);
	mapfile.addEventListener('change', loadmap);

	loadmap();
	loadalgo();

	$.fps(32).run();
}
