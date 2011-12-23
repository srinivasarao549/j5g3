
(function ($, document, undefined) {

var
	WIDTH = $.canvas.width,
	HEIGHT= $.canvas.height,
	txtimg = $.id('tex99'),
	TEXTUREHEIGHT = txtimg.height,
	TEXTUREWIDTH  = txtimg.width,
	x, y,
	distances = $.ary(WIDTH, HEIGHT),
	angles = $.ary(WIDTH, HEIGHT),
	texture = $.Util.imagedata('tex99'),
	display = $.Util.imagedata(),

	movement = 0,
	animation = 0,
	shiftX, shiftY,
	cursor,

	draw = function()
	{
	var
		c = 0
	;
		animation += 3;
		movement  += 1;

		shiftX = TEXTUREWIDTH + animation;
		shiftY = TEXTUREHEIGHT+ movement;

		for (y=0, cursor=0; y<HEIGHT; y++)
			for (x=0; x<WIDTH; x++, cursor+=4)
			{
				c =	(distances[y][x] + shiftX) % TEXTUREWIDTH * 4 + 
					(((angles[y][x] + shiftY) % TEXTUREHEIGHT) * TEXTUREWIDTH * 4)
				;

				display.data[cursor] = texture.data[c];
				display.data[cursor+1] = texture.data[c+1];
				display.data[cursor+2] = texture.data[c+2];
				display.data[cursor+3] = 255;
			}
				;	
		$.context.putImageData(display, 0, 0);
	}

;

	for (x=0; x< WIDTH; x++)
		for (y=0; y< HEIGHT; y++)
		{
			distances[y][x] = (Math.round(30 * TEXTUREHEIGHT / Math.sqrt(
				(x - WIDTH/2) * (x - WIDTH / 2) + (y - HEIGHT / 2) * (y - HEIGHT / 2)
			)) % TEXTUREHEIGHT) || 0;

			angles[y][x] = Math.round(TEXTUREWIDTH / 2 * Math.atan2(y - HEIGHT / 2, x - WIDTH / 2) / Math.PI);
		}

	$.root.add(draw);
	
	$.fps(32).run();
})
