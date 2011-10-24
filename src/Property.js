
/*
 * Define a property.
 * @ignore
 */
property = function(name)
{
	var pid='__'+name;
	return function(val)
	{
		return (val===undefined) ? this[pid] : (this[pid]=val, this);
	}
},

properties = 

/**
 * Define properties in props.
 * { name: default_value }
 */
j5g3.Class.properties = function(props)
{
	var i;

	for (i in props)
		if (props[i] !== this[i])
		{
			this.prototype[i] = property(i);
			this.prototype['__'+i] = props[i];
		}

	return this;
},

/*
 * Extends Properties by initializing the _p object.
 *
 * @return obj._p Object
 * @ignore
 */
_extend = function(obj, p)
{
	var i;

	for (i in p)
		obj['__'+i] = p[i];
	
	return obj;
},
