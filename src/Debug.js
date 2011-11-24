/*
 * Debug Module for j5g3
 */

(function($, undefined)
{
	var Debug = $.Debug = { },
	    DebugFPS = new $.Text({ fillStyle: 'green', text: "0 FPS", x: 0, y: 14 }),
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

		DebugFPS.text(Math.round(fps < afps ? fps : afps) + " FPS");

		DebugFPS.draw(); //$.context); 
	};

	$.warning = function(msg)
	{
		window.console.warn(msg);
	}

})(j5g3);



