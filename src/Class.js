

Class = 

/**
 *
 * Object Oriented Class Implementation in Javascript.
 *
 * To create a class use Object.extend({ methods });
 *
 * @class
 *
 */
j5g3.Class = function() { },

class_extend = 

/**
 *
 * Uses methods.init as the constructor. If not passed it will define a function and call the base
 * constructor. Sets 'super' as the base class.
 *
 * @param {Object}  methods List of methods to add to the class. 
 * 	It will use the init method as the constructor and assign it to the class. 
 *
 * @param {Object=} static_methods List of static methods.
 * 
 */
j5g3.Class.extend = function(methods, static_methods)
{
	var i,
	    _super  = this, 
	    init   = methods.init || function() { _super.apply(this, arguments); },
	    /** @constructor @ignore */
	    subclass= function() { }
	;

	subclass.prototype = _super.prototype;
	init.prototype = new subclass;

	for(i in methods)
		if (methods.hasOwnProperty(i) && _super[i]!=methods[i])
			init.prototype[i] = methods[i];

	if (static_methods)
		Util.extend(init, static_methods);

	init.properties = Class.properties;
	init.extend = Class.extend;

	init.parent = _super;
	init.prototype._super = function() { 
		return arguments.callee.caller.parent.apply(this, arguments);
	}

	return init;
},

/**
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
 * Define properties for class. Properties are stored in the instance prepended by "__" to allow direct access. A setter/getter function is created. If a value is passed it will store it, invalidate the object for repaint and return this.
 *
 * @param {Object} props The key will be used as the name of the property and the value as its default value.
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

/**
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
