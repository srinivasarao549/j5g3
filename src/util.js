
j5g3.Util = {

	extend: function(a, b) {
		for (var i in b)
			a[i] = b[i];
		return a;
	},

	getType: function(obj)
	{
		var result = typeof(obj);

		if (result == 'object')
		{
			if (obj instanceof Array)
				result = 'array';
		}

		return result;
	}

}
