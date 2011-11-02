
(function(window, j5g3, undefined) {
var AI =

/**
 * AI Algorithms
 *
 * Built as a separate module. @requires j5g3
 *
 * @namespace
 */
j5g3.AI = {

	Stack: Array,

	Queue: function() { },

	PriorityQueue: function()
	{
		this.data = []
	}
}

AI.Queue.prototype = new Array();
AI.Queue.prototype.pop = Array.prototype.shift;

// TODO Find the best algorithm for this
j5g3.Util.extend(AI.PriorityQueue.prototype, {

	pop: function() 
	{
		var data = this.data, i = data.length, result=0, node;
		while (i--)
			if (data[i].priority > data[result].priority)
				result = i;
		node = data.splice(result, 1)[0]

		return node && node.node; 
	},

	priority: function(node)
	{
		return 0;
	},

	push: function(node)
	{
		this.data.push({
			priority: this.priority(node),
			node: node
		});
	}
});

})(window, window.j5g3);
