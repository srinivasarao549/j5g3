
game.Graph = function(data)
{
var
	me = this, xy = game.pacman.XY
;
	me.data = data.split("\n")
	// UGLY HACK

	me.reset(xy[0], xy[1]);
}

j5g3.Util.extend(game.Graph.prototype, {

	reset: function(x, y)
	{
		this.nodes = {}
		this.root = this.load(this.getNode(x, y));		
	},

	getNode: function(x, y)
	{
	var
		key = x+' '+y
	;
		return this.nodes[key] || (this.nodes[key] = { x: x, y: y });
	},

	replace: function(x, y, what)
	{
	var
		str = this.data[y]
	;
		this.data[y] = str.substr(0, x) + what + str.substr(x+1);
	},

	load: function(node)
	{
	var
		me = this,
		FREE = ' ',
		DESTINATION = '.',

		x  = node.x, y = node.y,
		children,
		map = me.data
	;
		game.stats.visited++;

		if (!node.visited)
		{
			children = node.children = [];

			if (map[y-1] && map[y-1][x] !== '%')
				children.push(me.getNode(x, y-1));
			if (map[y][x+1] !== '%')
				children.push(me.getNode(x+1, y));
			if (map[y+1] && map[y+1][x] !== '%')
				children.push(me.getNode(x, y+1));
			if (map[y][x-1] !== '%')
				children.push(me.getNode(x-1, y));

			if ((node.char = map[y][x])===DESTINATION)
				node.destination = true;

			node.length = children.length;
			node.cost = 0;
			node.visited = true;
		}

		return me.current = node;
	}

});
