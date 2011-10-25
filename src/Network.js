Network =

/**
 * @namespace Network
 *
 */
j5g3.Network = {

	/**
	 * Gets url using ajax.
	 *
	 * @param {string} url 
	 * @param {Function} fn Callback function
	 */
	get: function(url, fn)
	{
	var
		ajax = new XMLHttpRequest
	;
		ajax.onreadystatechange = function()
		{
			if (ajax.readyState===4)
				fn.apply(this, [ ajax.responseText ]);
		}

		ajax.open('GET', url);
		ajax.send();
	}

},
