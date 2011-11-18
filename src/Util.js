
Util = 

/**
 *
 * j5g3 Utilities
 *
 * @namespace
 *
 */
j5g3.Util = {

	/**
	 * Extends object a with b
	 */
	extend: function(a, b)
	{
		for (var i in b)
			if (b.hasOwnProperty(i))
				a[i] = b[i];

		return a;
	},

	/**
	 * Fills array ary with what.
	 *
	 * @param {number|Array} ary Array to be filled or a number indicating how many times "what" should be
	 *                           repeated.
	 * @param what What to fill the array with.
	 */
	fill: function(ary, what)
	{
		if (typeof(ary)==='number')
			ary = new Array(ary);

		var i = ary.length;
		while (i--)
			ary[i] = what;

		return ary;
	},

	inherit: function(a, b)
	{
		for (var i in b)
			a[i] = a[i] || b[i];
		return a;
	},

	clone: function(a)
	{
		var x = {};
		for (var i in a)
			x[i] = a[i];
		return x;
	}

},

_typeof = 

/**
 * Returns the actual type of obj
 */
j5g3.Util.getType = function(obj)
{
	var result = typeof(obj);

	if (result == 'object')
	{
		if (obj instanceof Array) return 'array';
		if (obj instanceof HTMLAudioElement) return 'audio';
		if (obj instanceof HTMLElement) return 'DOM';
		if (obj.init) return 'j5g3';
	}

	return result;
},

