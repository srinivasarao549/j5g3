/**
 * Property Functions
 *
 */

/**
 * Extends Properties by initializing the _p object.
 *
 * @return obj._p Object
 */
_extend = function(obj, p)
{
	var i;

	for (i in p)
		obj['__'+i] = p[i];
	
	return obj;
};
