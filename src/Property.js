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
Property = function(name)
{
	return function(val) { 
		return val === undefined ? this._p[name] :
			(this._p[name] = val, this.invalidate());
	}
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
 * @param properties Properties object.
 *
 */
Property.define = function(obj, properties) 
{
	for (var i in properties)
		obj.prototype[i] = Property(i); 

	obj.properties = properties;

	return obj;
};

/**
 * Extends Properties by initializing the _p object.
 *
 * @return obj._p Object
 */
_extend = Property.extend = function(obj, p)
{
	// TODO Check this..
	//obj._p = obj._p ? Util.clone(obj._p) : { };
	obj._p = { };

	var properties = obj.constructor.properties,
	    i;

	if (p)
		for (i in properties)
			obj._p[i] = p[i] || properties[i];
	else
		for (i in properties)
			obj._p[i] = properties[i];
	
	return obj._p;
};
