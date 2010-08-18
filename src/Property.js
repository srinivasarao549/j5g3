/**
 * Property Functions
 *
 */


/**
 * Declares a j5g3 Property.
 * @param p	Object storing the value.
 * @param name  Property name
 *
 */
var Property = function(name)
{
	return function(val) { 
		if (val !== undefined)
		{
			this._p[name] = val;
			return this.invalidate();
		}
		return this._p[name];
	};
};

/**
 * Declares a read-only j5g3 Property.
 * @param p	Object storing the value.
 * @param name  Property name
 *
 */
Property.get = function(p, name) {
	return function(val)
	{
		return p[name];
	};
};

/**
 * Will declare all the properties of the object in its prototype
 * @param obj   Object to add Properties.
 *
 */
Property.define = function(obj) 
{
	for (var i in obj.properties)
		obj.prototype[i] = $.Property(i); //obj.properties[i]);
};

Property.extend = function(obj, p)
{
	var properties = obj.__proto__.constructor.properties,
	    i;

	for (i in properties)
		obj._p[i] = p[i] || properties[i];
};

$.Property = Property;
