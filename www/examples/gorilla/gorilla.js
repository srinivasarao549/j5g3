
function game($, doc)
{
var
	ss = $.spritesheet('ss').grid(20,10),
	gorilla = ss.clip(20, 21, 22, 23, 24, 23, 22, 21).pos(100,100).scaleT(2.5),
	txt = $.text("hello").fillStyle('white')
;

	$.id('loading').style.display = 'none';
	$.canvas.style.display = '';

	$.root.add([gorilla, txt]);

	$.run();
}
