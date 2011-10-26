
function game ($)
{
var
	mapfile = $.id('map'),
	algo    = $.id('algo'),

	algorithm,
	data,
	
	pacman = game.pacman = new game.Pacman(),
	graph, background,

	reset = function()
	{
		graph  = game.graph = new game.Graph(data);
		background = new game.Layout(data.split("\n"));
		history = [];

		$.root.__frames = [[ 
			background, pacman, 
			$.action(algorithm).parent($.root)
		]];
	},

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

	go = function(steps)
	{
	var
		x, y, node,
		i = 0, l = steps.length

	;
		for (;i<l;i++)
		{
			node = steps[i];
			x = node.x * background.__tw;
			y = node.y * background.__th;

			$.root.add($.tween({
				auto_remove: true,
				duration: 2,
				target: pacman,
				to: { x: x, y: y },
				on_remove: function()
				{
					$.root.add(algorithm);
				}
			}));
		}
		


		return graph.load(child);
	}
;

	algo.addEventListener('change', loadalgo);
	mapfile.addEventListener('change', loadmap);

	loadmap();
	loadalgo();

	$.fps(32).run();
}
