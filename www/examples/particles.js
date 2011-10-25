
(function ($)
{
var
/*	tween = $.tween({
		to: { alpha: 0 }
	}),
	*/
	x=0, y=0,

	emitter = $.emitter({
		source: $.dot(2).strokeStyle('white'),
		life: 32,
		on_emit: function(clip)
		{
			clip.pos(x+$.rand(30)-15, y+$.rand(30)-15);

			emitter.add($.tween({ target: clip, duration: 32, to: { alpha: 0 } }))
		}
	}),

	mouse = function(evt)
	{
		//emitter.pos(evt.offsetX, evt.offsetY);
		x = evt.offsetX; y = evt.offsetY;
	}
;

	$.canvas.addEventListener('mousemove', mouse);

	$.root.add([ emitter ]);
	$.run();						

})
