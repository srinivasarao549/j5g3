
var
	Algorithms = {

		/**
		 * Q is the storage object. Needs to implement the pop and push methods.
		 */
		search: function(Q)
		{
		var
			graph = game.graph,
			start,
			node = start = graph.current, 
			i, child, path
		;
			while (!node.destination)
			{
				i=node.length;
				while (i--)
				{
					child = node.children[i];
					if (!child.visited)
					{
						child.parent = node;
						Q.push(child);
					}
				}

				if (node = Q.pop())
					graph.load(node)
				else
					return [];
			}

			path = [node];

			while ((node = node.parent) && (node !== start))
				path.unshift(node);

			return path;
		},

		dfs: function() 
		{
			return Algorithms.search(new j5g3.AI.Stack);
		},

		bfs: function(Q)
		{
			return Algorithms.search(new j5g3.AI.Queue);
		},

		ucs: function()
		{
		var 
			Q = new j5g3.AI.PriorityQueue
		;
			Q.priority = function(node)
			{
				game.graph.load(node);
				return node.cost = (node.parent ? node.parent.cost : 0) + ({
					'P': -1,
					'G': -50,
					' ': -1,
					'.': 1
				})[node.char];
			}
	
			return Algorithms.search(Q);
		},

		a_star: function()
		{
		var
			Q = new j5g3.AI.PriorityQueue(function(node) {
			var 
				p = game.dotpos, i, h, heuristic=Infinity, 
				geth = function(x, y) {
					//return Math.sqrt(x*x + y*y);
					return Math.abs(x) + Math.abs(y);
				}
			;
				game.graph.load(node);

				for (i in game.dotpos)
				{
					h = geth(p[i].x - node.x, p[i].y - node.y);
					if (h < heuristic)
						heuristic = h;
				}

				if (heuristic===Infinity)
					heuristic = 0;

				//heuristic = node.length;

				//return heuristic;

				node.cost = (node.parent ? node.parent.cost : 0) + ({
					'P': -1,
					'G': -50,
					' ': -1,
					'.': 0
				})[node.char] - (heuristic);

				return node.cost;
			})
		;
			return Algorithms.search(Q);			
		}
	}
