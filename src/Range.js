/*
 * j5g3 Range Class
 *
 * Constructor takes a property object, or a start and end values.
 */
Class(
	Range = function(start, end)
	{
		if (typeof start != 'object')
			start = { 'start': start, 'end': end };
			
		_extend(this, start);
	},
	Object,
	{ start: 0, end: 0 },
	{ 
		to_a: function()
		{
			var p = this._p, i=p.start, result=[];

			for (; i < p.end; i++)
				result.push(i);

			return result;
		}
	
	}
);

