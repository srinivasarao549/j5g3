
(function ($)
{
	// Define our spritesheet as a 6x7 grid.
	var ss = $.spritesheet('spritesheet').grid(6, 7),

	    standing = ss.clip(1, 2, 3, 4, 5, 6).x(-65),
	    running  = ss.clip(16, 17, 18, 19, 20, 21, 22, 23, 24).x(-65),
	    kneeling = ss.clip(26, 28, 27).x(-65).add(function() { kneeling.stop(); }),

	    r = $.clip( { x: 320, y: 300, frames: [ [standing], [running], [kneeling] ] }).stop(),

	    left = function() { r.scaleX(-1).go(1); },
	    right= function() { r.scaleX(1).go(1); },
	    up = function() { },
	    down = function() { kneeling.go(0).play(); r.go(2); }
	;

	window.onkeydown = function(evt)
	{
		var a = ({ 37 : left, 38 : up, 39 : right, 40 : down })[evt.keyCode];
		if (a) a(); 
		return false;
	}

	window.onkeyup = function() { r.go(0); }

	$.fps(60);
	$.root.add([ r ]);
	$.run();
})
