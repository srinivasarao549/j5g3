Input = 

/**
 * Handle Input Output
 *
 * @namespace
 */
j5g3.Input = 
{
	/** Key Constants */
	KEYS: {
		numpad1: 97,
		numpad2: 98,
		numpad3: 99,
		numpad4: 100,
		numpad5: 101,
		numpad6: 102,
		numpad7: 103,
		numpad8: 104,
		numpad9: 105,
		space: 32,
		left: 37,
		down: 40,
		right: 39,
		up: 38
	},

	/** Stores all Key status */
	Key: {},

	/** Waits for User Input and calls onInput. (Mouse or Keyboard) */
	wait: function(onInput)
	{
		var
			listener = function() {
				onInput();
				window.removeEventListener('keyup', listener, true);
				canvas.removeEventListener('click', listener, true);
			}
		;
			window.addEventListener('keyup', listener, true); 
			canvas.addEventListener('click', listener, true);
	},

	/**
	 * @namespace
	 */
	Mouse:
	{
		/** Waits for CLick Event */
		wait: function(onClick)
		{
		var
			listener = function() {
				onClick();
				canvas.removeEventListener('click', listener, true);
			}
		;
			canvas.addEventListener('click', listener, true);
		}
	},

	/**
	 * @namespace
	 */
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
		},

		/**
		 * Waits for key press.
		 */
		wait: function(onKeyPress)
		{
		var
			listener = function() {
				onKeyPress();
				window.removeEventListener('keyup', listener, true);
			}
		;
			window.addEventListener('keyup', listener, true); 
		}
	}
},

