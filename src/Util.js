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
	},

	/**
	 * Defines class klass.
	 * @param b is the class to extend
	 */
	Class: function(klass, base, properties, methods)
	{
		Util.extend(klass.prototype, new base);
		Property.define(klass, properties);
		Util.inherit(properties, base.properties);
		Util.extend(klass.prototype, methods);

		return klass;
	}
};


Class = Util.Class;

_typeof = Util.getType = function(obj)
	{
		var result = typeof(obj);

		if (result == 'object')
		{
			if (obj instanceof Array) return 'array';
			if (obj instanceof HTMLElement) return 'DOM';
			if (obj._p) return 'j5g3';
		}

		return result;
	}
;

