
game.Graph = function(data)
{
var
	me = this,
	map= me.data = data.split("\n"),
	i = data.search('P'),
	w = me.w = map[0].length,
	y = Math.floor(i / w),
	x = i % w - y,
	root = me.root = {x: x, y: y}
;
	console.log('Starting at ' + x + ',' + y);
	me.nodes = {};
	me.load(root);
}

j5g3.Util.extend(game.Graph.prototype, {

	getNode: function(x, y)
	{
	var
		key = x+' '+y
	;
		return this.nodes[key] || (this.nodes[key] = { x: x, y: y });
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
		//key = x+'-'+y, 
		//node = me.current = (me.nodes[key] || (me.nodes[key]={}))
		// Populate children clockwise
	;
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

			if (map[y][x]===DESTINATION)
				node.destination = true;

			node.length = children.length;
			node.visited = true;
		}

		return me.current = node;
	}

});
