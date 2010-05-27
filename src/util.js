
j5g3.Util = {


	getType: function(obj)
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

};

