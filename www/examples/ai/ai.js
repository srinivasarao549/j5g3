
function game ($)
{
var
	mapfile = $.id('map'),
	algo    = $.id('algo'),

	algorithm,
	data,
	
	pacman = game.pacman = new game.Pacman(),
	background, moves,

	reset = function()
	{
		game.ghosts = $.clip();
		background = new game.Layout(data.split("\n"));
		game.graph = new game.Graph(data);

		moves  = algorithm();

		$.root.__frames = [[ 
			background, pacman, game.ghosts, run
		]];
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
