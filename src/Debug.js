/*
 * Debug Module for j5g3
 */

(function($, undefined)
{
	var Debug = $.Debug = { },
	    DebugFPS = new $.Text({ fillStyle: 'green', text: "0 FPS", x: 0, y: 14 });

	$.Action.klass = 'Action';
	$.Clip.klass   = 'Clip';
	$.DisplayObject.klass = 'DisplayObject';
	$.Draw.klass = 'Draw';
	$.Image.klass = 'Image';
	$.Property.klass = 'Property';
	$.Rect.klass = 'Rect';
	$.Sprite.klass = 'Sprite';
	$.Spritesheet.klass = 'Spritesheet';
	$.Text.klass = 'Text';
	$.Util.klass = 'Util';

	/* Add Timing and FPS */
	Debug.oldGameLoop = $.gameLoop;
	$.gameLoop = function()
	{
		var time = (new Date).getTime();
		Debug.oldGameLoop.apply(this);
		time = (new Date).getTime() - time;

		var ctx = $.canvas().getContext('2d'),
		    afps = 1000/time,
		    fps = $.fps()
		;

		DebugFPS.text(Math.round(fps < afps ? fps : afps) + " FPS");

		DebugFPS.draw(ctx); 
	};


})(j5g3);



