
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
	},

	/**
	 * Creates a new Canvas with width w and height h. 
	 * @param w Width. Defaults to screen canvas width
	 * @param h Height. Defaults to screen canvas height
	 */
	canvas: function(w, h)
	{
		var result = document.createElement('CANVAS');
		result.width = w || canvas.width;
		result.height= h || canvas.height;

		return result;
	},

	/**
	 * Creates a new ImageData object with width w and height h. 
	 * @param w Width. Defaults to screen canvas width
	 * @param h Height. Defaults to screen canvas height
	 */
	imagedata: function(w, h)
	{
		if (typeof w === 'string')
		{
			// Load Image then get ImageData
			var img = $.id(w), ctx;
			cache.width = img.width;
			cache.height= img.height;
			ctx = cache.getContext('2d');
			ctx.drawImage(img, 0, 0);
			return ctx.getImageData(0, 0, img.width, img.height);
		}

		return context.createImageData(w || canvas.width, h || canvas.height);
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

