
(function ($)
{
	var ss = new $.Spritesheet('spritesheet').grid(6, 7);
	var r = ss.clip(1, 2, 3, 4, 5);
	var x = ss.clip(1, 2, 3, 4, 5);
	
	var a = $.tween(r).to({x : 500, y: 300});
	var b = $.tween(x).from({x : 500, y: 150}).to({x: 0, y: 0}).repeat(false);

	$.root.add([ r, x, a, b ]);
	$.run();
})
