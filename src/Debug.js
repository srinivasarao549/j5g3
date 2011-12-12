/*
 * Debug Module for j5g3
 */

(function($, undefined)
{
	var Debug = $.Debug = { }, screen,
	    i, time
	;

	for(i in $)
		if (typeof($[i])=='function') $[i].klass = i;

	/* Add Timing and FPS */
	Debug.oldGameLoop = $.gameLoop;
	$.gameLoop = function()
	{
		time = (new Date).getTime();
		Debug.oldGameLoop.apply(this);
		time = (new Date).getTime() - time;

		var 
		    afps = 1000/time,
		    fps = $.fps()
		;
		    screen = screen || $.canvas.getContext('2d');

		screen.save();
		screen.fillStyle = 'green';
		screen.translate(0, 14);
		screen.fillText(Math.round(fps < afps ? fps : afps) + " FPS", 0, 0);
		screen.restore();
	};

	$.warning = function(msg)
	{
		window.console.warn(msg);
	}

})(j5g3);



