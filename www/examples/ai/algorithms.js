
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
				return node.cost = (node.parent ? node.parent.cost : 0) + (node.char==='G' ? -50: -1);
			}
	
			return Algorithms.search(Q);
		},

		a_star: function()
		{
			
		}
	}
