/**
 *
 * j5g3 Utilities
 */

(function($, undefined) {

	/**
	 * Extends object a with b
	 */
	$.Util.extend= function(a, b)
	{
		for (var i in b)
			a[i] = b[i];
		return a;
	};

	/**
	 * Extends Caller with b
	 * @param b is the class to extend
	 */
	$.Util.inherits= function(obj, klass, args)
	{
		klass.apply(obj, args);
	};
	
	$.Util.getType: function(obj)
	{
		var result = typeof(obj);

		if (result == 'object')
		{
			if (obj instanceof Array)
				result = 'array';
			else if (obj._j5g3===true)
				result = 'j5g3';
		}

		return result;
	}

})(j5g3);
