
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

	/**
	 * @constructor
	 */
	Queue: function() { },

	/**
	 * A Priority Queue implementation.
	 *
	 * @constructor
	 * @param {Function} priorityFn Function that returns the priority of the node.
	 */
	PriorityQueue: function(priorityFn)
	{
		this.data = []
		if (priorityFn) this.priority = priorityFn;
	},

	/**
	 * @constructor
	 */
	Graph: function()
	{
		this.root = []
	},

	/**
	 * @namespace
	 */
	Util: {

		

	}

};

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

	/**
	 * Replace this function with your own priority algorithm. By default it will behave as a Queue.
	 */
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

j5g3.Util.extend(AI.Graph.prototype, {

});


})(window, window.j5g3);
