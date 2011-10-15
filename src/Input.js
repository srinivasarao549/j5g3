/**
 * Handle Input Output
 */

Input = $.Input = 
{
	/* Stores all Key status */
	Key: {},

	Keyboard:
	{
		/**
		 * Clears keys pressed.
		 */
		clear: function()
		{
		var
			i, key = Input.Key
		;
			for (i in key)
				if (key.hasOwnProperty(i))
					key[i] = undefined;
		},
		/**
		 * Starts Keyboard Capture. Clears current keys. Prevents default keyboard actions.
		 */
		capture: function()
		{
		var
			keyboard = Input.Keyboard
		;
			keyboard.clear();

			window.addEventListener('keydown', keyboard._onkeydown_pd, true);
			window.addEventListener('keyup', keyboard._onkeyup_pd, true);
			window.addEventListener('keypress', keyboard._onkeypress, true);
		},

		/**
		 * Stops Keyboard Capture.
		 */
		release: function()
		{
			window.removeEventListener('keypress', Input.Keyboard._onkeypress, true);
			window.removeEventListener('keydown', Input.Keyboard._onkeydown_pd, true);
			window.removeEventListener('keyup', Input.Keyboard._onkeyup_pd, true);
		},

		_onkeydown_pd: function(evt)
		{
			Input.Key[evt.keyCode] = true;
			evt.preventDefault();
		},

		_onkeyup_pd: function(evt)
		{
			Input.Key[evt.keyCode] = undefined;
			evt.preventDefault();
		},

		_onkeypress: function(evt)
		{
			evt.preventDefault();
		}
	}
},

