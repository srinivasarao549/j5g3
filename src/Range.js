/*
 * j5g3 Range Class
 *
 * Constructor takes a property object, or a start and end values.
 */
Range = Class.extend({

	init: function(start, end)
	{
		if (typeof start != 'object')
			start = { 'start': start, 'end': end };
			
		_extend(this, start);
	},
	to_a: function()
	{
		var i=this.__start, result=[],
		    e=this.end();

		for (; i < e; i++)
			result.push(i);

		return result;
	}
	
}).properties(
	{ start: 0, end: 0 }
);

