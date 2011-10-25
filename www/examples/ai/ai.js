
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
		graph  = new game.Graph(data);
		background = new game.Layout(data.split("\n"));
		history = [];

		$.root.__frames = [[ 
			background, pacman, 
			$.action(algorithm).parent($.root)
		]];
		$.resume();
	},

	loadmap = function()
	{
		$.pause();
		$.Network.get(mapfile.value, function(response) {
			data = response;
			reset();
		});
	},

	loadalgo = function()
	{
		$.pause();
		algorithm = Algorithms[algo.value];
		if (data)
			reset();
	},

	history = [],

	go = function(child)
	{
	var
		x=child.x*background.__tw,
		y=child.y*background.__th
	;
		console.log("Moving to " + child.x + "," + 
			child.y);

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

		return graph.load(child);
	},

	heuristics = { },

	Algorithms = {
		dfs: function() 
		{
		var
			node = graph.current,
			i = 0, l = node.length
		;
			this.remove();

			if (node.destination)
				return;

			for (;i<l; i++)
				if (!node.children[i].visited)
				{
					history.push(node);
					return go(node.children[i]);
				}

			go(history.pop());
			// Run out of children go back to previous node in history!
		},

		bfs: function()
		{
		var
			node = history.shift() || graph.root,
			i,l
		;
			this.remove();

			if (node.destination)
				return history.push(node);

			go(node);

			if (!node.marked)
			{
				l = node.length;
				for (i=0;i<l; i++)
				{
					if (!node.children[i].added)
					{
						graph.load(node.children[i]);
						node.children[i].added = true;
						history.push(node.children[i]);
					}
				}
			}

			node.marked = true;
		}
	}
;

	algo.addEventListener('change', loadalgo);
	mapfile.addEventListener('change', loadmap);

	loadmap();
	loadalgo();

	$.fps(32).run();
}
