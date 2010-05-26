
j5g3.Action = function(properties)
{
	this.draw = (typeof properties == 'function') ? properties : properties.code;
};

/**
 * Rotates object forever.
 */
j5g3.Action.rotate = function(obj)
{
	return function() { 
		var r = obj.rotation();
		obj.rotation(r < 6.1 ? r+0.1 : 0);
	};
}

