/**
 * Handle Input Output
 */

$.Input = 
{
	Keyboard:
	{
		OnKeyDown: function(evt)
		{
			$.Input.Keyboard[evt.keyCode] = true;
		},

		OnKeyUp: function(evt)
		{
			$.Input.Keyboard[evt.keyCode] = undefined;
		}
	}
}

window.addEventListener('keydown', $.Input.Keyboard.OnKeyDown, true);
window.addEventListener('keyup', $.Input.Keyboard.OnKeyUp, true);
