/**
 * JS Game Engine
 *
 * Core Library.
 */

var j5g3 = {

	/**
	 * Extends object a with b
	 */
	extend: function(a, b)
	{
		for (var i in b)
			a[i] = b[i];
		return a;
	},

	/**
	 * Extends Caller with b
	 * @param b is the class to extend
	 */
	inherits: function(obj, klass, args)
	{
		klass.apply(obj, args);
	},

	/**
	 * Declares a j5g3 Property.
	 * @param prop       Property name
	 */
	property: function(caller, prop)
	{
		caller[prop] = function(val) { 
			if (val!==undefined)
			{
				caller.invalidate();
				caller._p[prop] = val;
				return caller;
			}
			return caller._p[prop];
		};
		return caller[prop];
	},

	/**
	 * Defines multiple properties for a j5g3 class
	 */
	properties: function(obj, prop_array)
	{
		var i;
		for (i in prop_array)
			j5g3.property(obj, prop_array[i]);
	},

	init: function(initfunc)
	{
		initfunc.apply(j5g3.Engine);
	},

	/**
	 * You should always call this method first.
	 */
	start: function(initfunc)
	{
		j5g3.engine = new j5g3.Engine({ });
		initfunc(j5g3.engine);
	}
	
};

j5g3.property.get = function(caller, prop) {
	caller[prop] = function () { return caller._p[prop]; }; 
	return caller[prop]; 
};

