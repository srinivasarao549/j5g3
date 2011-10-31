

window.banner = {

	startFn: function ($)
	{
	var
		title = $.text("Open Source HTML5 Game Engine").font("26px Nobile, Verdana").pos(10, 30)
			.fillStyle('#ff6e40')
	;
		$.root.add(title);

		$.fps(24).run();
	},

	canvas: 'banner'

}
