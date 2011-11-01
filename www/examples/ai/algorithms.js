
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

		bfs: function(Q)
		{
		var
			graph = game.graph,
			node, i, child, path
		;
			Q = Q || [graph.root];

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
		},

		ucs: function()
		{
		var 
			Q = [game.graph.root], 
			cost = function(node)
			{
				return (node.char==='G') ? 150 : 1;
			}
		;

			Q.shift = function()
			{
				result = game.graph.load(this.splice(result, 1)[0]);
				result.cost = (result.parent ? result.parent.cost : 0) + cost(result);

				var i = this.length, result=0;
				while (i--)
					if (this[i].cost < this[result].cost)
						result = i;

				return result;
			}
	
			return Algorithms.bfs(Q);
		}
	}
