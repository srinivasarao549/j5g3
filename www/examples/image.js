
/*
 * Here we show another way to initialize the application.
 * We demonstrate:
 * - Scaling
 * - Image Initialization
 * - Rotation
 * - Actions
 */

(function ($)
{
var 
	img = new $.Image({ source: 'logo', x: 0, y: 200}),
	rotate = new $.Clip({ 
		x: 300, y: 100,
		scaleX: 0.5, scaleY: 0.5,
		frames: [[ new $.Image({source: 'logo', x:-125, y: -50}) ]]
	}),
	skew = $.clip({ x: 300, y: 150, scaleX: 0.3, frames: [[ $.image('logo') ]]}),
	skew2= $.clip({ x: 300, y: 250, scaleX: 0.3, frames: [[ $.image('logo') ]]}),
	update = $.Action.rotate(rotate),

	sx=0, sy=0,
	do_skew = $.action(function() { skew.skewX(sx+=0.05); skew2.skewY(sy+=0.05); })
;

	$.background.fillStyle('white');
	$.root.add(['logo', {source: 'logo', y:200, scaleY:-1}, rotate, update, img, skew, skew2, do_skew]);
	$.run();
})

