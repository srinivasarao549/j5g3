/**
 * Property Class
 *
 */

(function($, undefined) {

	/**
	 * Declares a j5g3 Property.
	 * @param p	Object storing the value.
	 * @param name  Property name
	 *
	 */
	$.Property = function(p, name)
	{
		return function(val) { 
			if (val !== undefined)
			{
				p[name] = val;
				return this.invalidate();
			}
			return p[name];
		};
	};

	/**
	 * Declares a read-only j5g3 Property.
	 * @param p	Object storing the value.
	 * @param name  Property name
	 *
	 */
	$.Property.get = function(p, name) {
		return function(val)
		{
			return p[name];
		};
	};

	/**
	 * Declares a set of properties.
	 * @param obj   Object to add Properties.
	 * @param p	Object storing the value.
	 * @param prop_array  Property name
	 *
	 */
	$.Property.define = function(obj, p, prop_array)
	{
		for (var i in prop_array)
		{
			obj[i] = $.Property(p, prop_array[i])
		}
	};

})(j5g3);
