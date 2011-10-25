
(function ($)
{
	var e = $.emitter({
		source: $.dot(6).strokeStyle('white'),
		life: 11,
		on_emit: function(clip) { 
			txt.text(this.frames()[0].length);
			clip.pos(Math.random() * 640, Math.random() * 480);
		},
		y: 380
	}),
	    txt = $.text({ y: 20});

	$.root.add($.text('j5g3').font('120px sans-serif').pos(200, 270))
	    //  .add($.dot(20).pos(100,100).strokeStyle('white'))
	      .add(e)
	      .add(txt)
	;
	$.run();
})
