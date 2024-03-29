/*
 * Based on Fabien Sanglard's post at http://fabiensanglard.net/Tunnel/index.php
 */
(function ($, document, undefined) {

var
	WIDTH = $.canvas.width,
	HEIGHT= $.canvas.height,
	txtimg = $.id('tex99'),
	TEXTUREHEIGHT = txtimg.height,
	TEXTUREWIDTH  = txtimg.width,
	x, y, cursor,
	texture = $.Util.imagedata('tex99'),
	display = $.Util.imagedata(),
	distances = $.ary(display.data.length),
	angles = $.ary(distances.length),

	shiftX = TEXTUREWIDTH, shiftY = TEXTUREHEIGHT,

	TW4 = TEXTUREWIDTH * 4,

	draw = function()
	{
	var
		c, data=display.data, tdata=texture.data, cursor=data.length
	;
		shiftX ++; //= 3;
		shiftY ++; 

		while (cursor-=4)
		{
			c =	(distances[cursor] + shiftX) % TEXTUREWIDTH * 4 + 
				(((angles[cursor] + shiftY) % TEXTUREHEIGHT) * TW4)
			;

			data[cursor] = tdata[c];
			data[cursor+1] = tdata[c+1];
			data[cursor+2] = tdata[c+2];
		}

		$.context.putImageData(display, 0, 0);
	}

;

	for (y=0, cursor=0; y<HEIGHT; y++)
		for (x=0; x<WIDTH; x++, cursor+=4)
		{
			distances[cursor] = (Math.round(30 * TEXTUREHEIGHT / Math.sqrt(
				(x - WIDTH/2) * (x - WIDTH / 2) + (y - HEIGHT / 2) * (y - HEIGHT / 2)
			)) % TEXTUREHEIGHT) || 0;
			
			angles[cursor] = Math.round(TEXTUREWIDTH / 2 * Math.atan2(y - HEIGHT / 2, x - WIDTH / 2) / Math.PI);

			// Initialize alpha to 255!
			display.data[x * 4 + y * WIDTH * 4 + 3] = 255;
		}

	$.root.add(draw);
	
	$.fps(32).run();
})
