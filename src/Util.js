/**
 *
 * j5g3 Utilities
 *
 */

Util = {

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

};

/** Creates an array of w*h dimensions initialized with value v */
$.ary = function(w, h, v)
{
	var result = [], x;
	while (h--)
	{
		result[h] = [];
		for (x=0; x<w; x++)
			result[h][x]=v;
	}
	return result;
}

/*
$.transform = function(ary, A, B, C, D, E, F)
{
	var x, y=_in.length, nx, ny;

	while (y--)
		for (x=0; x<_in[y].length; x++)
		{
			nx = Math.round(x*A + y*B + C);
			ny = Math.round(y*E + x*D + F);
			out[ny][nx] = _in[y][x]; 
		}
}
*/

_typeof = Util.getType = function(obj)
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
	}
;

