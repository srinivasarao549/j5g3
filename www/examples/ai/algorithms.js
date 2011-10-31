
var
	Algorithms = {

		dfs: function() 
		{
		var
			node = game.graph.current,
			i, l,
			history = []
		;
			while (!node.destination)
			{
				l = node.length;

				for (i=0;i<l; i++)
					if (!node.children[i].visited)
					{
						history.push(node);
						node = game.graph.load(node.children[i]); //return go(node.children[i]);
						break;
					}

				if (i==l)
					node = history.pop();
			}
			history.push(node);

			return history;
			// Run out of children go back to previous node in history!
		},

		bfs: function()
		{
		var
			graph = game.graph,
			node = graph.root,
			i, child,
			Q = [node], path
		;
			while (node = Q.shift())
			{
				graph.load(node);

				if (node.destination) break;

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
				
			}

			path = [node];

			while (node = node.parent)
				path.unshift(node);

			return path;
		}
	}
