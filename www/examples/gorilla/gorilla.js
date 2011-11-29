
function game($, doc)
{
var
	gorilla = (new game.Gorilla()).pos(100,100),
	platform = $.rect({ x: 100, y: 300, width: 100, height: 10, fillStyle: 'white' })
;

	$.id('loading').style.display = 'none';
	$.canvas.style.display = '';

	$.root.add([gorilla, platform]);

	$.run();

	$.Input.Keyboard.capture();
}
