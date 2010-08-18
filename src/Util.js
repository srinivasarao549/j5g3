/**
 *
 * j5g3 Utilities
 *
 */

var Util = {

	/**
	 * Extends object a with b
	 */
	extend: function(a, b)
	{
		for (var i in b)
			a[i] = b[i];
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
	 * Extends Caller with b. Sets up properties.
	 * @param b is the class to extend
	 */
	inherits: function(base, klass, properties, methods)
	{
		klass.prototype = new base;
		Property.define(klass, properties);

		Util.extend(klass.prototype, methods);

		return klass;
	},

	Class: function(klass, base, properties, methods)
	{
		klass.prototype = new base;
		Property.define(klass, properties);

		Util.extend(klass.prototype, methods);

		return klass;
	},

	getType: function(obj)
	{
		var result = typeof(obj);

		if (result == 'object')
		{
			if (obj instanceof Array)
				result = 'array';
			else if (obj instanceof DisplayObject)
				result = 'j5g3';
		}

		return result;
	}

};

$.Util = Util;
