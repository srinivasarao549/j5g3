
var
	history = [],

	Algorithms = {

		dfs: function() 
		{
		var
			node = game.graph.current,
			i = 0, l = node.length
		;
			this.remove();

			if (node.destination)
				return history;

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
			graph = game.graph,
			node = graph.root,
			i, child,
			Q = [], path = [node]
		;
			Q.push(node);

			while (node = Q.shift())
			{
				graph.load(node);
				path.push(node);

				i=node.length;
				while (i--)
				{
					child = node.children[i];
					if (!child.visited)
					{
						node.path = path;
						Q.push(child);
					}
					
				}
				
			}

			

		}
	}
