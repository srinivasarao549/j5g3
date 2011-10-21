
/**
 * js-class
 *
 * Object Oriented Class Implementation in Javascript.
 *
 * To create a class use Object.extend({ methods });
 *
 */

Class = function() { },

class_extend = 

/**
 *
 * Uses methods.init as the constructor. If not passed it will define a function and call the base
 * constructor. Sets 'super' as the base class.
 *
 * @param {Object}  methods
 * @param {Object=} static_methods
 * 
 */
Class.extend = function(methods, static_methods)
{
	var i,
	    _super  = this, 
	    init   = methods.init || function() { _super.apply(this, arguments); },
	    /** @constructor */
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

	init.prototype._super = function() { 
		return _super.apply(this, arguments);
	}

	return init;
},

