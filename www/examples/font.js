
(function ($)
{
	var txt = $.text('Hello World').pos(0,40).font('48px auto');
	var bb  = $.rect({ fillStyle: 'green', x: 0, y: 0, width: txt.width(), height: 40 });

	$.root.add([
		bb,
		txt,
		$.text({ font: '20px Arial', text: "Hello World", x: 100, y: 100 })
	]);
	
	$.run();
})