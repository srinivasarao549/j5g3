
(function ($)
{
	var ROWS = 4, COLS=4,
	    ss = $.spritesheet($.id('pic')).grid(ROWS, COLS),
	    pieces= ss.sprites(),
	    r, c,
	    w=$.canvas.width / COLS,
	    h=$.canvas.height / ROWS,
	    last = pieces[8]
	;

	$.shuffle(pieces);

	for (r=0; r<ROWS; r++)
		for (c=0; c<COLS; c++)
			pieces[r*COLS+c].pos(c*w, r*h).width(w-4).height(h-4);

	pieces.splice(pieces.indexOf(last), 1);

	$.canvas.onmousemove = function(evt)
	{
		$.each(pieces, function(piece) { piece.alpha(1); });
		var piece = $.root.at(evt.offsetX, evt.offsetY);
		if (piece) piece.alpha(0.5);
	};

	var onclick = $.canvas.onclick = function(evt)
	{
		$.canvas.onclick = null;
		var piece = $.root.at(evt.offsetX, evt.offsetY);

		if (piece)
		{
		    var x = piece.x(), y = piece.y(),
		    tween;
		// decide where to move
			if (x > 0 && !$.root.at(x-4,y+4))
				tween = $.tween(piece).to({x: piece.x()-w});
			else if (y > 0 && !$.root.at(x+4,y-4))
				tween = $.tween(piece).to({y: piece.y()-h});
			else if (y < h*(ROWS-1) && !$.root.at(x+4, y+h))
				tween = $.tween(piece).to({y: piece.y()+h});
			else if (x < w*(COLS-1) && !$.root.at(x+w, y+4))
				tween = $.tween(piece).to({x: piece.x()+w});

			tween.on_remove(function() { $.canvas.onclick = onclick; });
			$.root.add(tween.auto_remove(true).duration(16));
		}
		else return $.canvas.onclick = onclick;

	}

	$.root.add(pieces);
	$.run();
})
